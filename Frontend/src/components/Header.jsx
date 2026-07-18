import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/DSS_logo.png";
import { Link, useNavigate } from "react-router-dom";
import EnquiryModal from "./EnquiryModal"; // Import your modal component

export default function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isEnquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "About DSS",
      dropdown: [
        { name: "Our Brandstory", path: "/about/story" },
        { name: "Director Message", path: "/about/director-message" },
        { name: "Vision & Mission", path: "/about/vision&mission" },
        { name: "Our Team", path: "/about/team" },
      ],
    },
    {
      name: "Our Product",
      dropdown: [
        {
          name: "Signages",
          dropdown: [
            { name: "Outdoor Signage", path: "/products/outdoor-signage" },
            { name: "Indoor Signage", path: "/products/indoor-signage" },
            { name: "High Rise Signage", path: "/products/high-rise-signage" },
          ],
        },
        { name: "Fabrication", path: "/products/fabrication" },
        { name: "ACP Work", path: "/products/acp-work" },
      ],
    },
    {
      name: "Our Services",
      dropdown: [
        { name: "Recce Work", path: "/services/recce-work" },
        { name: "Design Work", path: "/services/design-work" },
        { name: "Installation Work", path: "/services/installation-work" },
        {
          name: "Annual Maintenance Contract (AMC)",
          path: "/services/annual-maintenance-contract",
        },
        { name: "Consultancy", path: "/services/consultancy" },
      ],
    },
    { name: "Our Project", path: "/projects" },
    { name: "Clients", path: "/client" },
    { name: "Testimonial", path: "/testimonial" },
    { name: "Latest Articles", path: "/blog" },
    // { name: "Careers", path: "/career" },
    { name: "Contact Us", path: "/contact" },
      { name: "Login CRM", external: true, url: "https://crm.dssup.in/" },
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const handleLogoClick = () => {
    navigate("/");
    setMobileOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const handleEnquiryButtonClick = () => {
    setEnquiryModalOpen(true);
  };

  return (
    <>
      <style>{`
        /* Mobile menu animation */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu-enter {
          animation: slideDown 0.3s ease-out;
        }

        /* Custom scrollbar for mobile menu */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Smooth transitions */
        .header-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Dropdown animations */
        .dropdown-enter {
          animation: slideDown 0.2s ease-out;
        }

        /* Responsive font sizes */
        @media (max-width: 374px) {
          .responsive-logo {
            height: 2.5rem !important;
          }
          
          .responsive-header {
            height: 3.5rem !important;
          }
        }

        @media (min-width: 375px) and (max-width: 639px) {
          .responsive-logo {
            height: 3rem;
          }
          
          .responsive-header {
            height: 4rem;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .responsive-logo {
            height: 3.5rem;
          }
          
          .responsive-header {
            height: 5rem;
          }
        }

        @media (min-width: 1024px) and (max-width: 1279px) {
          .nav-item-text {
            font-size: 0.8rem;
          }
          
          .nav-gap {
            gap: 0.75rem;
          }
        }

        @media (min-width: 1280px) and (max-width: 1535px) {
          .nav-item-text {
            font-size: 0.875rem;
          }
          
          .nav-gap {
            gap: 1rem;
          }
        }

        @media (min-width: 1536px) {
          .nav-item-text {
            font-size: 1rem;
          }
          
          .nav-gap {
            gap: 1.5rem;
          }
        }

        /* Accessibility - Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .header-border {
            border-bottom: 2px solid white;
          }
          
          .nav-hover:hover {
            text-decoration: underline;
          }
        }

        /* Focus visible for accessibility */
        .focus-visible:focus-visible {
          outline: 2px solid #4ade80;
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-40 bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg header-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between responsive-header h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={logo}
                alt="DSS Logo"
                className="responsive-logo h-12 sm:h-14 md:h-16 cursor-pointer bg-white px-2 py-1 rounded focus-visible"
                onClick={handleLogoClick}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleLogoClick();
                  }
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center nav-gap gap-4 xl:gap-6 text-white font-medium">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-green-400 header-transition py-2 whitespace-nowrap nav-item-text text-sm nav-hover focus-visible">
                    {item.external ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                        tabIndex={0}
                      >
                        {item.name}
                      </a>
                    ) : item.path ? (
                      <Link
                        to={item.path}
                        className="inline-block"
                        tabIndex={0}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span tabIndex={0}>{item.name}</span>
                    )}

                    {item.dropdown && (
                      <ChevronDown
                        size={14}
                        className="header-transition group-hover:rotate-180"
                      />
                    )}
                  </div>

                  {/* Desktop Dropdown */}
                  {item.dropdown && (
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible header-transition pointer-events-none group-hover:pointer-events-auto">
                      <div className="bg-black/90 backdrop-blur-md shadow-2xl rounded-lg py-2 w-52 border border-white/20 dropdown-enter">
                        {item.dropdown.map((sub, i) => (
                          <div key={i} className="relative group/sub">
                            {sub.path ? (
                              <Link
                                to={sub.path}
                                className="flex items-center justify-between px-4 py-2.5 text-white hover:bg-white/15 hover:text-green-400 header-transition text-sm focus-visible"
                                tabIndex={0}
                              >
                                {sub.name}
                              </Link>
                            ) : (
                              <span className="flex items-center justify-between px-4 py-2.5 text-white cursor-default text-sm">
                                {sub.name}
                                {sub.dropdown && (
                                  <ChevronDown
                                    size={14}
                                    className="ml-2 transition-transform duration-300 group-hover/sub:rotate-180"
                                  />
                                )}
                              </span>
                            )}

                            {sub.dropdown && (
                              <div className="absolute left-full top-0 ml-1 opacity-0 invisible scale-95 group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:scale-100 header-transition origin-left">
                                <div className="bg-black/90 backdrop-blur-md shadow-2xl rounded-lg py-2 w-56 border border-white/20">
                                  {sub.dropdown.map((child, j) => (
                                    <Link
                                      key={j}
                                      to={child.path}
                                      className="block px-4 py-2.5 text-white hover:bg-white/15 hover:text-green-400 header-transition text-sm focus-visible"
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Enquiry Button */}
              <button
                onClick={handleEnquiryButtonClick}
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white font-medium rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap text-sm focus-visible"
                tabIndex={0}
              >
                Enquiry Now
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg header-transition focus-visible"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <div className="relative w-7 h-7">
                <Menu
                  size={28}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileOpen
                      ? "opacity-0 rotate-90 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  size={28}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-75"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-black/95 backdrop-blur-lg text-white border-t border-gray-700 header-transition ${
            mobileOpen
              ? "max-h-[calc(100vh-4rem)] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="overflow-y-auto max-h-[calc(100vh-4rem)] px-4 py-4 space-y-1 custom-scrollbar mobile-menu-enter">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-white/10 last:border-b-0"
              >
                <div
                  className="flex justify-between items-center py-3 cursor-pointer hover:bg-white/5 px-2 rounded header-transition focus-visible"
                  onClick={() => {
                    if (item.dropdown) {
                      setActiveDropdown(
                        activeDropdown === index ? null : index
                      );
                    } else if (item.external) {
                      window.open(item.url, "_blank", "noopener,noreferrer");
                      closeMobileMenu();
                    } else if (item.path) {
                      navigate(item.path);
                      closeMobileMenu();
                    }
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (item.dropdown) {
                        setActiveDropdown(
                          activeDropdown === index ? null : index
                        );
                      } else if (item.external) {
                        window.open(item.url, "_blank", "noopener,noreferrer");
                        closeMobileMenu();
                      } else if (item.path) {
                        navigate(item.path);
                        closeMobileMenu();
                      }
                    }
                  }}
                >
                  {item.external && !item.dropdown ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="text-base sm:text-lg font-medium flex-1"
                      tabIndex={-1}
                    >
                      {item.name}
                    </a>
                  ) : item.path && !item.dropdown ? (
                    <Link
                      to={item.path}
                      onClick={closeMobileMenu}
                      className="text-base sm:text-lg font-medium flex-1"
                      tabIndex={-1}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-base sm:text-lg font-medium flex-1">
                      {item.name}
                    </span>
                  )}

                  {item.dropdown && (
                    <ChevronDown
                      size={20}
                      className={`header-transition ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Mobile Dropdown */}
                {item.dropdown && (
                  <div
                    className={`ml-4 space-y-1 header-transition overflow-hidden ${
                      activeDropdown === index
                        ? "max-h-96 opacity-100 mb-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.dropdown.map((sub, i) => (
                      <Link
                        key={i}
                        to={sub.path}
                        onClick={closeMobileMenu}
                        className="block py-2 px-3 text-sm sm:text-base text-gray-300 hover:text-green-400 hover:bg-white/5 rounded header-transition focus-visible"
                        tabIndex={activeDropdown === index ? 0 : -1}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Enquiry Modal */}
        <EnquiryModal
          isOpen={isEnquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
        />
      </header>
    </>
  );
}
