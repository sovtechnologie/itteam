import React, { useState } from "react";
import "../stylesheets/SignIn.css";
import wavinghand from "../images/waving-hand.png";
import EmprSignIn from "./EmprSignIn";
import EmpSignIn from "./EmpSignIn";
import k5Img from "../images/Group 2.png";
import mostpopular from "../images/mostpopular.png";
import trustpopular from "../images/trustpopular.png";
import topcompanies from "../images/No fake Job.svg";
import topcompanies1 from "../images/checked (2) 2.svg";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Extract query parameter from URL
  const queryParams = new URLSearchParams(window.location.search);
  const userRole = queryParams.get("role"); // Default to candidate

  return (
    <>
      <div className="signinBox">
        {/* <div className="signin-container"> */}
        <div className="left-box">
          <div className="signin-left">
            {userRole === "company" ? (
              <div className="welcome-message">
                <h1>
                  Find & hire the right
                  <br /> talent with us
                </h1>
                <div className="stats">
                  <p>Trusted by 9 Cr+ candidates |</p>
                  <p>5 Lakh+ employers</p>
                  <img src={k5Img} alt="" />
                </div>
              </div>
            ) : (
              <>
                <div className="benefits-section">
                  <h1>New to IT Team?</h1>
                  <ul style={{ marginTop: "20px" }}>
                    <li>
                      {/* <img
                        src={topcompanies1}
                        alt="" ○ 
                        style={{ height: "30px", width: "30px" }}
                      /> */}
                     Register your self with easy step.
                    </li>
                    <li>
                      {/* <img
                        src={topcompanies1}
                        alt=""
                        style={{ height: "30px", width: "30px" }}
                      /> */}
                     Highlight you resume on IT Team for better reach.
                    </li>
                    <li>
                      {/* <img
                        src={topcompanies1}
                        alt=""
                        style={{ height: "30px", width: "30px" }}
                      /> */}
                    Showcase profile to top companies and consultants.
                    </li>
                    <li>
                      {/* <img
                        src={topcompanies1}
                        alt=""
                        style={{ height: "30px", width: "30px" }}
                      /> */}
                   Let HR call you directly for the current opening.
                    </li>
                  </ul>
                </div>
                <h1>Let Job Find You</h1>
                <p style={{ fontSize: "20px" }}>
                  you will never know everything <br /> But you will Know more
                </p>
              </>
            )}

            <button
              onClick={() => {
                window.location.href = `/signup?role=${userRole}`;
              }}
              className="register-button"
            >
              Register For Free
            </button>
          </div>
        </div>

        <div className="right-form">
          <div className="right-form-head">
            {/* <img src={wavinghand} alt="Hello" className="hello-icon" /> */}
            <h2 className="oswald">Welcome back!</h2>
            <p>Please login to access your account</p>
          </div>

          <div className="signInRight">
            <div className="signInForm">
              <div className="signIn-toggle">
                <button
                  className={isLogin ? "active signBtn" : "signBtn"}
                  onClick={() => setIsLogin(true)}
                  style={{ paddingRight: "30px" }}
                >
                  Login
                </button>
                <button
                  className={!isLogin ? "active signBtn" : "signBtn"}
                  onClick={() => {
                    window.location.href = `/signup?role=${userRole}`;
                  }}
                  style={{ paddingLeft: "30px" }}
                >
                  Register
                </button>
              </div>
              {/* <h1 style={{color: "#1783D0" }}>
                Login As{" "}
                {userRole === "company" ? "Company" : "Job Seeker"}
              </h1> */}
              {userRole === "company" ? <EmprSignIn /> : <EmpSignIn />}
            </div>
          </div>
        </div>
      </div>
      <div className="job-search-container">
        <h6>How is it work</h6>
        <label className="job-search-title oswald">
          Making Your <span>Candidate Search Easy</span>
        </label>

        <p className="job-search-description">
          Quick find your recommended candidate based on your most recent opening  <br />
         and connect with them in second
        </p>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3 className="step-title">Login or Register</h3>
              <p className="step-description">
                Login and Register with your mobile number.
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
           Find your dream candidate from thousands candidates. Find the best candidate around the world or call directly on a email and mobile number after registering to our portal!
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
            Finding the right candidate can be challenging and expensive.
             That's why we don't charge any fees, no hidden costs, no paid registrations, and no premium upgrades.
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
    // </div>
  );
};

export default SignIn;
