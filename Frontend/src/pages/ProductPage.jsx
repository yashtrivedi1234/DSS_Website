import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, ChevronRight, Sparkles, Layers } from "lucide-react";
import services from "../data/ServiceData.jsx"; // Ensure this path is correct
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

const ProductPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // --- Background Mouse Effect ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- Animations ---
  useEffect(() => {
    // Hero Fade In
    gsap.fromTo(
      ".hero-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    // Card Stagger Animation
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".service-grid",
          start: "top 85%",
        },
      }
    );
  }, []);

  // Helper for gradients based on index (to add variety)
  const getGradient = (index) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-blue-500",
      "from-teal-500 to-green-500",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden text-white selection:bg-green-500/30">
      {/* --- Global Background Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px]"
            style={{
              top: "-10%",
              left: "20%",
              transform: `translate(${mousePosition.x * 0.02}px, ${
                mousePosition.y * 0.02
              }px)`,
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
            style={{
              bottom: "-10%",
              right: "10%",
              transform: `translate(${-mousePosition.x * 0.02}px, ${
                -mousePosition.y * 0.02
              }px)`,
            }}
          />
        </div>
      </div>

      <div className="relative z-10 pt-32 pb-12 lg:pt-40 lg:pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb & Header */}
          <div className="text-center mb-16">
            <nav className="hero-animate inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-400 hover:border-white/20 transition-all">
              <Link
                to="/"
                className="hover:text-green-400 flex items-center gap-1 transition-colors"
              >
                <Home className="w-3.5 h-3.5" /> Home
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <span className="text-white font-medium">Services</span>
            </nav>

            <h1 className="hero-animate text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500">
                Our Digital Signage Expertise
              </span>
            </h1>
            <p className="hero-animate text-gray-400 max-w-2xl mx-auto text-lg">
              Comprehensive display solutions designed to elevate your brand
              visibility and engage your audience.
            </p>
          </div>

          {/* Services Grid */}
          <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const gradient = getGradient(index);

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="service-card group relative p-8 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-3xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Glow Effect on Hover */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-full`}
                  />

                  {/* Icon Container */}
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">
                      {/* Assuming service.icon is a React Node/Component */}
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                      {service.name}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Action */}
                    <Link
                      to={`/services/${service?.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-green-400 transition-colors"
                    >
                      <span className="relative">
                        Explore Service
                        <span
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                        ></span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Decorative Border Bottom */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-move 5s ease infinite; }
        @keyframes gradient-move { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
      `}</style>
    </div>
  );
};

export default ProductPage;
