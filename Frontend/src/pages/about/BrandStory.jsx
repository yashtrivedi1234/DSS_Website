import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Lightbulb,
  Award,
  Users,
  Target,
  Zap,
  Heart,
  Calendar,
  MapPin,
  Trophy,
  ShieldCheck,
  Sparkles,
  MousePointer2,
  ChevronRight,
  Home,
} from "lucide-react";
// import Breadcrumb from "../../components/Breadcrumb"; // <-- ISKO HATA DIYA (Remove this line)
import { Link } from "react-router-dom"; // Ensure you have this for links
import TimelineSection from "../../components/About/TimelineSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BrandStory = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    branches: 0,
    cities: 0,
    awards: 0,
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // --- Mouse Position Logic ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- Hero Animation ---
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  // --- Counter Logic (Same as before) ---
  useEffect(() => {
    const targets = {
      projects: 500,
      clients: 200,
      experience: 18,
      branches: 5,
      cities: 15,
      awards: 25,
    };
    const duration = 4000;
    const steps = 50;
    const interval = duration / steps;
    setTimeout(() => {
      let current = 0;
      const timer = setInterval(() => {
        current += targets.projects / steps;
        if (current >= targets.projects) {
          current = targets.projects;
          clearInterval(timer);
        }
        setCounters((prev) => ({
          ...prev,
          projects: Math.floor(current),
          clients: Math.floor((current / targets.projects) * targets.clients),
          experience: Math.floor(
            (current / targets.projects) * targets.experience
          ),
          branches: Math.floor((current / targets.projects) * targets.branches),
          cities: Math.floor((current / targets.projects) * targets.cities),
          awards: Math.floor((current / targets.projects) * targets.awards),
        }));
      }, interval);
    }, 500);
  }, []);

  // --- Global Scroll Animations ---
  useEffect(() => {
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

  const differentiators = [
    {
      icon: Zap,
      title: "Cutting-Edge Tech",
      desc: "Latest LED display technology and advanced materials.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Customer-Centric-Approach",
      desc: "Over 2000 satisfied clients trust us.",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Award,
      title: "Industry Expertise",
      desc: "5+ years across elections, retail, and corporate.",
      gradient: "from-purple-500 to-pink-500",
    },
   
    {
      icon: Target,
      title: "Turnkey Solutions",
      desc: "Permits, compliance, and professional installation.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      desc: "Rigorous testing and 24/7 technical support.",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden text-white selection:bg-green-500/30">
      {/* --- Global Background Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50" />
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

      {/* ================= HERO SECTION START ================= */}
      <div className="relative z-10 pt-32 pb-12 lg:pt-40 lg:pb-20">
        {/* --- CUSTOM TRANSPARENT BREADCRUMB --- */}
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
            <span className="text-white font-medium">Brand Story</span>
          </nav>
        </div>

        {/* --- MAIN HERO CONTENT --- */}
        <div className="max-w-7xl mx-auto px-6 text-center relative">

          <h1 className="hero-content text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            Our Brand Story: <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 animate-gradient-x">
              Crafting the Future
            </span>
          </h1>

          <p className="hero-content text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            From a small signage workshop in Lucknow to North India's leading
            digital display powerhouse. This is the story of our passion,
            innovation, and growth.
          </p>

          <div
            className="hero-content flex flex-col items-center gap-3 opacity-60 animate-bounce cursor-pointer"
            onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
          >
            <span className="text-xs uppercase tracking-widest text-gray-500">
              Explore Timeline
            </span>
            <MousePointer2 className="w-5 h-5 text-green-400" />
          </div>
        </div>
      </div>
      {/* ================= HERO SECTION END ================= */}

      {/* --- SECTION: TIMELINE --- */}
      <section data-animate className="relative px-4 md:px-6 mb-24 z-20">
        <div className="max-w-7xl mx-auto">
          <TimelineSection />
        </div>
      </section>
     
      {/* --- SECTION: GROWTH STATS --- */}
      <section
        data-animate
        className="relative px-6 py-20 border-y border-white/5 bg-white/[0.02]"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Growth in <span className="text-green-400">Numbers</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
            {[
              { val: counters.projects, label: "Projects", icon: CheckCircle },
              { val: counters.experience, label: "Years Exp.", icon: Calendar },
              { val: counters.clients, label: "Clients", icon: Users },
              { val: counters.branches, label: "Branches", icon: MapPin },
              { val: counters.cities, label: "Cities", icon: Target },
              { val: counters.awards, label: "Awards", icon: Trophy },
            ].map((stat, i) => (
              <div
                key={i}
                className="group p-6 bg-gray-900 border border-white/10 rounded-2xl text-center hover:border-green-500/30 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-gray-500 group-hover:text-green-400 group-hover:scale-110 transition-all duration-300" />
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.val}+
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: DIFFERENTIATORS --- */}
      <section data-animate className="relative px-6 py-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Sets Us Apart
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our commitment to excellence and innovation has made us the
              preferred choice for businesses across industries.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative p-8 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-3xl transition-all duration-300 overflow-hidden"
              >
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
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
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

export default BrandStory;
