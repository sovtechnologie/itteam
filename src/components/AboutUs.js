import React from "react";
import "../stylesheets/AboutUs.css";
import trustpopular from "../images/trustpopular.png";
import { Link } from "react-router-dom";
import ladypicture from "../images/ladypicture.png";
import company1 from "../images/campanieslogo/company1.png";
import company2 from "../images/campanieslogo/company2.png";
import company3 from "../images/campanieslogo/company3.png";
import company4 from "../images/campanieslogo/company4.png";
import company5 from "../images/campanieslogo/company5.png";
import company6 from "../images/campanieslogo/company6.png";

const AboutUs = () => {
  return (
    <>
      <div className="about-us-section">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtext">
          As the fastest-growing online Job board, our mission is to help great
          individuals connect with great companies.
        </p>
        <div className="about-stats">
          <div className="stat">
            <h2 className="stat-value">52,015</h2>
            <p className="stat-label">Job Posted</p>
          </div>
          <div className="stat">
            <h2 className="stat-value">24,325</h2>
            <p className="stat-label">Successful Hires</p>
          </div>
          <div className="stat">
            <h2 className="stat-value">1,532</h2>
            <p className="stat-label">Verified Companies</p>
          </div>
          <div className="stat">
            <h2 className="stat-value">1.2M</h2>
            <p className="stat-label">Monthly Visitors</p>
          </div>
        </div>
      </div>

      <section className="company-about">
        <div className="company-text">
          <h1>
            About Our <span className="highlight">Company</span>
          </h1>
          <p>
            We are committed to addressing the significant challenges in the IT
            sector that are increasingly affecting candidates, companies, human
            resources, IT recruiters, and small-scale enterprises. Our goal is
            to become a comprehensive IT solution provider within five years.
          </p>
          <Link to="/contactus">
            <button className="contact-btn">Contact Us →</button>
          </Link>
        </div>
      </section>

      <section className="enterprise-section">
        <div className="text-logos">
          <h1>
            A Trusted Partner for
            <br />
            <span className="highlight">Top Enterprises Across Sectors</span>
          </h1>

          <div className="logo-grid">
            <div className="logo-box">
              <img src={company1} alt="Invasystems" />
            </div>
            <div className="logo-box">
              <img src={company2} alt="NTT Data" />
            </div>
            <div className="logo-box">
              <img src={company3} alt="NCS" />
            </div>
            <div className="logo-box">
              <img src={company4} alt="Malpani" />
            </div>
            <div className="logo-box">
              <img src={company5} alt="Wet n Joy" />
            </div>
            <div className="logo-box">
              <img src={company6} alt="Imagicaa" />
            </div>
          </div>
        </div>
        <div className="partner-image">
          <img src={ladypicture} alt="Woman with Laptop" />
        </div>
      </section>

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
            Find your dream candidate from thousands candidates. Find the best
            candidate around the world or call directly on a email and mobile
            number after registering to our portal!
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

export default AboutUs;
