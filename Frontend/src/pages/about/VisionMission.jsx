import React, { useState, useEffect } from "react";
import {
  Target,
  Eye,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award,
  Trophy,
  Heart,
  Shield,
  Globe,
  Rocket,
  Home,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    // Hero Fade In
    gsap.fromTo(
      ".hero-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    // Scroll Animations
    const sections = document.querySelectorAll("section[data-animate]");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // --- Data Definitions ---
  const missionPoints = [
    {
      icon: Target,
      title: "Customer-Centric-Approach",
      desc: "Solutions aligned with unique brand identities.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Trophy,
      title: "Quality Excellence",
      desc: "Highest standards in materials & craftsmanship.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Heart,
      title: "End-to-End Service",
      desc: "From concept to installation & maintenance.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Shield,
      title: "Compliance & Safety",
      desc: "Meeting regulatory requirements & safety standards.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const visionElements = [
    {
      icon: Globe,
      title: "Regional Leadership",
      desc: "Setting benchmarks across North India.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Rocket,
      title: "Technology Pioneer",
      desc: "Leading adoption of smart signage tech.",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: Users,
      title: "Community Impact",
      desc: "Empowering local businesses to grow.",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      desc: "Pushing boundaries of visual communication.",
      gradient: "from-fuchsia-500 to-pink-500",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Decisions centered around delivering value.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing new technologies constantly.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: CheckCircle,
      title: "Quality Excellence",
      description: "Ensuring every project exceeds expectations.",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Star,
      title: "Trust & Integrity",
      description: "Transparency and reliability in all we do.",
      gradient: "from-purple-500 to-violet-500",
    },
  ];

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
            <span className="text-white font-medium">Vision & Mission</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          

          <h1 className="hero-content text-4xl md:text-6xl font-black mb-6 leading-tight">
            Our Purpose &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 animate-gradient-x">
              Future Path
            </span>
          </h1>
        </div>
      </div>

      {/* ================= MISSION SECTION ================= */}
      <section data-animate className="relative px-6 py-16 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light italic">
                  "To empower brands with visually compelling, durable, and
                  regulation-compliant signage solutions that not only capture
                  attention but also build strong market presence."
                </p>
              </div>

              {/* <div className="space-y-4">
                {[
                  "Tailored solutions for unique brand identities",
                  "Seamless execution from concept to maintenance",
                  "Lasting partnerships through exceptional service",
                  "Transforming spaces into brand experiences",
                ].map((point, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-400 group-hover:text-gray-200 transition-colors text-lg">
                      {point}
                    </span>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Right: Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {missionPoints.map((point, index) => (
                <div
                  key={index}
                  className="group relative p-6 bg-gray-900 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${point.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <point.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VISION SECTION ================= */}
      <section
        data-animate
        className="relative px-6 py-16 z-20 bg-white/[0.02] border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Grid Cards (Reversed Order for Visual Balance) */}
            <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visionElements.map((element, index) => (
                <div
                  key={index}
                  className="group relative p-6 bg-gray-900 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${element.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <element.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {element.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {element.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: Text Content */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light italic">
                  "To be the leading digital signage solutions provider in North
                  India, recognized for innovation, quality, and driving the
                  digital transformation of businesses."
                </p>
              </div>

              {/* <div className="space-y-4">
                {[
                  "Market leadership across North India",
                  "Pioneering next-gen display technologies",
                  "Creating a sustainable ecosystem for excellence",
                  "Building a legacy of innovation",
                ].map((point, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="h-6 w-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-400 group-hover:text-gray-200 transition-colors text-lg">
                      {point}
                    </span>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section data-animate className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Core <span className="text-green-400">Values</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              The principles that guide every decision we make and every
              relationship we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative p-8 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-3xl transition-all duration-300 overflow-hidden"
              >
                {/* Glow Effect */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl rounded-bl-full transition-opacity duration-500 group-hover:opacity-20`}
                />

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative px-6 py-24 bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-green-500/20 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white relative z-10">
            Join Us in Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 relative z-10">
            Be part of the digital signage revolution. Let's work together to
            create impactful brand experiences.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all hover:border-white/30">
                Contact Us
              </button>
            </Link>
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

export default VisionMission;
