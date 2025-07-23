import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {
     if (!college) return null;
    return (
           
          <div
            key={college.id}
            className="bg-white flex flex-col justify-between rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div>
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{college.name}</h3>
                <p className="text-gray-600">⭐ Rating: {college.rating}</p>
                <p className="text-gray-600">
                  📅 Admission: {college.admissionProcess.dates}
                </p>
                <p className="text-gray-600">
                  📚 Research Projects: {college.researchCount}
                </p>
              </div>
            </div>
            <div className="px-4 pb-4">
              <Link to={`/college/${college.id}`}>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
       
    );
};

export default CollegeCard;