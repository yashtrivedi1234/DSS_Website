import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const updateHoverState = (e) =>
      setIsHovering(!!e.target.closest("a, button, input"));

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", updateHoverState);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", updateHoverState);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-[9999] rounded-full ${
        isHovering ? "bg-green-400 scale-150" : "bg-white"
      }`}
      style={{
        left: cursorPos.x,
        top: cursorPos.y,
        width: "8px",
        height: "8px",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CustomCursor;
