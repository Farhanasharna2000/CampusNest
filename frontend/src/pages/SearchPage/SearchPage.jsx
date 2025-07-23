import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { colleges } from "../../constants/collegesData";
import CollegeCard from "../Shared/CollegeCard/CollegeCard";


const SearchPage = () => {
  const location = useLocation();
  const searchTerm = location.state?.query?.toLowerCase() || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(searchTerm)
    );
    setResults(filtered);
  }, [searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-blue-600">{searchTerm}</span>
      </h2>

         {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No colleges found.</p>
      )}
    </div>
  );
};

export default SearchPage;
