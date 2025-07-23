import { Link } from "react-router-dom";
import { colleges } from "../../constants/collegesData";

const CollegeSection = () => {
  // Sort by rating descending and take top 3
  const topColleges = [...colleges]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="py-6 md:py-10 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center pb-4 md:pb-6">
          <h2
            className="md:text-5xl text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text
           text-transparent pb-4 md:pb-6"
          >
            Top Colleges
          </h2>
          <p className="md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Step into a world of academic excellence where innovation meets
            tradition, and every student's potential is unleashed through
            world-class education.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topColleges.map((college) => (
            <div
              key={college.id}
              className="flex flex-col bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden transition-all duration-700 group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-500/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <h3 className="text-white text-xl font-bold">
                      {college.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 space-y-5">
                {/* Admission Info */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-blue-900 font-bold ">
                      Admission Duration
                    </h4>
                    <p className="text-blue-600 text-sm">
                      {college.admissionProcess.dates}
                    </p>
                  </div>
                </div>

                {/* Events */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-4">
                  <h4 className="text-blue-900 font-bold  mb-2">
                    Campus Events
                  </h4>
                  <div className="space-y-1">
                    {college.events.slice(0, 3).map((event, idx) => (
                      <div key={idx} className="flex items-center space-x-2 ">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-800 font-medium">
                          {event.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Research & Sports */}
                <div className="grid gap-3">
                  <div className="border border-blue-100 rounded-xl p-3 hover:bg-blue-50/50 transition-colors">
                    <h5 className="text-blue-900 font-semibold  mb-1">
                      Research Excellence
                    </h5>
                    <p className="text-blue-600 ">
                      {college.research.overview}
                    </p>
                  </div>
                  <div className="border border-blue-100 rounded-xl p-3 hover:bg-blue-50/50 transition-colors">
                    <h5 className="text-blue-900 font-semibold  mb-1">
                      Sports Programs
                    </h5>
                    <p className="text-blue-600 ">{college.sports.overview}</p>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="mt-auto">
                  <Link
                    to={`/college/${college.id}`}
                    className="group relative block w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white text-center py-3 px-6 rounded-xl font-bold text-sm transition-all duration-500 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>View Details</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeSection;
