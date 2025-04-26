import React, { useState } from 'react'
import "../stylesheets/Pricing.css";
import jobhuntingCard from './cards/JobhuntingCard';

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
    { number: "02", label: "Get To Reveal",comingSoon: true },
    { number: "03", label: "Get To Reveal",comingSoon: true },
    { number: "04", label: "Get To Reveal", comingSoon: true }
  ];



  const heading =
    activeTab === "candidate"
      ? "Our Goal Is To Reduce Fake Jobs"
      : "We aim to simplify your life to the best of our ability";

  const activeData =
    activeTab === "candidate" ? roadmapDataCandidate : roadmapDataCompany;

  const roadmapData1 = [
    { number: "01", label: "Life TimeFree", comingSoon: false },
    { number: "02", label: "Apply On Job", comingSoon: true },
    { number: "03", label: "ATS Resume", comingSoon: true },
    { number: "04", label: "Alert On Email", comingSoon: true },
  ];



  return (
    <>
      <div className="benefits-container">
        <div className="benefits-header">
          <h1>
            <span className='no-wrap'>Benefits of <span className='highlight'>Paid Services</span></span>
          </h1>
          <p className="header-subtext">
            With quick and easy plans on India's leading job site Find,
            attract and hire talent with IT Team
          </p>
        </div>

        <div className="divider"></div>

        <div className="benefits-tabs">
          <button
            className={`tab-button ${activeTab === "candidate" ? "active" : ""}`}
            onClick={() => setActiveTab("candidate")}
          >
            As a Candidate
          </button>
          <button
            className={`tab-button ${activeTab === "company" ? "active" : ""}`}
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
            >
              Attract <span style={{ color: "#0078d7", marginLeft: "8px" }}>Candidates</span>
            </h1>
          )}


          <h2>{heading}</h2>
        </div>

      </div>
      <div className="roadmap-wrapper">
        <div className="road">
          {activeData.map((item, index) => (
            <div
              className={`marker ${index % 2 === 0 ? "blue" : "brown"}`}
              key={index}
            >
              <div className="marker-circle">{item.number}</div>
              <div className="shadow" />
            </div>
          ))}
        </div>

        <div className="labels">
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
        <h1 className="job-hunting-title">A job hunting experience <br/>like no other</h1>
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
  )
}

export default Pricing
