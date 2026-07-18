import React from "react";
import CountUp from "../components/CountUp";

function Stats() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {[
          { number: 800, label: "Projects", suffix: "+" },
          { number: 500, label: "Clients", suffix: "+" },
          { number: 18, label: "Years", suffix: "+" },
          { number: 5, label: "Branches", suffix: "+" },
          { number: 25, label: "Awards Won", suffix: "+" },
        ].map((stat, i) => (
          <div
            key={i}
            className="py-2 text-center border border-neutral-600 rounded-md"
          >
            <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-1">
              <CountUp
                from={0}
                to={stat.number}
                duration={1.2}
                className="count-up-text"
              />
              {stat.suffix}
            </div>
            <div className="text-gray-400 text-xs md:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
