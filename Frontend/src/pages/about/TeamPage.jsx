import React, { useState, useEffect } from "react";
import { Linkedin, Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGetAllTeamQuery } from "../../api/team.api";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const TeamPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // --- Mouse Position Logic ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- Animations ---
  useEffect(() => {
    // Hero Animation
    gsap.fromTo(
      ".hero-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    // Staggered Grid Animation
    gsap.fromTo(
      ".team-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 85%",
        },
      }
    );
  }, []);

  // --- Fetch team from backend ---
  const { data, isLoading, isError } = useGetAllTeamQuery();
  const teamMembers = data?.data || [];

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

      {/* ================= HERO SECTION ================= */}
      <div className="relative z-10 pt-32 pb-12 lg:pt-40 lg:pb-12">
        {/* Breadcrumb Pill */}
        <div className="hero-content max-w-7xl mx-auto px-6 mb-8 flex justify-center">
          <nav className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-400 hover:border-white/20 transition-all">
            <Link
              to="/"
              className="hover:text-green-400 flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="hover:text-green-400 transition-colors">
              About
            </span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-white font-medium">Our Team</span>
          </nav>
        </div>

        {/* Title */}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="hero-content text-4xl md:text-6xl font-black mb-6 leading-tight">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 animate-gradient-x">
              Creative Team
            </span>
          </h1>

          <p className="hero-content text-gray-400 max-w-2xl mx-auto text-lg mb-12">
            A diverse group of innovators, designers, and engineers working
            together to redefine digital experiences.
          </p>
        </div>
      </div>

      {/* ================= TEAM GRID SECTION ================= */}
      <section className="relative px-6 pb-32 z-20 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              <div className="col-span-full text-center text-gray-400">
                Loading team...
              </div>
            ) : isError ? (
              <div className="col-span-full text-center text-red-400">
                Failed to load team
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">
                No team members found.
              </div>
            ) : (
              teamMembers.map((member) => (
                <div
                  key={member._id || member.id}
                  className="team-card group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)]"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80 z-10" />

                    {/* Hover Overlay with Designation Only */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-sm">
                      <p className="text-white text-lg font-semibold text-center px-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                        {member.designation}
                      </p>
                    </div>

                    <img
                      src={
                        member.image?.public_url ||
                        member.image?.url ||
                        member.image ||
                        "/no-image.png"
                      }
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content - Positioned Absolute Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30 transform transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-3 group-hover:w-20 transition-all duration-300" />
                      <h3 className="text-xl font-bold text-white mb-1 tracking-wide">
                        {member.name}
                      </h3>
                      {/* <p className="text-gray-400 text-sm font-medium uppercase tracking-wider group-hover:text-green-400 transition-colors">
                        {member.designation}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <style>{`
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-move 5s ease infinite; }
        @keyframes gradient-move { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
      `}</style>
    </div>
  );
};

export default TeamPage;
