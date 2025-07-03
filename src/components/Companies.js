import React, { useEffect, useState } from "react";
import "../stylesheets/Companies.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBuilding,
  FaEnvelope,
  FaEdit,
  FaShareAlt,
} from "react-icons/fa";
import { MdOutlineCurrencyRupee, MdOutlineEdit } from "react-icons/md";
import { FiPlus, FiUpload, FiX } from "react-icons/fi";
import { FiShare2 } from "react-icons/fi";
import { FaBusinessTime, FaLaptopCode, FaLocationDot } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
// import { Bookmark } from 'lucide-react';
import CompanyLogo from "../images/CompanyProfilelogo.png";
import vector from "../images/Vector.png";
import coin from "../images/coins.png";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

export default function Companies() {
  const { id } = useParams();

  const scrollContainer = (scrollOffset) => {
    const container = document.getElementById("scrollableContainer");
    if (container) {
      container.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  const normalizeCompanyData = (data) => ({
    _id: data._id,
    name: data.name,
    contactNumber: data.contactNumber?.toString() || "",
    companyName: data.companyName || "",
    contactName: data.name || "",
    designation: data.designationName || "",
    email: data.email || "",
    description: data.description || "",
    website: data.website || "",
    industry: data.industry || [],
    companySize: data.company_SizeMin?.toString() || "",
    founded: data.founded || "",
    location: data.city,
    logo: data.logo || "",
    profileImg: data.logo || "",
    companyFullAddress: data.companyFullAddress || "",
    address: data.companyFullAddress || "",
    contact: data.contactNumber?.toString() || "",
  });

  const [formData, setFormData] = useState({
    companyName: "SOV Technologies",
    contactName: "Komal Nikam",
    designation: "Human Resources Manager",
    location: "Mumbai, Maharashtra, India",
    phone: "+91-7979931234",
    companySize: "11-50 Employees",
    email: "Komal.nikam@sovtechnologies.com",
    profileImg: CompanyLogo,
  });

  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIndustry, setNewIndustry] = useState("");
  const [formState, setFormState] = useState(companyData);

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/withOutLogin/getSingleCompanyData`,
          { id: id },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("API Response:", response.data);

        if (response.data.status === 200 && response.data.result) {
          setCompanyData(normalizeCompanyData(response.data.result));
        } else {
          console.log("No employer data found for this ID.");
          setError("Employer data not found for the provided ID.");
        }
      } catch (err) {
        console.error(
          "Request Error:",
          err.response ? err.response.data : err.message
        );
        setError("Error fetching employer details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, [id]);

  useEffect(() => {
    if (companyData) {
      setFormData({
        companyName: companyData.companyName || "",
        contactName: companyData.contactName || "",
        designation: companyData.designation || "",
        location: companyData.location || "",
        phone: companyData.contactNumber || "",
        companySize: companyData.companySize || "",
        email: companyData.email || "",
        profileImg: companyData.profileImg || CompanyLogo,
        description: companyData.description || "",
        website: companyData.website || "",
        industry: companyData.industry || [],
        founded: companyData.founded || "",
        address: companyData.address || "",
      });
    }
  }, [companyData]);

  return (
    <>
      <div className="Employee-Profile-Card">
        <div className="Profile-Wrapper">
          <div className="Profile-section-one">
            <div className="Profile-head">
              <img src={formData?.profileImg} alt="Profile" />
              <div className="Profile-basic-info">
                <div className="Profile-top">
                  <div>
                    <h3>{formData?.companyName}</h3>
                    <p>
                      {formData?.contactName} | {formData?.designation}
                    </p>
                  </div>

                  {/* Edit and Share Buttons */}
                </div>

                <div className="Column-One-Info-Two">
                  <div className="Profile-personal-info">
                    <div className="Profile-personal-info-One">
                      <div className="Column-One-Details">
                        <FaMapMarkerAlt size={25} />
                        <p>{formData?.location}</p>
                      </div>
                      <div className="Column-One-Details">
                        <FaPhoneAlt size={25} /> <p>{formData?.phone}</p>
                      </div>
                    </div>
                    <div className="Profile-personal-info-Two">
                      <div className="Column-Two-Details">
                        <FaBuilding size={25} />
                        <p> Company Size : {formData?.companySize} </p>
                      </div>
                      <div className="Column-Two-Details">
                        <IoIosMail size={30} />
                        <p>{formData?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="company-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className="company-heading">
                About the <span className="highlight">Company</span>
              </h2>
            </div>

            <p className="company-description">{companyData?.description}</p>
            <div className="company-meta">
              <div>
                <strong>Website</strong>
                <div className="link">{companyData?.website}</div>
              </div>
              <div className='contact-number'>
                <strong>Industry</strong>
                <div className="pill-container">
                  {companyData?.industry.map((item, idx) => (
                    <span className="pill" key={idx}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="contact-number">
                <strong>Contact :</strong>
                <p>
                  {companyData?.contactNumber
                    ? `+91 ${companyData.contactNumber.replace(
                        /^(\+91|91)?/,
                        ""
                      )}`
                    : "No contact number provided"}
                </p>{" "}
              </div>
              <div>
                <strong>Address</strong>
                <p>{companyData?.address}</p>
              </div>
              <div className='contact-number'>
                <strong>Founded</strong>
                <p>{companyData?.founded}</p>
              </div>
            </div>
          </div>

          {/* <div className="announcement-section">
            <div className="announcement-header">
              <h2>
                Recent <span className="highlight">Announcements</span>
              </h2>
              <a className="show-more" href="#">Show More</a>
            </div>

            <div className="card-scroll-wrapper">
              <button className="scroll-btn left" onClick={() => scrollContainer(-300)}>&#8249;</button>

              <div className="Card-Container" id="scrollableContainer">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className="jobs">
                    <div className="card-heading">
                      <div className="Company-logo">SOV</div>
                      {/* <img src={vector} style={{ marginTop: "-40px" }} /> 
                    </div>
                    <div className='Company-details'>
                      <p className="companyName">Sov Technologies</p>
                      <h3 className="jobTitle">UI designer</h3>
                      <p className="jobLocation">Mumbai, India - Onsite</p>
                      <div className="jobTags">
                        <span className="jobTag">Remote</span>
                        <span className="jobTag">Contract</span>
                        <span className="jobTag">Junior</span>
                      </div>
                      <p className="salary">
                        <img src={coin} style={{ width: "20px", height: "20px" }} />
                        ₹15,000 - ₹25,000
                      </p>
                    </div>
                    <div className="card-footer">
                      <a className="more-details" href="#">View Details</a>
                      <span className="posted-time">3 days ago</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="scroll-btn right" onClick={() => scrollContainer(300)}>&#8250;</button>
            </div>

          </div> */}
        </div>
      </div>
    </>
  );
}
