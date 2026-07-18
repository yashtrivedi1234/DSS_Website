import React, { useEffect, useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ExternalLink,
  QrCode,
  ChevronUp,
} from "lucide-react";
import logo from "../assets/DSS_logo.png";
import cclogo from "../assets/cc-logo.png";
import { Link } from "react-router-dom";
import services from "../data//ServiceData.jsx";
import { useNewsCreateMutation } from "../api/inquiry.api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import servicesData from "../data//ServiceData.jsx";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [addSubscriber, { isLoading, isError }] = useNewsCreateMutation();
  const branches = [
    {
      name: "Lucknow (Chinhat)",
      address: "Chinhat, Lucknow",
      slug: "lucknow-chinhat",
    },
    {
      name: "Lucknow (Thakurganj)",
      address: "Thakurganj, Lucknow",
      slug: "lucknow-thakurganj",
    },
    {
      name: "Barabanki",
      address: "Barabanki",
      slug: "barabanki",
    },
    {
      name: "Azamgarh (Saraimeer)",
      address: "Saraimeer, Azamgarh",
      slug: "azamgarh-saraimeer",
    },
    {
      name: "Azamgarh (Narouli)",
      address: "Narouli, Azamgarh",
      slug: "azamgarh-narouli",
    },
    {
      name: "Azamgarh (Mukeriganj)",
      address: "Mukeriganj, Azamgarh",
      slug: "azamgarh-mukeriganj",
    },
    {
      name: "Sultanpur (Kadipur)",
      address: "Kadipur, Sultanpur",
      slug: "sultanpur-kadipur",
    },
  ];

  console.log("Service data :", servicesData);

  const quickLinks = [
    { name: "About Us", href: "/about/story", external: false },
    { name: "Careers", href: "/career", external: false },
    { name: "Blog", href: "/blog", external: false },
    // { name: "CRM", href: "https://dss-crm.onrender.com", external: true },
    {
      name: "Admin Login",
      href: "https://dssup.in/admin",
      external: true,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        toast.error("Email is required");
        return;
      }

      if (!emailRegex.test(email)) {
        toast.error("Invalid email format");
        return;
      }
      await addSubscriber({ formData: { email } }).unwrap();
      toast.success("Email submitted successfully");
      setEmail("");
    } catch (err) {
      toast.error(
        `${err?.messsage || err?.data?.message || "Something went wrong"}`
      );
      console.error(err);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-black via-neutral-900 to-neutral-950 text-white">
      {/* Newsletter Signup */}
      <div className=" py-8 px-4 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Stay Updated with Latest Digital Signage Trends
          </h3>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter for industry insights, product updates,
            and exclusive offers.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              placeholder="Enter your email address"
              onChange={handleChange}
              className="flex-1 px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white font-medium rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* Contact Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Get In Touch
                <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 mt-2"></div>
              </h3>
              <a
                href="https://maps.app.goo.gl/FvbzrGGVEzE9Ueh67"
                target="_blank"
                className="flex items-center text-gray-300"
              >
                <MapPin className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">
                  Near Yamaha Showroom, Chinhat Tiraha, Faizabad Road, Lucknow
                </span>
              </a>
              <div className="flex flex-col space-y-1">
                <a
                  href="tel:9236477974"
                  target="_blank"
                  className="flex items-center text-gray-300"
                >
                  <Phone className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm tracking-wide">+91-9236477974</span>
                </a>

                <a
                  href="tel:6386901011"
                  target="_blank"
                  className="flex items-center text-gray-300 ml-8"
                >
                  <span className="text-sm tracking-wide">+91-6386901011</span>
                </a>
              </div>
              <a
                href="mailto:info@dssup.in"
                target="_blank"
                className="flex items-center text-gray-300"
              >
                <Mail className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">info@dssup.in</span>
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Our Services
              <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 mt-2"></div>
            </h3>
            <div className="space-y-2">
              {Object.values(servicesData)
                .slice(0, 8)
                .map((service, index) => (
                  <Link
                    key={index}
                    to={`/services/${
                      service?.slug ||
                      service?.title?.toLowerCase().replace(/\s+/g, "-")
                    }`}
                    className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                  >
                    <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
            </div>
          </div>

          {/* Our Branches */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Our Branches
              <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 mt-2"></div>
            </h3>
            <div className="space-y-2">
              {branches.map((branch, index) => (
                <Link
                  key={index}
                  to={`/branches/${branch.slug}`}
                  title={branch.address}
                  className="group flex items-center cursor-pointer"
                >
                  <h4 className="text-sm font-medium text-white mb-0.5 group-hover:text-green-400 transition-colors">
                    {branch.name}
                  </h4>
                  <ExternalLink className="h-3 w-3 ml-1 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links & Social */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
              <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 mt-1"></div>
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {quickLinks.map((link, index) =>
                link.external ? (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                )
              )}
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  {
                    Icon: Facebook,
                    href: "https://www.facebook.com/digitalsignagesolutionsup/",
                    color: "hover:text-blue-400",
                  },
                  {
                    Icon: Instagram,
                    href: "https://www.instagram.com/digitalsignagesolutiions/",
                    color: "hover:text-pink-400",
                  },
                  {
                    Icon: Linkedin,
                    href: "https://www.linkedin.com/company/digitalsignagesolutionsup",
                    color: "hover:text-blue-600",
                  },
                  {
                    Icon: Youtube,
                    href: "https://www.youtube.com/@DigitalSignageSolutions",
                    color: "hover:text-red-500",
                  },
                ].map(({ Icon, href, color }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="justify-center text-xs lg:text-sm text-neutral-300 items-center lg:flex gap-2">
              Copyright © {currentYear} 3S Digital Signage Solutions. All rights
              reserved. Designed By
              <Link
                className="inline-flex"
                aria-label="Code Crafter"
                to="https://www.codecrafter.co.in/"
                target="_blank"
              >
                <img
                  src={cclogo}
                  className="lg:w-24 md:w-20 w-18 mt-2 md:mt-0 transition transform hover:scale-105"
                  alt="CodeCrafter Logo"
                />
              </Link>
            </div>
            <div className="flex space-x-6 lg:my-0 my-2 lg:text-sm text-xs">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookie-policy"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 lg:w-12 w-10 h-10 lg:h-12 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
        >
          <ChevronUp className="h-5 w-5 " />
        </button>
      )}
    </footer>
  );
};

export default Footer;
