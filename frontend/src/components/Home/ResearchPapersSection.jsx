import React from "react";
import { FileText, ExternalLink, Users } from "lucide-react";

const researchPapers = [
  {
    title: "AI in Healthcare: Predicting Diseases Using Machine Learning",
    authors: "Farzana Rahman, Mehedi Hasan",
    link: "https://example.com/research/ai-healthcare.pdf",
    category: "Artificial Intelligence",
    year: "2024",
  },
  {
    title: "Sustainable Architecture: A Study of Green Campus Designs",
    authors: "Ayesha Zaman, Rahat Khan",
    link: "https://example.com/research/green-architecture.pdf",
    category: "Architecture",
    year: "2024",
  },
  {
    title: "Blockchain in Education: Secure Academic Records",
    authors: "Tanjim Alam, Shahrin Sultana",
    link: "https://example.com/research/blockchain-education.pdf",
    category: "Technology",
    year: "2023",
  },
  {
    title: "Cybersecurity Awareness Among University Students",
    authors: "Nafiul Islam, Mitu Akter",
    link: "https://example.com/research/cybersecurity-awareness.pdf",
    category: "Cybersecurity",
    year: "2024",
  },
  {
    title: "AI in Healthcare: Predicting Diseases Using Machine Learning",
    authors: "Farzana Rahman, Mehedi Hasan",
    link: "https://example.com/research/ai-healthcare.pdf",
    category: "Artificial Intelligence",
    year: "2024",
  },
  {
    title: "Sustainable Architecture: A Study of Green Campus Designs",
    authors: "Ayesha Zaman, Rahat Khan",
    link: "https://example.com/research/green-architecture.pdf",
    category: "Architecture",
    year: "2024",
  },
];

const ResearchPapersSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-6 md:py-10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-15 translate-x-48 translate-y-48"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center pb-4 md:pb-6">
          <h2
            className="md:text-5xl text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text 
          text-transparent pb-4 md:pb-6"
          >
            Student Research Excellence
          </h2>
          <p className="md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover groundbreaking research from our talented students, pushing
            the boundaries of knowledge across diverse academic fields
          </p>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {researchPapers.map((paper, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 relative overflow-hidden"
            >
              {/* Card background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-full opacity-50 translate-x-16 -translate-y-16"></div>

              {/* Category Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-full mb-6 shadow-md">
                {paper.category}
              </div>

              {/* Title */}
              <h3 className="md:text-2xl text-lg font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                {paper.title}
              </h3>

              {/* Authors */}
              <div className="flex items-center text-blue-600 mb-6">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-medium">{paper.authors}</span>
              </div>

              {/* Year */}
              <div className="text-blue-500 font-semibold mb-6">
                Published: {paper.year}
              </div>

              {/* View Button */}
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">View Research Paper</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchPapersSection;
