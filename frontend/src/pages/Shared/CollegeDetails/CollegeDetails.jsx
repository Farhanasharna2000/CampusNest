import React from "react";
import { useParams, Link } from "react-router-dom";
import { colleges } from "../../../constants/collegesData";

const CollegeDetails = () => {
  const { id } = useParams();
  const college = colleges.find((c) => c.id === parseInt(id));

  if (!college) {
    return (
      <div className="text-center text-red-600 mt-10">College not found.</div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{college.name}</h1>

      {/* Gallery */}
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-96 object-cover rounded-lg mb-4"
          />

      {/* Description */}
      <p className="text-lg text-gray-700 mb-4">{college.description}</p>

      {/* Basic info */}
      <div className="mb-6">
        <p><strong>Established:</strong> {college.established}</p>
        <p><strong>Location:</strong> {college.location}</p>
        <p><strong>Motto:</strong> {college.motto}</p>
        <p><strong>College Rating:</strong> {college.rating ?? "Not Available"}</p>
        <p><strong>Number of Research Projects:</strong> {college.research?.areas?.length ?? 0}</p>
      </div>

      {/* Admission Process */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Admission Process
        </h2>
        <p className="mb-2"><strong>Dates:</strong> {college.admissionProcess.dates}</p>
        <p className="mb-1 font-semibold">Requirements:</p>
        <ul className="list-disc list-inside mb-2 text-gray-700">
          {college.admissionProcess.requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
        <p><strong>Acceptance Rate:</strong> {college.admissionProcess.acceptanceRate}</p>
        {college.admissionProcess.averageSAT && (
          <p><strong>Average SAT:</strong> {college.admissionProcess.averageSAT}</p>
        )}
        <p><strong>Application Fee:</strong> {college.admissionProcess.applicationFee}</p>
      </div>

      {/* Events */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Events</h2>
        {college.events.map((event, idx) => (
          <div key={idx} className="mb-3 border-l-4 border-indigo-600 pl-4">
            <h3 className="font-semibold text-lg">{event.name}</h3>
            <p className="text-sm text-gray-600 italic">{event.date}</p>
            <p className="text-gray-700">{event.description}</p>
          </div>
        ))}
      </div>

      {/* Research */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Research</h2>
        <p className="mb-4">{college.research.overview}</p>
        {college.research.areas.map((area, idx) => (
          <div key={idx} className="mb-3 border-l-4 border-green-600 pl-4">
            <h3 className="font-semibold">{area.field}</h3>
            <p className="text-gray-700">{area.description}</p>
            <p className="text-sm italic text-gray-500">Funding: {area.funding}</p>
          </div>
        ))}
      </div>

      {/* Sports */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sports</h2>
        <p className="mb-3">{college.sports.overview}</p>
        {college.sports.categories.map((cat, idx) => (
          <div key={idx} className="mb-3">
            <h3 className="font-semibold">{cat.category}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {cat.sports.map((sport, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="font-semibold mt-4 mb-2">Facilities</h3>
          <ul className="list-disc list-inside text-gray-700">
            {college.sports.facilities.map((facility, idx) => (
              <li key={idx}>{facility}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to="/"
        className="inline-block mt-6 px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
      >
        Back to Colleges
      </Link>
    </div>
  );
};

export default CollegeDetails;
