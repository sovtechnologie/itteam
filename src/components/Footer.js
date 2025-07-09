import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylesheets/Footer.css";
import logowhite from "../images/logowhite1.svg";
import instagram from "../images/Footer/Instagram.png";
import Twitter from "../images/Footer/Twitter.png";
import linkedin from "../images/Footer/Linkdin.png";
import facebook from "../images/Footer/Facebook.png";

const Footer = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [techStacks, setTechStacks] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com/withOutLogin/get-state-list",
          {
            params: { countryCode: "IN" },
          }
        );

        if (response.data && response.data.data) {
          setLocations(response.data.data.slice(0, 14));
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await axios.get(
          "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com/withOutLogin/tech-stack-list"
        );

        if (response.data && response.data.result) {
          setTechStacks(response.data.result.slice(0, 14)); // Extract only the first 14 tech stacks
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching tech stacks:", error);
      }
    };

    fetchTechStacks();
  }, []);

  const handleFilterClick = (type, value) => {
    navigate(`/Empfilter?${type}=${encodeURIComponent(value)}`);
  };

  const handleLocationClick = (location) => {
    navigate(`/empfilter?location=${encodeURIComponent(location)}`);
    window.scrollTo(0, 0);
  };

  const handleTechStackClick = (techStack) => {
    navigate(`/empfilter?expertTecStack=${encodeURIComponent(techStack)}`);
  };
  const handleExpTechClick = (experienceInStack) => {
    navigate(
      `/empfilter?experienceInStack=${encodeURIComponent(experienceInStack)}`
    );
  };

  return (
    <div className="footer">
      <div className="footerBox">
        <footer>
          <div className="footer-container">
            <div className="footer-top-content">
              <div className="footer-col">
                <img style={{width: "80px"}} src={logowhite} alt="Logo" />
                <br />
                <p>
                  Our generator uses cutting-edge technology <br />
                  to create unique to history and ..
                </p>
                <div className="footer-social-icon">
                  <ul style={{ display: "flex", gap: "30px", marginTop: "60px" }}>
                    <li>
                      <img src={facebook} alt="facebook" />
                    </li>
                    <li>
                      <img src={instagram} alt="instagram" />
                    </li>
                    <li>
                      <img src={linkedin} alt="linkedin" />
                    </li>
                    <li>
                      <img src={Twitter} alt="twitter" />
                    </li>

                  </ul>
                </div>
              </div>

              <div className="footer-col">
                <h3>Company</h3>
                <ul>
                  <li>
                    <a href="/aboutus">About Us</a>
                  </li>
                  <li>
                    <a href="/ourTeam">Our Team</a>
                  </li>
                  <li>
                    <a href="/signin?role=candidate">Join as Jobseeker</a>
                  </li>
                  <li>
                    <a href="/signin?role=company">Join as Company</a>
                  </li>
                  <li>
                    <a href="/contactus">Contact Us</a>
                  </li>
                  <li>
                    <a href="/privacy&policy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms&condition">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h3>Hunt By Technology Stack</h3>
                <ul>
                  {techStacks.length > 0 ? (
                    techStacks.map((stack) => (
                      <li key={stack._id}>
                        <a
                          onClick={() =>
                            handleTechStackClick(stack.tecStackName)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {/* <img 
                            src={stack.techStacklogo} 
                            alt={stack.tecStackName} 
                            style={{ width: "20px", height: "20px", marginRight: "8px" }} 
                          /> */}
                          {stack.tecStackName}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li>Loading tech stacks...</li>
                  )}
                </ul>
              </div>

              <div className="footer-col">
                <h3>Hunt By Experience</h3>
                <ul>
                  {[
                    { label: "Fresher", min: 1, max: 2 },
                    { label: "Junior", min: 2, max: 5 },
                    { label: "Associate", min: 2, max: 5 },
                    { label: "Mid-Level", min: 5, max: 10 }, // No trailing space here
                    { label: "Senior", min: 10, max: null },
                  ].map(({ label }) => (
                    <li key={label}>
                      <a onClick={() => handleExpTechClick(label)} style={{ cursor: "pointer" }}>
                        {label}
                      </a>
                    </li>
                  ))}

                </ul>
              </div>


            </div>

            <div className="footer-bottom">
              <div className="fbottom-left">
                <p>Copyright &copy; 2025 IT Team</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
