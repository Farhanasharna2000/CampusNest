import { useState } from "react";
import { colleges } from "../../constants/collegesData";
import CollegeCard from "../Shared/CollegeCard/CollegeCard";

const CollegesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const totalPages = Math.ceil(colleges.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentColleges = colleges.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded-md border ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-blue-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container mx-auto py-6 md:py-10 px-4">
      <h2 className="md:text-5xl text-2xl text-center font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text
           text-transparent pb-4 md:pb-10">
        Colleges in Bangladesh
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentColleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-40"
        >
          Prev
        </button>

        {renderPageNumbers()}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CollegesPage;
