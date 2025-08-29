import React from "react";
import "../../stylesheets/HomeJobCard.css";
import { useNavigate } from "react-router-dom";


const Experinece = ({ experience }) => {
  if (!experience) return null;
    if (experience === 1) {
      return <span className="experience-badge fresher">Fresher</span>;
    }
    if (experience === 2) {
      return <span className="experience-badge experience-1">Mid Level</span>;
    }
    if (experience === 3) {
        return <span className="experience-badge experience-2">Senior Level</span>;
    }
    if (experience >= 4) {
        return <span className="experience-badge experience-3">Director Level</span>;
    }

}

export const HomeJobCard = ({
  _id,
  logo,
  job
}) => {
  const navigate = useNavigate();

  return (
    <div className="homejobcard">
      <div className="homecard-header">
        <img
          src={logo || "https://via.placeholder.com/100"}
          alt={job?.companyName || "logo"}
          className="homecompany-logo"
        />
        <div className="homejob-info">
          <p className="homejob-title">
            {job?.JobProfile} &nbsp;|&nbsp; {Experinece({ experience: job?.experience })} 
          </p>
          <p className="homejob-location">
            {job?.location}, {job?.state}
          </p>
        </div>
      </div>

      <div className="homejob-tags">
        {job?.skill && job.skill.length > 0 && (
          <span className="homejob-skill">{job.skill.join(", ")}</span>
        )}
      </div>

      <button
        className="homeapply-button"
        onClick={() => navigate(`/companies/${_id}/apply`)}
      >
        Apply
      </button>
    </div>
  );
};
