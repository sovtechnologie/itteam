import React from "react";
import "../../stylesheets/JobHuntingCard.css";

const jobhuntingCard = () =>{

    return(
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
    )
}

export default jobhuntingCard;