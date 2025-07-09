import React from 'react';
import '../../stylesheets/JobCard.css';

import { useNavigate } from 'react-router-dom';

import company from "../../images/CompanyProfilelogo.png";



const JobCard = ({
    _id,
    logo,
    companyName,
    designationName,
    email,
    city,
    state,
}) => {
    const navigate = useNavigate();
    return (
        <div className="jobcard">
            <div className="card-header">
                <img src={logo || company} alt={companyName || "logo"} className="company-logo" />
               
                <div className="job-info">
                  <h3 className="company-name">{companyName}</h3>
                  <p className="job-title">
                    {designationName}|{email}
                  </p>
                </div>

              
            </div>
            <p className="job-desc">
               
               {state} {city},
            </p>

            <div className="job-tags">
                
            </div>

            

            <button className="view-button" onClick={() => navigate(`/companies/${_id}`)}>View Details</button>
        </div>
    );
};

export default JobCard;
