export default function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options).replace(/,/g, "");
}
