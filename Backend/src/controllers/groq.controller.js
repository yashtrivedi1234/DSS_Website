import { generateGroqResponse } from "../services/groq.service.js";

export const chatWithGroq = async (req, res, next) => {
  try {
    const { message } = req.body;

    // Validate input
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid message string is required",
      });
    }

    // Limit message length
    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long. Please keep it under 2000 characters.",
      });
    }

    // Generate response
    const reply = await generateGroqResponse({ message: message.trim() });

    // Send successful response
    return res.status(200).json({
      success: true,
      data: {
        reply: reply,
      },
    });
  } catch (error) {
    console.error("❌ Controller Error:", error);

    // Pass error to error handler middleware
    next(error);
  }
};
