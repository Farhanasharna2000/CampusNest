import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Search, X } from "lucide-react";
import { colleges } from "../../constants/collegesData";
import CollegeCard from "../../pages/Shared/CollegeCard/CollegeCard";

const ExamFinder = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1570975640108-2292d83390ff?q=80&w=1022&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/20/cambridge.JPG?q=80&w=847&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1618255630366-f402c45736f6?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [backgroundImages.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim().toLowerCase();
    if (trimmed) {
      const filtered = colleges.filter((college) =>
        college.name.toLowerCase().includes(trimmed)
      );
      setSearchResults(filtered);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <>
      <div className="relative h-[350px] md:h-[450px] overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center  h-[350px]  md:h-[450px] px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
            <Typewriter
              words={["Find Colleges in BD"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-4xl mx-auto mb-8"
          >
            <div className="relative">
              <div className="flex rounded-lg overflow-hidden shadow-2xl bg-white">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for colleges"
                    className="w-full py-4 pl-12 pr-4 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 hover:shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-5xl max-h-[80vh] overflow-y-auto rounded-lg p-6 relative shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Search Results for:{" "}
              <span className="text-blue-600">{searchQuery}</span>
            </h2>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No colleges found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExamFinder;
