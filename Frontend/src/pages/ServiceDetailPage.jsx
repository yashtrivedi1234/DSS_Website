import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Shield,
  ChevronRight,
} from "lucide-react";
import servicesData from "../data/ServiceData";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// ================= SERVICE DATA =================

// ================= HERO SECTION =================
const ServiceHero = ({ service }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    <section className="relative min-h-[70vh] md:min-h-[80vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className={`absolute w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r ${service.gradient} rounded-full blur-3xl`}
          style={{
            top: "20%",
            left: mousePosition.x * 0.02 + "%",
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className={`absolute w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r ${service.gradient} rounded-full blur-3xl`}
          style={{
            bottom: "20%",
            right: mousePosition.y * 0.02 + "%",
            transition: "all 0.3s ease-out",
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 pt-36 pb-12 md:pt-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center mb-8">
            <div
              className={`w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300`}
            >
              <service.icon className="w-10 h-10 md:w-14 md:h-14 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="text-white">{service.title} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 animate-gradient-x">
              Services
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-3xl font-semibold text-gray-300 mb-4">
            {service.tagline}
          </p>

          {/* Description */}
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {service.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto group px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2">
              Get Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Us Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= OVERVIEW SECTION =================
const ServiceOverview = ({ service }) => {
  return (
    <section className="relative bg-black py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-white">{service.overview.title}</span>
            </h2>
            <div
              className={`w-24 h-1 bg-gradient-to-r ${service.gradient} mb-6`}
            />
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {service.overview.content}
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: CheckCircle, text: "Certified Professionals" },
                { icon: Shield, text: "Quality Guaranteed" },
                { icon: Clock, text: "On-Time Delivery" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full"
                >
                  <item.icon className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {service.overview.stats.map((stat, i) => (
              <div
                key={i}
                className="group relative p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all"
              >
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${service.gradient} opacity-20 rounded-bl-full`}
                />
                <stat.icon
                  className={`w-10 h-10 mb-4 bg-gradient-to-br ${service.gradient} p-2 rounded-xl`}
                />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= FEATURES SECTION =================
const ServiceFeatures = ({ service }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Key </span>
            <span
              className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
            >
              Features
            </span>
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r ${service.gradient} mx-auto mb-6`}
          />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions designed to exceed your expectations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {service.features.map((feature, i) => (
            <div
              key={i}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  service.gradient
                } opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 rounded-2xl ${
                  hoveredIndex === i ? "scale-110" : "scale-100"
                }`}
              />

              <div className="relative h-full p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all">
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Underline */}
                <div
                  className={`w-16 h-1 bg-gradient-to-r ${service.gradient} mb-4 group-hover:w-full transition-all duration-500`}
                />

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= PROCESS SECTION =================
const ServiceProcess = ({ service }) => {
  return (
    <section className="relative bg-black py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span
              className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
            >
              Process
            </span>
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r ${service.gradient} mx-auto mb-6`}
          />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A systematic approach ensuring quality at every step
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Hidden on Mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-blue-500/50 to-purple-500/50" />

          <div className="space-y-12">
            {service.process.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-5/12">
                  <div className="group p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-1">
                          Step {step.step}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Circle */}
                <div className="hidden md:flex absolute left-1/2 w-16 h-16 -ml-8 bg-gradient-to-br from-gray-900 to-black border-4 border-green-500/30 rounded-full items-center justify-center z-10">
                  <div
                    className={`w-8 h-8 bg-gradient-to-br ${service.gradient} rounded-full animate-pulse`}
                  />
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= PORTFOLIO SECTION =================
const ServicePortfolio = ({ service }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span
              className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
            >
              Projects
            </span>
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r ${service.gradient} mx-auto mb-6`}
          />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real results from real projects
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {service.portfolio.map((project, i) => (
            <div
              key={i}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl`}
              />

              <div className="relative h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2">
                    {project.specs.map((spec, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-gradient-to-r ${service.gradient} bg-opacity-10 border border-white/10 rounded-full text-xs text-gray-300`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= FAQ SECTION =================
const ServiceFAQ = ({ service }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative bg-black py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Frequently Asked </span>
            <span
              className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
            >
              Questions
            </span>
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r ${service.gradient} mx-auto mb-6`}
          />
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {service.faqs.map((faq, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-90" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-6 pb-6">
                  <div
                    className={`w-16 h-1 bg-gradient-to-r ${service.gradient} mb-4`}
                  />
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= CTA SECTION =================
const ServiceCTA = ({ service }) => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative p-8 md:p-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden">
          {/* Background Effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-10`}
          />
          <div
            className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-30`}
          />
          <div
            className={`absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-30`}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <div
              className={`inline-flex w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl items-center justify-center mb-6`}
            >
              <service.icon className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {service.cta.title}
            </h2>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {service.cta.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto group px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {service.cta.primaryButton}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {service.cta.secondaryButton || "Contact Us"}
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91-9236477974</span> 
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@dssup.com</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mon-Sat: 9AM - 6PM</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= MAIN SERVICE PAGE COMPONENT =================
const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Get service data based on slug
  const service = servicesData[slug];

  // Redirect if service not found
  useEffect(() => {
    if (!service) {
      navigate("/");
    }
  }, [service, navigate]);

  // GSAP Animations for desktop
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) return null;

  return (
    <div className="bg-black min-h-screen selection:bg-green-500/30">
      <ServiceHero service={service} />
      <div data-animate>
        <ServiceOverview service={service} />
      </div>
      <div data-animate>
        <ServiceFeatures service={service} />
      </div>
      <div data-animate>
        <ServiceProcess service={service} />
      </div>
      <div data-animate>
        <ServicePortfolio service={service} />
      </div>
      <div data-animate>
        <ServiceFAQ service={service} />
      </div>
      <div data-animate>
        <ServiceCTA service={service} />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
