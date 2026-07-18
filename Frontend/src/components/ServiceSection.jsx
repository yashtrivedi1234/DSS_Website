import React, { useState } from "react";
import {
  Monitor,
  Zap,
  Fan,
  Calendar,
  Building,
  ArrowRight,
} from "lucide-react";
import services from "../data/ServiceData.jsx";
import { Link } from "react-router-dom";
const ServiceSection = () => {
  return (
    <div className="bg-black  relative py-8">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-neutral-100 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neutral-100 filter blur-3xl"></div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
        <div className="absolute top-1/4 right-1/5 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-2">
            Our{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-2"></div>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We provide premium signage products for all your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {console.log(services)}
          {services.map((service, index) => (
            <Link
              to={`/services/${service?.slug}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={service.id}
              className="group border  lg:border-gray-500/20 border-gray-400/30  relative lg:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="absolute inset-0 bg-black group-hover:bg-opacity-60 transition-all duration-300" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Top Section - Icon */}
                <div className="flex justify-start text-white">
                  <div className="bg-gradient-to-r from-green-500 hover:rotate-360 to-blue-500 p-3 rounded-lg">
                    {service.icon}
                  </div>
                </div>

                {/* Bottom Section - Title and Description */}
                <div>
                  <h3 className="text-2xl text-white font-bold mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 mb-4"></div>
                  <p className="text-gray-200 text-sm tracking-wide leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Read More Button */}
                  <button className="z-50 flex items-center text-white hover:text-green-400 transition-colors duration-300 font-medium">
                    <span className="mr-2">Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white rounded-2xl transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-6">
          <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <span>View All Products</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceSection;
