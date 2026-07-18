import React, { useState } from "react";
import { Star, Quote } from "lucide-react";

const TestimonialSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const testimonials = [
    {
      id: 1,
      quote: "It was amazing signage service given by them",
      name: "Victor Wilson",
      position: "Security Head",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
      bgColor: "bg-gray-800",
    },
    {
      id: 2,
      quote: "Installation process such pleasant experience!",
      name: "Alex Martin",
      position: "Main Director",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
      bgColor: "bg-yellow-400",
      textColor: "text-black",
    },
    {
      id: 3,
      quote: "Vemlo has completed high standard the project",
      name: "Alena Cartin",
      position: "Main Director",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b412?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
      bgColor: "bg-gray-800",
    },
    {
      id: 4,
      quote: "Heartily thankful to Vemlo for quality signage",
      name: "Julia Roses",
      position: "Consular",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
      bgColor: "bg-gray-800",
    },
  ];

  return (
    <div className="  py-8 bg-black ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            What our clients{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              say!
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-4"></div>

        </div>
            <iframe title="Dss" src='https://widgets.sociablekit.com/google-reviews/iframe/25594313' className='w-full h-[26rem]'></iframe>
       
      </div>
    </div>
  );
};

export default TestimonialSection;
