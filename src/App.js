import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
// Pages
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Pricing from "./components/Pricing";
import ContactUs from "./components/ContactUs";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Employer from "./components/Employer";
import EmpFilter from "./components/cards/EmpFilter";
import { AuthProvider } from "./components/AuthContext";
import UserDetails from "./components/UserDetails";
import ScrollToTop from "./components/ScrollToTop";
import EmployeeProfile from "./components/EmployeeProfile";
import EmployerProfile from "./components/EmployerProfile";
import EmpProfPage from "./components/empProfileCom/EmpProfPage";
import Companies from "./components/Companies";
import OurTeam from "./components/OurTeam";
import CompanyFilter from "./components/cards/CompanyFilter";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/home" ||
    location.pathname === "/aboutus" ||
    location.pathname === "/ourTeam" ||
    location.pathname === "/privacy&policy" ||
    location.pathname === "/terms&condition" ||
    location.pathname === "/contactus" ||
    location.pathname === "/pricing" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup" ;

  return (
    <>
      <ScrollToTop />

      {/* {location.pathname !== "/signin" && location.pathname !== "/signup" && ( */}
      <Header isHomePage={isHomePage} />
      {/* )} */}
      <Routes>
        {/* Your Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/ourTeam" element={<OurTeam />} />
        <Route path="/empfilter" element={<EmpFilter />} />
        <Route path="/Compfilter" element={<CompanyFilter />} />
        <Route path="/privacy&policy" element={<Privacy />} />
        <Route path="/terms&condition" element={<Terms />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/employee-page" element={<EmpProfPage />} />
        <Route path="/employee-profile/:id" element={<EmployeeProfile />} />
        <Route path="/employer-profile/:id" element={<EmployerProfile />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="companies/:id" element={<Companies />} />
        <Route
          path="/active-joiner-profile/:id"
          element={<EmployeeProfile />}
        />
        <Route path="/user-details/:userId" element={<UserDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {/* {location.pathname !== "/signin" && location.pathname !== "/signup" && ( */}
      <Footer />
      {/* )} */}
    </>
  );
};

export default App;
