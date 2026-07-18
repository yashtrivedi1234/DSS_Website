import { useState, useEffect } from "react";
import { useGetAllClientsQuery } from "../api/client.api";

export default function ClientSection() {
  const { data, isLoading, isError } = useGetAllClientsQuery();
  const clients = data?.data?.data || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  // Responsive items count
  const getItemsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1; // mobile
    }
    return 4;
  };
  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Auto slide effect with infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = clients.length - itemsToShow;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [clients.length, itemsToShow]);
  // Calculate total slides
  const totalSlides = Math.max(1, clients.length - itemsToShow + 1);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
            Our{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Clients
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-2"></div>
          <p className="lg:text-lg  text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted by leading organizations across various sectors for
            comprehensive signage solutions.
          </p>
        </div>
        {/* Clients Slider */}
        <div className="relative overflow-hidden min-h-[180px]">
          {isLoading ? (
            <div className="text-center text-gray-400 py-12">
              Loading clients...
            </div>
          ) : isError ? (
            <div className="text-center text-red-400 py-12">
              Failed to load clients.
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No clients found.
            </div>
          ) : (
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsToShow)
                }%)`,
              }}
            >
              {clients.map((client, index) => (
                <div
                  key={client._id || index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 p-2 border border-gray-200">
                    <img
                      src={client.image?.url || client.logo || "/no-image.png"}
                      alt={`${client.name} logo`}
                      className="w-full h-40 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Pagination Dots */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-green-600 w-6 sm:w-8"
                  : "bg-gray-300 hover:bg-green-300 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
