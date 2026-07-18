import axios from "axios";

const groqClient = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  },
});

// Add request interceptor for debugging
groqClient.interceptors.request.use(
  (config) => {
    console.log("📤 Groq Request:", {
      url: config.url,
      method: config.method,
      hasAuth: !!config.headers.Authorization,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
groqClient.interceptors.response.use(
  (response) => {
    console.log("📥 Groq Response: Success");
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default groqClient;
