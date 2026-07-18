import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
  Home,
  Box,
  Layers,
  Maximize2,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useGetProductBySlugQuery } from "../api/product.api";
import Loader from "../utils/Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fetch Data
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetProductBySlugQuery(slug);
  const product = apiResponse?.data;

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
    if (product) {
      gsap.fromTo(
        ".animate-fade-up",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [product]);

  // --- Zoom Logic ---
  const handleImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const getProductImages = () => {
    if (product?.images && product.images.length > 0) {
      return product.images.map((img) => img.public_url);
    }
    return [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop",
    ];
  };

  // --- Specs Data (Hardcoded based on your snippet, or map from API if available) ---
  const specs = [
    { label: "Material", value: "Aluminium Alloy", icon: Layers },
    { label: "Color", value: "Matte Black", icon: Sparkles },
    { label: "Size", value: "120 x 80 cm", icon: Maximize2 },
    { label: "Warranty", value: "2 Years", icon: Shield },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
          <Eye className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Product Not Found</h3>
          <p className="text-gray-400 mb-6">
            The product you are looking for is unavailable.
          </p>
          <Link
            to="/products"
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = getProductImages();

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

      <div className="relative z-10 pt-28 pb-12 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-400 hover:border-white/20 transition-all">
            <Link
              to="/"
              className="hover:text-green-400 flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <Link
              to="/products"
              className="hover:text-green-400 transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-white font-medium truncate max-w-[150px]">
              {product.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* --- LEFT: Image Gallery --- */}
            <div className="animate-fade-up space-y-4">
              {/* Main Image Stage */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group">
                <div
                  className="w-full h-full cursor-crosshair relative"
                  onMouseMove={handleImageMouseMove}
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => setIsZooming(false)}
                >
                  <img
                    src={images[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop";
                    }}
                  />

                  {/* Lens Effect Overlay */}
                  {isZooming && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle 100px at ${zoomPosition.x}% ${zoomPosition.y}%, rgba(255,255,255,0.1) 0%, transparent 100%)`,
                      }}
                    />
                  )}
                </div>

                {/* Floating Zoom Portal */}
                {isZooming && (
                  <div className="absolute top-4 right-4 w-48 h-48 bg-gray-900 rounded-2xl shadow-2xl border-2 border-green-500 overflow-hidden z-20 pointer-events-none">
                    <div
                      className="w-full h-full bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url(${images[selectedImage]})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: "250%",
                      }}
                    />
                  </div>
                )}

                {/* Category Badge */}
                {product.category && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    {product.category}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 border-2 ${
                        selectedImage === index
                          ? "border-green-500 opacity-100 scale-105"
                          : "border-transparent opacity-60 hover:opacity-100 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={image}
                        alt="View"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* --- RIGHT: Product Details --- */}
            <div className="animate-fade-up space-y-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  {product.title}
                </h1>

                {/* Rating / Review Placeholder (Optional) */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">
                    Top Rated Product
                  </span>
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-3">
                {specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <spec.icon className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        {spec.label}
                      </span>
                    </div>
                    <div className="text-white font-semibold">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                <Link
                  to="/contact"
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 group"
                >
                  <ShoppingCart className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  <span>Request Quote</span>
                </Link>
                {/* <button className="px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                  <Heart className="w-6 h-6" />
                </button> */}
              </div>

              {/* Why Choose Us Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {[
                  {
                    icon: Truck,
                    title: "Free Consult",
                    sub: "Expert guidance",
                  },
                  { icon: Shield, title: "Warranty", sub: "2 Years assured" },
                  { icon: RefreshCw, title: "Support", sub: "24/7 Assistance" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/10 to-blue-500/10 flex items-center justify-center border border-white/10">
                      <item.icon className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- Description Section --- */}
          {product?.description && (
            <div className="animate-fade-up mt-20 pt-12 border-t border-white/10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Box className="text-green-400" /> Product Description
              </h3>

              <div
                className="prose prose-invert prose-lg max-w-none 
                prose-headings:text-white prose-headings:font-bold
                prose-p:text-gray-400 prose-p:leading-relaxed
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-gray-400 prose-li:marker:text-green-500
                bg-white/[0.02] p-8 rounded-3xl border border-white/5"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
