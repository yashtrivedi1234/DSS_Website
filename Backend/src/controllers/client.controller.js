import ApiError from "../utils/ApiError.js";
import { Client } from "../models/client.model.js";
import mongoose from "mongoose";
import {
  uploadFiles,
  deleteFile,
  deleteLocalFile,
} from "../utils/cloudinary.js";

/* =========================
   CREATE CLIENT
========================= */
export const createClient = async (req, res, next) => {
  let uploadedFileId = null;
  let uploadedFileUrl = null;
  try {
    const { name } = req.body;
    console.log(req.body);

    if (!name || !name.trim()) {
      return next(new ApiError(400, "Client name is required"));
    }

    const existingClient = await Client.findOne({ name });
    if (existingClient) {
      return next(new ApiError(409, "Client already exists"));
    }

    // const image = req.file
    //   ? {
    //       url: req.file.path,
    //       public_url: req.file.path,
    //       public_id: req.file.filename,
    //     }
    //   : undefined;
    let result = null;
    if (process.env.USE_CLOUDINARY === "true") {
      result = await uploadFiles([req.file]);
      if (!result.success || !result.files[0].url) {
        return next(new ApiError(400, "Unable to upload Image"));
      }
    } else {
      result = {
        success: true,
        files: [
          {
            url: req.file?.path?.replace(/\\/g, "/"),
            public_url: null,
            public_id: null,
          },
        ],
      };
    }

    uploadedFileId = result.files[0].public_id || null;
    uploadedFileUrl = result.files[0].url || null;

    const client = await Client.create({ name, image: result.files[0] });

    return res.api(201, "Client created successfully", client);
  } catch (err) {
    if (uploadedFileId) {
      try {
        await deleteFile(uploadedFileId);
      } catch {}
    }
    if (uploadedFileUrl) {
      try {
        deleteLocalFile(uploadedFileUrl);
      } catch {}
    }
    return next(new ApiError(500, err?.message || "Internal Server Error"));
  }
};

/* =========================
   GET ALL CLIENTS
========================= */
export const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return res.api(200, "Clients fetched successfully", {
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET CLIENT BY ID
========================= */
export const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, "Invalid client ID"));
    }

    const client = await Client.findOne({ _id: id, isActive: true });

    if (!client) {
      return next(new ApiError(404, "Client not found"));
    }

    return res.api(200, "Client fetched successfully", client);
  } catch (error) {
    next(error);
  }
};

/* =========================
   UPDATE CLIENT
========================= */
/* =========================
   UPDATE CLIENT
========================= */
export const updateClient = async (req, res, next) => {
  let uploadedFileId = null;
  let uploadedFileUrl = null;

  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, "Invalid client ID"));
    }

    const existingClient = await Client.findById(id);

    if (!existingClient || !existingClient.isActive) {
      return next(new ApiError(404, "Client not found"));
    }

    const updateData = { ...req.body };

    // Handle image update
    if (req.file) {
      // Delete old image
      if (existingClient.image?.public_id) {
        try {
          await deleteFile(existingClient.image.public_id);
        } catch {}
      }

      let result = null;

      if (process.env.USE_CLOUDINARY === "true") {
        result = await uploadFiles([req.file]);
        if (!result.success || !result.files[0].url) {
          return next(new ApiError(400, "Unable to upload Image"));
        }
      } else {
        result = {
          success: true,
          files: [
            {
              url: req.file.path.replace(/\\/g, "/"),
              public_url: null,
              public_id: null,
            },
          ],
        };
      }

      uploadedFileId = result.files[0].public_id || null;
      uploadedFileUrl = result.files[0].url || null;

      updateData.image = result.files[0];
    }

    if (Object.keys(updateData).length === 0) {
      return next(new ApiError(400, "No data provided for update"));
    }

    Object.assign(existingClient, updateData);
    await existingClient.save();

    return res.api(200, "Client updated successfully", existingClient);
  } catch (error) {
    // Cleanup on failure
    if (uploadedFileId) {
      try {
        await deleteFile(uploadedFileId);
      } catch {}
    }
    if (uploadedFileUrl) {
      try {
        deleteLocalFile(uploadedFileUrl);
      } catch {}
    }

    return next(new ApiError(500, error?.message || "Internal Server Error"));
  }
};

/* =========================
   DELETE CLIENT (SOFT)
========================= */
export const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, "Invalid client ID"));
    }

    const client = await Client.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!client) {
      return next(new ApiError(404, "Client not found or already deleted"));
    }

    return res.api(200, "Client removed successfully");
  } catch (error) {
    next(error);
  }
};
