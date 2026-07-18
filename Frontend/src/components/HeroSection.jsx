import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Monitor, Zap, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import bread from '../assets/bread.jpg'
import {Link} from 'react-router-dom'
const   HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: bread,
      title: "Transform Your Brand with",
      highlight: "3S Digital Signage Solutions",
      subtitle: "Leading digital signage company in Lucknow providing cutting-edge LED walls, outdoor displays, and interactive digital solutions since 2021.",
      buttonText: "View Our Work"
    },
    {
      id: 3,
      image: bread,
      title: "Elevate Your Space with",
      highlight: "Smart Digital Solutions",
      subtitle: "From corporate offices to retail spaces, our intelligent digital signage solutions create immersive experiences that leave lasting impressions.",
      buttonText: "View Our Work"
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative lg:h-screen h-[70vh] overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute lg:block hidden left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute lg:block hidden right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Hero Content */}
      <div className="relative lg:mt-20 mt-12 z-10 flex items-center justify-center lg:min-h-screen px-6 lg:px-8 pt-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Title with Animation */}
          <div className="lg:mb-8 mb-2 overflow-hidden">
            <h1 
              key={currentSlide}
              className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up"
            >
              <span className="text-white text-xl md:text-6xl lg:text-7xl block mb-2">
                {currentSlideData.title}
              </span>
              <span className="bg-gradient-to-r from-green-500  to-blue-500 bg-clip-text text-transparent block">
                {currentSlideData.highlight}
              </span>
            </h1>
          </div>

          {/* Subtitle with Animation */}
          <div className="lg:mb-12 mb-6 overflow-hidden">
            <p 
              key={`subtitle-${currentSlide}`}
              className="text-base md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200"
            >
              {currentSlideData.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div data-aos="fade-up"
              data-aos-delay={100} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/projects" className="group px-6 py-3 bg-white text-gray-900 hover:text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500">
              <span className="flex items-center">
                {currentSlideData.buttonText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link to="/contact" className="group cursor-pointer flex items-center px-12 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              {/* <Play className="w-5 h-5 mr-2" /> */}
              Contact Us
            </Link>
          </div>

          {/* Slide Indicators */}
          <div className="lg:flex hidden justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div> 
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;