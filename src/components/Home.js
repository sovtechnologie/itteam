import React, { useEffect, useState } from "react";
import "../stylesheets/Home.css";
import axios from "axios";
import k5Img from "../images/Group 2.png";
import linkedin from "../images/linkedin.png";
import ActiveJoinerCard from "./cards/ActiveJoinerCard";
import HuntLocationCard from "./cards/HuntLocationCard";
import StackCard from "./cards/StackCard";
import HuntExperience from "./cards/HuntExperience";
import HomeAbout from "./cards/HomeAbout";
import { IoIosSearch } from "react-icons/io";
import honelocationIcon from "../images/honelocationIcons.png";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import EmployerHomeCard from "./cards/EmployerHomeCard";
import { FaBuilding, FaChartBar, FaClipboardList, FaDesktop, FaFileAlt, FaMapMarkerAlt, FaUserGraduate, FaClock } from 'react-icons/fa';


const BASE_URL = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const Home = () => {
  const navigate = useNavigate();

  const handleLocationClick = (location) => {
    navigate(`/empfilter?location=${encodeURIComponent(location)}`);
    window.scrollTo(0, 0);
  };

  const handleTechStackClick = (techStack) => {
    navigate(`/empfilter?expertTecStack=${encodeURIComponent(techStack)}`);
    window.scrollTo(0, 0);
  };

  const handleExpClick = (experienceInStack) => {
    navigate(
      `/empfilter?experienceInStack=${encodeURIComponent(experienceInStack)}`
    );
    window.scrollTo(0, 0);
  };

  const [companies, setCompanies] = useState([]);
  const [activeJoiners, setActiveJoiners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [techStacks, setTechStacks] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [users, setUsers] = useState([]);
  const [allJoiners, setAllJoiners] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/withOutLogin/getAllCompanyHomePage`
        );
        if (response.data.status === 200) {
          setCompanies(response.data.result.slice(0, 5));
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
        console.log("API Response:", res.data);
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
    api
      .get("/withOutLogin/get-state-list?countryCode=IN")
      .then((res) => {
        console.log("State List API Response:", res.data);
        if (res.data && res.data.data) {
          setStatesList(res.data.data);
        } else {
          setStatesList([]);
        }
      })
      .catch((err) => console.error("Error fetching states list:", err))
      .finally(() => setLoadingStates(false));
  }, []);

  const handleViewMore = () => {
    setLoadingMore(true);
    api
      .get("api/withOutLogin/all-active-joiners")
      .then((res) => {
        console.log("All Joiners API Response:", res.data);
        if (res.data && res.data.userData) {
          setAllJoiners(res.data.userData);
        } else {
          setAllJoiners([]);
        }
      })
      .catch((err) => console.error("Error fetching joiners:", err))
      .finally(() => setLoadingMore(false));
  };

  useEffect(() => {
    fetch(
      "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com/api/userFilter"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUsers(data.result);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const filterByExperience = (min, max) => {
    const filteredUsers = users.filter((user) => {
      const exp = user.activeJoiners;
      return max ? exp >= min && exp < max : exp > min;
    });
    console.log(
      `Users with ${min}-${max ? max : "above"} years of experience:`,
      filteredUsers
    );
  };

  const experienceData = [
    { heading: "Fresher", subheading: "1 year experience", min: 1, max: 2 },
    { heading: "Junior", subheading: "2 year experience", min: 2, max: 5 },
    { heading: "Associate", subheading: "2-5 year experience", min: 2, max: 5 },
    {
      heading: "Mid-Level",
      subheading: "5-10 year experience",
      min: 5,
      max: 10,
    },
    {
      heading: "Senior",
      subheading: "10+ year experience",
      min: 10,
      max: null,
    },
  ];

  const candidates = [
    {
      id: 1,
      name: "Kaya Jons",
      position: "React.JS Developer",
      company: "SOV Technology",
      description: "We are looking for someone with experience using AI software to create realistic product photos.",
      locations: [
        { name: "Noida", noticePeriod: "30 days N.P" }
      ],
      skills: ["HTML", "CSS", "JAVA", "HTML", "JAVA"]
    },
    {
      id: 2,
      name: "Keya Jons",
      position: "React.JS Developer",
      company: "sov Technology",
      description: "We are looking for someone with experience using AI software to create realistic product photos.",
      locations: [
        { name: "Noida", noticePeriod: "30 days N.P" },
      ],
      skills: ["HTML", "CSS", "JAVA", "HTML", "JAVA"]
    },
    {
      id: 3,
      name: "Keya Jons",
      position: "React.JS Developer",
      company: "sov Technology",
      description: "We are looking for someone with experience using AI software to create realistic product photos.",
      locations: [
        { name: "Noida", noticePeriod: "30 days N.P" },

      ],
      skills: ["HTML", "CSS", "JAVA", "HTML", "JAVA"]
    },
    {
      id: 4,
      name: "Keya Jons",
      position: "React.JS Developer",
      company: "sov Technology",
      description: "We are looking for someone with experience using AI software to create realistic product photos.",
      locations: [
        { name: "Noida", noticePeriod: "30 days N.P" },

      ],
      skills: ["HTML", "CSS", "JAVA", "HTML", "JAVA"]
    }
  ];

  const Company = [
    {
      id: 1,
      logo: "https://img.freepik.com/free-photo/asian-woman-posing-looking-camera_23-2148255359.jpg",
      name: "TechNova",
      reviews: 120,
      description: "Innovating AI solutions for the future.",
      tags: ["AI", "SaaS", "Remote"],
    },
    {
      id: 2,
      logo: linkedin,
      name: "GreenLeaf",
      reviews: 78,
      description: "Sustainable agriculture and green technology.",
      tags: ["AgriTech", "Sustainability"],
    },
    {
      id: 3,
      logo: linkedin,
      name: "HealthCore",
      reviews: 95,
      description: "Transforming healthcare through data analytics.",
      tags: ["Healthcare", "Big Data"],
    },
    {
      id: 4,
      logo: linkedin,
      name: "CyberNest",
      reviews: 64,
      description: "Cybersecurity services for enterprises.",
      tags: ["Cybersecurity", "Cloud"],
    },
    {
      id: 5,
      logo: linkedin,
      name: "CyberNest",
      reviews: 64,
      description: "Cybersecurity services for enterprises.",
      tags: ["Cybersecurity", "Cloud"],
    },
  ];

  const roles = [
    { title: 'Senior Manager', positions: 210, icon: '👨‍💼' },
    { title: 'Career Advisor', positions: 97, icon: '💬' },
    { title: 'HR Manager', positions: 132, icon: '👩‍💼' },
    { title: 'HR Manager', positions: 132, icon: '👩‍💼' },
    { title: 'Senior Manager', positions: 210, icon: '👨‍💼' },
    { title: 'Career Advisor', positions: 97, icon: '💬' },
    { title: 'HR Manager', positions: 132, icon: '👩‍💼' },
    { title: 'HR Manager', positions: 132, icon: '👩‍💼' },
  ];

  return (
    <>

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Hire The Best Developers <br />Around The World</h1>
          <p className="hero-subtitle">World class nearshore talent for technology teams<br /> that demand the highest standards</p>

          <form className="hero-search">
            <div className="search-input-wrapper">
              <IoIosSearch className="search-icon" />
              <input type="text" placeholder="Job title, keyword or company" />
              <button type="submit">Find Now</button>
            </div>
          </form>

          <div className="category-tags">
            <button><FaMapMarkerAlt /> Remote </button>
            <button><FaBuilding /> MNC</button>
            <button><FaClipboardList /> Sales</button>
            <button><FaFileAlt /> Project Management</button>
            <button><FaDesktop /> Development</button>
            <button><FaClipboardList /> Data Operator</button>
            <button><FaUserGraduate /> Internship</button>
            <button><FaChartBar /> Analytics</button>
          </div>
        </div>
      </div>

      <div className="job-search-container">
        <h6>How is it work</h6>
        <h1 className="job-search-title">Making Your <span>Job Search Easy</span></h1>

        <p className="job-search-description">
          Quick Apply shows you recommended jobs based off your most recent search <br />and allows you to apply to 25+ jobs in a seconds
        </p>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3 className="step-title">Login or Register</h3>
              <p className="step-description">Login with email and sign up with email/facebook and linkedin.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3 className="step-title">Download Resume</h3>
              <p className="step-description">Data-driven professional with expertise in tracking and optimizing resume</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3 className="step-title">Contact Candidate's</h3>
              <p className="step-description">Skilled in sourcing, engaging, and building relationships with top talent to meet organizational needs.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3 className="step-title">Hire Candidate</h3>
              <p className="step-description">Experienced in identifying, interviewing, and hiring top talent to meet company needs.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="candidates-container">
        <h6>Feature Candidates</h6>
        <div className="candidates-header">
          <h1>Various Candidate Are Available</h1>
          <h2>For Join Soon</h2>
          <p className="header-description">
            "Qualified candidates are available for immediate joining, ready to contribute to your team's <br />success. They bring a strong skill set and are eager to start their new roles without delay."
          </p>
        </div>

        <div className="divider"></div>
        <div className="candidate-grid-exact">
          {candidates.map((candidate) => (
            <div className="candidate-card-exact" key={candidate.id}>
              <div className="candidate-header-exact">
                <img src="https://img.freepik.com/free-photo/asian-woman-posing-looking-camera_23-2148255359.jpg" />
                <div className="candidate-details-exact">
                  <h3 className="candidate-name-exact">{candidate.name}</h3>
                  <p className="candidate-position-exact">{candidate.position}</p>
                  <p className="candidate-company-exact">{candidate.company}</p>
                </div>

              </div>

              <p className="job-description-exact">{candidate.description}</p>

              <div className="location-options-exact">
                {candidate.locations.map((location, index) => (
                  <div className="location-option-exact" key={index}>
                    <div className="location-left">
                      <FaMapMarkerAlt style={{ color: "#007bdb", fontSize: "1.2rem" }} />
                      <label htmlFor={`${candidate.id}-location-${index}`}>
                        {location.name}
                      </label>
                    </div>

                    {location.noticePeriod && (
                      <div className="notice-right">
                        <FaClock style={{ color: "#007bdb", fontSize: "1.2rem" }} />
                        <label htmlFor={`${candidate.id}-notice-${index}`}>
                          {location.noticePeriod}
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {candidate.skills.length > 0 && (
                <div className="skills-container-exact">
                  {candidate.skills.map((skill, index) => (
                    <span className="skill-tag-exact" key={index}>{skill}</span>
                  ))}
                </div>
              )}

              <button className="view-profile-btn-exact">View Profile</button>
            </div>
          ))}
        </div>

        <Link to="/empfilter"><button className="view-all-btn-exact">View all Candidate</button></Link>
      </div>

      <div className="companies-container-exact">
        <h6>Feature Company</h6>
        <div className="companies-header-exact">
          <h1>Feature Company <span>Actively Hiring</span></h1>
          <p className="header-description-exact">
            "Companies are actively hiring across various roles and looking for talented individuals to join
            our dynamic team. Explore exciting opportunities and take the next step in your career with us today!"
          </p>
        </div>

        <div className="divider-exact"></div>

        <div className="company-grid-exact">
          {Company.map((company) => (
            <div className="company-card-exact" key={company.id}>
              <div className="company-header-exact">
                <img src={company.logo} alt={`${company.name} logo`} />
                <div className="company-info-exact">
                  <h3 className="company-name-exact">{company.name}</h3>
                  <p className="company-rating-exact">⭐ {company.reviews}k+ reviews</p>
                </div>
              </div>
              <p className="company-description-exact">{company.description}</p>
              <div className="company-tags-exact">
                {company.tags.map((tag, index) => (
                  <span key={index} className="company-tag">{tag}</span>
                ))}
              </div>
              <button className="view-details-btn-exact">View Details</button>
            </div>
          ))}
        </div>

        <button className="view-all-btn-exact">View all Company</button>
      </div>

      <section className="hero-sections">
        <div className="hero-left">
          <img
            src="https://img.freepik.com/free-photo/asian-woman-posing-looking-camera_23-2148255359.jpg"
            alt="Team"
            className="team-image"
          />

          <div className="rating-card">
            <div className="rating-left">
              <span className="rating-number">4.6</span>
              <p className="rating-text">Reviews</p>
            </div>
            <div className="rating-star">⭐</div>
            <div className="rating-logos">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
              <img src="https://seeklogo.com/images/C/clutch-logo-CE9ECF7E07-seeklogo.com.png" alt="Clutch" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Trustpilot_Logo.svg/2560px-Trustpilot_Logo.svg.png" alt="Trustpilot" />
            </div>
          </div>


          <div className="profile-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Kaya Jons" />
            <div>
              <p className="profile-name">Kaya Jons</p>
              <p className="profile-role">React.js Developer</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <h1>
            Trusted & Popular <br />
            <span className="highlight">Job Portal</span>
          </h1>
          <p className="description">
            Find your dream job from thousands daily updated job vacancies.
            Find the best jobs online from UK job sites or apply directly on a
            business website. Search and find jobs today!
          </p>
          <div className="hero-buttons">
            <button className="btn-outline">Join as Jobseeker</button>
            <button className="btn-filled">Join as Company</button>
          </div>
        </div>
      </section>

      <div className="popular-section">
        <h6>Feature Role</h6>
        <h1 className="section-title">
          Popular <span className="highlight">Role</span>
        </h1>
        <div className="role-grid">
          {roles.map((role, index) => (
            <div className="role-card" key={index}>
              <div className="role-icon">{role.icon}</div>
              <div className="role-info">
                <h5>{role.title}</h5>
                <p>{role.positions} Open Position</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="why-popular">
        <div className="why-left">
          <h1>
            Why We are <span className="highlight">Most Popular</span>
          </h1>
          <p>
            Quis ipsum suspendisse ultrices gravida, Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Quis ipsum suspendisse ultrices gravida
          </p>

          <div className="popular-grid">
            {Array(4).fill(0).map((_, i) => (
              <div className="popular-item" key={i}>
                <img src="https://img.icons8.com/ios-filled/50/briefcase.png" alt="Icon" />
                <span>Top Companies</span>
              </div>
            ))}
          </div>

          <div className="popular-buttons">
            <button className="btn-outline">Join as Jobseeker</button>
            <button className="btn-primary">Join as Company</button>
          </div>
        </div>

        <div className="why-right">
          <div className="image-box">
            <img
              src="https://img.freepik.com/free-photo/asian-woman-posing-looking-camera_23-2148255359.jpg"
              alt="Happy User"
              className="main-img"
            />
            <div className="trusted-tag">
              <span>✔️ 100%Trusted</span>
            </div>
          </div>
        </div>
      </div>

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



      {/* <div className="home-sec">
        <div className="home-box">
          <div className="main-section">
            <h4>#1 Job Portal</h4>
            <h1>Hire The Best Developers <br /> Around the World</h1>
            <p>
              World class nearshare talent for technology teams <br />
              that demand the highest standards
            </p>
            <form className="home-search">
              <div className="input-wrapper">
                <IoIosSearch className="search-icon" />
                <input type="text" placeholder="Job title, keyword or Company" />
                <button type="submit" className="find-now-btn">Find Now</button>
              </div>
            </form>
          </div>

          <div className="home-second-box">
            <h5>
              Brands you Admire and Dream of working with are <span>here!</span>
            </h5>
            <div className="main-sec-brands">
              {companies.length > 0 ? (
                companies.map((company) => (
                  <EmployerHomeCard
                    key={company._id}
                    id={company._id}
                    companyName={company.companyName}
                    logo={company.logo}
                  />
                ))
              ) : (
                <p>Loading companies...</p>
              )}
            </div>
          </div>
        </div>
      </div> */}



      {/* <div className="avtivejoinerBox">
        <div className="active-joiners">
          <div className="active-head">
            <h2>
              Active <span>Joiners</span>
            </h2>
            <p>(Can join within 30 days)</p>
          </div>
          <div className="active-viewmore">
            <Link
              to="/empfilter"
              onClick={handleViewMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "View More"}
            </Link>
          </div>
        </div>

        <div className="activejoiner-cardbox">
          {activeJoiners && activeJoiners.length > 0 ? (
            [...activeJoiners, ...allJoiners].map((item) => (
              <a
                href=""
                key={item._id}
                onClick={() => navigate(`/active-joiner-profile/${item._id}`)} // Navigate to the new page with user id
              >
                <ActiveJoinerCard
                  image={
                    item.image
                      ? item.image
                      : require("../images/cProfileImg.png")
                  }
                  name={item.name ? item.name : "Name NA"}
                  currentPosition={
                    item.currentPosition
                      ? item.currentPosition
                      : "Not Specified"
                  }
                  salary={item.salary}
                  expYear={item.expYear}
                />
              </a>
            ))
          ) : (
            <p>No active joiners available</p>
          )}
        </div>
      </div> */}

      {/* <div className="huntByLocation">
        <div className="huntHeadBox">
          <h2>
            <span>Hunt By</span> Location
          </h2>
          <div className="active-viewmore">
            <a href="/empfilter">View More</a>
          </div>
        </div>
        <div className="huntlocationBox">
          {loadingStates ? (
            <p>Loading locations...</p>
          ) : statesList.length > 0 ? (
            statesList.slice(0, 10).map((item) => (
              <a
                key={item._id}
                onClick={() => handleLocationClick(item.name)}
                style={{ cursor: "pointer" }}
              >
                <HuntLocationCard
                  honelocationIcons={honelocationIcon}
                  name={item.name}
                />
              </a>
            ))
          ) : (
            <p>No locations found</p>
          )}
        </div>
      </div> */}

      {/* <div className="huntByLocation">
        <div className="huntHeadBox">
          <h2>
            <span>Hunt By</span> Technology Stack
          </h2>
          <div className="active-viewmore">
            <a href="/empfilter">View More</a>
          </div>
        </div>
        <div className="huntstackBox">
          {loading ? (
            <p>Loading tech stacks...</p>
          ) : techStacks.length > 0 ? (
            techStacks.slice(0, 10).map((item) => (
              <a
                key={item._id}
                onClick={() => handleTechStackClick(item.tecStackName)}
                style={{ cursor: "pointer" }}
              >
                <StackCard
                  techStacklogo={
                    item.techStacklogo ?? "/images/cProfileImg.png"
                  }
                  tecStackName={item.tecStackName}
                />
              </a>
            ))
          ) : (
            <p>No tech stacks found</p>
          )}
        </div>
      </div> */}

      {/* <div className="huntByExperience">
        <div className="experienceHeadBox">
          <h2>
            <span>Hunt By</span> Experience
          </h2>
        </div>
        <div className="huntExperiemceBox">
          {experienceData.map((item, index) => (
            <div
              key={index}
              // onClick={() => filterByExperience(item.min, item.max)}
              onClick={() => handleExpClick(item.experienceInStack)}
            >
              <a href="empfilter">
                <HuntExperience
                  heading={item.heading}
                  subheading={item.subheading}
                />
              </a>
            </div>
          ))}
        </div>
      </div> */}
      {/* <HomeAbout /> */}
    </>
  );
};

export default Home;
