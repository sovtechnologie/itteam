import React, { useEffect, useState } from "react";
import "../stylesheets/Home.css";
import linkedin from "../images/linkedin.png";
import mostpopular from "../images/mostpopular.png";
import trustpopular from "../images/trustpopular.png";
import { IoIosSearch } from "react-icons/io";

import api from "../services/api";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import seniorExpert from "../images/Roles/expert.svg";
import counseller from "../images/Roles/counselling.svg";
import topcompanies from "../images/No fake Job.png";
import topcompanies1 from "../images/Free for Jobseeker.png";
import topcompanies2 from "../images/Future Of Job.png";
import topcompanies3 from "../images/HR Friendly.png";

import remote1 from "../images/HomeIcons/remote1.svg";
import mnc from "../images/HomeIcons/mnc1.svg";
import sales from "../images/HomeIcons/sales1.svg";
import project from "../images/HomeIcons/projectmanagement1.svg";
import development from "../images/HomeIcons/development1.svg";
import data from "../images/HomeIcons/dataOperator1.svg";
import intership from "../images/HomeIcons/intership1.svg";
import analytic from "../images/HomeIcons/analytic1.svg";
import next from "../images/next-arrow.png";
import homeemail from "../images/HomeIcons/home-email.svg";
import homecaller from "../images/HomeIcons/homecaller.svg";
import homelocation from "../images/HomeIcons/homelocation.svg";
import homenotice from "../images/HomeIcons/homenotice.svg";

import { fetchtopskillandlocation } from "../services/apiService";
import { BsDownload } from "react-icons/bs";
import femaleAvator from "../images/female.png";
import MaleAvator from "../images/male.png";
import downloadResume from "../utils/download";



