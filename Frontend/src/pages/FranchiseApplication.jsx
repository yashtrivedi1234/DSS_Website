import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Store,
  MapPin,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Building,
  Briefcase,
  FileText,
  Target,
  Zap,
  Shield,
  Handshake,
  Calendar,
  Globe,
  Star,
  ChevronDown,
  Upload,
  User,
  Home,
  CreditCard,
  AlertCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ================= HERO SECTION =================
const FranchiseHeroSection = () => {
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
    <section className="relative min-h-[70vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
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

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 pt-32 pb-12">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-6">
            <Store className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">
              Join India's Leading Digital Signage Network
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-7xl font-black mb-6">
            <span className="block text-white">Become a</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 animate-gradient-x">
              DSS UP Franchise Partner
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Partner with us to bring cutting-edge digital signage solutions to
            your region. Low investment, high returns, and complete support.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              {
                icon: Store,
                label: "50+ Locations",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Users,
                label: "2000+ Clients",
                gradient: "from-green-500 to-teal-500",
              },
              {
                icon: TrendingUp,
                label: "30% ROI",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Award,
                label: "5+ Years",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((stat, i) => (
              <div key={i} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-xl`}
                />
                <div className="relative p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:border-white/30 transition-all">
                  <stat.icon
                    className={`w-8 h-8 mx-auto mb-2 bg-gradient-to-br ${stat.gradient} p-1.5 rounded-lg`}
                  />
                  <p className="text-white text-sm font-semibold">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= WHY FRANCHISE SECTION =================
const WhyFranchiseSection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Low Investment",
      desc: "Start your franchise with minimal capital and maximum support",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: TrendingUp,
      title: "High Returns",
      desc: "Proven business model with attractive profit margins",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Handshake,
      title: "Complete Support",
      desc: "Training, marketing, and operational assistance throughout",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Exclusive Territory",
      desc: "Protected territory rights with no competition from us",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Target,
      title: "Marketing Support",
      desc: "National and local marketing campaigns to drive leads",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Zap,
      title: "Quick Setup",
      desc: "Fast-track franchise setup within 30-45 days",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section
      data-animate
      className="relative bg-black py-16 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              DSS UP Franchise?
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join a proven business model with comprehensive support and growth
            opportunities
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="group relative"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl`}
              />
              <div className="relative h-full p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <div
                  className={`w-16 h-1 bg-gradient-to-r ${benefit.gradient} mb-4 transition-all duration-500 group-hover:w-full`}
                />
                <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= FRANCHISE REQUIREMENTS SECTION =================
const RequirementsSection = () => {
  const requirements = [
    {
      icon: Building,
      title: "Space Requirements",
      items: [
        "Minimum 500 sq ft office space",
        "Display area for product showcase",
        "Storage facility for inventory",
      ],
    },
    {
      icon: CreditCard,
      title: "Financial Requirements",
      items: [
        "Initial franchise fee: ₹5-10 Lakhs",
        "Working capital: ₹10-15 Lakhs",
        "Total investment: ₹15-25 Lakhs",
      ],
    },
    {
      icon: User,
      title: "Eligibility Criteria",
      items: [
        "Business experience preferred",
        "Strong local network",
        "Passion for technology & sales",
      ],
    },
  ];

  return (
    <section
      data-animate
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Franchise </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Requirements
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
        </div>

        {/* Requirements Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {requirements.map((req, i) => (
            <div
              key={i}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-green-500/30 transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <req.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {req.title}
              </h3>
              <ul className="space-y-3">
                {req.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= APPLICATION FORM SECTION =================
const ApplicationFormSection = () => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const schema = yup.object({
    fullName: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Only characters allowed")
      .required("Full name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
      .required("Phone number is required"),
    city: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Only characters allowed")
      .required("City is required"),
    state: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Only characters allowed")
      .required("State is required"),
    currentOccupation: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Only characters allowed")
      .required("Current occupation is required"),
    preferredLocation: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Only characters allowed")
      .required("Preferred location is required"),
    investmentCapacity: yup.string().required("Investment capacity is required"),
    businessExperience: yup
      .number()
      .typeError("Only numbers allowed")
      .min(0, "Invalid number")
      .nullable(),
    pincode: yup
      .string()
      .matches(/^[0-9]{6}$/, "Enter valid 6-digit PIN")
      .nullable(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // File uploads and other uncontrolled fields state
  const [formFiles, setFormFiles] = useState({
    resume: null,
    financialProof: null,
    addressProof: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  return (
    <section
      data-animate
      className="relative bg-black py-16 px-4 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Apply for </span>
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Franchise
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
          <p className="text-xl text-gray-400">
            Fill out the form below and our team will get back to you shortly
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await new Promise((resolve) => setTimeout(resolve, 2000));
              console.log("Form submitted:", data);
              setSubmitStatus({
                type: "success",
                message:
                  "Application submitted successfully! We'll contact you within 2-3 business days.",
              });
              reset();
              setFormFiles({ resume: null, financialProof: null, addressProof: null });
            } catch {
              setSubmitStatus({
                type: "error",
                message: "Something went wrong. Please try again.",
              });
            }
          })}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
        >
          {/* Personal Information */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-green-400" />
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    errors.fullName ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    errors.phone ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors`}
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  {...register("city")}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    errors.city ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors`}
                  placeholder="Your city"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  State <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  {...register("state")}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    errors.state ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors`}
                  placeholder="Your state"
                />
                {errors.state && (
                  <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  PIN Code
                </label>
                <input
                  type="text"
                  {...register("pincode")}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="6-digit PIN code"
                />
                {errors.pincode && (
                  <p className="text-red-400 text-sm mt-1">{errors.pincode.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="mb-10 pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-400" />
              Business Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Current Occupation <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  {...register("currentOccupation")}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    errors.currentOccupation
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors`}
                  placeholder="e.g., Business Owner, Professional"
                />
                {errors.currentOccupation && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.currentOccupation.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Business Experience (Years)
                </label>
                <input
                  type="number"
                  {...register("businessExperience")}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Years of experience"
                  min="0"
                />
                {errors.businessExperience && (
                  <p className="text-red-400 text-sm mt-1">{errors.businessExperience.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Preferred Franchise Location{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  {...register("preferredLocation")}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    errors.preferredLocation
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors`}
                  placeholder="e.g., Commercial Area, Market"
                />
                {errors.preferredLocation && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.preferredLocation.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Preferred City
                </label>
                <input
                  type="text"
                  name="preferredCity"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="City for franchise"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Investment Capacity <span className="text-red-400">*</span>
                </label>
                <select
                  {...register("investmentCapacity")}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    errors.investmentCapacity
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors`}
                >
                  <option value="" className="bg-gray-900">
                    Select investment range
                  </option>
                  <option value="15-20L" className="bg-gray-900">
                    ₹15-20 Lakhs
                  </option>
                  <option value="20-30L" className="bg-gray-900">
                    ₹20-30 Lakhs
                  </option>
                  <option value="30L+" className="bg-gray-900">
                    ₹30+ Lakhs
                  </option>
                </select>
                {errors.investmentCapacity && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.investmentCapacity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Expected Start Date
                </label>
                <input
                  type="date"
                  name="expectedStartDate"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-10 pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-400" />
              Additional Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Why do you want to become a DSS UP franchise partner?
                </label>
                <textarea
                  name="whyFranchise"
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                  placeholder="Tell us about your motivation and goals..."
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Brief Business Plan / Strategy
                </label>
                <textarea
                  name="businessPlan"
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                  placeholder="Share your vision and approach..."
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  How did you hear about us?
                </label>
                <select
                  name="referralSource"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-colors"
                >
                  <option value="" className="bg-gray-900">
                    Select an option
                  </option>
                  <option value="website" className="bg-gray-900">
                    Website
                  </option>
                  <option value="social-media" className="bg-gray-900">
                    Social Media
                  </option>
                  <option value="referral" className="bg-gray-900">
                    Referral
                  </option>
                  <option value="advertisement" className="bg-gray-900">
                    Advertisement
                  </option>
                  <option value="other" className="bg-gray-900">
                    Other
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="mb-10 pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Upload className="w-6 h-6 text-orange-400" />
              Documents (Optional)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: "resume", label: "Resume / CV" },
                { name: "financialProof", label: "Financial Proof" },
                { name: "addressProof", label: "Address Proof" },
              ].map((doc) => (
                <div key={doc.name}>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    {doc.label}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name={doc.name}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                      id={doc.name}
                    />
                    <label
                      htmlFor={doc.name}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:border-green-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      {formFiles[doc.name]
                        ? formFiles[doc.name].name
                        : "Choose file"}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB each)
            </p>
          </div>

          {/* Status Message */}
          {submitStatus && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                submitStatus.type === "success"
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm ${
                  submitStatus.type === "success"
                    ? "text-green-300"
                    : "text-red-300"
                }`}
              >
                {submitStatus.message}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <button
              type="button"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all"
            >
              Save as Draft
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4 text-center">
            By submitting this form, you agree to our Terms & Conditions and
            Privacy Policy
          </p>
        </form>
      </div>
    </section>
  );
};

// ================= PROCESS TIMELINE SECTION =================
const ProcessTimelineSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "Submit Application",
      desc: "Fill out the franchise application form with all required details",
      color: "blue",
    },
    {
      icon: Phone,
      title: "Initial Screening",
      desc: "Our team will review your application and contact you within 48 hours",
      color: "green",
    },
    {
      icon: Users,
      title: "Meeting & Discussion",
      desc: "Meet our team to discuss the opportunity, requirements, and expectations",
      color: "purple",
    },
    {
      icon: FileText,
      title: "Documentation",
      desc: "Complete legal and financial documentation with our support",
      color: "orange",
    },
    {
      icon: Award,
      title: "Training Program",
      desc: "Comprehensive training on products, operations, and best practices",
      color: "pink",
    },
    {
      icon: Store,
      title: "Launch & Support",
      desc: "Grand opening with continuous operational and marketing support",
      color: "cyan",
    },
  ];

  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-teal-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500",
    pink: "from-pink-500 to-rose-500",
    cyan: "from-cyan-500 to-blue-500",
  };

  return (
    <section
      data-animate
      className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Franchise </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Simple and transparent process from application to launch
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 -translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="flex-1 group">
                  <div
                    className={`relative p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/30 transition-all ${
                      i % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${
                        colorClasses[step.color]
                      } opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 rounded-2xl`}
                    />
                    <h3 className="relative text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="relative text-gray-400">{step.desc}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${
                      colorClasses[step.color]
                    } rounded-full flex items-center justify-center shadow-2xl`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= FAQ SECTION =================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is the total investment required?",
      a: "The total investment ranges from ₹15-25 Lakhs, including franchise fee, setup costs, and working capital. The exact amount depends on location and size.",
    },
    {
      q: "What kind of support will I receive?",
      a: "You'll receive comprehensive support including training, marketing materials, operational guidance, technical support, and ongoing business development assistance.",
    },
    {
      q: "Do I need prior experience in signage business?",
      a: "While prior business experience is helpful, it's not mandatory. We provide complete training on products, operations, sales, and marketing.",
    },
    {
      q: "What is the expected ROI and payback period?",
      a: "Based on our existing franchises, you can expect 25-35% ROI annually with a payback period of 2-3 years, depending on location and execution.",
    },
    {
      q: "Will I get exclusive territory rights?",
      a: "Yes, you'll receive exclusive rights for your designated territory, ensuring no competition from other DSS UP franchises in your area.",
    },
    {
      q: "What is the duration of the franchise agreement?",
      a: "The initial franchise agreement is for 5 years, with options to renew based on performance and mutual agreement.",
    },
  ];

  return (
    <section
      data-animate
      className="relative bg-black py-16 px-4 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Frequently Asked </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-white font-semibold pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-green-400 flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/10 pt-4">
                  {faq.a}
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
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your
            <span className="block mt-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Entrepreneurial Journey?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join the DSS UP family and build a successful business with India's
            leading digital signage provider
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .querySelector("#application-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ================= MAIN COMPONENT =================
const FranchiseApplication = () => {
  const [isMobile, setIsMobile] = useState(false);

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
      <FranchiseHeroSection />
      <WhyFranchiseSection />
      <RequirementsSection />
      <ProcessTimelineSection />
      <div id="application-form">
        <ApplicationFormSection />
      </div>
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default FranchiseApplication;
