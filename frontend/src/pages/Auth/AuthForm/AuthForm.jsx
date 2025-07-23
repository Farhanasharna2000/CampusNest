import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaGoogle, FaTwitter } from "react-icons/fa";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-purple-100 px-4">
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

        <div className="flex justify-between gap-3">
          <button onClick={handleGoogleSignIn} className="flex justify-center items-center gap-1 w-1/2  border rounded-xl py-2 hover:bg-gray-50 transition text-sm">
            <span ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg></span> Google
          </button>
          <button onClick={handleTwitterSignIn} className="flex justify-center items-center gap-1 w-1/2 border rounded-xl py-2 hover:bg-gray-50 transition text-sm">
         <span><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30">
<path d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 8.6484375 9 L 13.259766 9 L 15.951172 12.847656 L 19.28125 9 L 20.732422 9 L 16.603516 13.78125 L 21.654297 21 L 17.042969 21 L 14.056641 16.730469 L 10.369141 21 L 8.8945312 21 L 13.400391 15.794922 L 8.6484375 9 z M 10.878906 10.183594 L 17.632812 19.810547 L 19.421875 19.810547 L 12.666016 10.183594 L 10.878906 10.183594 z"></path>
</svg> </span>  Twitter
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
