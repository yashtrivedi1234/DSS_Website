import React from "react";
import SplashCursor from "./SplashCursor";
import CustomCursor from "./CustomCursor";

const GlobalCursors = () => (
  <>
    <style>{`* { cursor: none !important; }`}</style>
    <SplashCursor />
    <CustomCursor />
  </>
);

export default GlobalCursors;
