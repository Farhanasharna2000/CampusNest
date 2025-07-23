import { useParams, Link } from "react-router-dom";
import { colleges } from "../../../constants/collegesData";
import { ArrowLeft, BookOpen, Calendar, GraduationCap, NotebookPen, School, Trophy } from "lucide-react";

const CollegeDetails = () => {
  const { id } = useParams();
  const college = colleges.find((c) => c.id === parseInt(id));

  if (!college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center bg-white p-4 md:p-8 rounded-xl shadow-lg border border-blue-100">
          <div className="text-6xl text-blue-300 mb-4"><School/></div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2">College Not Found</h2>
          <p className="text-blue-600">The college you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60"></div>
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-50 md:h-96 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white md:px-6">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {college.name}
            </h1>

          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 md:py-10 px-4 ">
        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12 -mt-16 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wide mb-2">Established</h3>
            <p className="text-2xl font-bold text-blue-900">{college.established}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wide mb-2">Location</h3>
            <p className="text-lg font-semibold text-blue-900">{college.location}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wide mb-2">Acceptance Rate</h3>
            <p className="text-xl font-bold text-blue-900">{college.admissionProcess.acceptanceRate}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wide mb-2">Application Fee</h3>
            <p className="text-xl font-bold text-blue-900">{college.admissionProcess.applicationFee}</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-4 md:mb-8 border border-blue-100 text-center">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 text-xl"><BookOpen/></span>
            </div>
            <h2 className="md:text-3xl text-xl font-bold text-blue-900">About the University</h2>
          </div>
          <p className="md:text-lg text-gray-700 leading-relaxed mb-6 md:w-8/12 mx-auto">{college.description}</p>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <p className="text-blue-800 font-semibold text-lg text-center italic">"{college.motto}"</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 ">
          {/* Admission Process */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-blue-100">
            <div className="flex items-center mb-4 md:mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 text-xl"><GraduationCap/></span>
              </div>
              <h2 className="md:text-3xl text-xl font-bold text-blue-900">Admission Process</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="font-semibold text-blue-800 mb-1">Application Dates</p>
                <p className="text-blue-700">{college.admissionProcess.dates}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-800 mb-3">Requirements:</h3>
                <div className="space-y-2">
                  {college.admissionProcess.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {college.admissionProcess.averageSAT && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-1">Average SAT Score</p>
                  <p className="text-blue-700 text-xl font-bold">{college.admissionProcess.averageSAT}</p>
                </div>
              )}
            </div>
          </div>

          {/* Events */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 text-xl"><Calendar/> </span>
              </div>
              <h2 className="md:text-3xl text-xl font-bold text-blue-900">Upcoming Events</h2>
            </div>
            
            <div className="space-y-4">
              {college.events.map((event, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-6 pb-4 hover:bg-blue-50 p-4 rounded-r-lg transition-colors duration-200">
                  <h3 className="font-bold text-lg text-blue-900 mb-1">{event.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mb-2">{event.date}</p>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Research Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-4 md:mb-8 border border-blue-100 mt-8">
          <div className="flex items-center mb-4 md:mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 text-xl"><NotebookPen/></span>
            </div>
            <h2 className="md:text-3xl text-xl font-bold text-blue-900">Research Excellence</h2>
          </div>
          
          <p className="md:text-lg text-gray-700 mb-4 md:mb-8 leading-relaxed">{college.research.overview}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {college.research.areas.map((area, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <h3 className="font-bold text-lg md:text-xl text-blue-900 mb-3">{area.field}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{area.description}</p>
                <div className="bg-blue-100 rounded-lg p-3 border border-blue-200">
                  <p className="text-blue-800 font-semibold text-sm"> Funding:</p>
                  <p className="text-blue-700 text-sm">{area.funding}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-4 md:mb-8 border border-blue-100">
          <div className="flex items-center mb-4 md:mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 text-xl"><Trophy/></span>
            </div>
            <h2 className="md:text-3xl text-xl font-bold text-blue-900">Sports & Recreation</h2>
          </div>
          
          <p className="md:text-lg text-gray-700 mb-4 md:mb-8 leading-relaxed">{college.sports.overview}</p>
          
          <div className="grid md:grid-cols-2 gap-4 md:p-8 mb-4 md:mb-8">
            {college.sports.categories.map((cat, idx) => (
              <div key={idx} className="bg-blue-50 rounded-xl p-4 md:p-6 border border-blue-200">
                <h3 className="font-bold text-xl text-blue-900 mb-4">{cat.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.sports.map((sport, i) => (
                    <span
                      key={i}
                      className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-300 hover:bg-blue-100 transition-colors duration-200"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-4 md:p-6 border border-blue-200">
            <h3 className="font-bold text-xl text-blue-900 mb-4 flex items-center gap-2"><School/> Facilities</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {college.sports.facilities.map((facility, idx) => (
                <div key={idx} className="flex items-center bg-white rounded-lg p-3 border border-blue-200">
                  <span className="text-blue-800 font-medium">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center pt-8">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700
             hover:to-blue-800 text-white rounded-xl font-semibold md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-2"><ArrowLeft/></span>
            Back to All Colleges
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;