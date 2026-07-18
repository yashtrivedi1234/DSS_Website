import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import pattern from "../assets/pattern/pattern12.jpg";
const AboutSection = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    branches: 0,
    cities: 0,
    awards: 0,
  });

  // Animate counters
  useEffect(() => {
    const targets = {
      projects: 500,
      clients: 200,
      experience: 18,
      branches: 5,
      cities: 15,
      awards: 25,
    };

    const duration = 5000;
    const steps = 50;
    const interval = duration / steps;

    targets.projects &&
      setTimeout(() => {
        let current = 0;
        const timer = setInterval(() => {
          current += targets.projects / steps;
          if (current >= targets.projects) {
            current = targets.projects;
            clearInterval(timer);
          }
          setCounters((prev) => ({
            ...prev,
            projects: Math.floor(current),
            clients: Math.floor((current / targets.projects) * targets.clients),
            experience: Math.floor(
              (current / targets.projects) * targets.experience
            ),
            branches: Math.floor(
              (current / targets.projects) * targets.branches
            ),
            cities: Math.floor((current / targets.projects) * targets.cities),
            awards: Math.floor((current / targets.projects) * targets.awards),
          }));
        }, interval);
      }, 500);
  }, []);

  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
            About{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Digital Signage Solutions UP
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-4"></div>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Leading the digital revolution in Uttar Pradesh with innovative signage solutions that transform businesses and captivate audiences.
          </p> */}
        </div>

        {/* Main Content */}
        <div className="grid  gap-x-12 items-center lg:mb-8 mb-2">
          {/* Left Content */}
          <div>
            {/* About Content */}
            <div className="mb-4 text-justify ">
              <p   data-aos="fade-up" className="text-gray-600 leading-relaxed  lg:text-lg mb-2">
                Established in 2021 in the City of Nawabs – Lucknow,{" "}
                <strong>3S Digital Signage Solutions UP</strong> has emerged as
                one of the region’s leading providers of customized digital
                signage and branding solutions. With over{" "}
                <strong>18 years</strong> of experience and a clientele of more
                than <strong>2000 satisfied clients</strong>, we’ve consistently
                delivered impactful visual communication across diverse
                industries. From humble beginnings, we've grown into a trusted
                name in digital display technology, driving innovation and
                transforming how businesses connect with their audiences.
              </p>
              <p   data-aos="fade-up" className="md:block hidden text-gray-600 leading-relaxed  lg:text-lg mb-2">
                We specialize in turnkey signage solutions including indoor and
                outdoor LED displays, in-shop branding, event promotion setups,
                and more. Whether it’s elections, corporate events, or retail
                campaigns, we provide tailor-made solutions using advanced
                technology and high-quality materials to ensure lasting impact
                and brand visibility.
              </p>
              <p    data-aos="fade-up" className="md:block hidden text-gray-600 leading-relaxed text-lg">
                Our mission is to empower brands with visually compelling,
                durable, and regulation-compliant signage that not only captures
                attention but also builds a strong market presence. From concept
                to installation—and even maintenance—we offer end-to-end
                services that make the signage experience seamless, effective,
                and result-driven.
              </p>
            </div>

            {/* Key Features */}
            <div className="md:grid hidden space-y-4  grid-cols-2">
              {[
                "One-stop customized digital signage solutions",
                "Expertise in LED walls, indoor & outdoor displays",
                "Turnkey solutions from concept to installation",
                "24/7 technical support and maintenance",
                // "Serving businesses across multiple industries"
              ].map((feature, index) => (
                <div   data-aos="fade-up" key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-6 max-w-6xl w-full">
          {[
            {
              number: counters.projects,
              label: "Projects Completed",
              suffix: "+",
            },
            {
              number: counters.experience,
              label: "Years Experience",
              suffix: "",
            },
            { number: counters.clients, label: "Happy Clients", suffix: "+" },
            { number: counters.branches, label: "Branches", suffix: "" },
            { number: counters.awards, label: "Awards Won", suffix: "+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center group relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative border border-gray-200 rounded-2xl lg:p-6 p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    backgroundImage: `url(${pattern})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 1,
                    zIndex: -1,
                  }}
                ></div>
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text mb-2">
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
