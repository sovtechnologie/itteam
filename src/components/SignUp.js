import React, { useState, useEffect } from "react";
import "../stylesheets/SignUp.css";
import signUpEmp from "../images/signupFromImg.png";
import illustration from "../images/SignupImg.png";
import EmprSignUp from "./EmprSignUp"; // For company register
import EmpSignUp from "./EmpSignUp"; // For candidate register
import wavinghand from "../images/waving-hand.png";
import mostpopular from "../images/mostpopular.png";
import trustpopular from "../images/trustpopular.png";
import topcompanies from "../images/Companies.png";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState("candidate"); // Default role

  useEffect(() => {
    // Extract the 'role' from the query string (either 'candidate' or 'company')
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <>
      <div className="signup-box">
        {/* <div className="signup-container"> */}
        <div className="leftBox">
          <div className="signup-left">
            {userRole === "company" ? (
              <>
                <div className="benefits-section">
                  <h1>
                    Finding top talent from India is
                    <br /> like finding a needle in a<br /> haystack
                  </h1>
                  <p>
                    We're excited to introduce and show you how <br />
                    our platform simplifies hiring
                  </p>
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
                  you will never know everything But you will{" "}
                  <strong>Know more.</strong>
                </p>
              </div>
            )}
            <div
              onClick={() => {
                window.location.href = `/signin?role=${userRole}`;
              }}
            >
              <p className="login-prompt">
                Already Registered?{" "}
                <div
                  onClick={() => {
                    window.location.href = `/signin?role=${userRole}`;
                  }}
                  // window.location.href = `/signin?role=${userRole}`;}}
                >
                  {" "}
                  Login here
                </div>
              </p>
            </div>

            <img
              src={illustration}
              alt="Signup"
              style={{
                width: "auto",
                height: "320px",
                margin: "0 auto",
                marginTop: "100px",
              }}
            />
          </div>
          {/* )} */}
        </div>

        <div className="rightForm">
          <div className="signUpRight">
            <div className="right-form-head">
              <img src={wavinghand} alt="Hello" className="hello-icon" />
              <h2 className="oswald">Welcome back!</h2>
              <p>Please resgister to access your account</p>
            </div>
            <div className="signInForm">
              <div className="signIn-toggle">
                <button
                  className={isLogin ? "active signBtn" : "signBtn"}
                  onClick={() => {
                    const queryParams = new URLSearchParams(
                      window.location.search
                    );
                    const role = queryParams.get("type") || "candidate"; // Get current role
                    window.location.href = `/signin?role=${userRole}`;
                  }}
                  style={{ paddingRight: "30px" }}
                >
                  Login
                </button>
                <button
                  className={!isLogin ? "active signBtn" : "signBtn"}
                  onClick={() => setIsLogin(false)}
                  style={{ paddingLeft: "30px" }}
                >
                  Register
                </button>
              </div>
              <h1 style={{ color: "#1783D0" }}>
                Register As{" "}
                {userRole === "company" ? "Company Employee" : "Job Seeker"}
              </h1>
              {userRole === "company" ? <EmprSignUp /> : <EmpSignUp />}
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      <div className="job-search-container">
        <h6>How is it work</h6>
        <label className="job-search-title oswald">
          Making Your <span>Job Search Easy</span>
        </label>

        <p className="job-search-description">
          Quick Apply shows you recommended jobs based off your most recent
          search <br />
          and allows you to apply to 25+ jobs in a seconds
        </p>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3 className="step-title">Login or Register</h3>
              <p className="step-description">
                Login with email and sign up with email/facebook and linkedin.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3 className="step-title">Download Resume</h3>
              <p className="step-description">
                Data-driven professional with expertise in tracking and
                optimizing resume
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3 className="step-title">Contact Candidate's</h3>
              <p className="step-description">
                Skilled in sourcing, engaging, and building relationships with
                top talent to meet organizational needs.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3 className="step-title">Hire Candidate</h3>
              <p className="step-description">
                Experienced in identifying, interviewing, and hiring top talent
                to meet company needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="hero-sections">
        <div className="hero-left">
          <img src={trustpopular} alt="Team" className="team-image" />
        </div>

        <div className="hero-right">
          <h1>
            Trusted & Popular <br />
            <span className="highlight">Job Portal</span>
          </h1>
          <p className="description">
            Find your dream job from thousands daily updated job vacancies. Find
            the best jobs online from UK job sites or apply directly on a
            business website. Search and find jobs today!
          </p>
          <div className="hero-buttons">
            <button
              className="btn-outline"
              onClick={() => (window.location.href = "/signin?role=candidate")}
            >
              Join as Jobseeker
            </button>
            <button
              className="btn-filled"
              onClick={() => (window.location.href = "/signin?role=company")}
            >
              Join as Company
            </button>
          </div>
        </div>
      </section>
      <div className="why-popular">
        <div className="why-left">
          <h1 className="oswald">
            Why We are <span className="highlight oswald">Most Popular</span>
          </h1>
          <p>
            Quis ipsum suspendisse ultrices gravida, Risus commodo viverra
            maecenas accumsan lacus vel facilisis. Quis ipsum suspendisse
            ultrices gravida
          </p>

          <div className="popular-grid">
            {[
              "Free for Jobseeker",
              "No fake Job",
              "HR Friendly",
              "Future Of Job",
            ].map((company, i) => (
              <div className="popular-item" key={i}>
                <img src={topcompanies} alt="Icon" />
                <span>{company}</span>
              </div>
            ))}
          </div>

          <div className="popular-buttons">
            <button
              className="btn-outline"
              onClick={() => (window.location.href = "/signin?role=candidate")}
            >
              Join as Jobseeker
            </button>
            <button
              className="btn-primary"
              onClick={() => (window.location.href = "/signin?role=company")}
            >
              Join as Company
            </button>
          </div>
        </div>

        <div className="why-right">
          <div className="image-box">
            <img src={mostpopular} alt="Happy User" className="main-img" />
          </div>
        </div>
      </div>

      <div className="job-hunting-container">
        <h1 className="job-hunting-title">
          A job hunting experience <br />
          like no other
        </h1>
        <p className="job-hunting-subtitle">
          Why search when you can discover? Let the right job come to you.
        </p>

        <div className="job-hunting-form">
          <input
            type="email"
            placeholder="Enter Your Mail"
            className="job-hunting-input"
          />
          <button className="job-hunting-button">Subscribe</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
