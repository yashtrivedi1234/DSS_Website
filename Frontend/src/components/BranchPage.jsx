import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Navigation,
  Building2,
  ChevronRight,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BranchPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const branches = [
    {
      name: "Lucknow (Chinhat)",
      slug: "lucknow-chinhat",
      address: "Near Yamaha Showroom, Chinhat Tiraha, Faizabad Road, Lucknow",
      area: "Chinhat",
      city: "Lucknow",
      phone: ["+91-9236477974", "+91-6386901011"],
      email: "info@dssup.in",
      timings: "Mon - Sat: 10:00 AM - 7:00 PM",
      mapUrl: "https://maps.app.goo.gl/FvbzrGGVEzE9Ueh67",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Lucknow (Thakurganj)",
      slug: "lucknow-thakurganj",
      address: "Thakurganj, Lucknow",
      area: "Thakurganj",
      city: "Lucknow",
      phone: ["+91-9236477974", "+91-6386901011"],
      email: "info@dssup.in",
      timings: "Mon - Sat: 10:00 AM - 7:00 PM",
      mapUrl: "#",
      gradient: "from-green-500 to-teal-500",
    },
    {
      name: "Barabanki",
      slug: "barabanki",
      address: "Barabanki",
      area: "Central",
      city: "Barabanki",
      phone: ["+91-9236477974", "+91-6386901011"],
      email: "info@dssup.in",
      timings: "Mon - Sat: 10:00 AM - 7:00 PM",
      mapUrl: "#",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Azamgarh (Saraimeer)",
      slug: "azamgarh-saraimeer",
      address: "Saraimeer, Azamgarh",
      area: "Saraimeer",
      city: "Azamgarh",
      phone: ["+91-9236477974", "+91-6386901011"],
      email: "info@dssup.in",
      timings: "Mon - Sat: 10:00 AM - 7:00 PM",
      mapUrl: "#",
      gradient: "from-orange-500 to-red-500",
    },
    {
      name: "Azamgarh (Narouli)",
      slug: "azamgarh-narouli",
      address: "Narouli, Azamgarh",
      area: "Narouli",
      city: "Azamgarh",
      phone: ["+91-9236477974", "+91-6386901011"],
      email: "info@dssup.in",
      timings: "Mon - Sat: 10:00 AM - 7:00 PM",
      mapUrl: "#",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      name: "Azamgarh ()",
      slug: "azamgarh-Mukeriganj",
      address: "Mukeriganj, Azamgarh",
      area: "Mukeriganj",
      city: "Azamgarh",
      phone: ["+91-9236477974", "+91-6386901011"],
      email: "info@dssup.in",
      timings: "Mon - Sat: 10:00 AM - 7:00 PM",
      mapUrl: "#",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      name: "Sultanpur (Kadipur)",
      slug: "sultanpur-kadipur",
      address: "Kadipur, Sultanpur",
      area: "Kadipur",
      city: "Sultanpur",
      phone: ["+91-9236477974", "+91-6386901011"],
      email: "info@dssup.in",
      timings: "Mon - Sat: 10:00 AM - 7:00 PM",
      mapUrl: "#",
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        const cards = document.querySelectorAll(".branch-card");
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-black via-gray-900 to-black min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 md:pt-40 pb-12 md:pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-6">
            <Building2 className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">
              7 Locations Across Uttar Pradesh
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6">
            <span className="block text-white">Our Branches</span>
          </h1>

          {/* Subtitle */}
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6" />
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Visit us at any of our locations to experience our premium digital
            signage solutions and exceptional customer service
          </p>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="relative z-10 py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="branch-card group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    branch.gradient
                  } opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-2xl ${
                    hoveredIndex === index ? "scale-110" : "scale-100"
                  }`}
                />

                {/* Card */}
                <div className="relative h-full p-6 md:p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-500 group-hover:border-white/30 group-hover:-translate-y-2">
                  {/* Decorative Corner */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${branch.gradient} opacity-20 rounded-bl-full`}
                  />

                  {/* Icon */}
                  <div
                    className={`relative w-16 h-16 bg-gradient-to-br ${branch.gradient} rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <MapPin className="w-8 h-8 text-white" />
                  </div>

                  {/* Branch Name */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {branch.name}
                  </h3>

                  {/* Underline */}
                  <div
                    className={`w-16 h-1 bg-gradient-to-r ${branch.gradient} mb-4 transition-all duration-500 group-hover:w-full`}
                  />

                  {/* Address */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <Navigation className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Address</p>
                        <p className="text-gray-300">{branch.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* City Badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${branch.gradient} text-white`}
                    >
                      {branch.city}
                    </span>
                    <span className="text-xs text-gray-400">{branch.area}</span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <div className="flex flex-col gap-1">
                        {branch.phone.map((phone, idx) => (
                          <a
                            key={idx}
                            href={`tel:${phone}`}
                            className="hover:text-green-400 transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span>{branch.timings}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className="group/btn w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white transition-all duration-300"
                    onClick={() =>
                      branch.mapUrl !== "#"
                        ? window.open(branch.mapUrl, "_blank")
                        : window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              branch.address
                            )}`,
                            "_blank"
                          )
                    }
                  >
                    <span className="text-sm font-semibold">
                      Get Directions
                    </span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative z-10 py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-lg border border-green-500/20 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <Mail className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Can't Find Your Location?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                We're expanding across Uttar Pradesh. Contact us to discuss how
                we can serve your digital signage needs in your area.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2"
                  onClick={() => (window.location.href = "/contact")}
                >
                  <Phone className="w-5 h-5" />
                  Contact Us
                </button>
                <button
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  onClick={() =>
                    (window.location.href = "/franchise-application")
                  }
                >
                  <Building2 className="w-5 h-5" />
                  Franchise Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "7+", label: "Active Branches" },
              { number: "5+", label: "Cities Covered" },
              { number: "2000+", label: "Happy Clients" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:border-white/20 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BranchPage;
