import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  Zap,
  Globe,
  TrendingUp,
  Award,
  Handshake,
  Mail,
  Phone,
  MapPin,
  BarChart3,
  Shield,
  Lightbulb,
  Sparkles,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "../components/CountUp";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const BrandCollaboration = () => {
  // Yup validation schema
  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Only characters are allowed")
      .required("Full name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    company: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Only characters are allowed")
      .nullable(),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
      .required("Phone number is required"),
    industry: yup.string().required("Industry is required"),
    partnershipType: yup.string().required("Partnership type is required"),
    budget: yup.string().nullable(),
    message: yup
      .string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Input restriction helpers
  const allowOnlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const allowOnlyCharacters = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  };

  const blockNonCharacterKeys = (e) => {
    if (
      !/[a-zA-Z\s]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const benefits = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Audience Targeting",
      description:
        "Leverage our premium network of digital displays positioned in high-traffic locations to reach your target demographic with precision and impact.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Enhanced Brand Visibility",
      description:
        "Maximize brand exposure through state-of-the-art LED technology and dynamic content delivery across Lucknow's most prestigious commercial corridors.",
      color: "from-orange-500 to-amber-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Audience Engagement Excellence",
      description:
        "Create memorable brand interactions through immersive visual storytelling that captures attention and drives customer action.",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Campaign Management",
      description:
        "Deploy, modify, and optimize your messaging instantly across our entire network with our advanced content management platform.",
      color: "from-amber-500 to-yellow-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Location Deployment",
      description:
        "Scale your brand presence efficiently with synchronized campaigns spanning multiple venues and demographic zones throughout the region.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Display Technology",
      description:
        "Present your brand with uncompromising quality through ultra-high-definition 4K displays and professionally produced content.",
      color: "from-fuchsia-500 to-pink-600",
    },
  ];

  const collaborationTypes = [
    {
      title: "Strategic Advertising Partnerships",
      description:
        "Position your brand at the forefront of consumer consciousness through premium digital advertising placements.",
      features: [
        "Prime commercial district locations",
        "Flexible campaign duration options",
        "Comprehensive performance analytics and ROI tracking",
        "Dedicated account management support",
      ],
    },
    {
      title: "Co-Branding & Joint Ventures",
      description:
        "Forge mutually beneficial partnerships that amplify brand equity through innovative digital experiences.",
      features: [
        "Shared brand visibility and exposure",
        "Collaborative creative development",
        "Joint marketing initiatives",
        "Strategic growth opportunities",
      ],
    },
    {
      title: "Corporate Sponsorship Programs",
      description:
        "Establish long-term partnerships as a preferred sponsor for events, installations, and premium digital properties.",
      features: [
        "Exclusive event and venue branding rights",
        "Comprehensive brand integration solutions",
        "Multi-year partnership frameworks",
        "VIP networking opportunities",
      ],
    },
    {
      title: "Technology Integration Solutions",
      description:
        "Seamlessly integrate your products, services, or platforms with our digital signage ecosystem.",
      features: [
        "Technical API and system integration",
        "Innovation showcase opportunities",
        "Market expansion and pilot programs",
        "Proof-of-concept development support",
      ],
    },
  ];

  const stats = [
    {
      number: 500,
      suffix: "K+",
      label: "Daily Impressions",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: 50,
      suffix: "+",
      label: "Premium Locations",
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      number: 95,
      suffix: "%",
      label: "Brand Recall Rate",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      number: 100,
      suffix: "+",
      label: "Active Partners",
      icon: <Handshake className="w-6 h-6" />,
    },
  ];

  const successStories = [
    {
      company: "Leading Retail Chain",
      result: "180% increase in foot traffic",
      description:
        "Strategic digital signage deployment across 15 high-traffic locations resulted in measurable increases in store visits and sales conversions.",
      icon: <BarChart3 className="w-10 h-10" />,
    },
    {
      company: "Premium Automotive Brand",
      result: "300% campaign engagement",
      description:
        "Interactive digital experiences drove unprecedented audience engagement and generated qualified leads for new vehicle launches.",
      icon: <Target className="w-10 h-10" />,
    },
    {
      company: "National FMCG Brand",
      result: "2.5x ROI achievement",
      description:
        "Targeted digital campaigns delivered exceptional return on investment through data-driven placement and dynamic content optimization.",
      icon: <TrendingUp className="w-10 h-10" />,
    },
  ];

  const partnershipProcess = [
    {
      step: "01",
      title: "Initial Consultation",
      description:
        "We begin with a comprehensive discovery session to understand your brand objectives, target audience, and partnership goals.",
    },
    {
      step: "02",
      title: "Strategic Proposal",
      description:
        "Our team develops a customized partnership proposal with detailed placement recommendations, creative strategies, and projected outcomes.",
    },
    {
      step: "03",
      title: "Agreement & Onboarding",
      description:
        "Upon approval, we execute formal agreements and initiate our streamlined onboarding process with dedicated support.",
    },
    {
      step: "04",
      title: "Campaign Launch & Optimization",
      description:
        "Your campaign goes live with continuous monitoring, performance tracking, and ongoing optimization for maximum impact.",
    },
  ];

  // Component for animated section
  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative h-[70vh] lg:h-[85vh] overflow-hidden pt-24 lg:pt-28"
        style={{ scale: scaleProgress, opacity: opacityProgress }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-orange-500/20 to-pink-500/20">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg1MHYySDM2ek0zNiAxNDZoNTB2MkgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')`,
              backgroundSize: "60px 60px",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-32 right-20 hidden lg:block"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-purple-400" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 30, 0],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute bottom-40 left-20 hidden lg:block"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <Star className="w-8 h-8 text-orange-400" />
          </div>
        </motion.div>

        <div className="relative z-10 flex items-center justify-center h-full px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-white block mb-2">
                Elevate Your Brand Through
              </span>
              <motion.span
                className="bg-gradient-to-r from-purple-400 via-orange-400 to-pink-400 bg-clip-text text-transparent block"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Digital Excellence
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Partner with 3S Digital Signage Solutions to create impactful
              brand experiences that engage audiences and drive measurable
              results across Lucknow's premier digital infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-semibold rounded-full transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
              >
                <span className="flex items-center">
                  Schedule Consultation
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </span>
              </motion.a>

              <motion.a
                href="#benefits"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer flex items-center px-10 py-5 bg-transparent border-2 border-purple-400 text-white font-semibold rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:border-transparent transition-all duration-300"
              >
                Explore Benefits
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <AnimatedSection className="py-20 bg-slate-900/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-white mb-3"
            >
              Measurable Impact, Proven Results
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-white/70">
              Data that demonstrates our commitment to partnership success
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="text-center p-6 bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl border border-purple-500/20 backdrop-blur-sm relative overflow-hidden group cursor-pointer"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  animate={pulseAnimation}
                  className="text-purple-400 mb-3 mx-auto w-fit"
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-2 relative z-10">
                  <CountUp
                    to={stat.number}
                    duration={2.5}
                    delay={index * 0.15}
                    className="inline"
                  />
                  <span className="text-3xl lg:text-4xl">{stat.suffix}</span>
                </div>
                <div className="text-white/70 text-sm lg:text-base relative z-10">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 px-6 lg:px-8 bg-slate-950 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-bold text-white mb-4"
            >
              Partnership{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Advantages
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-3xl mx-auto"
            >
              Unlock strategic advantages that position your brand for sustained
              growth and market leadership in the digital landscape.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="group p-8 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <motion.div
                  className="mb-6 text-purple-400 group-hover:text-orange-400 transition-colors duration-300 relative z-10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {benefit.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-white/70 leading-relaxed relative z-10">
                  {benefit.description}
                </p>

                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Collaboration Types Section */}
      <section className="py-20 px-6 lg:px-8 bg-slate-900/30 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-bold text-white mb-4"
            >
              Partnership{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Models
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-3xl mx-auto"
            >
              Flexible collaboration frameworks designed to align with your
              business objectives and deliver exceptional value.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {collaborationTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                whileHover={{ scale: 1.02 }}
                className="p-8 bg-gradient-to-br from-slate-800/70 to-slate-800/40 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-orange-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start mb-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Handshake className="w-8 h-8 text-purple-400 mr-4 flex-shrink-0 mt-1 group-hover:text-orange-400 transition-colors" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {type.title}
                    </h3>
                    <p className="text-white/70 mb-4">{type.description}</p>
                  </div>
                </div>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-3"
                >
                  {type.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      variants={fadeInUp}
                      className="flex items-start text-white/80"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-bold text-white mb-4"
            >
              Client{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              Real results from our strategic partnerships across diverse
              industries
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-purple-400 mb-6 relative z-10"
                >
                  {story.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                  {story.company}
                </h3>

                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-4 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {story.result}
                </motion.div>

                <p className="text-white/70 text-sm leading-relaxed relative z-10">
                  {story.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20 px-6 lg:px-8 bg-slate-900/30 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-bold text-white mb-4"
            >
              Our Partnership{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Process
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              A streamlined approach designed to ensure seamless collaboration
              from concept to execution
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {partnershipProcess.map((process, index) => (
              <motion.div key={index} className="relative" variants={fadeInUp}>
                <motion.div
                  className="p-8 bg-gradient-to-br from-slate-800/70 to-slate-800/40 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-orange-500/50 transition-all duration-300 h-full group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-4 opacity-50"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.5, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    {process.step}
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {process.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed">
                    {process.description}
                  </p>
                </motion.div>

                {index < partnershipProcess.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-8 h-8 text-purple-400/50" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6 lg:px-8 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-bold text-white mb-4"
            >
              Begin Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Partnership Journey
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              Complete the form below and our partnership development team will
              respond within one business day to schedule your consultation.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Contact Information */}
            <motion.div variants={fadeInLeft} className="space-y-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/20"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="w-6 h-6 text-purple-400 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white/50 text-sm mb-1">
                        Email Address
                      </div>
                      <a
                        href="mailto:partnerships@3sdigital.com"
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        info@dssup.in
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="w-6 h-6 text-purple-400 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white/50 text-sm mb-1">
                        Business Inquiries
                      </div>
                      <a
                        href="tel:+911234567890"
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        +91 9236477974, +91 6386901011
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="w-6 h-6 text-purple-400 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white/50 text-sm mb-1">
                        Headquarters
                      </div>
                      <div className="text-white">
                        Lucknow, Uttar Pradesh, India
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="p-8 bg-gradient-to-br from-purple-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/30"
              >
                <Shield className="w-8 h-8 text-purple-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-3">
                  Commitment to Excellence
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  All partnership inquiries receive personalized attention from
                  our dedicated business development team. We respond to every
                  submission within one business day and maintain strict
                  confidentiality throughout the consultation process.
                </p>
              </motion.div>

              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-orange-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-orange-500/30"
              >
                <Lightbulb className="w-8 h-8 text-orange-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-3">
                  Custom Solutions Available
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Every partnership is unique. We specialize in developing
                  tailored solutions that align with your specific objectives,
                  timeline, and budget.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={fadeInRight}
              onSubmit={handleSubmit((data) => {
                console.log("Validated Brand Collaboration Data:", data);
              })}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="name"
                    className="block text-white mb-2 font-medium text-sm"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    onInput={allowOnlyCharacters}
                    onKeyDown={blockNonCharacterKeys}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-white/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="email"
                    className="block text-white mb-2 font-medium text-sm"
                  >
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-white/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="company"
                    className="block text-white mb-2 font-medium text-sm"
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    {...register("company")}
                    onInput={allowOnlyCharacters}
                    onKeyDown={blockNonCharacterKeys}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-white/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Your Company"
                  />
                  {errors.company && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.company.message}
                    </p>
                  )}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="phone"
                    className="block text-white mb-2 font-medium text-sm"
                  >
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    inputMode="numeric"
                    maxLength={10}
                    onInput={allowOnlyNumbers}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete" &&
                        e.key !== "ArrowLeft" &&
                        e.key !== "ArrowRight" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-white/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="+91 123 456 7890"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="industry"
                    className="block text-white mb-2 font-medium text-sm"
                  >
                    Industry *
                  </label>
                  <select
                    id="industry"
                    {...register("industry")}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="">Select Industry</option>
                    <option value="retail">Retail & E-commerce</option>
                    <option value="automotive">Automotive</option>
                    <option value="fmcg">FMCG & Consumer Goods</option>
                    <option value="hospitality">Hospitality & Tourism</option>
                    <option value="realestate">Real Estate</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="technology">Technology</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.industry && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.industry.message}
                    </p>
                  )}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="partnershipType"
                    className="block text-white mb-2 font-medium text-sm"
                  >
                    Partnership Interest *
                  </label>
                  <select
                    id="partnershipType"
                    {...register("partnershipType")}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="">Select Type</option>
                    <option value="advertising">Advertising Partnership</option>
                    <option value="cobranding">Co-Branding</option>
                    <option value="sponsorship">Sponsorship Program</option>
                    <option value="technology">Technology Integration</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                  {errors.partnershipType && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.partnershipType.message}
                    </p>
                  )}
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label
                  htmlFor="budget"
                  className="block text-white mb-2 font-medium text-sm"
                >
                  Estimated Budget Range
                </label>
                <select
                  id="budget"
                  {...register("budget")}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="">Select Budget Range</option>
                  <option value="under-5L">Under ₹5 Lakhs</option>
                  <option value="5L-15L">₹5 - 15 Lakhs</option>
                  <option value="15L-50L">₹15 - 50 Lakhs</option>
                  <option value="50L-1Cr">₹50 Lakhs - 1 Crore</option>
                  <option value="1Cr-plus">Above ₹1 Crore</option>
                  <option value="flexible">Flexible / To be discussed</option>
                </select>
                {errors.budget && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.budget.message}
                  </p>
                )}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label
                  htmlFor="message"
                  className="block text-white mb-2 font-medium text-sm"
                >
                  Partnership Objectives & Requirements *
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-white/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  placeholder="Please describe your partnership goals, target audience, timeline, and any specific requirements..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full group px-8 py-4 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-semibold rounded-full transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
              >
                <span className="flex items-center justify-center">
                  Submit Partnership Inquiry
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>

              <p className="text-white/50 text-xs text-center mt-4">
                By submitting this form, you agree to our privacy policy and
                consent to being contacted by our partnership team.
              </p>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 px-6 lg:px-8 bg-gradient-to-br from-purple-500/10 via-orange-500/10 to-pink-500/10 relative overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full blur-3xl"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={scaleIn}>
            <Award className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Elevate Your Brand?
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Join industry-leading brands who have chosen 3S Digital Signage
            Solutions as their partner for innovative digital experiences across
            Lucknow's premier locations.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-6">
            <Link
              to="/projects"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              View Partnership Portfolio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default BrandCollaboration;
