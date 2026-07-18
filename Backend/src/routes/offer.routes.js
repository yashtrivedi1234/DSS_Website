import express from "express";
import Upload from "../middlewares/multer.middleware.js";
import { fileValidator } from "../middlewares/fileValidator.middleware.js";
import { requireBody } from "../middlewares/validateBody.middleware.js";
import { Offer } from "../models/offer.model.js";
import {
  createOffer,
  getAllOffers,
  getActiveOffers,
  getOfferById,
  updateOffer,
  toggleOfferStatus,
  deleteOffer,             
} from "../controllers/offer.controller.js";

const router = express.Router();

/* ADMIN ROUTES */
router.post(
  "/",
  Upload("offers").single("image"),
  fileValidator({ types: ["image"], maxSizeMB: 5 }),
  requireBody(Offer),
  createOffer
);

router.get("/", getAllOffers);
router.get("/:id", getOfferById);

router.put(
  "/:id",
  Upload("offers").single("image"),
  fileValidator({ types: ["image"], maxSizeMB: 5 }),
  updateOffer
);

router.patch("/:id/status", toggleOfferStatus);
router.delete("/:id", deleteOffer);

/* PUBLIC ROUTES */
router.get("/active/current", getActiveOffers);

export default router;
