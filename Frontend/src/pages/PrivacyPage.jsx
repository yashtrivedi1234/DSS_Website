import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  ChevronRight,
  Shield,
  Lock,
  FileText,
  Eye,
  Globe,
  Server,
  Users,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
  const lastUpdated = "August 29, 2025";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Performance Refs
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
              <span className="text-white font-medium">Privacy Policy</span>
            </nav>
          </div>

          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="hero-animate inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Your Privacy Matters</span>
            </div>
            <h1 className="hero-animate text-4xl md:text-6xl font-black mb-6 leading-tight">
              Privacy{" "}
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
                  Welcome to{" "}
                  <strong className="text-white">
                    Digital Signage Solutions (DSS)
                  </strong>{" "}
                  (“we”, “us”, “our”). This Privacy Policy explains how we
                  collect, use, disclose, and protect your information when you
                  visit{" "}
                  <a
                    href="https://www.dssup.in"
                    className="text-green-400 hover:text-green-300 transition-colors no-underline border-b border-green-500/30 hover:border-green-400"
                  >
                    www.dssup.in
                  </a>{" "}
                  and use our digital signage, LED display, and advertising
                  display solutions.
                </p>
              </div>

              {/* Section 1 */}
              <div className="policy-section mb-10 bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4 mt-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">
                    1
                  </span>
                  Information We Collect
                </h2>
                <ul className="space-y-3 list-none pl-0">
                  {[
                    {
                      label: "Contact & Business Details",
                      text: "Name, email, phone, company, job title.",
                    },
                    {
                      label: "Project Inputs",
                      text: "Signage requirements, specifications, brand assets you share.",
                    },
                    {
                      label: "Technical Data",
                      text: "IP address, device/browser, pages viewed, cookies.",
                    },
                    {
                      label: "Files & Media",
                      text: "Artwork, logos, documents uploaded for quotes or production.",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">{item.label}:</strong>{" "}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 2 */}
              <div className="policy-section mb-10">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 text-sm font-bold">
                    2
                  </span>
                  How We Use Your Information
                </h2>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-green-500 shrink-0 mt-1" />{" "}
                    Provide quotes, design support, manufacturing &
                    installation.
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-green-500 shrink-0 mt-1" />{" "}
                    Improve website UX, performance, and SEO through analytics.
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-green-500 shrink-0 mt-1" />{" "}
                    Send proposals, invoices, and marketing emails (with
                    consent).
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-green-500 shrink-0 mt-1" />{" "}
                    Prevent fraud, enforce terms, and comply with legal
                    obligations.
                  </li>
                </ul>
              </div>

              {/* Section 3 & 4 Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="policy-section bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-3">
                    3. Legal Bases (GDPR)
                  </h3>
                  <ul className="space-y-2 text-sm list-disc pl-4 text-gray-400">
                    <li>
                      <strong className="text-gray-200">Contract:</strong>{" "}
                      Delivering requested services.
                    </li>
                    <li>
                      <strong className="text-gray-200">Consent:</strong>{" "}
                      Marketing & cookies.
                    </li>
                    <li>
                      <strong className="text-gray-200">
                        Legitimate Interests:
                      </strong>{" "}
                      Security & B2B.
                    </li>
                    <li>
                      <strong className="text-gray-200">
                        Legal Obligation:
                      </strong>{" "}
                      Taxation & compliance.
                    </li>
                  </ul>
                </div>
                <div className="policy-section bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-3">
                    4. Sharing & Disclosure
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    We do <strong className="text-green-400">not sell</strong>{" "}
                    your data. We share with:
                  </p>
                  <ul className="space-y-2 text-sm list-disc pl-4 text-gray-400">
                    <li>Trusted vendors (Hosting, Payment, Logistics).</li>
                    <li>Design/Production partners for execution.</li>
                    <li>Legal authorities if required by law.</li>
                  </ul>
                </div>
              </div>

              {/* Other Sections */}
              <div className="policy-section space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    5. Cookies & Tracking
                  </h3>
                  <p>
                    We use cookies to remember preferences and analyze traffic.
                    You can manage cookies in your browser settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    6. Data Security
                  </h3>
                  <p>
                    We implement strict administrative, technical, and physical
                    safeguards. While no method is 100% secure, we continuously
                    improve our controls to protect your data.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    7. Your Rights
                  </h3>
                  <p>
                    Subject to local law, you may request access, correction, or
                    deletion of your data. Contact us to exercise these rights.
                  </p>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-4 items-start">
                  <AlertCircle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-yellow-500 font-bold text-lg m-0">
                      Policy Updates
                    </h4>
                    <p className="text-sm text-yellow-100/70 m-0 mt-1">
                      We may update this Privacy Policy to reflect changes in
                      our services or laws. Updates will be posted on this page
                      with a new “Last Updated” date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="hero-animate mt-16 text-center">
            <p className="text-gray-400 mb-4">
              Have questions about our privacy practices?
            </p>
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
