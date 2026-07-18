import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import bread from '../assets/bread.jpg';

function Breadcrumb({ title, items }) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background image container with fixed height */}
      <div
        className="relative h-[300px] md:h-[350px]  w-full bg-center bg-no-repeat bg-cover"
        style={{
            //  backgroundImage: `url('https://img.freepik.com/premium-photo/close-up-businessman-writes-report-paper_201468-2168.jpg?uid=R183076985&ga=GA1.1.550663172.1736244937&semt=ais_hybrid&w=740')`, 
            backgroundImage:`url(${bread})` }}
      >
        {/* Enhanced overlay with darker gradient for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/60"></div>
        
        {/* Centered Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
          <div className="container px-4 mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            >
              {title}
            </motion.h1>
            
            {/* Centered Breadcrumb Navigation */}
            {items && (
              <motion.ul 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-center flex-wrap text-sm md:text-base text-neutral-200 gap-2"
              >
                {items?.map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.link}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                    {/* Only show arrow if it's not the last item */}
                    {index < items.length - 1 && (
                      <FaChevronRight className="mx-2 text-xs text-neutral-400" />
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;