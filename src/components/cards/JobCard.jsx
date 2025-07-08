import React from 'react';
import '../../stylesheets/JobCard.css';
import vector from "../../images/Vector.png";
import { useNavigate } from 'react-router-dom';
import coin from "../../images/coins.png";
import company from "../../images/CompanyProfilelogo.png";



const JobCard = ({
    _id,
    logo,
    companyName,
    designationName,
    email,
    city,
    state,
    website,
}) => {
    const navigate = useNavigate();
    return (
        <div className="jobcard">
            <div className="card-header">
                <img src={logo || company} alt={companyName || "logo"} className="company-logo" />
                {/* <div className="job-info">
                    <div className="company-name">{companyName}</div>
                    <div className="job-title">{designationName}</div>
                    <div className="job-location">{city},{state}</div>
                </div> */}
                <div className="job-info">
                  <h3 className="company-name">{companyName}</h3>
                  <p className="job-title">
                    {designationName}|{email}
                  </p>
                </div>

                {/* <Bookmark size={16} className="bookmark-icon" /> */}
                {/* <img className='bookmark-icon' src={vector} alt='bookmark-Icon' /> */}
            </div>
            <p className="job-desc">
                {/* {(() => {
                    const words = description ? description.split(" ") : [];
                    if (words.length <= 10) return description;
                    return words.slice(0, 10).join(" ") + " ...";
                })()} */}
               {state} {city},
            </p>

            <div className="job-tags">
                {/* {(industry).map((tag, index) => (
                    <span key={index}>{tag}</span>
                ))} */}
                {/* {contactNumber} */}
            </div>

            {/* <div className="job-details">
                <div className="salary"><img src={coin} alt='coin-icon' /> {salary || "22000"}</div>
                <div className="posted">📅 {postedAgo ? postedAgo : "3 days ago"}</div>
            </div> */}

            <button className="view-button" onClick={() => navigate(`/companies/${_id}`)}>View Details</button>
        </div>
    );
};

export default JobCard;
