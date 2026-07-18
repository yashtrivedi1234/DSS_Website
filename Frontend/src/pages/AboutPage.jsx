import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Settings,
  Eye,
  Wrench,
  Building,
  Lightbulb,
  Shield,
  Target,
  TrendingUp,
  Zap,
  Home,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import TimelineSection from "../components/About/TimelineSection";
import TextMarquee from "../components/TextMarquee";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    branches: 0,
  });

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
      ".hero-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    // Section Scroll Animations
    const sections = document.querySelectorAll("section");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  // --- Counter Logic ---
  useEffect(() => {
    const targets = {
      projects: 500,
      clients: 200,
      experience: 18,
      branches: 5,
    };
    const duration = 3000;
    const steps = 60;
    const interval = duration / steps;
    const timer = setInterval(() => {
      setCounters((prev) => {
        const newCounters = { ...prev };
        let allComplete = true;
        Object.keys(targets).forEach((key) => {
          if (newCounters[key] < targets[key]) {
            newCounters[key] = Math.min(
              newCounters[key] + Math.ceil(targets[key] / steps),
              targets[key]
            );
            allComplete = false;
          }
        });
        if (allComplete) clearInterval(timer);
        return newCounters;
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const tabContent = {
    story: {
      title: "Our Story",
      content:
        "Founded in 2021 in Lucknow, Digital Signage Solutions UP has been pioneering the digital signage industry for over 18 years. What started as a small venture has grown into the region's most trusted name in digital display solutions, serving over 200 clients across multiple industries with cutting-edge technology and unmatched expertise.",
    },
    mission: {
      title: "Our Mission",
      content:
        "To transform how businesses communicate with their audiences through innovative digital signage solutions. We believe in creating impactful visual experiences that drive engagement, enhance brand presence, and deliver measurable results for our clients across various industries.",
    },
    vision: {
      title: "Our Vision",
      content:
        "To be the leading digital signage solutions provider in India, setting new standards for innovation, quality, and customer satisfaction. We envision a future where every business leverages the power of digital displays to create meaningful connections with their audience.",
    },
  };

  const strengths = [
    {
      icon: Settings,
      title: "In-House Production",
      description:
        "Complete in-house production capabilities with skilled technicians and state-of-the-art equipment.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Eye,
      title: "Customization",
      description:
        "Tailored solutions to meet specific customer needs and preferences, enhancing satisfaction.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Wrench,
      title: "After Sales Service",
      description:
        "Comprehensive post-installation support with professional maintenance services.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const services = [
    {
      icon: Building,
      title: "Outdoor Signage",
      desc: "High visibility billboards & displays.",
    },
    {
      icon: TrendingUp,
      title: "High Rise Signage",
      desc: "Skyline branding for maximum impact.",
    },
    {
      icon: Lightbulb,
      title: "Indoor Signage",
      desc: "Sleek displays for retail & corporate.",
    },
    {
      icon: Zap,
      title: "Neon Plate Signage",
      desc: "Energy-efficient artistic neon.",
    },
    {
      icon: Target,
      title: "Navigation Signage",
      desc: "Wayfinding for malls & airports.",
    },
    {
      icon: Shield,
      title: "Industrial Signage",
      desc: "Safety & operational guidelines.",
    },
  ];

  const portfolioImages = [
    {
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "LED Video Wall",
      category: "Commercial",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Digital Kiosk",
      category: "Retail",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Outdoor Billboard",
      category: "Advertising",
    },
    {
      src: "https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Corporate Signage",
      category: "Corporate",
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

      <div className="relative z-10 pt-32 pb-12 lg:pt-40 lg:pb-12">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-center">
          <nav className="hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-400 hover:border-white/20 transition-all">
            <Link
              to="/"
              className="hover:text-green-400 flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-white font-medium">About Us</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="hero-animate space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Since 2021</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  About Our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                    Legacy & Future
                  </span>
                </h1>
                <div className="prose prose-lg text-gray-400 leading-relaxed">
                  <p>
                    DSS - Digital Signage Solutions is a leading provider in the
                    signage industry. We have expertise in designing and
                    installing high-quality signage for businesses of all sizes
                    and industries.
                  </p>
                  <p>
                    Whether you need indoor or outdoor signs, we use the latest
                    technology to ensure durability and visual impact.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-white font-medium">
                    Latest Technology
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-full">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-white font-medium">
                    Competitive Prices
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="hero-animate grid grid-cols-2 gap-6">
              {[
                {
                  number: counters.projects,
                  label: "Projects",
                  suffix: "+",
                  color: "text-green-400",
                },
                {
                  number: counters.clients,
                  label: "Clients",
                  suffix: "+",
                  color: "text-blue-400",
                },
                {
                  number: counters.experience,
                  label: "Years Exp",
                  suffix: "+",
                  color: "text-purple-400",
                },
                {
                  number: counters.branches,
                  label: "Branches",
                  suffix: "",
                  color: "text-orange-400",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                    {stat.number}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee & Timeline */}
        <div className="py-10">
          <TextMarquee />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <TimelineSection />
        </div>

        {/* Our Strength Section */}
        <section className="py-16 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Our Strength
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {strengths.map((item, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-gray-900 border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Section (Mission/Vision) */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                {/* Tab Navigation */}
                <div className="flex space-x-2 bg-white/5 p-2 rounded-xl border border-white/10 mb-8">
                  {Object.keys(tabContent).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-6 rounded-lg font-medium transition-all duration-300 capitalize ${
                        activeTab === tab
                          ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    {tabContent[activeTab].title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg border-l-4 border-green-500 pl-6">
                    {tabContent[activeTab].content}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  {[
                    "Customized digital signage solutions",
                    "Expertise in LED walls & displays",
                    "Turnkey solutions from concept to install",
                    "24/7 technical support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-green-500/20 text-green-400">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content - Portfolio Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {portfolioImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative group overflow-hidden rounded-2xl border border-white/10 ${
                        index === 0 ? "col-span-2 h-64" : "h-40"
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          <div className="text-white font-bold">
                            {image.title}
                          </div>
                          <div className="text-xs text-green-400">
                            {image.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-6 -right-6 bg-gray-900 border border-white/10 p-4 rounded-2xl shadow-xl animate-bounce-slow hidden md:block">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase">
                        Established
                      </div>
                      <div className="text-white font-bold">2021</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white/[0.02] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Our Expertise
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive digital signage solutions for every business need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group p-6 bg-gray-900 border border-white/10 rounded-2xl hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors">
                    <service.icon className="w-6 h-6 text-gray-400 group-hover:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Connect Bar */}
        <section className="border-t border-white/10 bg-black/40 backdrop-blur-lg mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Location",
                  val: "Lucknow, Uttar Pradesh",
                },
                { icon: Phone, title: "Call Us", val: "+91 XXXXX XXXXX" },
                { icon: Mail, title: "Email Us", val: "info@dsssolutions.com" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <item.icon className="w-6 h-6 text-green-400 mb-3" />
                  <h3 className="text-white font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-move 5s ease infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes gradient-move { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
      `}</style>
    </div>
  );
};

export default AboutPage;
