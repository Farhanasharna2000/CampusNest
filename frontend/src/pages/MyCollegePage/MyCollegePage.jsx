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
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";

const MyCollegePage = () => {
  const { user, loading: authLoading } = useAuth(); // Add authLoading if available
  const axiosPublic = useAxiosPublic();

  const [admissionData, setAdmissionData] = useState(null);
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchAdmissionData = useCallback(
    async (userEmail) => {
      try {
        console.log("Fetching admission data for:", userEmail); // Debug log
        const response = await axiosPublic.get(`/admissions/${userEmail}`);
        const data = response.data;

        console.log("Admission data received:", data); // Debug log

        setAdmissionData(data);

        const collegeInfo = colleges.find((c) => c.id === data.collegeId);
        setCollege(collegeInfo);
        
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching admission data:", err);
        
        // More specific error handling
        if (err.response?.status === 404) {
          setError("No admission found for this user");
        } else if (err.response?.status === 401) {
          setError("Authentication required");
        } else {
          setError("Failed to load admission data");
        }
      } finally {
        setLoading(false);
      }
    },
    [axiosPublic]
  );

  useEffect(() => {
    console.log("User state:", user); // Debug log
    
    // Wait for auth to be ready and user to be available
    if (authLoading) {
      return; // Still loading auth state
    }

    if (user?.email) {
      setLoading(true);
      setError(null);
      fetchAdmissionData(user.email);
    } else {
      // User is not authenticated or email is missing
      setError("User not authenticated");
      setLoading(false);
    }
  }, [user, authLoading, fetchAdmissionData]); // Include authLoading in dependencies

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setSubmittingReview(true);
    try {
      if (!college || !admissionData) {
        toast.error("Missing college or admission data.");
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
      toast.success("Review submitted successfully!");
    } catch (err) {
      console.error("Error submitting review:", err);
       toast.error("You have already submitted a review for this college");
    } finally {
      setSubmittingReview(false);
    }
  };

  // Show loading while auth is being determined
  if (authLoading || loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 mb-4">
            <MessageCircle className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-xl text-gray-800 mb-4">
            {error === "No admission found"}
          </p>
          <p className="text-gray-600">
            {error === "No admission found" 
              ? "Please apply to a college first to view this page."
              :"Please apply to a college first to view this page."
            }
          </p>

        </div>
      </div>
    );
  }

  if (!college || !admissionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">
            College information not found.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 md:py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <GraduationCap className="w-12 h-12 mr-4" />
            <h1 className="md:text-5xl text-2xl font-bold">My College</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* College Information */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="md:flex justify-between items-start">
              <div>
                <h2 className="md:text-3xl text-xl font-bold">{college.name}</h2>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        college.rating >= i + 1
                          ? "text-yellow-400"
                          : "text-blue-300"
                      }`}
                      fill={college.rating >= i + 1 ? "#facc15" : "none"}
                    />
                  ))}
                
                </div>
              </div>
              <div className="flex items-center justify-start mt-4 md:mt-0">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm md:text-base">
                  Application Submitted on :{" "}
                  {new Date(admissionData.submittedAt).toLocaleDateString()}
                </span>
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
                    className="w-full md:h-80 object-cover rounded-xl shadow-md"
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
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    College Information
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <strong>Established:</strong>{" "}
                      {college.established || "N/A"}
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
                        <strong>Sports:</strong>{" "}
                        {college.sports.overview || college.sports}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Application Details */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl p-8 border-2 border-blue-200 relative overflow-hidden">
  {/* Decorative Background Elements */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-transparent rounded-full opacity-30 -translate-y-8 translate-x-8"></div>
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-300 to-transparent rounded-full opacity-20 translate-y-4 -translate-x-4"></div>
  
  {/* Header Section */}
  <div className="flex justify-center items-center mb-8 relative">
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-2xl shadow-lg">
      <h2 className="md:text-3xl text-xl font-bold tracking-wide">
        Application Details
      </h2>
    </div>
  </div>

  <div className="grid md:grid-cols-2 gap-10">
    {/* Student Photo Section */}
    <div className="flex justify-center">
      {admissionData.imageUrl ? (
        <div className="text-center relative">
          <div className="relative">
            <img
              src={admissionData.imageUrl}
              alt="Student Photo"
              className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-white ring-4 ring-blue-200 transition-transform hover:scale-105"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-900/20 to-transparent"></div>
          </div>
          <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md">
            <p className="text-blue-800 font-semibold">Student Photo</p>
          </div>
        </div>
      ) : (
        <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl flex items-center justify-center shadow-xl border-4 border-white ring-4 ring-blue-200">
          <div className="text-center">
            <User className="w-20 h-20 text-blue-400 mx-auto mb-3" />
            <p className="text-blue-600 font-medium">No Photo Available</p>
          </div>
        </div>
      )}
    </div>

    {/* Application Information Section */}
    <div className="space-y-6">
      {/* Full Name */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center">
          <div className="bg-blue-600 p-3 rounded-full mr-4 shadow-md">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">Full Name</p>
            <p className="font-bold text-gray-800 text-lg">
              {admissionData.candidateName}
            </p>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center">
          <div className="bg-blue-600 p-3 rounded-full mr-4 shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">Subject</p>
            <p className="font-bold text-gray-800 text-lg">
              {admissionData.subject}
            </p>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center">
          <div className="bg-blue-600 p-3 rounded-full mr-4 shadow-md">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">Email</p>
            <p className="font-bold text-gray-800 text-lg">
              {admissionData.email}
            </p>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center">
          <div className="bg-blue-600 p-3 rounded-full mr-4 shadow-md">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">Phone Number</p>
            <p className="font-bold text-gray-800 text-lg">
              {admissionData.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center">
          <div className="bg-blue-600 p-3 rounded-full mr-4 shadow-md">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">Address</p>
            <p className="font-bold text-gray-800 text-lg">
              {admissionData.address}
            </p>
          </div>
        </div>
      </div>

      {/* Date of Birth */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center">
          <div className="bg-blue-600 p-3 rounded-full mr-4 shadow-md">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">Date of Birth</p>
            <p className="font-bold text-gray-800 text-lg">
              {new Date(admissionData.dob).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Review Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center mb-6">
            <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              Add Your Review
            </h3>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-6">
            <div>
             
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating
              </label>
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