import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import {
  Play,
  ArrowRight,
  Monitor,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Award,
  Users,
  Shield,
  Calendar,
  Building,
  Quote,
  Clock,
  Tag,
  ExternalLink,
  FileText,
  PencilRuler,
  Building2,
  BadgeCheck,
  Truck,
  Wrench,
  Palette,
  Fan,
} from "lucide-react";

// Hero Section
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      data-animate
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl"
          style={{
            top: "20%",
            left: mousePosition.x * 0.02 + "%",
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          style={{
            bottom: "20%",
            right: mousePosition.y * 0.02 + "%",
            transition: "all 0.3s ease-out",
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-20">
        <div className="text-center max-w-6xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">
              5+ Years of Excellence Since 2021
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="block text-white mb-2">Transform Your Brand</span>
            <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              With Digital Signage
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Leading digital signage solutions in India. Cutting-edge LED
            displays, interactive solutions, and complete branding services.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              className="group px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center gap-2"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Projects" },
              { number: "200+", label: "Clients" },
              { number: "18+", label: "Years" },
              { number: "5", label: "Branches" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Clickable) */}
      {/* <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => {
          const nextSection = document.querySelector(
            "section[data-animate]:nth-of-type(2)"
          );
          if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div> */}
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" data-animate className="relative bg-black py-16 px-4">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Digital Signage Solutions UP
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Text */}
          <div className="space-y-6">
            <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
              <p className="text-gray-300 leading-relaxed">
                Established in <strong className="text-green-400">2021</strong>{" "}
                in Lucknow,
                <strong className="text-white">
                  {" "}
                  3S Digital Signage Solutions UP
                </strong>{" "}
                has emerged as a leading provider of customized digital signage
                solutions. With over
                <strong className="text-green-400"> 18 years</strong> of
                experience and
                <strong className="text-green-400">
                  {" "}
                  2000+ satisfied clients
                </strong>
                , we deliver impactful visual communication across diverse
                industries.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                "LED Display Walls",
                "Indoor & Outdoor Displays",
                "Complete Branding",
                "24/7 Support",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/10 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Shield,
                title: "Trusted Brand",
                color: "from-blue-500 to-purple-500",
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: Users,
                title: "2000+ Clients",
                color: "from-pink-500 to-red-500",
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                  }}
                />
                <div className="relative p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-300">
                  <item.icon
                    className={`w-12 h-12 mb-4 bg-gradient-to-br ${item.color} p-2 rounded-xl`}
                  />
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { number: "500+", label: "Projects", icon: Building },
            { number: "18", label: "Years", icon: Calendar },
            { number: "200+", label: "Clients", icon: Users },
            { number: "5", label: "Branches", icon: Building2 },
            { number: "15+", label: "Cities", icon: Globe },
            { number: "25+", label: "Awards", icon: Award },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:scale-105 transition-transform duration-300 text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServiceSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      title: "Outdoor Signage",
      desc: "Modern display solutions using advanced LED screens and interactive technology",
      icon: Monitor,
      gradient: "from-blue-500 to-cyan-500",
      animation: "slide-up",
    },
    {
      title: "Indoor Signage",
      desc: "High-brightness indoor & outdoor LED systems for maximum visual impact",
      icon: Zap,
      gradient: "from-green-500 to-teal-500",
      animation: "rotate-scale",
    },
    {
      title: "High Rise Signage",
      desc: "In-shop branding, retail displays, events & complete visual identity solutions",
      icon: Palette,
      gradient: "from-purple-500 to-pink-500",
      animation: "flip",
    },
  ];

  return (
    <section
      id="services"
      data-animate
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          style={{
            animation: "gridMove 20s linear infinite",
            backgroundPosition: "0 0",
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full opacity-10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Services
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 animate-pulse" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive signage solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className={`group relative ${
                service.animation === "slide-up"
                  ? "animate-slide-up"
                  : service.animation === "rotate-scale"
                  ? "animate-rotate-scale"
                  : "animate-flip"
              }`}
              style={{ animationDelay: `${i * 200}ms` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  service.gradient
                } opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl ${
                  hoveredIndex === i ? "scale-110" : "scale-100"
                }`}
              />

              {/* Card with unique animation per service */}
              <div
                className={`relative h-full p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-500
                ${
                  service.animation === "slide-up" && hoveredIndex === i
                    ? "transform -translate-y-4 border-white/40"
                    : ""
                }
                ${
                  service.animation === "rotate-scale" && hoveredIndex === i
                    ? "transform rotate-2 scale-105 border-white/40"
                    : ""
                }
                ${
                  service.animation === "flip" && hoveredIndex === i
                    ? "transform rotateY-12 scale-105 border-white/40"
                    : ""
                }
              `}
              >
                {/* Animated Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${
                    service.gradient
                  } opacity-20 rounded-bl-full transition-all duration-500 ${
                    hoveredIndex === i ? "scale-150" : "scale-100"
                  }`}
                />

                {/* Icon with unique animation */}
                <div
                  className={`relative w-20 h-20 bg-gradient-to-br ${
                    service.gradient
                  } rounded-2xl flex items-center justify-center mb-6 transition-all duration-500
                  ${
                    service.animation === "slide-up" && hoveredIndex === i
                      ? "animate-bounce"
                      : ""
                  }
                  ${
                    service.animation === "rotate-scale" && hoveredIndex === i
                      ? "animate-spin-slow"
                      : ""
                  }
                  ${
                    service.animation === "flip" && hoveredIndex === i
                      ? "animate-pulse-slow"
                      : ""
                  }
                `}
                >
                  <service.icon className="w-10 h-10 text-white" />

                  {/* Rotating Ring */}
                  {hoveredIndex === i && (
                    <div
                      className={`absolute inset-0 border-2 border-white/30 rounded-2xl ${
                        service.animation === "rotate-scale"
                          ? "animate-spin"
                          : "animate-ping"
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <h3
                  className={`text-2xl font-bold text-white mb-3 transition-all duration-300 ${
                    hoveredIndex === i
                      ? "text-transparent bg-gradient-to-r " +
                        service.gradient +
                        " bg-clip-text"
                      : ""
                  }`}
                >
                  {service.title}
                </h3>

                <div
                  className={`w-16 h-1 bg-gradient-to-r ${
                    service.gradient
                  } mb-4 transition-all duration-500 ${
                    hoveredIndex === i ? "w-full" : ""
                  }`}
                />

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.desc}
                </p>

                {/* Animated Button */}
                <button
                  className={`group/btn flex items-center gap-2 text-green-400 transition-all duration-300 ${
                    hoveredIndex === i ? "text-white" : ""
                  }`}
                  onClick={() =>
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="relative">
                    Learn More
                    {hoveredIndex === i && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-400 animate-shimmer" />
                    )}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      service.animation === "slide-up" && hoveredIndex === i
                        ? "translate-x-2"
                        : service.animation === "rotate-scale" &&
                          hoveredIndex === i
                        ? "rotate-45"
                        : hoveredIndex === i
                        ? "scale-125"
                        : ""
                    }`}
                  />
                </button>

                {/* Particle Effect on Hover */}
                {hoveredIndex === i && (
                  <>
                    <div className="absolute top-4 left-4 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                    <div
                      className="absolute bottom-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div
                      className="absolute top-1/2 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"
                      style={{ animationDelay: "1s" }}
                    />
                  </>
                )}
              </div>

              {/* Bottom Shine Effect */}
              {hoveredIndex === i && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(20px) scale(1.1);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotate-scale {
          from {
            opacity: 0;
            transform: rotate(-10deg) scale(0.8);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes flip {
          from {
            opacity: 0;
            transform: perspective(1000px) rotateY(90deg);
          }
          to {
            opacity: 1;
            transform: perspective(1000px) rotateY(0deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-rotate-scale {
          animation: rotate-scale 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-flip {
          animation: flip 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

// Projects Section
const ProjectSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: "Outdoor LED Hoarding Installation",
      desc: "High-impact outdoor LED displays with weather-resistant technology and vibrant visuals",
      type: "OUTDOOR SIGNAGE",
      img: "https://picsum.photos/seed/out1/900/650",
      gradient: "from-blue-500 to-cyan-500",
      animation: "slide-up",
    },
    {
      title: "Indoor Retail Display Setup",
      desc: "Dynamic indoor LED solutions designed for retail environments with stunning clarity",
      type: "INDOOR SIGNAGE",
      img: "https://picsum.photos/seed/in1/900/650",
      gradient: "from-green-500 to-teal-500",
      animation: "rotate-scale",
    },
    {
      title: "High Rise Building Signboard",
      desc: "Large-scale vertical signage for high-rise buildings with premium finishing",
      type: "HIGH RISE SIGNAGE",
      img: "https://picsum.photos/seed/hr1/900/650",
      gradient: "from-purple-500 to-pink-500",
      animation: "flip",
    },
    {
      title: "Outdoor LED Digital Billboard",
      desc: "Modern digital billboards with real-time content management and high brightness",
      type: "OUTDOOR SIGNAGE",
      img: "https://picsum.photos/seed/out2/900/650",
      gradient: "from-orange-500 to-red-500",
      animation: "slide-up",
    },
    {
      title: "Indoor Corporate LED Wall",
      desc: "Professional LED video walls for corporate spaces with seamless integration",
      type: "INDOOR SIGNAGE",
      img: "https://picsum.photos/seed/in2/900/650",
      gradient: "from-indigo-500 to-blue-500",
      animation: "rotate-scale",
    },
    {
      title: "High Rise Glow Sign Fabrication",
      desc: "Premium glow signage for high-rise buildings with energy-efficient LED technology",
      type: "HIGH RISE SIGNAGE",
      img: "https://picsum.photos/seed/hr2/900/650",
      gradient: "from-pink-500 to-rose-500",
      animation: "flip",
    },
  ];

  return (
    <section
      id="projects"
      data-animate
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          style={{
            animation: "gridMove 20s linear infinite",
            backgroundPosition: "0 0",
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full opacity-10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Projects
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 animate-pulse" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcase of our premium digital signage installations across UP
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`group relative ${
                project.animation === "slide-up"
                  ? "animate-slide-up"
                  : project.animation === "rotate-scale"
                  ? "animate-rotate-scale"
                  : "animate-flip"
              }`}
              style={{ animationDelay: `${i * 200}ms` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  project.gradient
                } opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl ${
                  hoveredIndex === i ? "scale-110" : "scale-100"
                }`}
              />

              {/* Card */}
              <div
                className={`relative h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transition-all duration-500
                ${
                  project.animation === "slide-up" && hoveredIndex === i
                    ? "transform -translate-y-4 border-white/40"
                    : ""
                }
                ${
                  project.animation === "rotate-scale" && hoveredIndex === i
                    ? "transform rotate-2 scale-105 border-white/40"
                    : ""
                }
                ${
                  project.animation === "flip" && hoveredIndex === i
                    ? "transform rotateY-12 scale-105 border-white/40"
                    : ""
                }
              `}
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Type Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${project.gradient} rounded-full text-white text-xs font-semibold`}
                  >
                    {project.type}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold text-white mb-3 transition-all duration-300 ${
                      hoveredIndex === i
                        ? "text-transparent bg-gradient-to-r " +
                          project.gradient +
                          " bg-clip-text"
                        : ""
                    }`}
                  >
                    {project.title}
                  </h3>

                  <div
                    className={`w-16 h-1 bg-gradient-to-r ${
                      project.gradient
                    } mb-4 transition-all duration-500 ${
                      hoveredIndex === i ? "w-full" : ""
                    }`}
                  />

                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.desc}
                  </p>

                  {/* Animated Button */}
                  <button
                    className={`group/btn flex items-center gap-2 text-green-400 transition-all duration-300 ${
                      hoveredIndex === i ? "text-white" : ""
                    }`}
                    onClick={() =>
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <span className="relative text-sm">
                      View Details
                      {hoveredIndex === i && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-400 animate-shimmer" />
                      )}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        project.animation === "slide-up" && hoveredIndex === i
                          ? "translate-x-2"
                          : project.animation === "rotate-scale" &&
                            hoveredIndex === i
                          ? "rotate-45"
                          : hoveredIndex === i
                          ? "scale-125"
                          : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Particle Effect on Hover */}
                {hoveredIndex === i && (
                  <>
                    <div className="absolute top-4 left-4 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                    <div
                      className="absolute bottom-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div
                      className="absolute top-1/2 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"
                      style={{ animationDelay: "1s" }}
                    />
                  </>
                )}
              </div>

              {/* Bottom Shine Effect */}
              {hoveredIndex === i && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button
            className="group px-10 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-semibold hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:border-white/40 transition-all duration-500 flex items-center gap-2 mx-auto"
            onClick={() => (window.location.href = "/project-gallery")}
          >
            Explore More Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Process Section
const HowWeWork = () => {
  const steps = [
    {
      icon: FileText,
      title: "Requirement Gathering",
      desc: "Understanding your needs",
    },
    { icon: Building2, title: "Site Survey", desc: "Analyzing the location" },
    { icon: PencilRuler, title: "Design", desc: "Creating mockups" },
    { icon: Wrench, title: "Fabrication", desc: "Manufacturing signage" },
    { icon: BadgeCheck, title: "Quality Check", desc: "Ensuring standards" },
    { icon: Truck, title: "Installation", desc: "Professional setup" },
  ];

  return (
    <section
      id="process"
      data-animate
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto" />
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Number Badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {i + 1}
              </div>

              {/* Card */}
              <div className="h-full p-8 pt-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-300">
                <step.icon className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Clients Section
const ClientSection = () => {
  const clientLogos = Array.from({ length: 12 }, (_, i) => `Client ${i + 1}`);
  return (
    <section id="clients" data-animate className="relative bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Clients
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
          <p className="text-xl text-gray-400">
            Trusted by leading brands across industries
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {clientLogos.map((c, i) => (
            <div
              key={i}
              className="aspect-square p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <img
                src={`https://picsum.photos/seed/client${i}/200`}
                className="w-full h-full object-cover rounded-xl opacity-80 hover:opacity-100 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialSection = () => {
  const testimonials = [
    {
      quote:
        "Their outdoor signage installation completely transformed our store visibility.",
      name: "Rohit Sharma",
      role: "Retail Owner",
      img: "https://picsum.photos/seed/t11/100",
    },
    {
      quote:
        "Indoor LED display quality is top-notch and boosted customer engagement.",
      name: "Priya Verma",
      role: "Brand Manager",
      img: "https://picsum.photos/seed/t22/100",
    },
    {
      quote:
        "High-rise signage work was handled professionally with excellent finishing.",
      name: "Arjun Mehta",
      role: "Building Supervisor",
      img: "https://picsum.photos/seed/t33/100",
    },
    {
      quote:
        "Outdoor LED board they installed increased our walk-ins significantly.",
      name: "Neha Kapoor",
      role: "Marketing Head",
      img: "https://picsum.photos/seed/t44/100",
    },
  ];

  return (
    <section
      id="testimonials"
      data-animate
      className="relative bg-black py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            What our clients say!
          </h2>
          <p className="text-gray-400">Testimonials</p>
        </div>

        {/* Testimonials Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl border transition-all duration-700 cursor-pointer relative overflow-hidden
bg-[#111] text-gray-300 border-white/10
before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-500 before:via-blue-500 before:to-purple-500 
before:w-0 before:transition-all before:duration-700 before:opacity-0 before:animate-bgSlide
hover:before:w-full hover:before:opacity-100
hover:text-white hover:border-green-400
animate-slide-left`}
            >
              <div className="relative z-10">
                <p className="italic text-lg mb-8 leading-relaxed">
                  “{t.quote}”
                </p>

                {/* User */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.img}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-lg group-hover:text-white">
                      {t.name}
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-white">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Dots */}
        {/* <div className="flex justify-center gap-2 mt-10">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
        </div> */}
      </div>
      <style>{`
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slideLeft 0.8s ease-out forwards;
        }
        @keyframes bgSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-bgSlide {
          background-size: 200% 200%;
          animation: bgSlide 1.5s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
};

// Custom Cursor Component
const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [
        ...prev.slice(-12),
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hoverable elements
    const updateHoverState = (e) => {
      const target = e.target;
      const isHoverable = target.closest(
        'a, button, input, textarea, [role="button"]'
      );
      setIsHovering(!!isHoverable);
    };

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
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Background Glow */}
      <div
        className="fixed pointer-events-none z-[9998] blur-3xl rounded-full"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: "200px",
          height: "200px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.3), transparent 70%)",
          transition: "0s",
        }}
      />

      {/* Trail Effect */}
      {trail.map((pos, i) => (
        <div
          key={pos.id}
          className="fixed pointer-events-none z-[9999] rounded-full bg-gradient-to-r from-green-400 to-blue-500"
          style={{
            left: pos.x,
            top: pos.y,
            width: `${3 - i * 0.15}px`,
            height: `${3 - i * 0.15}px`,
            transform: "translate(-50%, -50%)",
            opacity: ((i + 1) / trail.length) * 0.5,
            transition: "opacity 0.3s ease-out",
          }}
        />
      ))}

      {/* Main Cursor - Outer Ring */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full border-2 ${
          isHovering
            ? "border-green-400 bg-green-400/10"
            : "border-white/50 bg-white/5"
        } ${isClicking ? "scale-75" : "scale-100"}`}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: isHovering ? "50px" : "40px",
          height: isHovering ? "50px" : "40px",
          transform: `translate(-50%, -50%)`,
          backdropFilter: "blur(2px)",
        }}
      >
        {/* Rotating Ring */}
        <div className="absolute inset-0 rounded-full border border-green-400/30" />
      </div>

      {/* Inner Dot */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full ${
          isHovering
            ? "bg-gradient-to-r from-green-400 to-blue-500 scale-150"
            : "bg-white scale-100"
        }`}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          boxShadow: isHovering
            ? "0 0 20px rgba(34, 197, 94, 0.8)"
            : "0 0 10px rgba(255, 255, 255, 0.5)",
        }}
      />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </>
  );
};

// Main Homepage Component converted to RAFCE (Arrow Function)
const DarkHomepage = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-animate]");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax effect on all sections
    const parallaxSections = document.querySelectorAll("section[data-animate]");
    parallaxSections.forEach((sec) => {
      gsap.to(sec, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Global 3D Scroll Effect
    const allSections = document.querySelectorAll("section[data-animate]");
    allSections.forEach((sec, index) => {
      gsap.set(sec, {
        transformStyle: "preserve-3d",
        perspective: 1200,
      });

      gsap.fromTo(
        sec,
        { rotateX: 25, opacity: 0.6, z: -150 },
        {
          rotateX: 0,
          opacity: 1,
          z: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  // FULL MOBILE PERFORMANCE OPTIMIZATION
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (!isMobile) return; // only run optimization on mobile

    // 1. Kill all ScrollTrigger instances and clear GSAP timelines
    try {
      if (typeof ScrollTrigger !== "undefined" && ScrollTrigger.getAll) {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      }
      if (gsap && gsap.globalTimeline) {
        try {
          gsap.globalTimeline.clear();
        } catch (e) {}
      }
    } catch (e) {}

    // 2. Neutralize parallax / 3D transforms
    document.querySelectorAll("[data-animate]").forEach((sec) => {
      sec.style.transform = "none";
      sec.style.willChange = "auto";
    });

    // 3. Stop heavy CSS animations
    document
      .querySelectorAll(
        ".animate-float, .animate-float-delayed, .animate-slide-up, .animate-rotate-scale, .animate-flip, .animate-spin-slow, .animate-pulse-slow, .animate-shimmer, .animate-gradient, .animate-shimmer-bg, .animate-bgSlide"
      )
      .forEach((el) => {
        el.style.animation = "none";
        el.style.transition = "none";
      });


    // 5. Disable trailing cursor (if any) by adding a data attribute; CustomCursor already gated but this is extra safety
    try {
      const cursorEls = document.querySelectorAll(
        '[style*="cursor: none"], .custom-cursor'
      );
      cursorEls.forEach((c) => (c.style.display = "none"));
    } catch (e) {}

    // 7. Reduce image quality by marking large images for lazy-load (best-effort)
    document.querySelectorAll("img").forEach((img) => {
      try {
        if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
        // if the image is very large, add decoding attribute
        if (!img.hasAttribute("decoding"))
          img.setAttribute("decoding", "async");
      } catch (e) {}
    });

    // 8. Disable bouncing scroll indicator
    document
      .querySelectorAll(".animate-bounce, .animate-slide-left")
      .forEach((el) => {
        el.style.animation = "none";
      });

    // 9. Reduce pointer-events for heavy overlays
    document.querySelectorAll(".pointer-events-none").forEach((el) => {
      el.style.pointerEvents = "none";
    });

    // 10. Force reduced-motion media query fallback
    try {
      const style = document.createElement("style");
      style.innerHTML =
        "@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; } }";
      document.head.appendChild(style);
    } catch (e) {}
  }, []);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <div className="bg-black min-h-screen">
      {!isMobile && <CustomCursor />}
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <ProjectSection />
      <HowWeWork />
      <ClientSection />
      <TestimonialSection />

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 py-14 px-4 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer-bg" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 mb-6">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-white font-medium">
              Trusted by 200+ Businesses
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Let's discuss how our digital signage solutions can elevate your
            business presence and captivate your audience
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/50"
              onClick={() => (window.location.href = "/contact")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              className="group px-8 py-4 bg-white/10 backdrop-blur-lg border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => (window.location.href = "tel:+919236477974")}
            >
              <span>Call +91-9236477974</span>
              <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm">5+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm">500+ Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes shimmer-bg {
            0% { background-position: -250% 0; }
            100% { background-position: 250% 0; }
          }
          .animate-shimmer-bg {
            animation: shimmer-bg 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default DarkHomepage;
