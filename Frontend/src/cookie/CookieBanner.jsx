import React, { useEffect, useState } from "react";
import { getUserMeta } from "./getUserMeta";
import axios from "axios";

const CookieBanner = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000/api/v1";

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent");
    if (storedConsent === "true") {
      setConsentGiven(true);
    }
  }, []);

  const giveConsent = async () => {
    setConsentGiven(true);
    localStorage.setItem("cookieConsent", "true");
    try {
      const userData = await getUserMeta();
      console.log("Raw User Data:", userData);
      const formattedData = {
        visitorId: userData.visitorId || "",
        city: userData.city || "",
        ip: userData.ip || "",
        region: userData.region || "",
        country: userData.country || "",
        postal: userData.postal || "",
        utmSource: userData.utmSource || "Direct",
        location: {
          lat: userData.latitude?.toString() || "",
          long: userData.longitude?.toString() || "",
        },
      };

      const res = await axios.post(`${backendUrl}/visitor`, formattedData);
      console.log("Visitor saved:", res.data);
    } catch (error) {
      console.error("Failed to send visitor data:", error);
    }
  };

  const declineConsent = () => {
    console.log("Cookie consent declined");
    window.history.back();
  };

  if (consentGiven) return null;

  return (
    <div className="z-[1000] fixed inset-0  flex flex-col justify-end">
      {/* FULLSCREEN BLUR OVERLAY */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* BANNER */}
      <div className="relative bg-white shadow-xl border-t border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Message */}
        <div className="text-gray-800 text-sm sm:text-base max-w-3xl mb-2 sm:mb-0">
          <p>
            We use cookies to enhance your experience, analyze site traffic, and
            serve personalized content.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-5 shrink-0">
          {/* <button
            onClick={declineConsent}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 text-sm px-4 py-1.5 rounded-md transition-colors"
          >
            Decline
          </button> */}
          <button
            onClick={giveConsent}
            className="bg-green-600 cursor-pointer text-white hover:bg-green-700 text-sm px-4 py-1.5 rounded-md transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
