import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Gift,
  DollarSign,
  TrendingUp,
  Award,
  Star,
  Copy,
  Check,
  Percent,
  Target,
  Zap,
  Heart,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CountUp from "../components/CountUp";

const ReferralAffiliate = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
      .required("Phone number is required"),
    company: yup.string().nullable(),
    referralType: yup.string().required("Please select a type"),
    message: yup
      .string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });
  const [activeTab, setActiveTab] = useState("referral");
  const [copiedCode, setCopiedCode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    referralType: "individual",
    message: "",
  });

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("3SDIGITAL2024");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enforce numeric-only input for phone field
  const allowOnlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  // Enforce character-only input (letters + space)
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

  const handleSubmit = (data) => {
    console.log("Validated Form Data:", data);
  };

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

  const referralBenefits = [
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Earn Rewards",
      description:
        "Get up to ₹50,000 in rewards for every successful referral that converts to a project",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Help Others Grow",
      description:
        "Connect businesses with cutting-edge digital signage solutions that transform their presence",
      color: "from-orange-500 to-amber-600",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Exclusive Perks",
      description:
        "Access special discounts and priority support for your own future projects",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Unlimited Earnings",
      description:
        "No cap on how much you can earn - refer as many clients as you want",
      color: "from-fuchsia-500 to-pink-600",
    },
  ];

  const affiliateBenefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Competitive Commissions",
      description:
        "Earn 10-15% commission on every sale generated through your affiliate link",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Marketing Support",
      description:
        "Get access to banners, promotional materials, and content to boost your conversions",
      color: "from-orange-500 to-amber-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Tracking",
      description:
        "Monitor your performance with our advanced affiliate dashboard and analytics",
      color: "from-amber-500 to-yellow-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Tiered Rewards",
      description:
        "Unlock higher commission rates as you reach monthly and quarterly milestones",
      color: "from-pink-500 to-rose-600",
    },
  ];

  const howItWorks = {
    referral: [
      {
        step: "01",
        title: "Register",
        description: "Sign up for our referral program using the form below",
      },
      {
        step: "02",
        title: "Share",
        description: "Tell businesses about 3S Digital Signage solutions",
      },
      {
        step: "03",
        title: "Connect",
        description: "We'll reach out to your referral and provide a quote",
      },
      {
        step: "04",
        title: "Earn",
        description: "Get rewarded when they sign a contract with us",
      },
    ],
    affiliate: [
      {
        step: "01",
        title: "Apply",
        description: "Submit your application to join our affiliate program",
      },
      {
        step: "02",
        title: "Get Approved",
        description:
          "Receive your unique affiliate link and marketing materials",
      },
      {
        step: "03",
        title: "Promote",
        description:
          "Share your link through your website, social media, or email",
      },
      {
        step: "04",
        title: "Earn Commission",
        description: "Receive commissions for every successful sale tracked",
      },
    ],
  };

  const rewardTiers = [
    {
      tier: "Bronze",
      sales: "1-5 Referrals",
      reward: "₹25,000 per sale",
      perks: ["Basic support", "Monthly reports"],
    },
    {
      tier: "Silver",
      sales: "6-15 Referrals",
      reward: "₹35,000 per sale",
      perks: ["Priority support", "Weekly reports", "Exclusive materials"],
      featured: true,
    },
    {
      tier: "Gold",
      sales: "16+ Referrals",
      reward: "₹50,000 per sale",
      perks: [
        "VIP support",
        "Real-time dashboard",
        "Custom campaigns",
        "Bonus incentives",
      ],
    },
  ];

  const affiliateCommissions = [
    {
      package: "Basic Package",
      value: "Up to ₹5L",
      commission: "10%",
    },
    {
      package: "Standard Package",
      value: "₹5L - ₹15L",
      commission: "12%",
      featured: true,
    },
    {
      package: "Premium Package",
      value: "₹15L+",
      commission: "15%",
    },
  ];

  const faqs = [
    {
      question: "How do I get paid?",
      answer:
        "Payments are processed within 30 days after project completion via bank transfer or UPI.",
    },
    {
      question: "Is there a limit to how many referrals I can make?",
      answer:
        "No! You can refer unlimited clients and earn rewards for each successful conversion.",
    },
    {
      question: "What qualifies as a successful referral?",
      answer:
        "A referral is successful when the referred client signs a contract and completes payment for a project.",
    },
    {
      question: "Can I be both a referral partner and an affiliate?",
      answer:
        "Yes! You can participate in both programs simultaneously and maximize your earnings.",
    },
  ];

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

      {/* Hero Section - Updated to match BrandCollaboration */}
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
                Earn Rewards Through
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
                Partnership Success
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Join our referral and affiliate programs to earn substantial
              rewards by connecting businesses with cutting-edge digital signage
              solutions. Unlimited earning potential awaits!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4"
            >
              <motion.a
                href="#join"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-semibold rounded-full transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
              >
                <span className="flex items-center">
                  Start Earning Today
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
                Explore Programs
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Tab Selection */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-8 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-30"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex bg-slate-800/70 rounded-full p-2">
            <motion.button
              onClick={() => setActiveTab("referral")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "referral"
                  ? "bg-gradient-to-r from-purple-500 to-orange-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Users className="w-5 h-5 inline-block mr-2" />
              Referral Program
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("affiliate")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "affiliate"
                  ? "bg-gradient-to-r from-purple-500 to-orange-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Percent className="w-5 h-5 inline-block mr-2" />
              Affiliate Program
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Program Stats */}
      <AnimatedSection className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                number: 50,
                suffix: "K+",
                label: "Max Reward/Referral",
                prefix: "₹",
              },
              { number: 15, suffix: "%", label: "Commission Rate", prefix: "" },
              {
                number: 200,
                suffix: "+",
                label: "Active Partners",
                prefix: "",
              },
              { number: 2, suffix: "Cr+", label: "Paid Out", prefix: "₹" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl border border-purple-500/20 backdrop-blur-sm relative overflow-hidden group cursor-pointer"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-2 relative z-10"
                  animate={pulseAnimation}
                >
                  <span>{stat.prefix}</span>
                  <CountUp
                    to={stat.number}
                    duration={2.5}
                    delay={index * 0.15}
                    className="inline"
                  />
                  <span>{stat.suffix}</span>
                </motion.div>
                <div className="text-white/70 text-sm lg:text-base relative z-10">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 lg:px-8 bg-slate-950">
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
              Why Join Our{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                {activeTab === "referral" ? "Referral" : "Affiliate"}
              </span>{" "}
              Program?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              {activeTab === "referral"
                ? "Share your network and earn substantial rewards with every successful referral"
                : "Build a sustainable income stream by promoting industry-leading digital signage solutions"}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {(activeTab === "referral"
              ? referralBenefits
              : affiliateBenefits
            ).map((benefit, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <motion.div
                  className="mb-6 text-purple-400 group-hover:text-orange-400 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 lg:px-8 bg-slate-900/30">
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
              How It{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Works
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/70">
              Get started in four simple steps
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {howItWorks[activeTab].map((step, index) => (
              <motion.div key={index} className="relative" variants={fadeInUp}>
                <motion.div
                  className="p-8 bg-gradient-to-br from-slate-800/70 to-slate-800/40 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-orange-500/50 transition-all duration-300 h-full"
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
                    {step.step}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70">{step.description}</p>
                </motion.div>
                {index < howItWorks[activeTab].length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2"
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

      {/* Reward Tiers / Commission Structure */}
      <section className="py-20 px-6 lg:px-8 bg-slate-950">
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
              {activeTab === "referral"
                ? "Reward Tiers"
                : "Commission Structure"}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/70">
              {activeTab === "referral"
                ? "Unlock higher rewards as you refer more clients"
                : "Earn more with higher-value projects"}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {(activeTab === "referral"
              ? rewardTiers
              : affiliateCommissions
            ).map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  item.featured
                    ? "bg-gradient-to-br from-purple-500/20 to-orange-500/20 border-purple-500"
                    : "bg-slate-800/50 border-purple-500/20 hover:border-orange-500/50"
                }`}
              >
                {item.featured && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-orange-500 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </motion.div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {activeTab === "referral" ? item.tier : item.package}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    {activeTab === "referral" ? item.sales : item.value}
                  </p>
                  <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                  >
                    {activeTab === "referral"
                      ? item.reward
                      : `${item.commission} Commission`}
                  </motion.div>
                </div>

                {activeTab === "referral" && (
                  <ul className="space-y-3">
                    {item.perks.map((perk, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center text-white/80"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                        {perk}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Form Section */}
      <section id="join" className="py-20 px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
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
              Start Earning{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Today
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/70">
              Fill out the form below to join our{" "}
              {activeTab === "referral" ? "referral" : "affiliate"} program
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Info Card */}
            <motion.div variants={fadeInLeft} className="space-y-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/20"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Program Benefits
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: "Fast Payouts",
                      desc: "Receive payments within 30 days of project completion",
                    },
                    {
                      title: "Dedicated Support",
                      desc: "Get assistance from our partner success team",
                    },
                    {
                      title: "Marketing Materials",
                      desc: "Access branded content and promotional assets",
                    },
                    {
                      title: "Real-Time Tracking",
                      desc: "Monitor your referrals and earnings in your dashboard",
                    },
                  ].map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CheckCircle className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-white font-semibold mb-1">
                          {benefit.title}
                        </div>
                        <div className="text-white/70 text-sm">
                          {benefit.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {activeTab === "affiliate" && (
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-purple-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">
                      Your Referral Code
                    </h4>
                    <motion.button
                      onClick={handleCopyCode}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </motion.button>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-lg font-mono text-purple-400 text-center text-lg">
                    3SDIGITAL2024
                  </div>
                  <p className="text-white/70 text-xs mt-3">
                    Share this code with your audience to track conversions
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Application Form */}
            <motion.form
              variants={fadeInRight}
              onSubmit={hookFormSubmit(handleSubmit)}
              className="space-y-6"
            >
              <motion.div whileHover={{ scale: 1.02 }}>
                <label
                  htmlFor="name"
                  className="block text-white mb-2 font-medium"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  onInput={allowOnlyCharacters}
                  onKeyDown={blockNonCharacterKeys}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-white/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                  className="block text-white mb-2 font-medium"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label
                  htmlFor="phone"
                  className="block text-white mb-2 font-medium"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="9876543210"
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
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label
                  htmlFor="company"
                  className="block text-white mb-2 font-medium"
                >
                  Company/Organization (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  {...register("company")}
                  placeholder="Your Company"
                  onInput={allowOnlyCharacters}
                  onKeyDown={blockNonCharacterKeys}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-white/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
                {/* No error for optional field */}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label
                  htmlFor="referralType"
                  className="block text-white mb-2 font-medium"
                >
                  I am applying as *
                </label>
                <select
                  id="referralType"
                  {...register("referralType")}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white"
                >
                  <option value="individual">Individual</option>
                  <option value="business">Business/Agency</option>
                  <option value="influencer">Influencer/Content Creator</option>
                  <option value="other">Other</option>
                </select>
                {errors.referralType && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.referralType.message}
                  </p>
                )}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label
                  htmlFor="message"
                  className="block text-white mb-2 font-medium"
                >
                  Why do you want to join? *
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows="4"
                  placeholder="Tell us about your network..."
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white"
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
                  Submit Application
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-8 bg-slate-950">
        <div className="max-w-4xl mx-auto">
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
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
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
            <Heart className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Grow Together?
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/70 mb-8 leading-relaxed"
          >
            Join hundreds of partners who are already earning with 3S Digital
            Signage. Start your journey today!
          </motion.p>

          <motion.a
            variants={fadeInUp}
            href="#join"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            Join Our Program
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default ReferralAffiliate;
