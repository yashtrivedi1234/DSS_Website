import React, { useState } from "react";
import Slider from "react-slick";
import { ArrowRight, ChevronsRight, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useGetAllGalleryQuery } from '../api/gallery.api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectSection = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: gallery, isLoading, isError } = useGetAllGalleryQuery();
  const data = gallery?.data;

  // Extract unique categories from API data
  const categories = data
    ? [
        "ALL",
        ...Array.from(new Set(data.map(item => item.category.toUpperCase()))),
      ]
    : ["ALL"];

  // Transform API data into project objects
  const projects = data
    ? data.map(item => ({
        id: item._id,
        title: item.category,
        category: item.category.toUpperCase(),
        tags: [item.category],
        image: item.image?.public_url,
        description: `${item.category} project showcase`,
      }))
    : [];

  // Filter projects based on selected category
  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const sliderSettings = {
    dots: true,
    arrows: false, 
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredProjects.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === filteredProjects.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 mb-6">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 mb-6">
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load projects</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 mb-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
            Our Latest Projects{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-4"></div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`lg:px-6 px-3 lg:py-2 py-1 lg:text-sm text-xs font-medium rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ZoomIn className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
            <button
              onClick={() => setActiveFilter('ALL')}
              className="mt-4 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          /* Slider Cards */
          <Slider {...sliderSettings}>
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="px-2" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                     onClick={() => openModal(index)}>
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full lg:h-96 h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Category Tag */}
                  {/* <div className="absolute top-12 -left-8 -rotate-90 text-xs bg-white px-2 py-1 font-semibold">
                    {project.category}
                  </div> */}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 text-center">
                      <ZoomIn size={50} />
                    </div>
                  </div>

                  {/* Slide-in Content */}
                  {/* <div
                    className="absolute right-0 bottom-0 w-72 scale-0 px-6 py-4 flex flex-col items-start 
                    bg-white lg:translate-x-full group-hover:translate-x-0
                    lg:opacity-0 opacity-100 group-hover:opacity-100 group-hover:w-72 group-hover:z-10
                     group-hover:scale-100 transition-all duration-700 ease-in-out shadow-xl"
                  >
                    <h3 className="text-black text-lg font-bold mb-1">
                      {project.title}
                    </h3>
                    <button className="inline-flex items-center cursor-pointer gap-2 text-primary text-sm font-semibold group-hover:text-green-600 transition-colors">
                      View Project <ChevronsRight size={18} />
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl w-full h-[90vh] p-4 flex items-center justify-center">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button 
              onClick={goToPrevious}
              className="absolute left-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button 
              onClick={goToNext}
              className="absolute right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image */}
            <div className="w-full flex items-center justify-center">
              <img 
                src={filteredProjects[currentImageIndex]?.image} 
                alt={filteredProjects[currentImageIndex]?.title} 
                className="max-h-screen max-w-full object-contain rounded-md shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectSection;