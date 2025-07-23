import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Homepage from "../pages/Homepage/Homepage";
import SignIn from "../pages/Auth/Signin/Signin";
import Register from "../pages/Auth/Register/Register";
import CollegeDetails from "../pages/Shared/CollegeDetails/CollegeDetails";
import CollegesPage from "../pages/CollegesPage/CollegesPage";
import AdmissionPage from "../pages/AdmissionPage/AdmissionPage";
import MyCollegePage from "../pages/MyCollegePage/MyCollegePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SearchPage from "../pages/SearchPage/SearchPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/colleges" element={<CollegesPage />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/my-college" element={<MyCollegePage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* ✅ Protected college details route */}
          <Route
            path="/college/:id"
            element={
              <PrivateRoute>
                <CollegeDetails />
              </PrivateRoute>
            }
          />
          {/* ✅ Protected profile route */}

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
