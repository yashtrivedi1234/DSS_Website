import { Eye, Settings, Wrench } from 'lucide-react';
import React from 'react'

  const strengths = [
    {
      icon: <Settings className="h-8 w-8" />,
      title: "In-House Production",
      description: "Complete in-house production capabilities with skilled technicians and state-of-the-art equipment, ensuring quality control and faster turnaround times."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Customization",
      description: "Tailored solutions to meet specific customer needs and preferences, enhancing satisfaction and loyalty while increasing product value and differentiation."
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "After Sales Service",
      description: "Comprehensive post-installation support with professional maintenance services and technically trained personnel for long-term project efficiency."
    }
  ];
function StrengthSection() {
   
  return (
    <>
         {/* Our Strength Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Strength</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {strengths.map((strength, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-green-600">
                    {strength.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{strength.title}</h3>
                <p className="text-gray-600 leading-relaxed">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default StrengthSection