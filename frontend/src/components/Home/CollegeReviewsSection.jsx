import { Star, ThumbsUp, BookOpen, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useReviews } from "../../hooks/useReviews";
import LoadingSpinner from "./../LoadingSpinner";

const renderStars = (count) => (
  <div className="flex items-center gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        fill={i < count ? "#2563EB" : "#E5E7EB"}
        stroke={i < count ? "#2563EB" : "#9CA3AF"}
        className="transition-all duration-200"
      />
    ))}
    <span className="ml-2 text-blue-600 font-semibold text-sm">{count}.0</span>
  </div>
);

const CollegeReviewsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { reviews, loading, error } = useReviews();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-white py-6 md:py-10 px-4 overflow-hidden w-full">
      {/* Background SVG - Fixed for full width */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          className="absolute top-0 left-0 w-full h-full min-w-full min-h-full"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,400 C300,200 600,600 1200,300 L1200,0 L0,0 Z"
            fill="url(#blueGradient1)"
          />
          <path
            d="M0,600 C400,400 800,700 1200,500 L1200,800 L0,800 Z"
            fill="url(#blueGradient2)"
          />
          <defs>
            <linearGradient
              id="blueGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#BFDBFE" />
            </linearGradient>
            <linearGradient
              id="blueGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#DBEAFE" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div
          className={`text-center pb-4 md:pb-6 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-3 mb-4 md:mb-6">
            <ThumbsUp size={20} className="text-blue-600 mr-2" />
            <span className="text-blue-800 font-semibold text-sm md:text-base">
              Verified Student Reviews
            </span>
          </div>

          <h2 className="md:text-5xl text-2xl font-bold text-blue-900 mb-4 md:mb-6 leading-tight">
            Real Students,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Real Stories
            </span>
          </h2>

          <p className="md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get insights from students who've been there, done that, and are
            ready to share their journey with you.
          </p>
        </div>

        {/* Loading / Error */}
        {loading && <LoadingSpinner />}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {/* Reviews Carousel */}
        {!loading && reviews.length > 0 && (
          <div className="relative overflow-hidden rounded-3xl">
            <div className="flex flex-nowrap animate-smooth-scroll space-x-8 py-8 min-w-[300%]">
              {[...reviews, ...reviews, ...reviews].map((review, index) => (
                <div
                  key={review._id || index}
                  className="group relative bg-white rounded-3xl p-4 md:p-8 w-72 md:w-96 flex-shrink-0 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:scale-105"
                >
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 md:mb-6">
                      <div>
                        <h3 className="md:text-xl text-lg font-bold text-blue-900 mb-1 leading-tight">
                          {review.collegeName}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 space-x-2">
                          <BookOpen size={14} />
                          <span>{review.course}</span>
                          <span>•</span>
                          <span>
                            {format(new Date(review.createdAt), "yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    {renderStars(review.rating)}

                    {/* Review Text */}
                    <blockquote className="text-gray-700 text-base leading-relaxed mb-6 font-medium">
                      "{review.text}"
                    </blockquote>

                    {/* Reviewer Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <Users size={16} className="text-blue-500 mr-2" />
                        <span className="text-blue-700 font-semibold text-sm">
                          {review.userName}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                        Verified Student
                      </span>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes smooth-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .animate-smooth-scroll {
          animation: smooth-scroll 45s linear infinite;
        }

        .animate-smooth-scroll:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-smooth-scroll {
            animation-duration: 10s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-smooth-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default CollegeReviewsSection;
