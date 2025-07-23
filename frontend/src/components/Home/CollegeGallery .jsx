import React from "react";

const collegeImages = [
  {
    src: "https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Graduating class 2023 – Engineering",
    year: "2023",
    department: "Engineering",
  },
  {
    src: "https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Graduating class 2023 – Business",
    year: "2023",
    department: "Business",
  },
  {
    src: "https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Graduating class 2022 – Arts",
    year: "2022",
    department: "Arts",
  },
  {
    src: "https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Graduating class 2022 – Science",
    year: "2022",
    department: "Science",
  },
  {
    src: "https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Graduating class 2021 – Law",
    year: "2021",
    department: "Law",
  },
  {
    src: "https://images.unsplash.com/photo-1607013407627-6ee814329547?q=80&w=664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Graduating class 2021 – Medicine",
    year: "2021",
    department: "Medicine",
  },
];

const CollegeGallery = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent pb-6">
            College Graduates Gallery
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto ">
            A celebration of our past students and their journey. Here are some
            memorable moments from various graduating classes across
            disciplines.
          </p>
        </div>

        {/* Gallery Section */}
      
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collegeImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Card Header with Year Badge */}
                  <div className="">
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-blue-900">
                      {image.department} Department ({image.year})
                    </h3>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
   
    </section>
  );
};

export default CollegeGallery;
