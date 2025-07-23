import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
    const signinWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  };
     const signInWithTwitter  = () => {
    setLoading(true);
    return signInWithPopup(auth, twitterProvider)
  };
  const signoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const passReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
 const updateUserProfile = async (name, photoURL) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });

    // Reload user from Firebase
    await auth.currentUser.reload();

    // Set updated user in state
    setUser(auth.currentUser);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    signinUser,
    signoutUser,
    passReset,
    updateUserProfile,
    signinWithGoogle,
    signInWithTwitter
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
