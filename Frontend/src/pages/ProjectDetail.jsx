import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Layers,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Eye,
  Share2,
} from "lucide-react";
import { useGetAllGalleryQuery } from "../api/gallery.api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../utils/Loader";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  // Removed image modal state

  const { data: galleryData, isLoading } = useGetAllGalleryQuery();
  const project = galleryData?.data?.find((item) => item._id === id);

  // Demo images for gallery (you can replace with actual project images)
  const projectImages = project
    ? [
        project.image?.public_url,
        project.image?.public_url,
        project.image?.public_url,
        project.image?.public_url,
      ]
    : [];

  // Removed modal keydown handler and state

  useEffect(() => {
    window.scrollTo(0, 0);

    // Hero parallax effect
    const heroImage = heroRef.current?.querySelector(".hero-image");
    if (heroImage) {
      gsap.to(heroImage, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Stagger content animations
    gsap.fromTo(
      ".detail-animate",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    // Stats counter animation
    const counters = document.querySelectorAll(".stat-number");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      gsap.to(counter, {
        innerText: target,
        duration: 2,
        ease: "power1.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
        },
      });
    });
  }, [project]);

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToPreviousImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };

  // Removed image modal handlers

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <button
          onClick={() => navigate("/projects")}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Removed Back Button */}

      {/* Removed Share Button */}

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-screen overflow-hidden flex items-end"
      >
        {/* Hero Image with Parallax */}
        <div className="absolute inset-0">
          <img
            src={project.image?.public_url}
            alt={project.category}
            className="hero-image w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="detail-animate inline-block px-4 py-1.5 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            {project.category}
          </div>
          <h1 className="detail-animate text-5xl md:text-7xl font-black mb-6 leading-tight max-w-4xl">
            {project.title || "Digital Signage Installation"}
          </h1>
          <p className="detail-animate text-xl text-gray-300 max-w-2xl mb-8">
            A comprehensive digital signage solution transforming customer
            engagement and brand presence through innovative display technology.
          </p>

          {/* Quick Stats */}
          <div className="detail-animate flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Calendar size={20} className="text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Completed</div>
                <div className="text-lg font-bold">Dec 2024</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <MapPin size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Location</div>
                <div className="text-lg font-bold">Lucknow, India</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Layers size={20} className="text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Category</div>
                <div className="text-lg font-bold">{project.category}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Project Overview */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2">
              <h2 className="detail-animate text-3xl font-bold mb-6">
                Project <span className="text-green-400">Overview</span>
              </h2>
              <div className="detail-animate space-y-4 text-gray-300 leading-relaxed text-lg">
                <p>
                  This cutting-edge digital signage installation represents a
                  quantum leap in customer engagement technology. Deployed
                  across multiple high-traffic locations, the system delivers
                  dynamic, real-time content that adapts to viewer demographics
                  and environmental conditions.
                </p>
                <p>
                  The solution integrates seamlessly with existing
                  infrastructure while introducing advanced features such as
                  touch interactivity, motion sensing, and AI-powered content
                  optimization. Our team delivered a comprehensive package
                  including hardware installation, custom software development,
                  content management systems, and ongoing support.
                </p>
                <p>
                  Through strategic placement and compelling visual narratives,
                  this installation has transformed passive viewing spaces into
                  immersive brand experiences, resulting in measurable increases
                  in customer dwell time and engagement metrics.
                </p>
              </div>
            </div>

            {/* Project Stats */}
            <div className="detail-animate lg:sticky lg:top-32 h-fit">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6 text-green-400">
                  Key Metrics
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-black mb-1">
                      <span className="stat-number" data-target="150">
                        0
                      </span>
                      <span className="text-green-400">+</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Screens Deployed
                    </div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="text-4xl font-black mb-1">
                      <span className="stat-number" data-target="89">
                        0
                      </span>
                      <span className="text-green-400">%</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Engagement Increase
                    </div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="text-4xl font-black mb-1">
                      <span className="stat-number" data-target="24">
                        0
                      </span>
                      <span className="text-green-400">/7</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Uptime Reliability
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="detail-animate mb-20">
            <h2 className="text-3xl font-bold mb-8">
              Technologies <span className="text-green-400">& Tools</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "4K LED Displays",
                "Touch Interface",
                "Content CMS",
                "Cloud Sync",
                "Motion Sensors",
                "AI Analytics",
                "React.js",
                "Node.js",
              ].map((tech, i) => (
                <div
                  key={i}
                  className="group relative px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-green-500/50 transition-all cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <div className="relative text-center font-semibold">
                    {tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Gallery */}
          <div className="detail-animate">
            <h2 className="text-3xl font-bold mb-8">
              Project <span className="text-green-400">Gallery</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectImages.map((img, index) => (
                <div
                  key={index}
                  className="group relative aspect-video overflow-hidden rounded-2xl bg-white/5 border border-white/10"
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="detail-animate mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 border border-white/10 p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Transform Your Space?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can create a custom digital signage
                solution tailored to your unique needs and goals.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/30">
                  Start Your Project
                </button>
                <button
                  onClick={() => navigate("/projects")}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all"
                >
                  View More Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Removed Image Modal */}
    </div>
  );
};

export default ProjectDetail;
