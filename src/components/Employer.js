import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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
import CompanyLogo from "../images/CompanyProfilelogo.png";
import vector from "../images/Vector.png";
import coin from "../images/coins.png";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import empprofile1 from "../images/HomeIcons/FaLocationDot.svg";
import empprofile7 from "../images/HomeIcons/empprofile7.svg";
import empprofile5 from "../images/HomeIcons/IoCallSharp.svg";
import empprofile6 from "../images/HomeIcons/IoIosMail.svg";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

export default function Employer() {
  const [companyData, setCompanyData] = useState(null);
  const navigate = useNavigate();
  const { token } = useParams();
  const { login } = useAuth();

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
    state: data.state || "",
    location: Array.isArray(data.location)
      ? data.location[0]
      : data.location || "",
    logo: data.logo || "",
    profileImg: data.logo || "",
    companyFullAddress: data.companyFullAddress || "",
    address: data.companyFullAddress || "",
    contact: data.contactNumber?.toString() || "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    let authToken = token || Cookies.get("authToken");

    if (!authToken) {
      alert("Session expired! Please login again.");
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.get(
        `${baseUrl}/employer/getEmployerAllDetails`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setCompanyData(normalizeCompanyData(response.data.res));
      login(response.data.res);
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response?.status === 401) {
        await refreshToken();
      }
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/token/refreshToken`);
      Cookies.set("authToken", response.data.token, { expires: 1 }); // 1 din tak valid
      fetchUserData();
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    navigate("/signin");
  };

  const scrollContainer = (scrollOffset) => {
    const container = document.getElementById("scrollableContainer");
    if (container) {
      container.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState(companyData);

  useEffect(() => {
    if (companyData) {
      setFormData({
        companyName: companyData.companyName || "",
        contactName: companyData.contactName || "",
        designation: companyData.designation || "",
        location: companyData.location || "",
        state: companyData.state || "",
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
  console.log("formData", formData);
  const handleEditToggle = () => setIsEditOpen(true);
  const handleClose = () => setIsEditOpen(false);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]), // for preview
        [`${name}File`]: files[0], // store the actual file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleProfileSave = async () => {
    try {
      const form = new FormData();
      form.append("_id", companyData._id);
      form.append("name", formData.contactName);
      form.append("companyName", formData.companyName);
      form.append("designationName", formData.designation);
      form.append("location", formData.location);
      form.append("company_SizeMin", formData.companySize);
      form.append("contactNumber", formData.phone || formData.contact);
      form.append("email", formData.email);
      form.append("description", formData.description);

      // If uploading a new logo image
      if (formData.profileImgFile) {
        form.append("logo", formData.profileImgFile);
      }

      const authToken = Cookies.get("authToken");
      const response = await axios.put(
        `${baseUrl}/employer/editEmployer`,
        form,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        setIsEditOpen(false);
        fetchUserData();
      } else {
        console.error("Update error:", response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error updating profile.");
      setIsEditOpen(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIndustry, setNewIndustry] = useState("");
  const [formState, setFormState] = useState(companyData);
  const [modalErrors, setModalErrors] = useState([]);

  const handleEditClick = () => {
    setFormState(companyData);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setModalErrors(prev => prev.filter(err => err.field !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = [];
    if (!formState.description.trim()) errs.push({ field: 'description', message: 'Description is required.' });
    if (!formState.website.trim()) errs.push({ field: 'website', message: 'Website is required.' });
    if (formState.website && !/^https?:\/\//.test(formState.website))
      errs.push({ field: 'website', message: 'Website must start with http:// or https://' });
    if (!formState.contact.trim()) errs.push({ field: 'contact', message: 'Contact is required.' });
    if (!formState.address.trim()) errs.push({ field: 'address', message: 'Address is required.' });
    if (!formState.founded.trim()) errs.push({ field: 'founded', message: 'Founded date is required.' });
    if (formState.industry.length === 0) errs.push({ field: 'industry', message: 'Add at least one industry.' });

    if (errs.length) {
      setModalErrors(errs);
      return;
    }
    try {
      // Prepare payload (adjust field names as your backend expects)
      const payload = {
        _id: companyData._id,
        location: formState.location,
        company_SizeMin: formState.companySize,
        contactNumber: formState.contactNumber,
        email: formState.email,
        description: formState.description,
        website: formState.website,
        industry: formState.industry,
        founded: formState.founded,
        companyFullAddress: formState.address,
      };

      const authToken = Cookies.get("authToken");
      const response = await axios.put(
        `${baseUrl}/employer/editEmployer`,
        { id: companyData._id, ...payload },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200) {
        setIsModalOpen(false);
        // Optionally, fetch the latest data from backend to update UI:
        fetchUserData();
      } else {
        alert(response.data.message || "Failed to update company info.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error updating company info.");
    }
  };

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
                  <div className="Profile-buttons">
                    <button className="icon-btn">
                      <MdOutlineEdit size={30} onClick={handleEditToggle} />

                    </button>
                    {/* <button className="icon-btn">
                      <FiShare2 size={30} />
                    </button> */}
                  </div>
                </div>

                <div className="Column-One-Info-Two">
                  <div className="Profile-personal-info">
                    <div className="Profile-personal-info-One">
                      <div className="Column-One-Details">

                        <img src={empprofile1} />
                        <p>{formData?.location}</p>
                      </div>
                      <div className="Column-One-Details">

                        <img src={empprofile5} />
                        <p>{formData?.phone}</p>
                      </div>
                    </div>
                    <div className="Profile-personal-info-Two">
                      <div className="Column-Two-Details">

                        <img src={empprofile7} />
                        <p> Company Size : {formData?.companySize} </p>
                      </div>
                      <div className="Column-Two-Details">
                        <img src={empprofile6} />
                        <p>{formData?.email}</p>
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
                  <div className="modal-header">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h2 className="edit-about">Edit Profile</h2>
                      <button
                        className="fancy-close"
                        onClick={handleClose}
                        aria-label="Close"
                      ></button>
                    </div>
                  </div>

                  {formData.profileImg && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "15px",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "12px",
                          padding: "10px",
                          backgroundColor: "#fff",
                          maxWidth: "100%",
                          textAlign: "center",
                        }}
                      >
                        <img
                          src={formData.profileImg}
                          alt="Preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-grid">
                    <div>
                      <label
                        style={{
                          color: "black",
                          marginBottom: "5px",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        name="contactName"
                        placeholder="Full Name"
                        value={formData.contactName}
                        onChange={handleInput}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          color: "black",
                          marginBottom: "5px",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Designation
                      </label>
                      <input
                        name="designation"
                        placeholder="Designation"
                        value={formData.designation}
                        onChange={handleInput}
                      /></div>

                    <div>
                      <label
                        style={{
                          color: "black",
                          marginBottom: "5px",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Company Name
                      </label>
                      <input
                        name="companyName"
                        placeholder="Company"
                        value={formData.companyName}
                        onChange={handleInput}
                      /></div>

                    <div>
                      <label
                        style={{
                          color: "black",
                          marginBottom: "5px",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Location
                      </label>
                      <input
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleInput}
                      /></div>

                    <div>
                      <label
                        style={{
                          color: "black",
                          marginBottom: "5px",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Company Size
                      </label>
                      <input
                        name="companySize"
                        placeholder="size like 0-13 Employee"
                        value={formData.companySize}
                        onChange={handleInput}
                      /></div>

                    <div>
                      <label
                        style={{
                          color: "black",
                          marginBottom: "5px",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        HR Phone
                      </label>
                      <input
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInput}
                      /></div>


                    <div>
                      <label
                        style={{
                          color: "black",
                          marginBottom: "5px",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Email id
                      </label>
                      <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInput}
                      /></div>

                    <div>
                      <label
                        style={{
                          color: "black",
                          marginBottom: "5px",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        Profile Image
                      </label>
                      <input
                        type="file"
                        name="profileImg"
                        onChange={handleInput}
                      />
                    </div></div>
                  <div className="modal-buttons">
                    <button onClick={handleProfileSave}>Save </button>
                    
                  </div>
                </div>
              </div>
            )}
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
              <button className="edit-button" onClick={handleEditClick}>
                <MdOutlineEdit size={25} />
              </button>
            </div>

            <p className="company-description">{companyData?.description}</p>
            <div className="company-meta">
              <div>
                <strong>Website</strong>
                <div className="link">{companyData?.website}</div>
              </div>
              <div>
                <strong>Industry</strong>
                <div className="pill-container">
                  {companyData?.industry.map((item, idx) => (
                    <span className="pill" key={idx}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong>Contact</strong>
                <p>
                  {companyData?.contactNumber
                    ? `+91 ${companyData.contactNumber.replace(
                      /^(\+91|91)?/,
                      ""
                    )}`
                    : ""}
                </p>{" "}
              </div>
              <div>
                <strong>Address</strong>
                <p>{companyData?.address}</p>
              </div>
              <div>
                <strong>Founded</strong>
                <p>{companyData?.founded}</p>
              </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="modal">
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h2 className="edit-about">Edit Company Info</h2>
                      <button
                        className="fancy-close"
                        onClick={() => setIsModalOpen(false)}
                        aria-label="Close"
                      ></button>
                    </div>
                  </div>
                  <div>
                    <label className="company-info">Company Description</label>
                    <textarea
                      name="description"
                      value={formState.description}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Company Description"

                    />
                    {modalErrors.some(e => e.field === 'description') &&
                      <p className="error-text">
                        {modalErrors.find(e => e.field === 'description').message}
                      </p>
                    }
                  </div>

                  <div style={{ display: "flex", gap: "28px" }}>
                    <div
                      style={{
                        width: "47%",
                      }}
                    >
                      <label>Company Website</label>
                      <input
                        name="website"
                        type="url"
                        value={formState.website}
                        onChange={handleInputChange}
                        placeholder="Website"

                      />
                      {modalErrors.some(e => e.field === 'website') &&
                        <p className="error-text">
                          {modalErrors.find(e => e.field === 'website').message}
                        </p>
                      }
                    </div>
                    <div
                      style={{
                        width: "47%",
                      }}
                    >
                      <label>HR Contact</label>
                      <input
                        name="contact"
                        type="text"
                        value={formState.contact}
                        onChange={handleInputChange}
                        placeholder="Contact"

                      />
                      {modalErrors.some(e => e.field === 'contact') &&
                        <p className="error-text">
                          {modalErrors.find(e => e.field === 'contact').message}
                        </p>
                      }
                    </div>
                  </div>
                  <div>
                    <label className="company-info">Company Address</label>
                    <input
                      name="address"
                      type="text"
                      value={formState.address}
                      onChange={handleInputChange}
                      placeholder="Address"

                    />
                    {modalErrors.some(e => e.field === 'address') &&
                      <p className="error-text">
                        {modalErrors.find(e => e.field === 'address').message}
                      </p>
                    }
                  </div>

                  <div>
                    <label className="company-info">Add Industry</label>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
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
                                industry: [
                                  ...prev.industry,
                                  newIndustry.trim(),
                                ],
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
                        <FiPlus
                          size={30}
                          style={{
                            backgroundColor: "#ffffff",
                            color: "#1783D0",
                            border: "none",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    {/* <label>Industries</label> */}
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        // marginTop: "5px",
                      }}
                    >
                      {formState.industry.map((item, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: "#f0f0f0",
                            padding: "7px 22px",
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
                                industry: prev.industry.filter(
                                  (_, i) => i !== idx
                                ),
                              }))
                            }
                            style={{
                              background: "none",
                              border: "20px",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    {modalErrors.some(e => e.field === 'industry') &&
                      <p className="error-text">
                        {modalErrors.find(e => e.field === 'industry').message}
                      </p>
                    }
                  </div>

                  <div>
                    <label className="company-info">Company Founded</label>
                    <input
                      name="founded"
                      type="text"
                      value={formState.founded}
                      onChange={handleInputChange}
                      placeholder="Founded"

                    />
                    {modalErrors.some(e => e.field === 'founded') &&
                      <p className="error-text">
                        {modalErrors.find(e => e.field === 'founded').message}
                      </p>
                    }
                  </div>
                  <div className="modal-buttons">
                    <button type="submit">Save</button>
                  </div>
                </form>
              </div>
            )}
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
                      <img src={vector} style={{ marginTop: "-40px" }} />
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
