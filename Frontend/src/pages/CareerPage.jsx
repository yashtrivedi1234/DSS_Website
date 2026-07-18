import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Briefcase,
  Users,
  Trophy,
  Clock,
  Upload,
  ChevronRight,
  MapPin,
  AlertCircle,
  CheckCircle,
  Home,
  Sparkles,
  Search,
  DollarSign,
  BrainCircuit,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../utils/Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

const CareerPage = () => {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL_JOBS ?? "http://localhost:3000/api/v1";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobProfile: "",
    resume: null,
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [jobPositions, setJobPositions] = useState([]);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const hasFetched = useRef(false);

  // --- Fetch Jobs from API ---
  useEffect(() => {
    if (hasFetched.current) return;

    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(BACKEND_URL);
        setJobPositions(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsError(true);
        toast.error("Failed to load job positions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
    hasFetched.current = true;
  }, [BACKEND_URL]);

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
    gsap.fromTo(
      ".hero-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.jobProfile ||
      !formData.resume
    ) {
      setFormStatus({ submitted: false, error: true });
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      setIsSubmitting(true);
      await axios.post(BACKEND_URL, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Application submitted successfully!");
      setFormStatus({ submitted: true, error: false });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        jobProfile: "",
        resume: null,
      });
      document.getElementById("resumeUpload").value = "";
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to submit application"
      );
      setFormStatus({ submitted: false, error: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <div className="text-xl font-bold text-red-500 mb-4">
          Failed to load job positions
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
        >
          Retry
        </button>
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
              <span className="text-white font-medium">Careers</span>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="hero-animate text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500">
                Join Our Visionary Team
              </span>
            </h1>
            <p className="hero-animate text-gray-400 max-w-2xl mx-auto text-lg mb-8">
              Help us build the future of digital experiences and transform
              industries worldwide with cutting-edge technology.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("open-positions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hero-animate bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/20"
            >
              View Open Roles
            </button>
          </div>

          {/* --- Open Positions Section --- */}
          <div id="open-positions" className="mb-24 scroll-mt-32">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-green-400" />
              <h2 className="text-3xl font-bold">Current Openings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobPositions.map((job) => (
                <div
                  key={job.id}
                  className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.15)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <Briefcase className="w-6 h-6 text-green-400" />
                      </div>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Full Time
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {job.title}
                    </h3>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {job.location || "Remote"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        {job.salaryRange || "Competitive"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <BrainCircuit className="w-4 h-4 text-gray-500" />
                        {job.experience
                          ? `${job.experience} ${job.experienceType}`
                          : "Fresher"}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                    <button
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          jobProfile: job.title,
                        }));
                        document
                          .getElementById("application-form")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex-1 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowModal(true);
                      }}
                      className="flex-1 py-2 bg-white/5 text-white text-sm font-bold rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {jobPositions.length === 0 && (
              <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                <p className="text-gray-400">
                  No open positions at the moment. Check back later!
                </p>
              </div>
            )}
          </div>

          {/* --- Application Form Section --- */}
          <div
            id="application-form"
            className="scroll-mt-32 grid lg:grid-cols-2 gap-12 items-start mb-24"
          >
            {/* Left: Info */}
            <div className="hidden lg:block sticky top-32">
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/10 rounded-3xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full" />

                <h2 className="text-3xl font-bold mb-6 relative z-10">
                  Why Join Us?
                </h2>

                <div className="space-y-6 relative z-10">
                  {[
                    {
                      icon: Trophy,
                      title: "Impactful Work",
                      desc: "Solve real-world problems with advanced tech.",
                    },
                    {
                      icon: Users,
                      title: "Great Culture",
                      desc: "Collaborative, inclusive, and fun environment.",
                    },
                    {
                      icon: Clock,
                      title: "Flexibility",
                      desc: "Work-life balance that respects your time.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">Apply Now</h2>
              <p className="text-gray-400 mb-8 text-sm">
                Fill out the form below to start your journey.
              </p>

              {formStatus.submitted ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Application Sent!
                  </h3>
                  <p className="text-gray-400 mb-6">
                    We have received your details and will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() =>
                      setFormStatus({ submitted: false, error: false })
                    }
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formStatus.error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-red-400 text-sm">
                        Please fill out all required fields.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(
                          /[^A-Za-z ]/g,
                          ""
                        );
                        handleInputChange(e);
                      }}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder-gray-600"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder-gray-600"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          e.target.value = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 10);
                          handleInputChange(e);
                        }}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder-gray-600"
                        placeholder="9876543210"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Applying For
                    </label>
                    <div className="relative">
                      <select
                        name="jobProfile"
                        value={formData.jobProfile}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all appearance-none cursor-pointer"
                        required
                      >
                        <option value="" className="bg-gray-900 text-gray-500">
                          Select Position
                        </option>
                        {jobPositions.map((job) => (
                          <option
                            key={job.id}
                            value={job.title}
                            className="bg-gray-900 text-white"
                          >
                            {job.title}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronRight className="w-4 h-4 text-gray-500 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Resume (PDF/DOC)
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-green-500/50 hover:bg-white/5 transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-500 mb-2 group-hover:text-green-400 transition-colors" />
                        <p className="text-sm text-gray-400 text-center px-4">
                          {formData.resume ? (
                            <span className="text-green-400 font-medium">
                              {formData.resume.name}
                            </span>
                          ) : (
                            "Click to upload or drag and drop"
                          )}
                        </p>
                      </div>
                      <input
                        id="resumeUpload"
                        type="file"
                        name="resume"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        required
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 hover:shadow-green-500/20"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer CTA --- */}
      <div className="bg-black/80 backdrop-blur-md border-t border-white/10 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Don't see a fit?
          </h2>
          <p className="text-gray-400 mb-8">
            We are always looking for talent. Send your resume to our HR team
            directly.
          </p>
          <a
            href="mailto:hr@dss.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all text-white font-medium"
          >
            Email HR Team
          </a>
        </div>
      </div>

      {/* --- Modal --- */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-lg p-8 relative shadow-2xl animate-fade-in max-h-[80vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2 pr-8">
              {selectedJob.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-green-400 mb-6">
              <MapPin className="w-4 h-4" /> {selectedJob.location}
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-gray-300 mb-8">
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedJob.description || "No description provided.",
                }}
              />
            </div>

            <button
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  jobProfile: selectedJob.title,
                }));
                setShowModal(false);
                document
                  .getElementById("application-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Apply for this Role
            </button>
          </div>
        </div>
      )}

      <style>{`
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-move 5s ease infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        @keyframes gradient-move { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
      `}</style>
    </div>
  );
};

export default CareerPage;
