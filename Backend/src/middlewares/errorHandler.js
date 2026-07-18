export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error Handler Triggered:");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);

  if (err.response) {
    console.error("API Response Error:", err.response.data);
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      details: err.response?.data,
    }),
  });
};
