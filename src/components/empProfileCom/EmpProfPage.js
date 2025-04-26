import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/CandiProfile.css";
import "../../stylesheets/EmpProfile.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { RiEditBoxLine } from "react-icons/ri";
import ProfAbout from "../cards/ProfAbout";
import ProfExperience from "../cards/ProfExperience";
import ProfProject from "../cards/ProfProject";
import ProfSkills from "../cards/ProfSkills";
import ProfEducation from "../cards/ProfEducation";
import ProfCertiCard from "../cards/ProfCertiCard";
import ProfAwardCard from "../cards/ProfAwardCard";
import AboutMe from "../profileCards/AboutMe";
import Experience from "../profileCards/Experience";
import Projects from "../profileCards/Projects";
import Skills from "../profileCards/Skills";
import Education from "../profileCards/Education";
import LicensCertificates from "../profileCards/LicensCertficates";
import Awads from "../profileCards/Awads";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const EmpProfPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const authToken = Cookies.get("authToken"); // Get token from cookies
  const userId = Cookies.get("userId"); // Get user ID from cookies
  const navigate = useNavigate();

  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showLicensCertificates, setShowLicensCertificates] = useState(false);
  const [showAwads, setShowAwads] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleAboutMePopup = () => setShowAboutMe(!showAboutMe);
  const toggleExperiencePopup = () => setShowExperience(!showExperience);
  const toggleProjectsPopup = () => setShowProjects(!showProjects);
  const toggleSkillsPopup = () => setShowSkills(!showSkills);
  const toggleEducationPopup = () => setShowEducation(!showEducation);
  const toggleLicensCertificatesPopup = () =>
    setShowLicensCertificates(!showLicensCertificates);
  const toggleAwadsPopup = () => setShowAwads(!showAwads);

  useEffect(() => {
    if (!authToken || !userId) {
      navigate("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/getAllUserDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ userId: userId }),
        });

        const data = await response.json();

        if (data.status === 200) {
          setUserData(data.result[0]);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchUserData();
  }, [authToken, userId, navigate]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    navigate("/signin");
  };

  if (!authToken || !userId) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {userData ? (
          <div className="empprofile-card">
            <div className="profileCard-box">
              <div className="profile-secOne">
                <div className="profileCardHead">
                  <img src={userData.image} alt="" />
                  <div className="cadidate-basicInfo">
                    <h3>{userData.name}</h3>
                    <p>{userData.currentPosition}</p>
                    <p>Arnnima Solution</p>
                    <div className="colOneInfoTwo">
                      <div className="candi-personalInfo">
                        <div className="personalInfo-colOne">
                          <div className="colOne-details">
                            <FaLocationDot size={20} />
                            <p>{userData.location}</p>
                          </div>
                          <div className="colOne-details">
                            <FaLaptopCode size={20} />
                            <p>{userData.experienceInStack} Year Exp</p>
                          </div>
                          <div className="colOne-details">
                            <MdOutlineCurrencyRupee size={20} />
                            <p>{userData.salary} /-Year</p>
                          </div>
                        </div>
                        <div className="personalInfo-colTwo">
                          <div className="colTwo-details">
                            <FaBusinessTime size={20} />
                            <p>{userData.noticePeriod} Days (Notice period)</p>
                          </div>
                          <div className="colTwo-details">
                            <IoCallSharp size={20} />
                            <p>+91 {userData.mobileNumber}</p>
                          </div>
                          <div className="colTwo-details">
                            <IoIosMail size={20} />
                            <p>{userData.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-container">
                        <button className="dropdown-button">Rusume</button>
                        <div className="dropdown-menu">
                          <ul>
                            <li className="resume-action-btn">
                              <FiDownload />
                              Download
                            </li>
                            <li className="resume-action-btn">
                              <IoEyeOutline />
                              View
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="editIconEmpTop">
                    <button>
                      <RiEditBoxLine size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="profile-secTwo">
                <div className="profile-contentBox">
                    
                  <div className="content-boxes">
                    <div className="content-boxes-head">
                      <h2>About Me</h2>
                      <button onClick={toggleAboutMePopup}>
                        <FaPlus size={20} className="aboutAddBtn" />
                      </button>
                    </div>
                    {showAboutMe && <AboutMe onClose={toggleAboutMePopup} />}
                    <div className="about-card-box-details">
                      <div>
                        <div>
                          {userData && userData.about ? (
                            <div className="profabout-box">
                              <p>{userData.about}</p>
                            </div>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EmpProfPage;
