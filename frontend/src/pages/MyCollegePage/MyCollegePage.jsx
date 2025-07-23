import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Star,
  MessageCircle,
  Image as ImageIcon,
  Clock,
} from "lucide-react";
import { colleges } from "../../constants/collegesData";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useCallback } from "react";

const MyCollegePage = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [admissionData, setAdmissionData] = useState(null);
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchAdmissionData = useCallback(async (userEmail) => {
    try {
      const response = await axiosPublic.get(`/admissions/${userEmail}`);
      const data = response.data;

      setAdmissionData(data);

      const collegeInfo = colleges.find((c) => c.id === data.collegeId);
      setCollege(collegeInfo);
    } catch (err) {
      console.error(err);
      setError("Failed to load admission data");
    } finally {
      setLoading(false);
    }
  }, [axiosPublic]);

  useEffect(() => {
    if (user?.email) {
      fetchAdmissionData(user.email);
    } else {
      setError("User not authenticated.");
      setLoading(false);
    }
  }, [user?.email, fetchAdmissionData]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setSubmittingReview(true);
    try {
      if (!college || !admissionData) {
        alert("Missing college or admission data.");
        setSubmittingReview(false);
        return;
      }

      const reviewData = {
        collegeId: college.id,
        collegeName: college.name,
        course: admissionData.subject,
        text: reviewText,
        rating,
        userEmail: admissionData.email,
        userName: admissionData.candidateName,
      };

      await axiosPublic.post("/reviews", reviewData);

      setReviewText("");
      setRating(5);
      alert("✅ Review submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting review");
    } finally {
      setSubmittingReview(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="w-16 h-16 text-blue-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading your college information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 mb-4">
            <MessageCircle className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-xl text-gray-800 mb-4">No admission found</p>
          <p className="text-gray-600">Please apply to a college first to view this page.</p>
        </div>
      </div>
    );
  }

  if (!college || !admissionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">College information not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <GraduationCap className="w-12 h-12 mr-4" />
            <h1 className="text-4xl font-bold">My College</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* College Information */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
   <h2 className="text-3xl font-bold">{college.name}</h2>
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    college.rating >= i + 1 ? "text-yellow-400" : "text-blue-300"
                  }`}
                  fill={college.rating >= i + 1 ? "#facc15" : "none"}
                />
              ))}
              <span className="ml-2 text-blue-100">({college.rating}/5)</span>
            </div>
              </div>
                <div className="flex items-center justify-start">
            <Clock className="w-5 h-5 mr-2" />
            <span>Application Submitted on : {new Date(admissionData.submittedAt).toLocaleDateString()}</span>
          </div>
            </div>
         
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* College Image */}
              <div className="space-y-4">
                {college.image ? (
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-64 object-cover rounded-xl shadow-md"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* College Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">College Information</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <strong>Established:</strong> {college.established || "N/A"}
                    </p>
                    <p>
                      <strong>Location:</strong> {college.location || "N/A"}
                    </p>
                    <p>
                      <strong>Description:</strong> {college.description}
                    </p>
                    {college.research && (
                      <p>
                        <strong>Research:</strong>{" "}
                        {college.research.overview || college.research}
                      </p>
                    )}
                    {college.sports && (
                      <p>
                        <strong>Sports:</strong> {college.sports.overview || college.sports}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Application Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800">Application Details</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Student Photo */}
            <div className="flex justify-center">
              {admissionData.imageUrl ? (
                <div className="text-center">
                  <img
                    src={admissionData.imageUrl}
                    alt="Student Photo"
                    className="w-96 h-96 object-cover rounded-2xl shadow-lg border-4 border-blue-100"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Application Information */}
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-800">{admissionData.candidateName}</p>
                </div>
              </div>

              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-semibold text-gray-800">{admissionData.subject}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{admissionData.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-800">{admissionData.phone}</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold text-gray-800">{admissionData.address}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(admissionData.dob).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center mb-6">
            <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">Add Your Review</h3>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                rows="4"
                placeholder="Share your thoughts about this college..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
              <div className="flex items-center space-x-4">
                <select
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        rating >= i + 1 ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill={rating >= i + 1 ? "#facc15" : "none"}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submittingReview}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-md"
            >
              {submittingReview ? "Submitting..." : "Submit Review ⭐"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyCollegePage;
