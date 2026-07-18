import React from "react";

function ProjectCard({project}) {
   if(!project) return null;
  return (
    <>
      <div
        key={project?.id}
        className="px-2"
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        <div className="group relative overflow-hidden  shadow-lg hover:shadow-2xl transition-all duration-500">
          {/* Image */}
          <img
            src={project?.image}
            alt={project?.title}
            className="w-full lg:h-96 h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Tag */}
          <div className="absolute top-12 -left-8 -rotate-90 text-xs bg-white px-2 py-1 font-semibold">
            {project?.category}
          </div>

          {/* Slide-in Content */}
          <div
            className="absolute right-0  bottom-0 w-72 scale-0 px-6 py-4 flex flex-col items-start 
                bg-white lg:translate-x-full group-hover:translate-x-0
                lg:opacity-0 opacity-100 group-hover:opacity-100 group-hover:w-72 group-hover:z-10
                 group-hover:scale-100 transition-all duration-700 ease-in-out shadow-xl"
          >
            <h3 className="text-black text-lg font-bold mb-1">
              {project?.title}
            </h3>
            {/* <p className="text-gray-600 text-sm mb-3">{project.description}</p> */}
            <button className="inline-flex items-center cursor-pointer gap-2 text-primary text-sm font-semibold group-hover:text-green-600 transition-colors">
              View Project <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
