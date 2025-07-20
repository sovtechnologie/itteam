import React from "react";
import "../stylesheets/AboutUs.css";
import trustpopular from "../images/trustpopular.png";
import { Link } from "react-router-dom";
import ladypicture from "../images/ladypicture.png";
import company1 from "../images/campanieslogo/company1.svg";
import company2 from "../images/campanieslogo/company2.svg";
import company3 from "../images/campanieslogo/company3.svg";
import company4 from "../images/campanieslogo/company4.svg";
import company5 from "../images/campanieslogo/company5.svg";
import company6 from "../images/campanieslogo/company6.svg";

const AboutUs = () => {
  return (
    <>
      <div className="about-us-section">
        
          <h1 className="about-title">About Us</h1>
          <p className="about-subtext">
            As the fastest-growing online Job board, our mission is to help
            great individuals connect with great companies.
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
            We deliver innovative tech solutions for project management and supply chain challenges, backed by
            deep expertise in Oracle enterprise products. Founded in 2007 by pioneers of Oracle’s Supply Chain
            and Primavera products, Gaea has successfully deployed solutions for over 100 clients worldwide,
            managing $10 billion in capital projects. Our goal is simple: to provide top-tier software solutions
            that maximize ROI.
          </p>
          <Link to="/contactus">
            <button className="contact-btn">Contact Us →</button>
          </Link>
        </div>
      </section>


      <section className="enterprise-section">
        <div className="text-logos">
          <h1>
            A Trusted Partner for<br />
            <span className="highlight">Top Enterprises Across Sectors</span>
          </h1>

          <div className="logo-grid">
            <div className="logo-box"><img src={company1} alt="Invasystems" /></div>
            <div className="logo-box"><img src={company2} alt="NTT Data" /></div>
            <div className="logo-box"><img src={company3} alt="NCS" /></div>
            <div className="logo-box"><img src={company4} alt="Malpani" /></div>
            <div className="logo-box"><img src={company5} alt="Wet n Joy" /></div>
            <div className="logo-box"><img src={company6} alt="Imagicaa" /></div>
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
            Find your dream job from thousands daily updated job vacancies.
            Find the best jobs around the world or apply directly on a
            business website. Search and find jobs today!
          </p>
          <div className="hero-buttons">
            <button className="btn-outline" onClick={() => window.location.href = "/signin?role=candidate"}>Join as Jobseeker</button>
            <button className="btn-filled" onClick={() => window.location.href = "/signin?role=company"}>Join as Company</button>
          </div>
        </div>
      </section>

      <div className="job-hunting-container">
        <h1 className="job-hunting-title">A job hunting experience <br />like no other</h1>
        <p className="job-hunting-subtitle">Why search when you can discover? Let the right job come to you.</p>

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
