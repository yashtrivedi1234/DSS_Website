import express from "express";
import { chatWithGroq } from "../controllers/groq.controller.js";

const router = express.Router();

// Chat endpoint with rate limiting recommended
router.post("/chat", chatWithGroq);

export default router;
