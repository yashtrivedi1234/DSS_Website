import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getUserMeta } from "./getUserMeta";

export default function useCookieConsent() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (consent === "true") setConsentGiven(true);
  }, []);


const giveConsent = async () => {
  Cookies.set("cookieConsent", "true", { expires: 365 });
  setConsentGiven(true);

  const userMeta = await getUserMeta();
  console.log(userMeta)
  Cookies.set("userDetails", JSON.stringify(userMeta), { expires: 7 });
};


  return { consentGiven, giveConsent };
}
