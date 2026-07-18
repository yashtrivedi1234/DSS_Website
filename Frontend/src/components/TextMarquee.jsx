import React from 'react';
import { Star, Zap, Monitor, Palette, Settings, Award } from 'lucide-react';

export default function TextMarquee() {
  const signageServices = [
    { text: "Digital Signage Solutions", icon: Monitor },
    { text: "LED Display Boards", icon: Zap },
    { text: "Outdoor Advertising", icon: Star },
    { text: "Custom Neon Signs", icon: Palette },
    { text: "3D Letter Signage", icon: Settings },
    { text: "Premium Quality Prints", icon: Award },
    { text: "Corporate Branding", icon: Star },
    { text: "Shop Front Signage", icon: Monitor },
    { text: "Interior Signage", icon: Palette },
    { text: "Wayfinding Solutions", icon: Settings },
    { text: "Illuminated Signs", icon: Zap },
    { text: "Vehicle Graphics", icon: Award }
  ];

  return (
    <div className="bg-black text-white overflow-hidden py-6 mb-2 relative">
      {/* Main marquee */}
      <div className="flex animate-marquee whitespace-nowrap">
        {signageServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div key={index} className="flex items-center mx-8">
              <IconComponent className="w-8 h-8 text-white mr-3" />
              <span className="lg:text-3xl text-2xl font-semibold tracking-wide">
                {service.text}
              </span>
              {/* <Star className="w-4 h-4 text-yellow-400 ml-4" /> */}
            </div>
          );
        })}
      </div>
      
  
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}