import React, { useEffect, useRef } from "react";
import {
  Home,
  ChevronRight,
  Cookie,
  Shield,
  Settings,
  Database,
  Globe,
  CheckCircle,
  Clock,
  Info,
  MousePointer2,
  Cpu,
  Wifi,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

export default function CookiePolicy() {
  const lastUpdated = "August 29, 2025";

  // Performance Refs for smooth animation
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  // --- 1. OPTIMIZED BACKGROUND ANIMATION ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          x: clientX * 0.05,
          y: clientY * 0.05,
          duration: 2,
          ease: "power2.out",
        });
      }
      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          x: -clientX * 0.05,
          y: -clientY * 0.05,
          duration: 3,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- 2. ENTRANCE ANIMATIONS ---
  useEffect(() => {
    // Hero Animation
    gsap.fromTo(
      ".hero-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    // Content Sections Animation
    const sections = document.querySelectorAll(".policy-section");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden text-white selection:bg-green-500/30">
      {/* --- Global Background Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            ref={blob1Ref}
            className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px]"
            style={{ top: "-10%", left: "20%" }}
          />
          <div
            ref={blob2Ref}
            className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
            style={{ bottom: "-10%", right: "10%" }}
          />
        </div>
      </div>

      <div className="relative z-10 pt-32 pb-12 lg:pt-40 lg:pb-20">
        <div className="max-w-5xl mx-auto px-6">
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
              <span className="text-white font-medium">Cookie Policy</span>
            </nav>
          </div>

          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="hero-animate inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
              <Cookie className="w-4 h-4" />
              <span>Transparency & Control</span>
            </div>
            <h1 className="hero-animate text-4xl md:text-6xl font-black mb-6 leading-tight">
              Cookie{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Policy
              </span>
            </h1>
            <p className="hero-animate text-gray-400 max-w-2xl mx-auto text-lg">
              Effective Date:{" "}
              <span className="text-white font-medium">{lastUpdated}</span>
            </p>
          </div>

          {/* Main Content Container */}
          <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Top Shine */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-50" />

            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
              <div className="policy-section mb-12">
                <p className="text-xl leading-relaxed">
                  This Cookie Policy explains how{" "}
                  <strong className="text-white">
                    Digital Signage Solutions (DSS)
                  </strong>{" "}
                  uses cookies and similar technologies on{" "}
                  <a
                    href="https://www.dssup.co.in"
                    className="text-green-400 hover:text-green-300 transition-colors no-underline border-b border-green-500/30 hover:border-green-400"
                  >
                    www.dssup.in
                  </a>
                  . By using our website and accepting cookies, you consent to
                  the collection of certain technical information such as{" "}
                  <strong className="text-white">
                    location, device details, and network information
                  </strong>
                  .
                </p>
              </div>

              {/* Section 1: What Are Cookies */}
              <div className="policy-section mb-10 bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4 mt-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">
                    1
                  </span>
                  What Are Cookies?
                </h2>
                <p className="text-gray-400 mb-0">
                  Cookies are small text files stored on your browser or device.
                  They help us recognize your device, remember preferences,
                  improve website performance, and measure marketing
                  effectiveness.
                </p>
              </div>

              {/* Section 2: Types of Cookies */}
              <div className="policy-section mb-10">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 text-sm font-bold">
                    2
                  </span>
                  Types of Cookies We Use
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Essential Cookies",
                      desc: "Required for core functionality (login, navigation, forms).",
                    },
                    {
                      title: "Performance & Analytics",
                      desc: "Collect data on visits, pages viewed, and site speeds.",
                    },
                    {
                      title: "Advertising Cookies",
                      desc: "Help deliver relevant ads and measure campaign success.",
                    },
                    {
                      title: "Functionality Cookies",
                      desc: "Remember user preferences and saved settings.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white/5 border border-white/5 rounded-xl"
                    >
                      <h4 className="text-white font-bold text-base mt-0 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400 m-0 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Info Collected */}
              <div className="policy-section mb-10">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold">
                    3
                  </span>
                  Information Collected
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  When you accept cookies, we may collect:
                </p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-purple-400 shrink-0 mt-1" />{" "}
                    <span>
                      <strong className="text-white">Device Info:</strong> Type,
                      OS, browser version.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-purple-400 shrink-0 mt-1" />{" "}
                    <span>
                      <strong className="text-white">Location Data:</strong>{" "}
                      Approximate location derived from IP.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wifi className="w-5 h-5 text-purple-400 shrink-0 mt-1" />{" "}
                    <span>
                      <strong className="text-white">Network Info:</strong> ISP,
                      connection type, metrics.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MousePointer2 className="w-5 h-5 text-purple-400 shrink-0 mt-1" />{" "}
                    <span>
                      <strong className="text-white">Interactions:</strong>{" "}
                      Pages visited, time spent, clicks.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 4 & 5 Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="policy-section bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-3">
                    4. How We Use This Data
                  </h3>
                  <ul className="space-y-2 text-sm list-disc pl-4 text-gray-400">
                    <li>Improve website usability & speed.</li>
                    <li>Optimize display solutions for customers.</li>
                    <li>Enhance SEO & marketing campaigns.</li>
                    <li>Provide location-specific support.</li>
                  </ul>
                </div>
                <div className="policy-section bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-3">
                    5. Managing Cookies
                  </h3>
                  <p className="text-sm text-gray-400">
                    You can control cookies via browser settings. Most browsers
                    allow you to block or delete them. Note that some features
                    may not work if cookies are disabled.
                  </p>
                </div>
              </div>

              {/* Other Sections */}
              <div className="policy-section space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    6. Third-Party Cookies
                  </h3>
                  <p>
                    We use trusted services like{" "}
                    <strong className="text-white">Google Analytics</strong> and
                    advertising partners that place cookies to analyze traffic
                    and deliver targeted ads.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    7. Consent
                  </h3>
                  <p>
                    By clicking “Accept” on our banner, you agree to the
                    processing of your technical information as described here.
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex gap-4 items-start">
                  <Info className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-green-500 font-bold text-lg m-0">
                      Policy Updates
                    </h4>
                    <p className="text-sm text-green-100/70 m-0 mt-1">
                      We may update this policy to reflect changes in law or
                      technology. Check back here for the latest version.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="hero-animate mt-16 text-center">
            <p className="text-gray-400 mb-4">Questions about our cookies?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
