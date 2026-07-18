import {
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Award,
  Shield,
  ShieldCheck,
  Zap,
  Users,
  Hammer,
  Wrench,
  Building2,
  Settings,
  BadgeCheck,
  Palette,
  Monitor,
  ChevronRight,
  Package,
  Truck,
  FileCheck,
  Lightbulb,
  Target,
  TrendingUp,
  Sparkles,
  ClipboardList,
  PenTool,
  Layers,
  UserCheck,
  CalendarCheck,
} from "lucide-react";

const servicesData = {
  "recce-work": {
    title: "Recce Work",
    tagline: "Site survey and assessment for flawless execution.",
    description:
      "Our expert team conducts thorough recce work to ensure every project starts on a solid foundation.",
    gradient: "from-green-400 via-blue-400 to-purple-500",
    icon: ClipboardList,
    overview: {
      title: "Comprehensive Site Analysis",
      content:
        "We analyze every aspect of your site to ensure smooth project execution.",
      stats: [
        { icon: ClipboardList, value: "500+", label: "Sites Surveyed" },
        { icon: UserCheck, value: "99%", label: "Client Satisfaction" },
      ],
    },
    features: [
      {
        icon: ClipboardList,
        title: "Detailed Reporting",
        description: "Get actionable insights from our surveys.",
        benefits: ["Accurate measurements", "Risk assessment", "Site photos"],
      },
    ],
    process: [
      {
        icon: ClipboardList,
        step: 1,
        title: "Initial Visit",
        description: "Our team visits your site for a primary assessment.",
      },
      {
        icon: UserCheck,
        step: 2,
        title: "Reporting",
        description: "We deliver a detailed report with recommendations.",
      },
    ],
    portfolio: [
      {
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        title: "Mall Survey",
        description: "Comprehensive recce for a retail chain.",
        specs: ["Retail", "2024"],
      },
    ],
    faqs: [
      {
        question: "What is recce work?",
        answer: "Recce work is a site survey to assess project feasibility.",
      },
    ],
    cta: {
      title: "Ready for a Site Survey?",
      description: "Contact us for a professional recce today.",
      primaryButton: "Get Free Quote",
      secondaryButton: "Call Us Now",
    },
  },
  "design-work": {
    title: "Design Work",
    tagline: "Creative and functional design solutions.",
    description: "We deliver innovative designs tailored to your needs.",
    gradient: "from-pink-400 via-red-400 to-yellow-500",
    icon: PenTool,
    overview: {
      title: "Innovative Design",
      content: "Our designs blend creativity with practicality.",
      stats: [
        { icon: PenTool, value: "300+", label: "Designs Delivered" },
        { icon: UserCheck, value: "100%", label: "Custom Solutions" },
      ],
    },
    features: [
      {
        icon: PenTool,
        title: "3D Visualization",
        description: "See your project before it’s built.",
        benefits: ["Realistic renders", "Multiple options", "Client feedback"],
      },
    ],
    process: [
      {
        icon: PenTool,
        step: 1,
        title: "Concept",
        description: "We discuss your vision and requirements.",
      },
      {
        icon: UserCheck,
        step: 2,
        title: "Final Design",
        description: "We deliver the final design for approval.",
      },
    ],
    portfolio: [
      {
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
        title: "Office Design",
        description: "Modern workspace for a tech startup.",
        specs: ["Office", "2025"],
      },
    ],
    faqs: [
      {
        question: "Do you provide 3D designs?",
        answer: "Yes, we offer 3D visualization for all projects.",
      },
    ],
    cta: {
      title: "Start Your Design Journey",
      description: "Let’s create something amazing together.",
      primaryButton: "Get Free Quote",
      secondaryButton: "Call Us Now",
    },
  },
  "installation-work": {
    title: "Installation Work",
    tagline: "Professional installation for lasting results.",
    description:
      "Our skilled team ensures seamless installation of all project elements.",
    gradient: "from-blue-400 via-indigo-400 to-purple-500",
    icon: Hammer,
    overview: {
      title: "Expert Installation",
      content: "We handle all types of installations with precision.",
      stats: [
        { icon: Hammer, value: "1000+", label: "Installations" },
        { icon: UserCheck, value: "98%", label: "On-Time Delivery" },
      ],
    },
    features: [
      {
        icon: Hammer,
        title: "Efficient Execution",
        description: "Timely and safe installation services.",
        benefits: ["Trained staff", "Modern tools", "Safety protocols"],
      },
    ],
    process: [
      {
        icon: Hammer,
        step: 1,
        title: "Preparation",
        description: "We prepare the site for installation.",
      },
      {
        icon: UserCheck,
        step: 2,
        title: "Execution",
        description: "Our team installs all components efficiently.",
      },
    ],
    portfolio: [
      {
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
        title: "Signage Installation",
        description: "Large-scale signage for a corporate client.",
        specs: ["Signage", "2025"],
      },
    ],
    faqs: [
      {
        question: "Is installation included?",
        answer: "Yes, we provide end-to-end installation services.",
      },
    ],
    cta: {
      title: "Book Your Installation",
      description: "Get professional installation for your project.",
      primaryButton: "Get Free Quote",
      secondaryButton: "Call Us Now",
    },
  },
  "annual-maintenance-contract": {
    title: "Annual Maintenance Contract (AMC)",
    tagline: "Reliable maintenance. Zero downtime.",
    description:
      "We offer comprehensive annual maintenance contracts to ensure smooth operation, timely servicing, and long-term reliability of your installations and infrastructure.",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    icon: Wrench,
    overview: {
      title: "End-to-End Maintenance Solutions",
      content:
        "Our AMC services ensure preventive care, quick issue resolution, and consistent performance throughout the year.",
      stats: [
        { icon: Wrench, value: "300+", label: "Assets Maintained" },
        { icon: UserCheck, value: "98%", label: "Client Retention" },
      ],
    },
    features: [
      {
        icon: ShieldCheck,
        title: "Preventive Maintenance",
        description: "Scheduled inspections to prevent unexpected breakdowns.",
        benefits: [
          "Regular health checks",
          "Reduced downtime",
          "Extended asset life",
        ],
      },
      {
        icon: Clock,
        title: "Quick Support",
        description:
          "Fast response for corrective maintenance and emergencies.",
        benefits: ["Priority support", "Minimal disruption", "Dedicated team"],
      },
      {
        icon: FileCheck,
        title: "Transparent Reporting",
        description: "Detailed service logs and maintenance reports.",
        benefits: [
          "Clear documentation",
          "Performance tracking",
          "Audit-ready records",
        ],
      },
    ],
    process: [
      {
        icon: ClipboardList,
        step: 1,
        title: "Asset Assessment",
        description: "Evaluate all systems and equipment to define scope.",
      },
      {
        icon: CalendarCheck,
        step: 2,
        title: "Maintenance Planning",
        description: "Create a customized annual service schedule.",
      },
      {
        icon: Wrench,
        step: 3,
        title: "Execution & Support",
        description:
          "Perform preventive and corrective maintenance as planned.",
      },
    ],
    portfolio: [
      {
        image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
        title: "Commercial Facility AMC",
        description: "One-year maintenance contract for a corporate building.",
        specs: ["Electrical", "Signage", "Infrastructure", "2025"],
      },
    ],
    faqs: [
      {
        question: "What is included in an AMC?",
        answer:
          "AMC includes preventive maintenance, breakdown support, inspections, and service reporting as per the contract.",
      },
      {
        question: "Is emergency support covered?",
        answer:
          "Yes, emergency and priority support are included based on the AMC plan.",
      },
    ],
    cta: {
      title: "Secure Your Assets with AMC",
      description:
        "Ensure uninterrupted operations with our trusted annual maintenance services.",
      primaryButton: "Request AMC Quote",
      secondaryButton: "Talk to Our Expert",
    },
  },
  consultancy: {
    title: "Consultancy",
    tagline: "Expert advice for project success.",
    description:
      "Our consultancy services guide you at every step for optimal outcomes.",
    gradient: "from-green-400 via-teal-400 to-blue-500",
    icon: UserCheck,
    overview: {
      title: "Professional Guidance",
      content: "Benefit from our years of industry experience.",
      stats: [
        { icon: UserCheck, value: "20+", label: "Years Experience" },
        { icon: ClipboardList, value: "1000+", label: "Projects Consulted" },
      ],
    },
    features: [
      {
        icon: UserCheck,
        title: "Personalized Solutions",
        description: "Tailored advice for your unique needs.",
        benefits: ["Project planning", "Cost optimization", "Risk management"],
      },
    ],
    process: [
      {
        icon: UserCheck,
        step: 1,
        title: "Consultation",
        description: "We understand your requirements and goals.",
      },
      {
        icon: ClipboardList,
        step: 2,
        title: "Strategy",
        description: "We provide a roadmap for project success.",
      },
    ],
    portfolio: [
      {
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
        title: "Retail Expansion",
        description: "Consultancy for a national retail chain.",
        specs: ["Retail", "2025"],
      },
    ],
    faqs: [
      {
        question: "What does consultancy include?",
        answer: "We offer project planning, budgeting, and technical advice.",
      },
    ],
    cta: {
      title: "Book a Consultation",
      description: "Let’s discuss your project goals.",
      primaryButton: "Get Free Quote",
      secondaryButton: "Call Us Now",
    },
  },
};

export default servicesData;
