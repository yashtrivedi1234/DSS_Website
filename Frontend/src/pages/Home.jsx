import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClientSection from "../components/ClientSection";
import { useGetAllClientsQuery } from "../api/client.api";
// ================= CLIENTS SECTION =================
const ClientsSection = () => {
  const { data, isLoading, isError } = useGetAllClientsQuery();
  const clients = data?.data?.data || [];
  const navigate = useNavigate();

  return (
    <section
      id="clients"
      data-animate
      className="relative bg-black py-12 md:py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-green-400">Clients</span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trusted by leading brands across industries
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="text-center text-gray-400">Loading clients...</div>
        ) : isError ? (
          <div className="text-center text-red-400">Failed to load clients</div>
        ) : clients.length === 0 ? (
          <div className="text-center text-gray-400">No clients found</div>
        ) : (
          <>
            <div className="relative overflow-hidden">
              <div className="clients-marquee flex gap-6 w-max">
                {[...clients, ...clients].map((client, idx) => {
                  const gradients = [
                    "from-blue-500 to-cyan-500",
                    "from-green-500 to-teal-500",
                    "from-purple-500 to-pink-500",
                    "from-orange-500 to-red-500",
                    "from-indigo-500 to-blue-500",
                    "from-pink-500 to-rose-500",
                  ];
                  const gradient = gradients[idx % gradients.length];
                  return (
                    <div
                      key={`${client._id || idx}-${idx}`}
                      onMouseEnter={(e) =>
                        e.currentTarget
                          .closest(".clients-marquee")
                          ?.classList.add("paused")
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget
                          .closest(".clients-marquee")
                          ?.classList.remove("paused")
                      }
                      className="relative shrink-0 w-40 sm:w-48 md:w-56 transform transition-all duration-500 hover:scale-105"
                    >
                      {/* Glow */}
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 hover:opacity-30 blur-2xl transition-all duration-700`}
                      />

                      {/* Card */}
                      <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
                        {/* Full Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={
                              client.image?.public_url ||
                              client.image?.url ||
                              client.logo ||
                              "/no-image.png"
                            }
                            alt={client.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />

                          {/* Dark overlay on hover */}
                          <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-all duration-500" />

                          {/* Label - Always visible at top */}
                          {/* <div className="absolute top-0 left-0 right-0 p-4">
                            <span
                              className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white shadow-lg`}
                            >
                              {client.name}
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-10">
              <button
                onClick={() => navigate("/client")}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition-all flex items-center gap-2 mx-auto text-sm md:text-base"
              >
                View All Clients
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
      <style>{`
  .clients-marquee {
    animation: marquee 25s linear infinite;
  }

  .clients-marquee.paused {
    animation-play-state: paused;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`}</style>
    </section>
  );
};
// ================= TESTIMONIALS SECTION =================
import { useGetAllGalleryQuery } from "../api/gallery.api";
import { useGetAllBlogsQuery } from "../api/blog.api";
import formatDate from "../utils/FormateDate";
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
  Phone,
  MessageCircle,
  CalendarDays,
  BookOpen,
  Hammer,
  Settings,
  Handshake,
  TrendingUp,
  Target,
  DollarSign,
  Gift,
  UserPlus,
} from "lucide-react";
import Stats from "./stats";
import ScrollFloat from "../components/ScrollFloat";
import HowWeWork from "../components/HowWeWork";
import TextMarquee from "../components/TextMarquee";
import WhyChooseUs from "../components/WhyChooseUs";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// ================= HERO SECTION (UPDATED PADDING) =================
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      data-animate
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex items-center"
    >
      {/* Animated Background */}

      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute w-64 h-64 md:w-96 md:h-96 bg-green-500 rounded-full blur-3xl"
          style={{
            top: "20%",
            left: mousePosition.x * 0.02 + "%",
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-64 h-64 md:w-96 md:h-96 bg-blue-500 rounded-full blur-3xl"
          style={{
            bottom: "20%",
            right: mousePosition.y * 0.02 + "%",
            transition: "all 0.3s ease-out",
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px] pointer-events-none" />

      {/* Content - PADDING INCREASED HERE (pt-36 md:pt-32) */}
      <div className="relative z-10 w-full px-4 pt-36 pb-12 md:pt-32">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-6 md:mb-8">
            <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
            <span className="text-xs md:text-sm text-gray-300">
              5+ Years of Excellence
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black ">
            <span className="block text-white ">Transform Brand</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 animate-gradient-x">
              With Digital Signage
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed px-2">
            Leading digital signage solutions in India. Cutting-edge LED
            displays, interactive solutions, and complete branding.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 w-full max-w-md mx-auto sm:max-w-none">
            <button
              className="w-full sm:w-auto group px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => navigate("/projects")}
            >
              View Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() =>
                window.open("https://youtube.com/@DSSUP", "_blank")
              }
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= ABOUT SECTION =================
const AboutSection = () => {
  return (
    <section id="about" data-animate className="relative bg-black  px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              DSS UP
            </span>
          </h2>
          <div className="flex justify-center">
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mb-4" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 ">
          <div className="space-y-6">
            <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl text-center md:text-left">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Established in <strong className="text-green-400">2021</strong>,
                in the City of Nawabs – Lucknow,
                <strong className="text-white">
                  {" "}
                  3S Digital Signage Solutions UP
                </strong>{" "}
                has emerged as one of the region's leading providers of
                customized digital signage and branding solutions. With over 18
                years of experience and a clientele of more than 2000 satisfied
                clients, we've consistently delivered impactful visual
                communication across diverse industries. From humble beginnings,
                we've grown into a trusted name in digital display technology,
                driving innovation and transforming how businesses connect with
                their audiences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
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
                <div className="relative p-4 md:p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
                  <item.icon
                    className={`w-8 h-8 md:w-12 md:h-12 mb-3 bg-gradient-to-br ${item.color} p-1.5 md:p-2 rounded-xl`}
                  />
                  <h3 className="text-white text-sm md:text-base font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= PRODUCTS SECTION =================
const ProductSection = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const products = [
    {
      title: "Outdoor Signage",
      slug: "outdoor-signage",
      desc: "High-impact outdoor digital and LED signage solutions for maximum visibility.",
      icon: Monitor,
      gradient: "from-blue-500 to-cyan-500",
      animation: "slide-up",
    },
    {
      title: "Indoor Signage",
      slug: "indoor-signage",
      desc: "Premium indoor signage systems for retail, corporate, and commercial spaces.",
      icon: Zap,
      gradient: "from-green-500 to-teal-500",
      animation: "rotate-scale",
    },
    {
      title: "High Rise Signage",
      slug: "high-rise-signage",
      desc: "Large-scale high-rise signage engineered for durability and long-distance visibility.",
      icon: Building2,
      gradient: "from-purple-500 to-pink-500",
      animation: "flip",
    },
    {
      title: "Fabrication",
      slug: "fabrication",
      desc: "Custom signage fabrication with precision engineering and premium materials.",
      icon: Hammer,
      gradient: "from-orange-500 to-red-500",
      animation: "slide-up",
    },
    {
      title: "ACP Work",
      slug: "acp-work",
      desc: "Modern ACP cladding solutions for sleek, durable, and professional finishes.",
      icon: Settings,
      gradient: "from-indigo-500 to-blue-500",
      animation: "rotate-scale",
    },
  ];

  return (
    <section
      id="products"
      data-animate
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-12 md:py-16 px-4 overflow-hidden"
    >
      {/* Background Elements - Hidden on small screens for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Products
            </span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 animate-pulse" />
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Premium signage products tailored to your business needs
          </p>
        </div>

        {/* Services Grid - 1 Col Mobile, 3 Col Desktop */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className={`group relative     w-full
        md:w-[calc(50%-1rem)]
        lg:w-[calc(33.333%-1.333rem)] ${
          product.animation === "slide-up"
            ? "animate-slide-up"
            : product.animation === "rotate-scale"
            ? "animate-rotate-scale"
            : "animate-flip"
        }`}
              style={{ animationDelay: `${i * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  product.gradient
                } opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl ${
                  hoveredIndex === i ? "scale-110" : "scale-100"
                }`}
              />

              <div className="relative h-full p-6 md:p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-500">
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${product.gradient} opacity-20 rounded-bl-full`}
                />

                <div
                  className={`relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <product.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {product.title}
                </h3>
                <div
                  className={`w-16 h-1 bg-gradient-to-r ${product.gradient} mb-4 transition-all duration-500 group-hover:w-full`}
                />
                <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                  {product.desc}
                </p>

                <button
                  className="group/btn flex items-center gap-2 text-green-400 transition-all duration-300 group-hover:text-white cursor-pointer"
                  onClick={() => navigate(`/products/${product.slug}`)}
                >
                  <span className="relative text-sm font-bold">Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .animate-float, .animate-float-delayed { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

// ================= SERVICES SECTION  =================
const ServicesSection = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const services = [
    {
      title: "Recce Work",
      slug: "recce-work",
      desc: "Site survey and analysis for optimal signage placement and planning.",
      icon: Truck,
      gradient: "from-blue-500 to-cyan-500",
      features: ["Site Survey", "Measurement", "Feasibility Study"],
    },
    {
      title: "Design Work",
      slug: "design-work",
      desc: "Creative and technical design services for impactful signage solutions.",
      icon: PencilRuler,
      gradient: "from-green-500 to-teal-500",
      features: ["Concept Design", "3D Visualization", "Brand Integration"],
    },
    {
      title: "Installation Work",
      slug: "installation-work",
      desc: "Professional installation ensuring secure and perfect signage setup.",
      icon: Wrench,
      gradient: "from-cyan-500 to-blue-500",
      features: ["Expert Team", "Safe Setup", "Quick Turnaround"],
    },
    {
      title: "ACP Work",
      slug: "acp-work",
      desc: "Aluminum Composite Panel cladding for modern, durable signage.",
      icon: Settings,
      gradient: "from-violet-500 to-purple-500",
      features: ["Modern Finish", "Weather Resistant", "Premium Look"],
    },
    {
      title: "Consultancy",
      slug: "consultancy",
      desc: "Expert advice and consultancy for all your signage and branding needs.",
      icon: MessageCircle,
      gradient: "from-pink-500 to-rose-500",
      features: ["Brand Strategy", "Technical Guidance", "Project Planning"],
    },
  ];

  return (
    <section
      id="our-services"
      data-animate
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-12 md:py-16 px-4 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Services
            </span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 animate-pulse" />
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive signage services from fabrication to installation
          </p>
        </div>

        {/* Services Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative     w-full
        md:w-[calc(50%-1rem)]
        lg:w-[calc(33.333%-1.333rem)]"
              style={{ animationDelay: `${i * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  service.gradient
                } opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl ${
                  hoveredIndex === i ? "scale-110" : "scale-100"
                }`}
              />

              {/* Card */}
              <div className="relative h-full p-6 md:p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-500 hover:border-white/30">
                {/* Decorative Corner */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.gradient} opacity-20 rounded-bl-full`}
                />

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <service.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>

                {/* Underline */}
                <div
                  className={`w-16 h-1 bg-gradient-to-r ${service.gradient} mb-4 transition-all duration-500 group-hover:w-full`}
                />
                <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                  {service.desc}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className="group/btn flex items-center gap-2 text-blue-400 transition-all duration-300 group-hover:text-white cursor-pointer"
                  onClick={() => navigate(`/services/${service.slug}`)}
                >
                  <span className="relative text-sm font-bold">
                    Explore Product
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= PROJECTS SECTION =================
const ProjectSection = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND;

  const { data: galleryData } = useGetAllGalleryQuery();

  const projects =
    galleryData?.data?.map((item, index) => {
      const gradients = [
        "from-blue-500 to-cyan-500",
        "from-green-500 to-teal-500",
        "from-purple-500 to-pink-500",
        "from-orange-500 to-red-500",
        "from-indigo-500 to-blue-500",
        "from-pink-500 to-rose-500",
      ];

      return {
        title: item.category || "Project",
        desc: "Digital signage installation",
        img:
          item.image?.public_url ||
          (item.image?.url ? `${backendUrl}/${item.image.url}` : "") ||
          "https://picsum.photos/900/650",
        gradient: gradients[index % gradients.length],
        _id: item._id,
      };
    }) || [];

  return (
    <section
      id="projects"
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Our <span className="text-green-400">Projects</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, i) => (
            <div key={project._id || i} className="group relative">
              {/* Glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700`}
              />

              {/* Card */}
              <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
                {/* Full Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />

                  {/* Label - Always visible at top */}
                  <div className="absolute top-0 left-0 right-0 p-4">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${project.gradient} text-white shadow-lg`}
                    >
                      {project.title}
                    </span>
                  </div>

                  {/* Content Box - Slides from left on hover */}
                  <div
                    className="
                      absolute bottom-0 left-0 right-0
                      bg-gradient-to-t from-black via-black/95 to-transparent
                      p-6 pb-8
                      transform transition-all duration-700 ease-out
                      translate-x-[-100%]
                      group-hover:translate-x-0
                    "
                  >
                    {/* Title */}
                    <h3
                      onClick={() => navigate("/projects")}
                      className="text-2xl font-bold text-white cursor-pointer mb-3 hover:text-green-400 transition-colors"
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Animated gradient line */}
                    <div
                      className={`h-1 w-full bg-gradient-to-r ${project.gradient} rounded-full shadow-lg`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            onClick={() => navigate("/projects")}
            className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all flex items-center gap-2 mx-auto"
          >
            Explore More Projects <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

// ================= BLOG SECTION =================
const BlogSection = ({ navigate }) => {
  const { data: blogData, isLoading } = useGetAllBlogsQuery();
  const swiperRef = useRef(null);

  if (isLoading) {
    return null; // Don't show section while loading
  }

  if (!blogData?.data || blogData.data.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <section
      id="blog"
      data-animate
      className="relative bg-black py-12 md:py-16 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Latest </span>
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Blog & Insights
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends and insights in digital signage
          </p>
        </div>

        {/* Swiper Carousel Container */}
        <div className="relative px-12 md:px-16">
          {/* Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={blogData.data.length > 3}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="blog-carousel !pb-8"
          >
            {blogData.data.map((post) => (
              <SwiperSlide key={post._id}>
                <div className="group h-full bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.15)]">
                  {/* Image Section */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 z-10" />

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-medium text-white">
                      <CalendarDays className="w-3.5 h-3.5 text-green-400" />
                      {formatDate(post?.updatedAt)}
                    </div>

                    <img
                      src={
                        post?.image?.public_url ||
                        post?.image?.url ||
                        post?.logo ||
                        "/no-image.png"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-5 md:p-6">
                    {/* Category */}
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                        <Tag className="w-3 h-3" />
                        {post?.category || "Technology"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-green-400 transition-colors min-h-[3rem]">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <div className="text-gray-400 text-sm line-clamp-2 mb-4 min-h-[2.5rem]">
                      <div
                        dangerouslySetInnerHTML={{ __html: post.description }}
                      />
                    </div>

                    {/* Read More */}
                    <button
                      onClick={() => navigate(`/blog-detail/${post.slug}`)}
                      className="inline-flex items-center text-sm font-bold text-white group-hover:text-green-400 transition-colors"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/blog")}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition-all flex items-center gap-2 mx-auto text-sm md:text-base"
          >
            View All Articles
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        .blog-carousel .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

// ================= TESTIMONIALS SECTION =================
const TestimonialSection = () => {
  return (
    <section
      id="testimonials"
      data-animate
      className="relative bg-black pt-12  px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="container mx-auto mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
            What our{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              clients say
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-4"></div>
        </div>
        {/* --- SECTION 2: Google Reviews Widget --- */}
        <div className="pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
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
    </section>
  );
};

// ================= BRAND COLLABORATION SECTION =================
import CountUp from "../components/CountUp";

const Counter = ({ value, duration = 1200 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const match = value.match(/[\d.,]+/);
    const suffix = value.replace(/[\d.,]/g, "");
    const target = match ? parseFloat(match[0].replace(/,/g, "")) : 0;
    if (!target) return setCount(value);

    let current = 0;
    let raf;
    const step = () => {
      current += target / (duration / 16);
      if (current < target) {
        setCount(Math.floor(current));
        raf = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  const suffix = value.replace(/[\d.,]/g, "");
  return (
    <>
      {typeof count === "number" ? count.toLocaleString() : count}
      {suffix}
    </>
  );
};

const BrandCollaborationSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Target,
      title: "Targeted Exposure",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Increased Visibility",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Globe,
      title: "Multi-Location Reach",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Premium Quality",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="brand-collaboration"
      data-animate
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-12 md:py-16 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            <span className="text-white">Brand </span>
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Collaboration
            </span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Partner with us to amplify your brand's reach through strategic
            digital signage solutions
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Left: Benefits */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl`}
                />
                <div className="relative p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-sm md:text-base">
                    {benefit.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <Handshake className="w-16 h-16 text-green-400 mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Let's Grow Together
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Join hands with India's leading digital signage provider. Feature
              your brand on our premium network and reach thousands of potential
              customers daily.
            </p>
            <div className="space-y-3 mb-6">
              {[
                "Prime Location Placements",
                "Flexible Campaign Durations",
                "Performance Analytics",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/brand-collaboration")}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2"
            >
              Explore Partnership
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { number: 500, suffix: "K+", label: "Daily Impressions" },
            { number: 50, suffix: "+", label: "Premium Locations" },
            { number: 95, suffix: "%", label: "Brand Recall Rate" },
            { number: 100, suffix: "+", label: "Happy Partners" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                <CountUp
                  to={stat.number}
                  duration={2.5}
                  delay={i * 0.15}
                  className="inline"
                />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= REFERRAL & AFFILIATE SECTION =================
const ReferralAffiliateSection = () => {
  const navigate = useNavigate();

  const programs = [
    {
      icon: UserPlus,
      title: "Referral Program",
      desc: "Refer clients and earn attractive rewards",
      gradient: "from-blue-500 to-cyan-500",
      benefits: [
        "Up to 10% Commission",
        "Instant Payouts",
        "Lifetime Earnings",
      ],
    },
    {
      icon: Handshake,
      title: "Affiliate Partnership",
      desc: "Become our partner and grow together",
      gradient: "from-green-500 to-teal-500",
      benefits: ["Recurring Revenue", "Marketing Support", "Exclusive Deals"],
    },
  ];

  return (
    <section
      id="referral-affiliate"
      data-animate
      className="relative bg-black py-12 md:py-16 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            <span className="text-white">Referral & </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent">
              Affiliate Program
            </span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6" />
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Earn while you help businesses grow with our digital signage
            solutions
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, i) => (
            <div key={i} className="group relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${program.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl`}
              />
              <div className="relative p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${program.gradient} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-400 mb-6">{program.desc}</p>
                <div className="space-y-3 mb-6">
                  {program.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div
                  className={`h-1 w-full bg-gradient-to-r ${program.gradient} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <Gift className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Start Earning Today!
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join our referral and affiliate programs to unlock unlimited earning
            potential. Easy signup, transparent tracking, and timely payouts
            guaranteed.
          </p>
          <button
            onClick={() => navigate("/referral-affiliate")}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2 mx-auto"
          >
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

// ================= FRANCHISE APPLICATION SECTION =================
const FranchiseApplicationSection = () => {
  const navigate = useNavigate();

  const franchiseHighlights = [
    {
      icon: Building,
      title: "Established Brand",
      desc: "Join a trusted name with 5+ years of excellence in digital signage",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Proven Model",
      desc: "Profitable business model with demonstrated growth and scalability",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      desc: "Comprehensive training and ongoing support from our expert team",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "Market Expansion",
      desc: "Opportunity to expand our presence to new regions and territories",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const requirements = [
    "Entrepreneurial mindset with business acumen",
    "Minimum capital investment as per region",
    "Strong local network and connections",
    "Marketing and sales capability",
    "Commitment to brand standards",
  ];

  return (
    <section
      id="franchise"
      data-animate
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-12 md:py-16 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            <span className="text-white">Franchise </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6" />
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Build your own successful business with our proven franchise model
            and industry-leading support
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {franchiseHighlights.map((highlight, i) => (
            <div key={i} className="group relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${highlight.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl`}
              />
              <div className="relative p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all group-hover:-translate-y-2">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${highlight.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-400">{highlight.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Left: Requirements */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                What We're Looking For
              </h3>
            </div>
            <div className="space-y-4">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-300 text-sm md:text-base">
                    {req}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10">
              <Building2 className="w-16 h-16 text-purple-400 mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Grow Your Enterprise
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Partner with 3S Digital Signage Solutions and tap into the
                booming digital signage market. Comprehensive training,
                marketing support, and continuous guidance to ensure your
                success.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Complete training & onboarding",
                  "Marketing & brand support",
                  "Ongoing technical assistance",
                  "Territory-exclusive rights",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/franchise-application")}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
              >
                Apply for Franchise
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                Limited franchise opportunities available. Apply now!
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { number: 50, suffix: "+", label: "Active Franchises", prefix: "" },
            { number: 2000, suffix: "+", label: "Total Clients", prefix: "" },
            {
              number: 18,
              suffix: "Yrs",
              label: "Industry Experience",
              prefix: "",
            },
            { number: 95, suffix: "%", label: "Success Rate", prefix: "" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                <CountUp
                  to={stat.number}
                  duration={2.5}
                  delay={i * 0.15}
                  className="inline"
                />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= CUSTOM CURSOR (DESKTOP ONLY) =================
const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false); // Added state variable

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
    <>
      <style>{` * { cursor: none !important; } `}</style>
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
    </>
  );
};

// ================= MAIN COMPONENT =================
const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
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
      } else {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        document.querySelectorAll("[data-animate]").forEach((sec) => {
          sec.style.opacity = "1";
          sec.style.transform = "none";
        });
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-black min-h-screen selection:bg-green-500/30">
      {!isMobile && <CustomCursor />}
      <HeroSection />
      <AboutSection />
      <Stats />
      <ProductSection />
      <ServicesSection />
      <ProjectSection />
      <HowWeWork />
      <WhyChooseUs />
      <ClientsSection />
      <TestimonialSection />
      <BrandCollaborationSection />
      <ReferralAffiliateSection />
      <FranchiseApplicationSection />
      <BlogSection navigate={navigate} />
    </div>
  );
};

export default Home;
