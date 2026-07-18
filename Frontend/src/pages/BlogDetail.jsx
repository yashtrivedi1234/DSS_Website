import React, { useState, useEffect } from "react";
import TextToSpeechPlayer from "../components/TextToSpeechPlayer";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Tag,
  Clock,
  ArrowLeft,
  Home,
  ChevronRight,
  User,
  Share2,
  Sparkles,
  Heart,
  MessageCircle,
  Bookmark,
  TrendingUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  X as CloseIcon,
} from "lucide-react";
import { useGetAllBlogsQuery } from "../api/blog.api";
import formatDate from "../utils/FormateDate";
import Loader from "../utils/Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);


  // Fetch all blogs
  const { data: blogData, isLoading, isError } = useGetAllBlogsQuery();


  // --- Scroll Progress ---
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (blogData) {
      gsap.fromTo(
        ".animate-up",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Parallax effect for hero image
      gsap.to(".hero-image", {
        scrollTrigger: {
          trigger: ".hero-image",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 100,
        scale: 1.1,
      });
    }
  }, [blogData, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white px-4">
        <div className="text-2xl font-bold text-red-400 mb-4">
          Failed to load blog.
        </div>
        <button
          onClick={() => navigate("/blog")}
          className="px-8 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-all font-medium"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  const blog = blogData?.data?.find((item) => item.slug === slug);
  const extractTextFromHTML = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const speechText = blog
    ? `${blog.title}. ${extractTextFromHTML(blog.description)}`
    : "";
  const relatedBlogs = blogData?.data?.filter(
    (item) => item.slug !== blog?.slug
  );

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white px-4">
        <div className="text-2xl font-bold text-red-400 mb-4">
          Blog Not Found!
        </div>
        <button
          onClick={() => navigate("/blog")}
          className="px-8 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-all font-medium"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden text-white selection:bg-green-500/30">
      <TextToSpeechPlayer text={speechText} autoPlay={false} />
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>


      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className="absolute w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] animate-pulse"
            style={{
              top: "-15%",
              left: "15%",
              transform: `translate(${mousePosition.x * 0.03}px, ${
                mousePosition.y * 0.03
              }px)`,
              animationDuration: "4s",
            }}
          />
          <div
            className="absolute w-[700px] h-[700px] bg-blue-500/8 rounded-full blur-[140px] animate-pulse"
            style={{
              bottom: "-15%",
              right: "5%",
              transform: `translate(${-mousePosition.x * 0.02}px, ${
                -mousePosition.y * 0.02
              }px)`,
              animationDuration: "5s",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-[100px] animate-pulse"
            style={{
              top: "40%",
              right: "20%",
              transform: `translate(${mousePosition.x * 0.015}px, ${
                mousePosition.y * 0.015
              }px)`,
              animationDuration: "6s",
            }}
          />
        </div>

        {/* Subtle Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 pt-20 pb-20 lg:pt-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav className="animate-up inline-flex items-center gap-2.5 px-5 py-2.5 mb-12 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] text-sm text-gray-400 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 shadow-xl">
            <Link
              to="/"
              className="hover:text-green-400 flex items-center gap-1.5 transition-colors duration-200"
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <Link
              to="/blog"
              className="hover:text-green-400 transition-colors duration-200"
            >
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-white font-medium truncate max-w-[200px]">
              {blog.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-20">
            {/* --- Main Content (Left) --- */}
            <div className="lg:col-span-8 animate-up space-y-12">
              {/* Header Section */}
              <div className="space-y-8">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full text-sm font-semibold text-green-400 backdrop-blur-sm">
                  <Tag className="w-3.5 h-3.5" />
                  {blog.category || "Article"}
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
                  {blog.title}
                </h1>

                {/* Meta Info Bar */}
                <div className="flex flex-wrap items-center gap-8 text-sm text-gray-400 py-8 border-y border-white/10">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/10">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-base">
                        Admin
                      </span>
                      <span className="text-xs text-gray-500">
                        Content Creator
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-8 bg-white/10" />

                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="font-medium">
                      {formatDate(blog.updatedAt)}
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">5 min read</span>
                  </div>
                </div>
              </div>

              {/* Featured Image with Parallax */}
              <div className="relative group overflow-hidden rounded-3xl">
                <div className="hero-image relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                  <img
                    src={
                      blog?.image?.public_url ||
                      `${backendUrl}/${blog?.image?.url}`
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent opacity-60" />
                </div>

                {/* Floating Action Buttons on Image */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                      isBookmarked
                        ? "bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/50"
                        : "bg-black/40 border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        isBookmarked ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <article className="relative">
                <div
                  className="prose prose-invert prose-xl max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white 
                  prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-tight
                  prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-5
                  prose-h4:text-2xl prose-h4:mt-10 prose-h4:mb-4
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                  prose-a:text-green-400 prose-a:no-underline prose-a:font-medium 
                  hover:prose-a:text-green-300 hover:prose-a:underline prose-a:transition-all prose-a:decoration-2 prose-a:underline-offset-4
                  prose-strong:text-white prose-strong:font-bold
                  prose-ul:my-8 prose-ul:text-gray-300 prose-li:my-3 prose-li:text-lg prose-li:marker:text-green-500
                  prose-ol:my-8 prose-ol:text-gray-300
                  prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-12
                  prose-blockquote:border-l-4 prose-blockquote:border-l-green-500 
                  prose-blockquote:bg-gradient-to-r prose-blockquote:from-white/5 prose-blockquote:to-transparent
                  prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:my-10
                  prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-gray-300
                  prose-code:text-green-400 prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 
                  prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:font-normal
                  prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl 
                  prose-pre:p-6 prose-pre:my-10 prose-pre:shadow-xl"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />
              </article>

              {/* Engagement Section */}
              <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all duration-300 border border-white/5 hover:border-white/10">
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">24</span>
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all duration-300 border border-white/5 hover:border-white/10">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">8</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 rounded-xl text-white font-semibold transition-all duration-300 border border-green-500/30">
                  <Share2 className="w-5 h-5" />
                  Share Article
                </button>
              </div>

              {/* Navigation Footer */}
              <div className="pt-12 border-t border-white/10">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group text-lg font-medium"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all duration-300">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  </div>
                  Back to All Articles
                </Link>
              </div>
            </div>

            {/* --- Sidebar (Right) --- */}
            <div className="lg:col-span-4 animate-up">
              <div className="sticky top-24 space-y-8">
                {/* Author Card - Enhanced */}
                <div className="relative overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl group hover:border-white/20 transition-all duration-500">
                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center gap-5 mb-5">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl ring-4 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
                          <User className="w-8 h-8" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-gray-950 shadow-lg" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">
                          Admin
                        </h4>
                        <p className="text-sm text-gray-400 font-medium">
                          Content Creator
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">
                      Sharing insights on digital signage, technology trends,
                      and innovation in visual communication.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span>125 Posts</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-600" />
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>2.4K Likes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Articles - Enhanced */}
                <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:border-white/20 transition-all duration-500">
                  <div className="flex items-center justify-between mb-7">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-green-400" />
                      Related
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {relatedBlogs?.slice(0, 4).map((relatedBlog) => (
                      <Link
                        to={`/blog-detail/${relatedBlog.slug}`}
                        key={relatedBlog._id}
                        className="group flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
                      >
                        <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10">
                          <img
                            src={
                              relatedBlog?.image?.public_url ||
                              `${backendUrl}/${relatedBlog?.image?.url}`
                            }
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex flex-col justify-center gap-2 flex-1 min-w-0">
                          <div className="text-xs text-green-400 font-semibold uppercase tracking-wide">
                            {formatDate(relatedBlog.updatedAt)}
                          </div>
                          <h4 className="text-sm font-bold text-gray-200 group-hover:text-white line-clamp-2 leading-snug transition-colors duration-300">
                            {relatedBlog.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter CTA - Enhanced */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-600/20 via-emerald-600/15 to-blue-600/20 border border-green-500/30 rounded-3xl p-8 text-center shadow-2xl hover:border-green-500/50 transition-all duration-500">
                  {/* Decorative Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />

                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl ring-4 ring-green-500/10">
                      <Sparkles className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Stay in the Loop
                    </h3>
                    <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                      Get exclusive insights, trends, and stories delivered
                      straight to your inbox every week.
                    </p>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-black/30 border border-white/20 rounded-xl px-5 py-3.5 text-sm text-white mb-4 focus:outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all placeholder:text-gray-500 font-medium"
                    />
                    <button className="w-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all text-sm tracking-wide uppercase hover:scale-[1.02] active:scale-[0.98]">
                      Subscribe Now
                    </button>
                    <p className="text-xs text-gray-400 mt-4">
                      Join 2,500+ subscribers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
