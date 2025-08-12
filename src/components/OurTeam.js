import React from "react";
import "../stylesheets/OurTeam.css";
import founderImg from "../images/founderImage.png";
import AvpImage from "../images/AVPImage.png"
import dotImage from "../images/dotpattern.png";

const OurTeam = () => {
  return (
    <>
      <div className="leadership-section">
        <div className="overlay">
          <div className="leadership-wrapper">
            <h1 className="title-line">LEADERSHIP TEAM</h1>
            <div className="bar-block">
              <div className="bar"></div>
              <div className="bar-text">
                <h1>LEADING WITH</h1>
                <h1>PURPOSE</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-title-team">
        <h1 className="section-title">
          Meet Our <span className="highlight"> Community Member</span>
        </h1>
      </div>

      <section className="founder-section">
        <div className="founder-left">
          <p>
            Our mission is to transform the job search experience by eliminating the unnecessary frustrations that candidates face and creating a transparent, trustworthy, and efficient hiring ecosystem. We are committed to developing innovative technology that ensures genuine job opportunities, clear communication, and a smooth hiring process for both candidates and employers.
          </p>
          <p>
            Through our platform, we aim to:
            <ul style={{marginLeft:"30px"}}>
              <li>Verify job authenticity to protect candidates from scams and misleading postings.</li>
              <li>Streamline communication so applicants receive timely updates and honest feedback. </li>
              <li>Standardize interview processes for consistency, clarity, and fairness.</li>
              <li> Empower candidates with insights and tools to showcase their skills effectively.</li>
            </ul>
                     
            
           
          </p>
          <p>
            We believe the hiring journey should be about opportunity, not obstacles — and our IT team is dedicated to building solutions that restore trust, reduce stress, and connect the right talent with the right opportunities.
          </p>
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

        <div className="founder-right">
          <div className="image-wrapper">
            <div className="dot-pattern">
              {" "}
              <img src={dotImage} />
            </div>
            <img src={AvpImage} alt="Founder" />
            <div className="name-tag">
              <strong>Sakshi Thakur</strong>
              <span style={{display:"flex", justifyContent:"center"}}>(AVP)</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default OurTeam;
