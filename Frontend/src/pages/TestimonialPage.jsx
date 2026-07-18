import React, { useState, useEffect } from "react";
import CountUp from "../components/CountUp";
import {
  Star,
  Quote,
  MapPin,
  Calendar,
  Home,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  Users,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const TestimonialsPage = () => {
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
      ".hero-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    // Cards Animation
    gsap.fromTo(
      ".review-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".reviews-grid",
          start: "top 85%",
        },
      }
    );
  }, []);

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
          {/* Breadcrumb */}
          <div className="flex justify-center mb-8">
            <nav className="hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-400 hover:border-white/20 transition-all">
              <Link
                to="/"
                className="hover:text-green-400 flex items-center gap-1 transition-colors"
              >
                <Home className="w-3.5 h-3.5" /> Home
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <span className="text-white font-medium">Testimonials</span>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="hero-animate text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500">
                Voices of Trust & Satisfaction
              </span>
            </h1>
            <p className="hero-animate text-gray-400 max-w-2xl mx-auto text-lg">
              Don't just take our word for it. Here is what our partners and
              clients have to say about our digital signage solutions.
            </p>
          </div>

          {/* Trust Stats */}
          <div className="hero-animate grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-green-500/20 text-green-400 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  <CountUp to={500} duration={2} />+
                </div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  <CountUp to={98} duration={2} />%
                </div>
                <div className="text-sm text-gray-400">Retention Rate</div>
              </div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-xl">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  <CountUp to={4.9} duration={2} />
                  /5
                </div>
                <div className="text-sm text-gray-400">Average Rating</div>
              </div>
            </div>
          </div>

          {/* --- SECTION 2: Google Reviews Widget --- */}
          <div className="pb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MessageCircle className="text-blue-400" /> Google Reviews
              </h2>
              <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white">
                Live Feed
              </div>
            </div>

            {/* Iframe Container */}
            <div className="w-full min-h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                src="https://widgets.sociablekit.com/google-reviews/iframe/25594313"
                className="w-full h-[800px] border-0"
                title="Google Reviews"
              ></iframe>
            </div>
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

export default TestimonialsPage;
