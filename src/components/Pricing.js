import React, { useState } from "react";
import "../stylesheets/Pricing.css";
import jobhuntingCard from "./cards/JobhuntingCard";
import mapcount from "../images/mapcount.png";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("candidate");

  const roadmapDataCandidate = [
    { number: "01", label: "Life TimeFree", comingSoon: false },
    { number: "02", label: "Apply On Job", comingSoon: true },
    { number: "03", label: "ATS Resume", comingSoon: true },
    { number: "04", label: "Alert On Email", comingSoon: true },
  ];

  const roadmapDataCompany = [
    { number: "01", label: "Free" },
    { number: "02", label: "Get To Reveal", comingSoon: true },
    { number: "03", label: "Get To Reveal", comingSoon: true },
    { number: "04", label: "Get To Reveal", comingSoon: true },
  ];

  const heading =
    activeTab === "candidate"
      ? "Our Goal Is To Reduce Fake Jobs"
      : "We aim to simplify your life to the best of our ability";

  const activeData =
    activeTab === "candidate" ? roadmapDataCandidate : roadmapDataCompany;

  return (
    <>
      <div className="benefits-container">
        <div className="benefits-header">
          <h1 className="oswald">
            <span className="no-wrap">
              Benefits of <span className="highlight">Paid Services</span>
            </span>
          </h1>
          <p className="header-subtext">
            With quick and easy plans on India's leading job site Find, attract
            and hire talent with IT Team
          </p>
        </div>


        <div className="benefits-tabs">
          <button
            className={`tab-button ${
              activeTab === "candidate" ? "active" : ""
            } oswald`}
            onClick={() => setActiveTab("candidate")}
          >
            As a Candidate
          </button>
          <button
            className={`tab-button ${activeTab === "company" ? "active" : ""} oswald`}
            onClick={() => setActiveTab("company")}
          >
            As a Company
          </button>
        </div>

        <div className="goal-section">
          {activeTab === "company" && (
            <h1
              style={{
                fontSize: "50px",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
              className="oswald"
            >
              Attract{" "}
              <span style={{ color: "#0078d7", marginLeft: "8px" }}>
                Candidates
              </span>
            </h1>
          )}

          <h2>{heading}</h2>
        </div>
      </div>
      <div className="roadmap-wrapper">
        <img src={mapcount} alt="" style={{width : "-webkit-fill-available"}} />

        <div className="labels">
        {/* <img src={mapcount} alt="" style={{width : "-webkit-fill-available"}} /> */}
        {activeData.map((item, index) => (
            <div className="label" key={index}>
              <p className="label-title">{item.label}</p>
              {item.comingSoon && (
                <p className="coming-soon">(Coming Soon)</p>
              )}
               </div>
          ))}
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

export default Pricing;
