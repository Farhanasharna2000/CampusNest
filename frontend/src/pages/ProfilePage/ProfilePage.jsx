import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ProfilePage = () => {
  const { user, updateUserProfile, signoutUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    university: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        university: "",
        address: "",
      });

      axiosPublic
        .get(`/users/${user.email}`)
        .then((res) => {
          const data = res.data;
          setFormData((prev) => ({
            ...prev,
            university: data.university || "",
            address: data.address || "",
          }));
        })
        .catch((err) => console.error("Error fetching user info", err));
    }
  }, [user, axiosPublic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      //Update Firebase Auth profile
      await updateUserProfile(formData.displayName, user.photoURL || "");

      await axiosPublic.patch(`/users/${formData.email}`, {
        displayName: formData.displayName,
        university: formData.university,
        address: formData.address,
      });

      alert("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signoutUser();
      navigate("/login");
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded text-center">
        <img
          src={
            user.photoURL ||
            "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
          }
          alt="User"
          className="size-20 mb-4 rounded-full object-cover border mx-auto"
        />

        {editMode ? (
          <>
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Email (readonly)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border rounded p-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">University</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
            <button
              onClick={handleSave}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {formData.displayName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>University:</strong> {formData.university || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {formData.address || "N/A"}
            </p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Edit
              </button>

              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