const Home = () => {
  const isLoggedIn = !!Cookies.get("authToken");
  const navigate = useNavigate();

  const handleTechStackClick = (techStack) => {
    navigate(`/empfilter?expertTecStack=${encodeURIComponent(techStack)}`);
    window.scrollTo(0, 0);
  };

  const [searchInput, setSearchInput] = useState("");
  const [companies, setCompanies] = useState([]);
  const [activeJoiners, setActiveJoiners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [techStacks, setTechStacks] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [topLocation, setTopLocation] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/empfilter?expertTecStack=${encodeURIComponent(searchInput)}`);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/withOutLogin/getAllCompanyHomePage");
        if (response.data.status === 200) {
          setCompanies(response?.data?.result.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    api
      .get("/withOutLogin/active-limited-joiner")
      .then((res) => {
        if (res.data && res.data.userData) {
          setActiveJoiners(res.data.userData);
        } else {
          setActiveJoiners([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching active joiners:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    api
      .get("/withOutLogin/tech-stack-list")
      .then((res) => {
        console.log("Tech Stack API Response:", res.data.result);

        if (res.data && res.data.result) {
          setTechStacks(res.data.result);
        } else {
          setTechStacks([]);
        }
      })
      .catch((err) => console.error("Error fetching tech stacks:", err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchtopskillandlocation();
        setTopSkills(response.topSkills);
        setTopLocation(response.topLocations);
      } catch (error) {
        console.error("data not fetching", error);
      }
    };

    fetchData();
  }, []);

  const ExperiencedLabel = (value) => {
    switch (value) {
      case "1":
      case 1:
        return "Fresher";
      case "2":
      case 2:
        return "Junior";
      case "3":
      case 3:
        return "Mid-Level";
      case "4":
      case 4:
        return "Senior";
      default:
        return "Not specified";
    }
  };

  const JobtypeLabel = (value) => {
    switch (value) {
      case "1":
      case 1:
        return "W.F.O";
      case "2":
      case 2:
        return "Remote";
      case "3":
      case 3:
        return "Hybrid";
      default:
        return "Not specified";
    }
  };

 


// const downloadResume = (resumeUrl) => {
//   const link = document.createElement("a");
//   link.href = resumeUrl;
//   link.download = resumeUrl.split("/").pop(); // sets the default file name
//   link.target = "_blank"; // optional: opens in new tab before download
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };




  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title oswald">
            Hire The Best Developers <br />
            Around The World
          </h1>
          <p className="hero-subtitle">
            World class nearshore talent for technology teams
            <br /> that demand the highest standards
          </p>

          <form className="hero-search" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
              <IoIosSearch className="search-icon" />
              <input
                type="text"
                placeholder="Job title"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit">Find Now</button>
            </div>
          </form>

          <div className="category-tags">
            {[
              { img: remote1, label: "Angular" },
              { img: mnc, label: "DevOps" },
              { img: sales, label: "AI" },
              { img: project, label: "AIML" },
              { img: development, label: "Python" },
              { img: data, label: "Project Manager" },
              { img: intership, label: "Data Analyst" },
              { img: analytic, label: "Data Engineer" },
            ].map(({ img, label }) => (
              <button key={label} onClick={() => handleTechStackClick(label)}>
                <img
                  src={img}
                  alt={label}
                  style={
                    label === "Remote"
                      ? {
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        padding: "5px",
                      }
                      : {}
                  }
                />
                <span className="button-text">{label}</span>
                <img className="home-page-next-img" src={next} alt="Next" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="job-search-container">
        <h6>How is it work</h6>
        <label className="job-search-title oswald">
          Making Your <span>Job Search Easy</span>
        </label>

        <p className="job-search-description">
          Quick Apply shows you recommended jobs based off your most recent
          search <br />
          and allows you to apply to 25+ jobs in a seconds
        </p>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3 className="step-title">Login or Register</h3>
              <p className="step-description">
                Login with email and sign up with email/facebook and linkedin.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3 className="step-title">Download Resume</h3>
              <p className="step-description">
                Data-driven professional with expertise in tracking and
                optimizing resume
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3 className="step-title">Contact Candidate's</h3>
              <p className="step-description">
                Skilled in sourcing, engaging, and building relationships with
                top talent to meet organizational needs.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3 className="step-title">Hire Candidate</h3>
              <p className="step-description">
                Experienced in identifying, interviewing, and hiring top talent
                to meet company needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="candidates-container">
        <h6>Feature Candidates</h6>
        <div className="candidates-header">
          <h1 className="oswald">
            Various Candidate Are Available
            <br /> <span>For Join Soon</span>
          </h1>
          <p className="header-description">
            "Qualified candidates are available for immediate joining, ready to
            contribute to your team's <br />
            success. They bring a strong skill set and are eager to start their
            new roles without delay."
          </p>
        </div>

        <div className="candidate-grid-exact">
          {activeJoiners.map((candidate) => {

            const avatarSrc = candidate.image
              ? candidate.image
              : candidate.gender === "female"
                ? femaleAvator
                : candidate.gender === "male"
                  ? MaleAvator
                  : "/images/default-neutral.jpg";

            return (
              <div className="candidate-card-exact" key={candidate._id}>
                <div className="candidate-header-exact">
                  <img
                    src={
                      avatarSrc
                    }
                    alt={`${candidate.name}'s profile`}
                  />
                  <div className="candidate-details-exact">
                    <h3 className="candidate-name-exact">
                      {isLoggedIn ? candidate.name : "*******"}
                    </h3>
                    <p className="candidate-position-exact">
                      {candidate.currentPosition}
                    </p>
                    <p className="candidate-company-exact">
                      {JobtypeLabel(candidate.Job_type)}
                    </p>
                  </div>
                  <div>
                    {isLoggedIn ?
                      <div
                        onClick={() => downloadResume(candidate.resume)}
                        style={{ cursor: "pointer" }}>
                        <BsDownload style={{ width: "25px", height: "25px", marginTop: "-25px", color: "#1783D0" }} /></div> : ''}
                  </div>
                </div>

                <p className="job-description-exact">

                  <div className="location-left">
                    <img src={homeemail} />

                    <span>
                      {" "}
                      {isLoggedIn ? candidate.email : "********@***.com"}
                    </span>
                  </div>
                  <div className="location-left">
                    <img src={homecaller} />
                    {/* <MdPhoneEnabled
                    style={{ color: "#1783D0", fontSize: "1.6rem" }}
                  /> */}
                    <span>
                      {isLoggedIn ? candidate.mobileNumber : "+91 *********"}
                    </span>
                  </div>
                </p>

                <div className="location-options-exact">
                  <div className="location-option-exact">
                    <div className="location-left">
                      <img src={homelocation} />
                      {/* <MdOutlineLocationOn
                      style={{ color: "#1783D0", fontSize: "1.6rem" }}
                    /> */}
                      <span>
                        {candidate.location},{candidate.state}
                      </span>
                    </div>

                    <div className="notice-right">
                      <img src={homenotice} />
                      {/* <IoMdTime
                      style={{ color: "#1783D0", fontSize: "1.6rem" }}
                    /> */}
                      <span>
                        {`${ExperiencedLabel(candidate.experienceInStack)}`}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="view-profile-btn-exact"
                  onClick={() => navigate(`/employee-profile/${candidate._id}`)}
                >
                  View Profile
                </button>
              </div>
            )
          }
          )}
        </div>

        <button
          className="view-all-btn-exact"
          onClick={() => {
            window.location.href = "/empfilter?role=Candidate";
          }}
        >
          View all Candidate
        </button>
      </div>

      <div className="companies-container-exact">
        <h6>Feature Company</h6>
        <div className="companies-header-exact">
          <h1>
            Feature Company <span>Actively Hiring</span>
          </h1>
          <p className="header-description-exact">
            "Companies are actively hiring across various roles and looking for
            talented individuals to join our dynamic team. Explore exciting
            opportunities and take the next step in your career with us today!"
          </p>
        </div>

        <div className="company-grid-exact">
          {companies.map((company) => (
            <div className="company-card-exact" key={company._id}>
              <div className="company-header-exact">
                <img
                  src={company.logo || linkedin}
                  alt={`${company.companyName} logo`}
                />
                <div className="company-info-exact">
                  <h3 className="company-name-exact">{company?.companyName}</h3>
                  <p className="company-rating-exact">
                    {company.designationName}|{company.email}
                  </p>
                </div>
              </div>
              <p className="company-description-exact">
                {company.state},{company.city}
              </p>
              <div className="company-tags-exact">
                {/* {company?.industry?.map((tag, index) => (
                  <span key={index} className="company-tag">
                    {tag}
                  </span>
                ))} */}
              </div>
              <button
                className="view-details-btn-exact"
                onClick={() => navigate(`/companies/${company._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        <button
          className="view-all-btn-exact"
          onClick={() => {
            window.location.href = "/Compfilter";
          }}
        >
          View all Company
        </button>
      </div>

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
            Find your dream job from thousands daily updated job vacancies. Find
            the best jobs around the world or apply directly on a business
            website. Search and find jobs today!
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

      <div className="popular-section">
        <h6>Feature Role</h6>
        <h1 className="section-title oswald">
          Popular <span className="highlight">Role</span>
        </h1>

        <div className="role-grid">
          {topSkills.map((role, index) => (
            <div className="role-card" key={index}>
              <img src={role.icon || seniorExpert} alt={role.skillsName} />
              <div className="role-info">
                <h5>{role.skillsName}</h5>
                <p>{role.count} Total Candidates</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="role-grid"
          style={{
            marginTop: "10px",
          }}
        >
          {topLocation.map((role, index) => (
            <div className="role-card" key={index}>
              <img src={role.icon || counseller} alt={role.location} />
              <div className="role-info">
                <h5>{role.location}</h5>
                <p>{role.count} Total Candidates</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="why-popular">
        <div className="why-left">
          <h1 className="oswald">
            Why We are <span className="highlight oswald">Most Popular</span>
          </h1>
          <p>
            Looking for a job is hard enough. That’s why we don’t charge any
            fees—no hidden costs, no paid registrations, and no premium
            upgrades.
          </p>

          <div className="popular-grid">
            {[
              { img: topcompanies, label: "Free for Jobseeker" },
              { img: topcompanies1, label: "No fake Job" },
              { img: topcompanies2, label: "HR Friendly" },
              { img: topcompanies3, label: "Future Of Job" },
            ].map(({ img, label }) => (
              <div className="popular-item" key={label}>
                <img src={img} alt="Icon" />
                <span>{label}</span>
              </div>
            ))}
          </div>

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

        <div className="why-right">
          <div className="image-box">
            <img src={mostpopular} alt="Happy User" className="main-img" />
          </div>
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

export default Home;
