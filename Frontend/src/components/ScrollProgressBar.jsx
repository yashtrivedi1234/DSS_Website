import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressBar = () => {
  const progress = useMotionValue(0);

  // Smooth spring animation
  const smoothProgress = useSpring(progress, {
    stiffness: 120,
    damping: 20,
    mass: 0.6,
  });

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: () =>
        document.documentElement.scrollHeight - window.innerHeight,
      scrub: true,
      onUpdate: (self) => {
        progress.set(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-black/40 backdrop-blur-sm z-[9999] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
        style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
      />
    </div>
  );
};

export default ScrollProgressBar;
