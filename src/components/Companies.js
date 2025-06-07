import React, { useState } from 'react'
import "../stylesheets/Companies.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaBuilding, FaEnvelope, FaEdit, FaShareAlt } from 'react-icons/fa';
import { MdOutlineCurrencyRupee, MdOutlineEdit } from 'react-icons/md';
import { FiPlus, FiUpload, FiX } from "react-icons/fi";
import { FiShare2 } from 'react-icons/fi';
import { FaBusinessTime, FaLaptopCode, FaLocationDot } from 'react-icons/fa6';
import { IoCallSharp } from 'react-icons/io5';
import { IoIosMail } from 'react-icons/io';
// import { Bookmark } from 'lucide-react';
import CompanyLogo from "../images/CompanyProfilelogo.png";
import vector from "../images/Vector.png";
import coin from "../images/coins.png";

const companyDetails = {
  name: "Sov technology",
  description: `Sov technology is a global professional services company with leading capabilities in digital, cloud and security.Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting,Interactive, Technology and Operations services — all powered by the world’s 
largest network of Advanced Technology
and Intelligent Operations centers. Our 699,000 people deliver on the promise of technology and human ingenuity every day,
serving clients in more than 120 countries. We embrace the power of change to create value and shared success for our clients,
people, shareholders, partners and communities.

Industry: IT Services and IT Consulting
Company size: 10,001+ employees
46,714 on LinkedIn
Includes members with current employer listed as Accenture in India, including part-time roles.
Headquarters: Bengaluru, Karnataka
Founded: 1989
Specialties: Management Consulting, Systems Integration and Technology, Business Process Outsourcing, Application and Infrastructure
Outsourcing, Digital, Technology, Strategy, Cloud, Analytics, Artificial Intelligence, Blockchain, and Security.`,
  website: "https://sovtechnologies.com",
  industry: ["IT Services and Consultant"],
  contact: "+91-7979937896",
  address: "Thane, Maharashtra",
  founded: "2019",
};




