import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  Phone,
  Mail,
  Home,
  ChevronRight,
  ArrowRight,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  PenTool,
  Cpu,
  Users,
  Award,
} from "lucide-react";
import HowWeWork from "../components/HowWeWork";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductData from "../data/ProductData";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

const ProductDetailPage = () => {
  const { slug } = useParams();
  console.log({ slug });
  const service = ProductData.find((s) => s.slug === slug);
  console.log(service);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState(null);

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
    // Hero Animation
    gsap.fromTo(
      ".hero-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    // Section Animation
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
  }, [service]);

  // --- Why Choose Us Data ---
  const features = [
    {
      id: 1,
      title: "Premium Quality",
      desc: "We use only top-tier LED modules and weather-resistant materials guaranteed to last.",
      icon: ShieldCheck,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 2,
      title: "Custom Fabrication",
      desc: "Every sign is tailored to your specific brand guidelines and architectural requirements.",
      icon: PenTool,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Latest Technology",
      desc: "Integrating smart controls, high refresh rates, and energy-efficient power systems.",
      icon: Cpu,
      gradient: "from-purple-500 to-violet-500",
    },
    {
      id: 4,
      title: "24/7 Support",
      desc: "Dedicated technical team available round the clock for maintenance and assistance.",
      icon: Clock,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Expert Team",
      desc: "5+ years of experience with a workforce of skilled engineers and designers.",
      icon: Users,
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      id: 6,
      title: "Award Winning",
      desc: "Recognized across North India for excellence in digital signage execution.",
      icon: Award,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
          <Link
            to="/products"
            className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

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
              <Link
                to="/products"
                className="hover:text-green-400 transition-colors"
              >
                Products
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <span className="text-white font-medium">{service.title}</span>
            </nav>
          </div>

          {/* Hero / Overview Section */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div className="hero-animate space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>Professional Service</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  {service.title}
                </h1>

                <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-green-500 pl-6">
                  {service.overview}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full font-bold text-white hover:shadow-lg hover:shadow-green-500/20 transition-all flex items-center gap-2 group"
                  >
                    Get a Quote{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="hero-animate relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* Specific Solutions Grid */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  Solutions
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {service.services.map((svc, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-3xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-green-400">
                      <Layers className="w-6 h-6" />
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                      {svc.title}
                    </h4>

                    <p className="text-gray-400 mb-8 leading-relaxed">
                      {svc.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-sm text-gray-300"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= NEW IMPROVED "WHY CHOOSE US" SECTION ================= */}
          <section className="mb-24 relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-white/[0.02] -skew-y-3 rounded-[3rem] transform scale-105 pointer-events-none" />

            <div className="relative z-10 py-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Why Choose <span className="text-green-400">Us?</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  We don't just build signage; we engineer visual experiences
                  that drive results.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className="group relative p-8 bg-gray-900 border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
                  >
                    {/* Gradient Hover Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    {/* Top Accent Line */}
                    <div
                      className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                    />

                    {/* Numbering */}
                    <div className="absolute top-6 right-6 text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                      0{feature.id}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Component */}
          <div className="mb-24">
            <HowWeWork />
          </div>

          {/* CTA Section */}
          <section className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-white/10 p-12 text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Space?
              </h3>
              <p className="text-xl text-gray-300 mb-10">
                Let's discuss your signage needs and create something amazing
                together. Contact us today for a free consultation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:6386901011"
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Get Quote
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
