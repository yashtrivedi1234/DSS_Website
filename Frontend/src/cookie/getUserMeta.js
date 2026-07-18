import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const getUserMeta = async () => {
  const urlParams = new URLSearchParams(window.location.search);

  // 🔍 UTM & Referrer
  const utmSource = urlParams.get("utm_source") || "Direct";
  const utmMedium = urlParams.get("utm_medium") || null;
  const utmCampaign = urlParams.get("utm_campaign") || null;
  const referrer = document.referrer || "None";
  const visitedAt = new Date().toISOString();

  // 💻 Device & Browser Info
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const cookieEnabled = navigator.cookieEnabled;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const onlineStatus = navigator.onLine ? "Online" : "Offline";

  const deviceMemory = navigator.deviceMemory || "Unknown";
  const cpuCores = navigator.hardwareConcurrency || "Unknown";
  const connection = navigator.connection || {};
  const connectionType = connection.effectiveType || "Unknown";
  const downlink = connection.downlink || null;

  // 🔋 Battery Info
  let batteryLevel = "Unknown";
  let isCharging = "Unknown";
  try {
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      batteryLevel = `${Math.round(battery.level * 100)}%`;
      isCharging = battery.charging;
    }
  } catch (e) {
    batteryLevel = "Battery info error";
  }

  // 📍 Location Info via IP
  let locationInfo = {};
  try {
    const res = await fetch("https://ipapi.co/json");
    if (res.ok) {
      const data = await res.json();
      locationInfo = {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        postal: data.postal,
        latitude: data.latitude,
        longitude: data.longitude,
        org: data.org,
        network: data.network,
        countryCallingCode: data.country_calling_code,
        ipTimezone: data.timezone,
      };
    }
  } catch (err) {
    locationInfo = { locationError: "Failed to fetch location info" };
  }

  // 🆔 Fingerprint (Device Identity)
  let visitorId = "Unavailable";
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    visitorId = result.visitorId;
  } catch (e) {
    visitorId = "Fingerprint error";
  }

  return {
    visitedAt,
    referrer,
    utmSource,
    utmMedium,
    utmCampaign,

    userAgent,
    platform,
    language,
    cookieEnabled,
    screenResolution,
    timezone,
    onlineStatus,

    deviceMemory,
    cpuCores,
    connectionType,
    downlink,
    batteryLevel,
    isCharging,

    visitorId,
    ...locationInfo,
  };
};
