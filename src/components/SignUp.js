import React, { useState, useEffect } from "react";
import "../stylesheets/SignUp.css";
import signUpEmp from "../images/signupFromImg.png";
import illustration from "../images/SignupImg.png"
import EmprSignUp from "./EmprSignUp"; // For company register
import EmpSignUp from "./EmpSignUp";  // For candidate register

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState("candidate"); // Default role

  useEffect(() => {
    // Extract the 'role' from the query string (either 'candidate' or 'company')
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <div className="signup-box">
      {/* <div className="signup-container"> */}
        <div className="leftBox">

          <div className="signup-left">
            {userRole === "company" ? (
              <>
                <div className="benefits-section">
                  <h1>Finding top talent from India is<br /> like finding a needle in a<br /> haystack</h1>
                  <p>We're excited to introduce and show you how <br />our platform simplifies hiring</p>
                </div>
              </>
            ) : (
              <div className="benefits-section">
                <h1>On registering, you can</h1>
                <ul>
                  <li>Build your profile and let recruiters find you</li>
                  <li>Get job postings delivered right to your email</li>
                  <li>Find a job and grow your career</li>
                </ul>
                <h1>Let Job Find You</h1>
                <p className="subtitle">
                  you will never know everything But you will <strong>Know more.</strong>
                </p>
              </div>
            )}

            <p className="login-prompt">Already Registered?  <button  onClick={() => {
                    const queryParams = new URLSearchParams(window.location.search);
                    const role = queryParams.get("type") || "candidate"; // Get current role
                    window.location.href = `/signin?role=${userRole}`;
                  }}> Login here</button></p>
            <img src={illustration} alt="Signup" style={{ width: "auto", height: "320px", margin: "0 auto" , marginTop:"100px"}} />
          </div>
          {/* )} */}
        </div>

        <div className="rightForm">
          <div className="signUpRight">
            <div className="signInForm">
              <div className="signIn-toggle">
                <button
                  className={isLogin ? "active signBtn" : "signBtn"}
                  onClick={() => {
                    const queryParams = new URLSearchParams(window.location.search);
                    const role = queryParams.get("type") || "candidate"; // Get current role
                    window.location.href = `/signin?role=${userRole}`;
                  }}
                  style={{ paddingRight: '30px' }}
                >
                  Login
                </button>
                <button
                  className={!isLogin ? "active signBtn" : "signBtn"}
                  onClick={() => setIsLogin(false)}
                  style={{ paddingLeft: '30px' }}
                >
                  Register
                </button>
              </div>
              <h1 style={{color:"#1783D0"}}>Register As {userRole === "company" ? "Company Employee" : "Job Seeker"}</h1>
              {userRole === "company" ? <EmprSignUp /> : <EmpSignUp />}
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default SignUp;

