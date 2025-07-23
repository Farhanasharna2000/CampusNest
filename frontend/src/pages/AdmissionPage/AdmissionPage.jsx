import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Star,
  ArrowRight,
  Send,
  Rocket,
} from "lucide-react";
import { colleges } from "../../constants/collegesData";
import useAuth from "./../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaRocket } from "react-icons/fa";
import { toast } from "react-toastify";

const AdmissionPage = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [formData, setFormData] = useState({
    candidateName: "",
    subject: "",
    email: user?.email || "",
    phone: "",
    address: "",
    dob: "",
    image: null,
  });

  // update formData email if user changes (e.g. after login)
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "email") return;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      formPayload.append("candidateName", formData.candidateName);
      formPayload.append("subject", formData.subject);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("address", formData.address);
      formPayload.append("dob", formData.dob);
      formPayload.append("image", formData.image);
      formPayload.append("collegeId", selectedCollege.id);
      formPayload.append("collegeName", selectedCollege.name);

      const response = await axiosPublic.post("/admissions", formPayload);

      if (response.status === 200 || response.status === 201) {
        toast.success("Application submitted successfully!");
        localStorage.setItem("userEmail", formData.email);

        setFormData((prev) => ({
          candidateName: "",
          subject: "",
          email: prev.email,
          phone: "",
          address: "",
          dob: "",
          image: null,
        }));
        navigate("/my-college");
        setSelectedCollege(null);
      } else {
        toast.error("Failed to submit");
      }
    } catch (err) {
      console.error(err);
      toast.error("You have already applied to a college");
    }
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 md:py-10 px-4">
        <div className="md:max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-3 md:mb-6">
            <GraduationCap className="md:w-16 w-12 h-12 md:h-16 mr-1 md:mr-4 animate-bounce" />
            <h1 className="md:text-5xl text-2xl font-bold">College Admission Portal</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Begin your journey to academic excellence. Choose from our
            prestigious partner institutions and take the first step toward your
            dream career.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        {!selectedCollege ? (
          <div className="md:space-y-8 space-y-4">
            <div className="text-center ">
              <h2 className="md:text-4xl text-xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text
           text-transparent pb-4 ">
                Select Your Dream College
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {colleges.map((college, index) => (
                <div
                  key={college.id}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                  onClick={() => {
                    if (!user) {
                      navigate("/signin");
                    } else {
                      setSelectedCollege(college);
                    }
                  }}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100 overflow-hidden transition-all duration-300
                               flex flex-col justify-between
                               md:h-80"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2"></div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <GraduationCap className="w-8 h-8 text-blue-600" />
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                college.rating >= i + 1
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill={
                                college.rating >= i + 1 ? "#facc15" : "none"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <h3 className="md:text-xl text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {college.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                        {college.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium mt-auto">
                        <span className="mr-2">Apply Now</span>
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center
                        p-1 group-hover:bg-blue-600 group-hover:text-white transition-all">
                         <ArrowRight/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100"
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                <div className="flex items-center justify-between gap-2">
             
                  <div className="flex items-center ">
                         <div className="hidden md:block">

                    <GraduationCap className="w-10 h-10 mr-4" />
                  </div>
                    <div>
                      <h3 className="md:text-2xl text-lg font-bold">Application Form</h3>
                      <p className="text-blue-100 mt-1 md:text-base text-sm">
                        {selectedCollege.name}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCollege(null)}
                    className="flex items-center bg-blue-500 hover:bg-blue-800 px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <User className="w-4 h-4 mr-2 text-blue-600" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="Enter Your Full Name"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="e.g., Computer Science"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                      placeholder="Your Email"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-blue-600" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="Enter Your Phone Number"
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="Enter Your Address"
                    />
                  </div>

                  {/* DOB */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>

                  {/* Profile Photo */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Upload className="w-4 h-4 mr-2 text-blue-600" />
                      Photo
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 file:rounded-lg file:border-0"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Submit Application <FaRocket />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionPage;
