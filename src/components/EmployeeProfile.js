import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../stylesheets/CandiProfile.css";
import "../stylesheets/EmpProfile.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import Profile from "../images/UserProfile.png";
import resumelogo from "../images/resumelogo.png";
import companyLogo from "../images/company profile.png";
import School from "../images/Education.png";
import Certifications from "../images/Certifications (1).png";
import Projects from "../images/Projects.png";
import Course from "../images/Profile/Course.png";
import mostpopular from "../images/mostpopular.png";
import trustpopular from "../images/trustpopular.png";
import topcompanies from "../images/No fake Job.svg";
import empprofile1 from "../images/HomeIcons/FaLocationDot.svg";
import empprofile2 from "../images/HomeIcons/FaLaptopCode.svg";
import empprofile3 from "../images/HomeIcons/MdOutlineCurrencyRupee.svg";
import empprofile4 from "../images/HomeIcons/FaBusinessTime.svg";
import empprofile5 from "../images/HomeIcons/IoCallSharp.svg";
import empprofile6 from "../images/HomeIcons/IoIosMail.svg";
import { BsDownload } from "react-icons/bs";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const EmployeeProfile = () => {
  const { id } = useParams();
  const isLoggedIn = !!Cookies.get("authToken");

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employmentList, setEmploymentList] = useState([]);

  const [formData, setFormData] = useState({});

  const [aboutText, setAboutText] = useState(userData?.about || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeURL, setResumeURL] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [educationList, setEducationList] = useState([]);

  const [projects, setProjects] = useState([]);

  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for ID:", id);
        const response = await axios.post(
          `${baseUrl}/api/getAllUserDetails`,
          { userId: id },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("API Response:", response.data);

        if (response.data.status === 200 && response.data.result.length > 0) {
          const userData = response.data.result[0];

          setUserData({
            ...userData,
            id: userData._id,
            about: userData.about,
            workExperiences: userData.workExperiences,
            projectmodels: userData.projectmodels,
            skillmodels: userData.skillmodels,
            education_details: userData.education_details,
            lic_certis: userData.lic_certis,
            awards: userData?.awards,
          });
        } else {
          console.error("User data not found");
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const experienceLabel = (value) => {
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
        return value ? `${value} Year Exp` : "Not specified";
    }
  };

  const noticePeriodLabel = (value) => {
    switch (value) {
      case "1":
      case 1:
        return "Immediate";
      case "2":
      case 2:
        return "Within 7 Days";
      case "3":
      case 3:
        return "Within 15 Days";
      case "4":
      case 4:
        return "Within 30 Days";
      case "5":
      case 5:
        return "Within 45 Days";
      default:
        return "Not specified";
    }
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        designation: userData.currentPosition,
        company: userData.company_Name,
        location: userData.location,
        state: userData.state,
        experience: userData.experienceInStack
          ? String(userData.experienceInStack)
          : "",
        salary: userData.salary ? `${userData.salary} /-Year` : "",
        notice: userData.noticePeriod ? String(userData.noticePeriod) : "",
        phone: userData.mobileNumber ? `+91 ${userData.mobileNumber}` : "",
        email: userData.email,
        profileImg: userData.image,
      });

      // Optional: Set other related states
      setAboutText(userData.about || "");
      setSelectedSkills(
        (userData.skillmodels || []).map((skill) => ({
          tecStackName: skill.skillsName,
          techStacklogo: skill.skillLogo,
          _id: skill._id,
        }))
      );
      setEmploymentList(userData.workExperiences || []);
      setEducationList(userData.education_details || []);
      setProjects(userData.projectmodels || []);
      setCertifications(userData.lic_certis || []);
      setResumeFile(userData.resume ? userData.resume.split("/").pop() : "");
      setResumeURL(userData.resume);
    }
  }, [userData]);

  function formatDateRange(start, end) {
    if (!start) return "";
    const options = { year: "numeric", month: "short" };
    const startDate = new Date(start);
    const formattedStart = startDate.toLocaleString("en-US", options);

    if (!end) return `${formattedStart} – Present`;

    const endDate = new Date(end);
    const formattedEnd = endDate.toLocaleString("en-US", options);

    return `${formattedStart} – ${formattedEnd}`;
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };
  const maskedName = formData.name
    ? `${formData.name[0]}${"*".repeat(formData.name.length - 1)}`
    : "";

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!userData) {
    return <h2>User data not found</h2>;
  }

  return (
    <>
      <div className="empprofile-card">
        <div className="profileCard-box">
          {/* main Profile section */}
          <div className="profile-secOne">
            <div className="profileCardHead">
              <img src={formData.profileImg || Profile} alt="Profile" />

              <div className="cadidate-basicInfo">
                <div className="profile-header-top">
                  <div>
                    <h3>{isLoggedIn ? formData.name : maskedName}</h3>
                    <p>{formData.designation}</p>
                    <p>{formData.company}</p>
                  </div>
                </div>

                <div className="colOneInfoTwo">
                  <div className="candi-personalInfo">
                    <div className="personalInfo-colOne">
                      <div className="colOne-details">
                        {/* <FaLocationDot size={20} /> */}
                        <img src={empprofile1} />
                        <p>
                          {formData.location},{formData.state}
                        </p>
                      </div>
                      <div className="colOne-details">
                        {/* <FaLaptopCode size={25} /> */}
                        <img src={empprofile2} />
                        <p>{experienceLabel(formData.experience)}</p>
                      </div>
                      <div className="colOne-details">
                        {/* <MdOutlineCurrencyRupee size={25} /> */}
                        <img src={empprofile3} />
                        <p>{isLoggedIn ? formData.salary : "Hidden"}</p>
                      </div>
                    </div>
                    <div className="personalInfo-colTwo">
                      <div className="colTwo-details">
                        {/* <FaBusinessTime size={25} /> */}
                        <img src={empprofile4} />
                        <p>{noticePeriodLabel(formData.notice)}</p>
                      </div>
                      <div className="colTwo-details">
                        {/* <IoCallSharp size={25} /> */}
                        <img src={empprofile5} />
                        <p>{isLoggedIn ? formData.phone : "+91 *********"}</p>
                      </div>
                      <div className="colTwo-details">
                        {/* <IoIosMail size={25} /> */}
                        <img src={empprofile6} />
                        <p>
                          {isLoggedIn ? formData.email : "********@***.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <BsDownload
                  style={{
                    width: "25px",
                    height: "25px",
                     color:"#ffffff"
                  }}
                />
              </div>
            </div>
          </div>

          <div className="quick-links-wrapper">
            <div className="profile-secTwo">
              <div className="aside">
                <div className="profile-contentBox">
                  {/* Link section */}
                  <div className="main-wrapper">
                    <div className="quick-links">
                      <div className="content-boxes-head">
                        <h2>Quick Links</h2>
                      </div>
                      <ul>
                        <li>
                          <a href="#about">About Me</a>{" "}
                        </li>
                        <li>
                          <a href="#resume">Resume</a>
                        </li>
                        <li>
                          <a href="#skills">Key Skills</a>
                        </li>
                        <li>
                          <a href="#employment">Employment</a>
                        </li>
                        <li>
                          <a href="#education">Education</a>
                        </li>
                        <li>
                          <a href="#projects">Projects</a>
                        </li>
                        <li>
                          <a href="#certifications">
                            Licenses & certifications
                          </a>
                        </li>
                        <li>Accomplishments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-aside">
                <div className="content-boxes" id="about">
                  <div className="content-boxes-head underline" >
                    <h2>About Me</h2>
                  </div>

                  <div className="about-card-box-details">
                    <div>
                      <div>
                        <p>{aboutText}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume section */}
                <div className="content-boxes" id="resume">
                  <div className="content-boxes-head underline ">
                    <h2>Upload Resume</h2>
                  </div>

                  <div className="resume-card-box-details">
                    {/* {!resumeFile ? (
                    <div>
                      <img src={resumelogo} className="upload-icon" />
                      <p>Upload your Resume here</p>
                    </div>
                  ) : (
                    <div className="resume-info">
                      <p>
                        <strong>Uploaded:</strong> {resumeFile}
                      </p>
                      <a
                        href={resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-link"
                      >
                        View / Download Resume
                      </a>
                    </div>
                  )} */}
                    {!resumeFile ? (
                      <div>
                        <img src={resumelogo} className="upload-icon" />
                        <p>Upload your Resume here</p>
                      </div>
                    ) : isLoggedIn ? (
                      <div className="resume-info">
                        <p>
                          <strong>Uploaded:</strong> {resumeFile}
                        </p>
                        <a
                          href={resumeURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resume-link"
                        >
                          View / Download Resume
                        </a>
                      </div>
                    ) : (
                      <div className="resume-info">
                        <p>
                          <strong>Uploaded:</strong> {resumeFile}
                        </p>
                        <p>Login to view resume</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skill Section */}
                <div className="content-boxes" id="skills">
                  <div className="content-boxes-head underline">
                    <h2>Key Skills</h2>
                  </div>

                  <div className="skills-card-box-details">
                    <div className="skillsbox-card">
                      {selectedSkills.map((skill, index) => (
                        <div className="skill-badge" key={index}>
                          <span className="skill-icon">
                            <img
                              src={skill.techStacklogo}
                              // alt={skill.tecStackName}
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "8px",
                              }}
                            />
                          </span>
                          <span>{skill.tecStackName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Employement Scetion */}
                <div className="content-boxes" id="employment">
                  <div className="content-boxes-head underline">
                    <h2>Employment</h2>
                  </div>
                  <div className="education-cards">
                    <div className="employment-list">
                      {employmentList.map((job, index) => {
                        const duration = formatDateRange(
                          job.startDate,
                          job.endDate
                        );
                        return (
                          <div className="employment-card" key={index}>
                            <div className="employment-logo">
                              <img
                                src={job.companyLogo || companyLogo}
                                alt="Logo"
                                className="college-logo"
                              />
                            </div>
                            <div className="employment-content">
                              <div className="employment-header">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flex: " 1 1",
                                  }}
                                >
                                  <h3>{job.title}</h3>
                                  <div className="duration">{duration}</div>
                                </div>
                              </div>
                              <p className="company-name">
                                {job.company_Name} | {job.location}
                              </p>

                              <p className="employment-description">
                                {job.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="content-boxes" id="education">
                  <div className="content-boxes-head underline">
                    <h2>Education</h2>
                  </div>

                  <div className="education-cards">
                    {educationList.map((edu) => {
                      const duration = formatDateRange(
                        edu.startDate,
                        edu.endDate
                      );
                      return (
                        <div className="education-card" key={edu.id}>
                          <img
                            src={edu.logo || School}
                            alt="Logo"
                            className="college-logo"
                          />
                          <div className="education-info">
                            <h3>{edu.college}</h3>
                            <p>
                              {edu.degree} | {edu.location}
                            </p>
                          </div>
                          <div className="education-details">
                            <div className="duration">{duration}</div>
                            <div className="grade">
                              Grade {edu?.grade ?? "Not specified"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Project Section */}
                <div className="content-boxes" id="projects">
                  <div className="content-boxes-head underline">
                    <h2>Projects</h2>
                  </div>
                  <div className="education-cards">
                    {projects.map((proj, index) => {
                      const duration = formatDateRange(
                        proj.startDate,
                        proj.endDate
                      );

                      return (
                        <div className="project-card" key={index}>
                          <img
                            src={proj.image || Projects}
                            alt="Project Logo"
                            className="project-logo"
                          />
                          <div className="project-info">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <h3>{proj.title}</h3>
                              <p className="duration">{duration}</p>
                            </div>
                            <p className="project-associated">
                              {proj.associated}
                            </p>
                            <p className="project-description">
                              {proj.projectDescription}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Licence & Certificate */}
                <div className="content-boxes" id="certifications">
                  <div className="content-boxes-head underline">
                    <h2>Licenses & Certifications</h2>
                  </div>
                  <div className="education-cards">
                    {certifications.map((cert, index) => (
                      <div className="license-card" key={index}>
                        <img
                          src={cert.image || Certifications}
                          alt="Certification Logo"
                          className="license-logo"
                        />
                        <div className="license-info">
                          <h3>{cert.courses}</h3>
                          <p className="issuer">{cert.company_Name}</p>
                          <p className="issued">
                            Issued {formatDate(cert.issued_Date)}
                            {cert.endDate
                              ? ` · Expires ${formatDate(cert.endDate)}`
                              : " · No Expiration Date"}
                          </p>
                        </div>
                        <a
                          href={cert.certificateUrl} // Replace with your actual URL variable
                          target="_blank"
                          rel="noopener noreferrer"
                          className="show-credential-button"
                        >
                          Show credential
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