export default function Companies() {

  
  const scrollContainer = (scrollOffset) => {
    const container = document.getElementById("scrollableContainer");
    if (container) {
      container.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };
const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "SOV Technologies",
    contactName: "Komal Nikam",
    designation: "Human Resources Manager",
    location: "Mumbai, Maharashtra, India",
    phone: "+91-7979931234",
    companySize: "11-50 Employees",
    email: "Komal.nikam@sovtechnologies.com",
    profileImg:CompanyLogo
  })
  const handleEditToggle = () => setIsEditOpen(true);
  const handleClose = () => setIsEditOpen(false);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    }));
  };

  const [companyData, setCompanyData] = useState(companyDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIndustry, setNewIndustry] = useState("");
  const [formState, setFormState] = useState(companyData);

  const handleEditClick = () => {
    setFormState(companyData);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanyData(formState);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="Employee-Profile-Card">
        <div className="Profile-Wrapper">
          <div className="Profile-section-one">
            <div className="Profile-head">
              <img
                src={formData.profileImg}
                alt="Profile"

              />
              <div className="Profile-basic-info">
                <div className="Profile-top">
                  <div>
                    <h3>{formData.companyName}</h3>
                    <p>{formData.contactName} | {formData.designation}</p>
                  </div>

                  {/* Edit and Share Buttons */}
                  <div className="Profile-buttons">
                    <button className="icon-btn">
                      <MdOutlineEdit size={30} onClick={handleEditToggle} />
                    </button>
                    <button className="icon-btn">
                      <FiShare2 size={30} />
                    </button>
                  </div>
                </div>

                <div className="Column-One-Info-Two">
                  <div className="Profile-personal-info">
                    <div className="Profile-personal-info-One">
                      <div className="Column-One-Details">
                        <FaMapMarkerAlt size={25} />
                        <p>{formData.location}</p>
                      </div>
                      <div className="Column-One-Details">
                        <FaPhoneAlt size={25} /> <p>{formData.phone}</p>
                      </div>
                    </div>
                    <div className="Profile-personal-info-Two">
                      <div className="Column-Two-Details">
                        <FaBuilding size={25} />
                        <p> Company Size : {formData.companySize} </p>
                      </div>
                      <div className="Column-Two-Details">
                        <IoIosMail size={30} />
                        <p>{formData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal for Editing */}
            {isEditOpen && (
              <div className="modal-overlay">
                <div className="edit-modal-horizontal">
                  <h3>Edit Profile</h3>
                  {formData.profileImg && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "15px"
                    }}>
                      <div style={{
                        borderRadius: "12px",
                        padding: "10px",
                        backgroundColor: "#fff",
                        maxWidth: "100%",
                        textAlign: "center"
                      }}>
                        <img
                          src={formData.profileImg}
                          alt="Preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease"
                          }}
                          onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-grid">

                    <input
                      name="contactName"
                      placeholder="Full Name"
                      value={formData.contactName}
                      onChange={handleInput}
                    />
                    <input
                      name="designation"
                      placeholder="Designation"
                      value={formData.designation}
                      onChange={handleInput}
                    />
                    <input
                      name="companyName"
                      placeholder="Company"
                      value={formData.companyName}
                      onChange={handleInput}
                    />
                    <input
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleInput}
                    />
                     <input
                      name="companySize"
                      placeholder='size like 0-13 Employee'
                       value={formData.companySize} 
                       onChange={handleInput} />
                    <input
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInput}
                    />
                    <input
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInput}
                    />
                    <input
                      type="file"
                      name="profileImg"
                      onChange={handleInput}
                    />

                  </div>
                  <button onClick={handleClose}>Save & Close</button>
                </div>
              </div>
            )}
          </div>

          <div className="company-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="company-heading">
                About the <span className="highlight">Company</span>
              </h2>
              <button className="edit-button" onClick={handleEditClick}>
                <MdOutlineEdit size={25} />
              </button>
            </div>

            <p className="company-description">{formState.description}</p>



            <div className="company-meta">
              <div>
                <strong>Website</strong>
                <div className="link">{companyData.website}</div>
              </div>
              <div>
                <strong>Industry</strong>
                <div className="pill-container">
                  {companyData.industry.map((item, idx) => (
                    <span className="pill" key={idx}>{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <strong>Contact</strong>
                <p>{companyData.contact}</p>
              </div>
              <div>
                <strong>Address</strong>
                <p>{companyData.address}</p>
              </div>
              <div>
                <strong>Founded</strong>
                <p>{companyData.founded}</p>
              </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="modal">
                <form className="modal-form" onSubmit={handleSubmit}>
                  <h3>Edit Company Info</h3>
                  <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Company Description"
                    required
                  />
                  <input
                    name="website"
                    type="url"
                    value={formState.website}
                    onChange={handleInputChange}
                    placeholder="Website"
                    required
                  />
                  <input
                    name="contact"
                    type="text"
                    value={formState.contact}
                    onChange={handleInputChange}
                    placeholder="Contact"
                    required
                  />
                  <input
                    name="address"
                    type="text"
                    value={formState.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                  />
                  <label>Industries</label>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
                    {formState.industry.map((item, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: "#f0f0f0",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() =>
                            setFormState((prev) => ({
                              ...prev,
                              industry: prev.industry.filter((_, i) => i !== idx),
                            }))
                          }
                          style={{ background: "none", border: "20px", fontWeight: "bold", cursor: "pointer" }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                    <input
                      type="text"
                      placeholder="Add Industry"
                      value={newIndustry}
                      onChange={(e) => setNewIndustry(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newIndustry.trim()) {
                            setFormState((prev) => ({
                              ...prev,
                              industry: [...prev.industry, newIndustry.trim()],
                            }));
                            setNewIndustry("");
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newIndustry.trim()) {
                          setFormState((prev) => ({
                            ...prev,
                            industry: [...prev.industry, newIndustry.trim()],
                          }));
                          setNewIndustry("");
                        }
                      }}
                    >
                      <FiPlus size={30} style={{ backgroundColor: "#ffffff", color: "#1783D0", border: "none" }} />
                    </button>
                  </div>
                  <input
                    name="founded"
                    type="text"
                    value={formState.founded}
                    onChange={handleInputChange}
                    placeholder="Founded"
                    required
                  />
                  <div className="modal-buttons">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="announcement-section">
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
                      <img src={vector} style={{ marginTop: "-50px" }} />
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

          </div>
        </div>
      </div>
    </>
  )
}
