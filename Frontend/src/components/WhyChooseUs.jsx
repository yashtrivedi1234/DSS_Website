import { Users, Award, Shield, Zap } from "lucide-react";

import { Link } from "react-router-dom";

const achievements = [
  {
    icon: Award,
    title: "Industry Leader",
    desc: "Recognized as the leading digital signage provider in UP",
  },
  {
    icon: Users,
    title: "200+ Happy Clients",
    desc: "Serving businesses across multiple industries",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    desc: "ISO certified with 24/7 support and warranty",
  },
  {
    icon: Zap,
    title: "Latest Technology",
    desc: "Cutting-edge LED displays and smart solutions",
  },
];
function WhyChooseUs() {
  return (
    <div className="">
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 ">
          {/* Why Choose Us Header */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              Why{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Choose Us
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-4"></div>
            <p className="lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover what sets Digital Signage Solutions UP apart —
              innovation, reliability, and a commitment to excellence in every
              display.
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group "
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="z-20 relative border border-gray-800 lg:p-6 p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-300">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* CTA Section */}
          <div
            data-aos="fade-up"
            className="lg:mt-12 mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h3 className="text-2xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="lg:text-xl text-base lg:mb-8 mb-4 opacity-90">
              Let's discuss how our digital signage solutions can elevate your
              brand presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-6 py-3 cursor-pointer bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Get Free Consultation
              </Link>
              <a
                href="tel:6386901011"
                target="_blank"
                className="px-6 py-3 cursor-pointer bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                Call +91-9236477974
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
