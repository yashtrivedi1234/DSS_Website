import React from "react";
import {
  ArrowRight,
  Monitor,
  Zap,
  Palette,
  Shield,
  Star,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

export default function HomepageDark() {
  // Dummy project images (replace with API)
  const projects = ["/project1.jpg", "/project2.jpg", "/project3.jpg"];

  // Services
  const services = [
    {
      title: "Digital Signage",
      icon: Monitor,
      desc: "Modern display solutions using advanced LED screens.",
    },
    {
      title: "LED Display Walls",
      icon: Zap,
      desc: "High-brightness indoor & outdoor LED systems.",
    },
    {
      title: "Branding & Creative",
      icon: Palette,
      desc: "In-shop branding, retail displays, events & more.",
    },
  ];

  // Why Choose Us
  const features = [
    { icon: Shield, title: "Reliable & Trusted" },
    { icon: Star, title: "Premium Quality" },
    { icon: CheckCircle, title: "End-to-End Support" },
    { icon: Zap, title: "Fast Installation" },
  ];

  // Blog (dummy)
  const blogs = [
    { title: "Latest Trends in Digital Signage", img: "/blog1.jpg" },
    { title: "Benefits of LED Display Walls", img: "/blog2.jpg" },
    { title: "Smart Branding for Retail Stores", img: "/blog3.jpg" },
  ];

  return (
    <div className="bg-black text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden py-32 px-4">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-600 opacity-20 blur-[180px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600 opacity-20 blur-[160px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
            Advanced
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Digital Signage{" "}
            </span>
            Solutions
          </h1>

          <p className="text-gray-300 mt-4 max-w-xl text-lg">
            Upgrade your brand visibility with premium LED Displays, Signage,
            and Cutting-Edge Visual Branding.
          </p>

          <button className="mt-6 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white font-semibold hover:opacity-90 transition-all flex items-center gap-2">
            Explore Services <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ================= TEXT MARQUEE ================= */}
      <section className="overflow-hidden whitespace-nowrap py-6">
        <div className="flex animate-marquee gap-20 text-3xl font-semibold text-gray-200">
          {[
            "Digital Signage",
            "LED Walls",
            "Branding",
            "Shop Boards",
            "Event Display",
            "Custom Neon Lights",
          ].map((item, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <Zap className="text-green-400" /> {item}
            </span>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}</style>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-14">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              Services
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg hover:border-green-500/40 hover:scale-[1.02] transition-all shadow-lg"
                >
                  <Icon className="h-12 w-12 text-green-400 mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-14">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              Projects
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((img, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-2xl relative cursor-pointer"
              >
                <img
                  src={img}
                  className="rounded-2xl object-cover h-72 w-full group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 px-4 bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-14">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              Choose Us
            </span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="border border-white/10 rounded-xl p-8 text-center bg-black/30 hover:bg-white/10 transition-all"
                >
                  <Icon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BLOGS ================= */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-14">
            Latest{" "}
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Articles
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {blogs.map((b, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-green-500/40 transition-all"
              >
                <img src={b.img} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{b.title}</h3>
                  <button className="mt-3 flex items-center gap-2 text-green-400 hover:text-green-300">
                    Read More <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
