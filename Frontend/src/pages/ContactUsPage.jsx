import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  MessageSquare,
  User,
  Building,
  Home,
  ChevronRight,
  Sparkles,
  Paperclip,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

const ContactUsPage = () => {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL ??
    import.meta.env.VITE_LOCAL_BACKEND_URL ??
    import.meta.env.VITE_RENDER_BACKEND_URL ??
    "http://localhost:3000/api/v1";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    requirement: "",
    sitePhoto: [],
    message: "",
    agreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
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

    // Section Animation
    gsap.fromTo(
      ".animate-up",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".content-container",
          start: "top 85%",
        },
      }
    );
  }, []);

  const requirements = [
    "Outdoor Signage",
    "Indoor Signage",
    "High Rise Signage",
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: [
        "Digital Signage Solutions",
        "Chinhat Tiraha, Faizabad Road",
        "Lucknow-226028",
      ],
      gradient: "from-emerald-500 to-green-600",
      action:
        "https://www.google.com/maps/search/?api=1&query=Digital+Signage+Solutions+Chinhat+Tiraha+Faizabad+Road+Lucknow+226028",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91-9236477974", "+91-6386901011"],
      gradient: "from-blue-500 to-indigo-600",
      action: "tel:+91-9236477974",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@dssup.in"],
      gradient: "from-purple-500 to-violet-600",
      action: "mailto:info@dssup.in",
    },
  ];

  // --- Handlers & Validation Logic ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    // Phone number validation - only allow numbers
    if (name === "phone") {
      // Remove all non-numeric characters
      newValue = value.replace(/\D/g, "");
      // Limit to 10 digits
      if (newValue.length > 10) {
        newValue = newValue.slice(0, 10);
      }
    }

    // Name validation - only allow letters and spaces
    if (name === "name") {
      // Remove all characters except letters and spaces
      newValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    let error = "";

    for (let file of files) {
      if (file.size > 5 * 1024 * 1024) {
        error = "Each file must be less than 5MB";
        break;
      }
      if (!allowedTypes.includes(file.type)) {
        error = "Only JPG, PNG, WEBP and PDF files are allowed";
        break;
      }
    }

    if (error) {
      setErrors((prev) => ({ ...prev, sitePhoto: error }));
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      sitePhoto: [...prev.sitePhoto, ...files],
    }));
    setErrors((prev) => ({ ...prev, sitePhoto: null }));
  };

  const removeFile = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      sitePhoto: prev.sitePhoto.filter((_, index) => index !== indexToRemove),
    }));
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Full name is required";
        else if (value.trim().length < 2)
          error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email address";
        break;
      case "phone":
        if (!/^[6-9]\d{9}$/.test(value))
          error = "Enter valid 10-digit mobile number starting with 6-9";
        break;
      case "companyName":
        if (!value.trim()) error = "Company name is required";
        else if (value.trim().length < 2)
          error = "Company name must be at least 2 characters";
        break;
      case "requirement":
        if (!value) error = "Please select a requirement";
        break;
      case "message":
        if (!value.trim()) error = "Message is required";
        else if (value.trim().length < 10)
          error = "Message must be at least 10 characters";
        break;
      case "agreed":
        if (!value) error = "You must agree to the terms & conditions";
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "sitePhoto") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "sitePhoto" && formData[key]) {
          submitData.append(key, formData[key]);
        }
      });
      if (formData.sitePhoto.length > 0) {
        formData.sitePhoto.forEach((file) =>
          submitData.append("sitePhoto", file)
        );
      }

      await axios.post(`${BACKEND_URL}/inquiry`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        requirement: "",
        sitePhoto: [],
        message: "",
        agreed: false,
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span className="text-white font-medium">Contact Us</span>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="hero-animate text-4xl md:text-6xl font-black mb-6 leading-[1.05]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500">
                Get In Touch With Us
              </span>
            </h1>
            <p className="hero-animate text-gray-400 max-w-2xl mx-auto text-lg leading-[0.15]">
              Have a project in mind? Let's collaborate to create something
              extraordinary.
            </p>
          </div>

          <div className="content-container space-y-8">
            {/* --- Contact Info Cards (Top) --- */}
            <div className="flex justify-center animate-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {contactInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((line, i) => (
                        <p key={i} className="text-gray-400 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                    {info.action && (
                      <a
                        href={info.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0"
                        aria-label={info.title}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* --- Contact Form (Middle - Split into 2 columns) --- */}
            <div className="animate-up">
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl">
                <div className="flex flex-row items-center justify-center gap-3 mb-8">
                  <div className="p-3 bg-green-500/20 text-green-400 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white text-center flex items-center m-0 p-0">
                    Send us a Message
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          pattern="[a-zA-Z\s]*"
                          className={`w-full bg-black/20 border rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all ${
                            errors.name
                              ? "border-red-500/50"
                              : "border-white/10"
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full bg-black/20 border rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all ${
                            errors.email
                              ? "border-red-500/50"
                              : "border-white/10"
                          }`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Requirement Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Requirement *
                      </label>
                      <select
                        name="requirement"
                        value={formData.requirement}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-gray-900">
                          Select a service...
                        </option>
                        {requirements.map((req, index) => (
                          <option
                            key={index}
                            value={req}
                            className="bg-gray-900"
                          >
                            {req}
                          </option>
                        ))}
                      </select>
                      {errors.requirement && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.requirement}
                        </p>
                      )}
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Site Photos (Optional)
                      </label>
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-green-500/30 hover:bg-white/[0.02] transition-all group cursor-pointer relative">
                        <input
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.webp,.pdf"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center">
                          <div className="p-3 bg-white/5 rounded-full mb-3 group-hover:bg-green-500/10 transition-colors">
                            <Upload className="w-6 h-6 text-gray-400 group-hover:text-green-400" />
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="text-green-400 font-medium">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Images or PDF up to 5MB
                          </p>
                        </div>
                      </div>

                      {/* File List */}
                      {formData.sitePhoto.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {formData.sitePhoto.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <Paperclip className="w-4 h-4 text-green-400 flex-shrink-0" />
                                <span className="text-sm text-gray-300 truncate">
                                  {file.name}
                                </span>
                              </div>
                              <button
                                onClick={() => removeFile(idx)}
                                className="p-1 hover:bg-white/10 rounded-full text-gray-500 hover:text-red-400 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.sitePhoto && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.sitePhoto}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Company Name *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className={`w-full bg-black/20 border rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all ${
                            errors.companyName
                              ? "border-red-500/50"
                              : "border-white/10"
                          }`}
                          placeholder="Your Company Ltd."
                        />
                      </div>
                      {errors.companyName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength="10"
                          className={`w-full bg-black/20 border rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all ${
                            errors.phone
                              ? "border-red-500/50"
                              : "border-white/10"
                          }`}
                          placeholder="9876543210"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={9}
                        className={`w-full bg-black/20 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all resize-none ${
                          errors.message
                            ? "border-red-500/50"
                            : "border-white/10"
                        }`}
                        placeholder="Tell us about your project requirements..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Agreement & Submit (Full Width) */}
                <div className="mt-8 space-y-4">
                  {/* Agreement */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      id="agreed"
                      className="mt-1 w-4 h-4 rounded border-gray-600 text-green-500 focus:ring-green-500 focus:ring-offset-gray-900 bg-gray-800"
                    />
                    <label
                      htmlFor="agreed"
                      className="text-sm text-gray-400 cursor-pointer select-none"
                    >
                      I agree to the terms & conditions. I consent to being
                      contacted by Digital Signage Solutions regarding my
                      inquiry.
                    </label>
                  </div>
                  {errors.agreed && (
                    <p className="text-red-500 text-xs">{errors.agreed}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Send Message
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>
                        Message sent successfully! We'll allow 24 hours for a
                        response.
                      </span>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>Something went wrong. Please try again later.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* --- Map Container (Bottom) --- */}
            <div className="animate-up bg-white/[0.03] border border-white/10 rounded-2xl p-2 h-96 shadow-inner">
              <iframe
                src="https://maps.google.com/maps?q=Digital%20Signage%20Solutions%20Lucknow&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  borderRadius: "12px",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
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

export default ContactUsPage;
