import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AuthForm = ({ mode }) => {
  const {
    createUser,
    signinUser,
    updateUserProfile,
    signinWithGoogle,
    signInWithTwitter,
    passReset,
  } = useAuth();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    try {
      const result = await createUser(email, password);
      const user = result.user;
      console.log(user);
      await updateUserProfile(name, photoURL);

      const userInfo = {
        displayName: name,
        email,
        photoURL,
      };

      await axiosPublic.post("/users", userInfo);
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const result = await signinUser(email, password);
      console.log("Signed in user:", result.user);
      navigate("/");
    } catch (err) {
      console.error("Sign in error:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signinWithGoogle();
      const user = result.user;

      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      await axiosPublic.post("/users", userInfo);
      navigate("/");
    } catch (err) {
      console.error("Google Sign-In error:", err);
    }
  };

  const handleTwitterSignIn = async () => {
    try {
      const result = await signInWithTwitter();
      const user = result.user;

      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      await axiosPublic.post("/users", userInfo);
      navigate("/");
    } catch (err) {
      console.error("Twitter Sign-In error:", err);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      await passReset(resetEmail);
      setResetLoading(false);
      window.open("https://mail.google.com", "_blank");
    } catch (error) {
      console.error("Password reset error:", error);
      setResetLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-tr from-blue-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {mode === "signin" ? "Sign In to Your Account" : "Create a New Account"}
        </h2>

        <form onSubmit={mode === "signin" ? handleSignIn : handleRegister} className="space-y-4">
          {mode === "register" && (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              />
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="Enter Your Photo URL"
                className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email address"
            className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {mode === "signin" ? "Sign In" : "Register"}
          </button>
        </form>

        {mode === "signin" && (
          <div className="mt-3 text-right">
            <button
              onClick={() => setShowReset(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex gap-3">
          <button onClick={handleGoogleSignIn} className="flex-1 border rounded-xl py-2 hover:bg-gray-50 transition text-sm">
            Continue with Google
          </button>
          <button onClick={handleTwitterSignIn} className="flex-1 border rounded-xl py-2 hover:bg-gray-50 transition text-sm">
            Continue with Twitter
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          {mode === "signin" ? (
            <>
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">Register</a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 hover:underline">Sign In</a>
            </>
          )}
        </p>
      </div>

      {showReset && (
        <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full relative animate-fade-in transition-all duration-300">
            <button
              onClick={() => setShowReset(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-blue-500 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">📧</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Forgot your password?</h3>
              <p className="text-sm text-gray-500 mb-4">No worries! We’ll send you a reset link 💌</p>
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full border border-blue-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
              >
                {resetLoading ? "Sending..." : "Send Reset Email"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
