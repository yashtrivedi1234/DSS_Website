import ApiError from "../utils/ApiError.js";
import { Offer } from "../models/offer.model.js";
import mongoose from "mongoose";
import {
  uploadFiles,
  deleteFile,
  deleteLocalFile,
} from "../utils/cloudinary.js";

/* ======================================================
   HELPERS
====================================================== */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/* ======================================================
   CREATE OFFER (ADMIN)
====================================================== */
export const createOffer = async (req, res, next) => {
  let uploadedFileId = null;
  let uploadedFileUrl = null;

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ApiError(400, "Request body cannot be empty");
    }

    const {
      title = "",
      description = "",
      discountType,
      discountValue,
      startDate,
      endDate,
    } = req.body;

    const parsedDiscountValue = Number(discountValue);

    /* ---------- VALIDATIONS ---------- */
    if (!title.trim()) {
      throw new ApiError(400, "Offer title is required");
    }

    if (!["percentage", "flat"].includes(discountType)) {
      throw new ApiError(400, "Discount type must be percentage or flat");
    }

    if (isNaN(parsedDiscountValue) || parsedDiscountValue <= 0) {
      throw new ApiError(400, "Discount value must be a positive number");
    }

    if (!startDate || !endDate) {
      throw new ApiError(400, "Start date and end date are required");
    }

    if (new Date(startDate) >= new Date(endDate)) {
      throw new ApiError(400, "End date must be greater than start date");
    }

    /* ---------- IMAGE UPLOAD ---------- */
    let imageData = null;

    if (req.file) {
      let result;

      if (process.env.USE_CLOUDINARY === "true") {
        result = await uploadFiles([req.file]);
        if (!result?.success || !result?.files?.[0]?.url) {
          throw new ApiError(400, "Image upload failed");
        }
      } else {
        result = {
          files: [
            {
              url: req.file.path.replace(/\\/g, "/"),
              public_id: null,
            },
          ],
        };
      }

      uploadedFileId = result.files[0].public_id;
      uploadedFileUrl = result.files[0].url;
      imageData = result.files[0];
    }

    const offer = await Offer.create({
      title: title.trim(),
      description,
      discountType,
      discountValue: parsedDiscountValue,
      startDate,
      endDate,
      image: imageData,
      isActive: false,
    });

    return res.api(201, "Offer created successfully", offer);
  } catch (error) {
    if (uploadedFileId) await deleteFile(uploadedFileId).catch(() => {});
    if (uploadedFileUrl) deleteLocalFile(uploadedFileUrl);

    return next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

/* ======================================================
   GET ALL OFFERS (ADMIN)
====================================================== */
export const getAllOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find({ isDeleted: false }).sort({ createdAt: -1 });

    return res.api(200, "Offers fetched successfully", {
      count: offers.length,
      offers,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

/* ======================================================
   GET ACTIVE OFFERS (WEBSITE)
====================================================== */
export const getActiveOffers = async (req, res, next) => {
  try {
    const now = new Date();

    const offers = await Offer.find({
      isActive: true,
      isDeleted: false,
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).sort({ createdAt: -1 });

    return res.api(200, "Active offers fetched successfully", {
      count: offers.length,
      offers,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

/* ======================================================
   GET OFFER BY ID
====================================================== */
export const getOfferById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new ApiError(400, "Invalid offer ID");
    }

    const offer = await Offer.findById(id);
    if (!offer || offer.isDeleted) {
      throw new ApiError(404, "Offer not found");
    }

    return res.api(200, "Offer fetched successfully", offer);
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

/* ======================================================
   UPDATE OFFER
====================================================== */
export const updateOffer = async (req, res, next) => {
  let uploadedFileId = null;
  let uploadedFileUrl = null;

  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new ApiError(400, "Invalid offer ID");
    }

    const offer = await Offer.findById(id);
    if (!offer || offer.isDeleted) {
      throw new ApiError(404, "Offer not found");
    }

    const updateData = { ...req.body };

    if (updateData.discountValue !== undefined) {
      const parsedDiscountValue = Number(updateData.discountValue);
      if (isNaN(parsedDiscountValue) || parsedDiscountValue <= 0) {
        throw new ApiError(400, "Discount value must be a positive number");
      }
      updateData.discountValue = parsedDiscountValue;
    }

    /* ---------- IMAGE UPDATE ---------- */
    if (req.file) {
      if (offer.image?.public_id) {
        await deleteFile(offer.image.public_id).catch(() => {});
      }

      let result;

      if (process.env.USE_CLOUDINARY === "true") {
        result = await uploadFiles([req.file]);
        if (!result?.success || !result?.files?.[0]?.url) {
          throw new ApiError(400, "Image upload failed");
        }
      } else {
        result = {
          files: [
            {
              url: req.file.path.replace(/\\/g, "/"),
              public_id: null,
            },
          ],
        };
      }

      uploadedFileId = result.files[0].public_id;
      uploadedFileUrl = result.files[0].url;
      updateData.image = result.files[0];
    }

    Object.assign(offer, updateData);
    await offer.save();

    return res.api(200, "Offer updated successfully", offer);
  } catch (error) {
    if (uploadedFileId) await deleteFile(uploadedFileId).catch(() => {});
    if (uploadedFileUrl) deleteLocalFile(uploadedFileUrl);

    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

/* ======================================================
   ACTIVATE / DEACTIVATE OFFER
====================================================== */
export const toggleOfferStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (!isValidObjectId(id)) {
      throw new ApiError(400, "Invalid offer ID");
    }

    if (typeof isActive !== "boolean") {
      throw new ApiError(400, "isActive must be boolean");
    }

    const offer = await Offer.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!offer) {
      throw new ApiError(404, "Offer not found");
    }

    return res.api(
      200,
      `Offer ${isActive ? "activated" : "deactivated"} successfully`,
      offer
    );
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

/* ======================================================
   DELETE OFFER (SOFT)
====================================================== */
export const deleteOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new ApiError(400, "Invalid offer ID");
    }

    const offer = await Offer.findByIdAndUpdate(
      id,
      { isDeleted: true, isActive: false },
      { new: true }
    );

    if (!offer) {
      throw new ApiError(404, "Offer not found");
    }

    return res.api(200, "Offer removed successfully");
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};
