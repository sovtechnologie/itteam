import React from 'react';
import '../../stylesheets/JobCard.css';
import vector from "../../images/Vector.png";
import { Navigate, useNavigate } from 'react-router-dom';
import coin from "../../images/coins.png";
import company from "../../images/CompanyProfilelogo.png";



const JobCard = ({
    _id,
    companyLogo,
    companyName,
    jobTitle,
    location,
    about,
    tags,
    salary,
    postedAgo,
}) => {
    const navigate = useNavigate();
    return (
        <div className="jobcard">
            <div className="card-header">
                <img src={companyLogo || company} alt={companyName} className="company-logo" />
                <div className="job-info">
                    <div className="company-name">{companyName}</div>
                    <div className="job-title">{jobTitle || "Js Developer "}</div>
                    <div className="job-location">{location || "Noida"}</div>
                </div>

                {/* <Bookmark size={16} className="bookmark-icon" /> */}
                <img className='bookmark-icon' src={vector} />
            </div>
           <p className="job-desc">
                  {(() => {
                    const words = about ? about.split(" ") : [];
                    if (words.length <= 10) return about;
                    return words.slice(0, 10).join(" ") + " ...";
                  })() || "We are looking for someone with experience using AI software to create realistic product photos."}
                </p>

            <div className="job-tags">
                {(tags || ["IT ", "Finance"]).map((tag, index) => (
                    <span key={index}>{tag}</span>
                ))}
            </div>


            <div className="job-details">
                <div className="salary"><img src={coin} /> {salary || "22000"}</div>
                <div className="posted">📅 {postedAgo ? postedAgo : "3 days ago"}</div>
            </div>

            <button className="view-button" onClick={() => navigate(`/companies/${_id}`)}>View Details</button>
        </div>
    );
};

export default JobCard;
