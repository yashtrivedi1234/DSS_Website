import { useState } from "react";

const ReadMore = ({ html }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 100; 
  if (!html) return "-";

  const plainText = html.replace(/<[^>]+>/g, ""); 

  return (
    <div className="text-sm text-gray-700 text-left">
      {expanded ? (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <>
          {plainText.length > maxLength
            ? plainText.slice(0, maxLength) + "..."
            : plainText}
        </>
      )}

      {plainText.length > maxLength && (
        <button
          className="ml-2 text-blue-500 text-xs underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};
export default ReadMore
