import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, Star, Trophy, Target, Zap, Users } from "lucide-react";
import { gsap } from "gsap";

const timelineData = [
  {
    year: "2021",
    title: "Foundation Laid",
    subtitle: "Company Established",
    description:
      "The journey began with a vision to transform signage and graphics in the region.",
    icon: Star,
    color: "from-green-400 to-emerald-600",
  },
  {
    year: "2022",
    title: "First Major Project",
    subtitle: "Breakthrough in Local Market",
    description:
      "Secured our first large-scale signage contract, setting new standards for quality.",
    icon: Target,
    color: "from-teal-400 to-cyan-500",
  },
  {
    year: "2023",
    title: "Expansion Phase",
    subtitle: "Branching Out",
    description:
      "Opened new branches and expanded our client base across North India.",
    icon: Users,
    color: "from-blue-400 to-indigo-600",
  },
  {
    year: "2024",
    title: "Digital Leap",
    subtitle: "Embracing Technology",
    description:
      "Introduced LED and digital signage, leading innovation in the industry.",
    icon: Zap,
    color: "from-purple-400 to-violet-600",
  },
  {
    year: "2025",
    title: "AI Integration",
    subtitle: "Smart Signage Solutions",
    description:
      "Launched AI-powered signage with analytics, redefining customer engagement.",
    icon: Trophy,
    color: "from-pink-400 to-rose-600",
  },
  {
    year: "2026",
    title: "Vision 2026",
    subtitle: "Leading the Future",
    description:
      "Celebrating 5 years of excellence, innovation, and leadership in the signage industry.",
    icon: Star,
    color: "from-green-400 to-blue-600",
  },
];

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef(null);

  // Animation when active index changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <div className="w-full relative py-10">
      {/* Background Grid for this section specifically */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 rounded-3xl" />

      {/* --- 1. Top Navigation: Timeline Bar --- */}
      <div className="relative mb-16 px-4">
        {/* The Gray Line (Base) */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 rounded-full" />

        {/* The Colored Line (Progress) - Dynamic width based on selection */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 -translate-y-1/2 rounded-full transition-all duration-700 ease-in-out"
          style={{
            width: `${(activeIndex / (timelineData.length - 1)) * 100}%`,
          }}
        />

        {/* The Dots & Years */}
        <div className="relative flex justify-between items-center w-full z-10">
          {timelineData.map((item, index) => {
            const isActive = index === activeIndex;
            const isPast = index <= activeIndex;

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className="group cursor-pointer flex flex-col items-center gap-4 relative"
              >
                {/* Year Label (Above Dot) */}
                <span
                  className={`text-lg font-bold transition-all duration-300 ${
                    isActive
                      ? "text-green-400 -translate-y-2 scale-110"
                      : isPast
                      ? "text-gray-300"
                      : "text-gray-600 group-hover:text-gray-400"
                  }`}
                >
                  {item.year}
                </span>

                {/* The Dot */}
                <div
                  className={`w-6 h-6 rounded-full border-4 transition-all duration-300 relative ${
                    isActive
                      ? "bg-black border-green-400 scale-125 shadow-[0_0_15px_rgba(74,222,128,0.6)]"
                      : isPast
                      ? "bg-gray-900 border-gray-400"
                      : "bg-gray-900 border-gray-700"
                  }`}
                >
                  {/* Inner glow for active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- 2. Main Content Area (Split Layout) --- */}
      <div
        ref={contentRef}
        className="grid lg:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 lg:p-6 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative Gradient Blob behind text */}
        <div
          className={`absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br ${timelineData[activeIndex].color} opacity-20 blur-[100px] transition-all duration-700`}
        />

        {/* Left Side: Text Content */}
        <div className="relative z-10 space-y-6">
          {/* Big Year Display */}
          <h2
            className={`text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br ${timelineData[activeIndex].color} opacity-90`}
          >
            {timelineData[activeIndex].year}
          </h2>

          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
              {timelineData[activeIndex].title}
              {/* Dynamic Icon */}
              {React.createElement(timelineData[activeIndex].icon, {
                className: "w-6 h-6 text-gray-400",
              })}
            </h3>

            <h4 className="text-xl text-green-400 font-medium">
              {timelineData[activeIndex].subtitle}
            </h4>

            <p className="text-gray-400 leading-relaxed text-lg">
              {timelineData[activeIndex].description}
            </p>
          </div>
        </div>

        {/* Right Side: Visual/Image Placeholder */}
        <div className="relative h-full min-h-[300px] flex items-center justify-center">
          {/* Abstract Shape Container */}
          <div className="relative w-full aspect-square max-w-sm">
            {/* Spinning Border */}
            <div
              className={`absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_10s_linear_infinite]`}
            />

            {/* Glowing Circle Background */}
            <div
              className={`absolute inset-4 rounded-full bg-gradient-to-br ${timelineData[activeIndex].color} opacity-10 blur-xl`}
            />

            {/* The Card/Image Holder */}
            <div className="absolute inset-12 rounded-2xl bg-gray-900 border border-white/10 flex items-center justify-center overflow-hidden group">
              {/* Note: Replace this div with an actual <img> tag if you have one */}
              <div className="text-center p-6">
                <div
                  className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${timelineData[activeIndex].color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
                >
                  {React.createElement(timelineData[activeIndex].icon, {
                    className: "w-10 h-10 text-white",
                  })}
                </div>
                <p className="text-sm text-gray-500 uppercase tracking-widest">
                  Milestone Achievement
                </p>
                <p className="text-white font-bold text-lg mt-1">
                  {timelineData[activeIndex].title}
                </p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
