// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import "../../stylesheets/CandiProfile.css";
// import "../../stylesheets/EmpProfile.css";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaLaptopCode } from "react-icons/fa";
// import { MdOutlineCurrencyRupee } from "react-icons/md";
// import { FaBusinessTime } from "react-icons/fa6";
// import { IoCallSharp } from "react-icons/io5";
// import { IoIosMail } from "react-icons/io";
// import { FiDownload } from "react-icons/fi";
// import { IoEyeOutline } from "react-icons/io5";
// import { FaPlus } from "react-icons/fa6";
// import { RiEditBoxLine } from "react-icons/ri";
// import ProfAbout from "../cards/ProfAbout";
// import ProfExperience from "../cards/ProfExperience";
// import ProfProject from "../cards/ProfProject";
// import ProfSkills from "../cards/ProfSkills";
// import ProfEducation from "../cards/ProfEducation";
// import ProfCertiCard from "../cards/ProfCertiCard";
// import ProfAwardCard from "../cards/ProfAwardCard";
// import AboutMe from "../profileCards/AboutMe";
// import Experience from "../profileCards/Experience";
// import Projects from "../profileCards/Projects";
// import Skills from "../profileCards/Skills";
// import Education from "../profileCards/Education";
// import LicensCertificates from "../profileCards/LicensCertficates";
// import Awads from "../profileCards/Awads";

// const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

// const EmpProfPage = () => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const authToken = Cookies.get("authToken"); // Get token from cookies
//   const userId = Cookies.get("userId"); // Get user ID from cookieshe
//   const navigate = useNavigate();

//   const [showAboutMe, setShowAboutMe] = useState(false);
//   const [showExperience, setShowExperience] = useState(false);
//   const [showProjects, setShowProjects] = useState(false);
//   const [showSkills, setShowSkills] = useState(false);
//   const [showEducation, setShowEducation] = useState(false);
//   const [showLicensCertificates, setShowLicensCertificates] = useState(false);
//   const [showAwads, setShowAwads] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const toggleAboutMePopup = () => setShowAboutMe(!showAboutMe);
//   const toggleExperiencePopup = () => setShowExperience(!showExperience);
//   const toggleProjectsPopup = () => setShowProjects(!showProjects);
//   const toggleSkillsPopup = () => setShowSkills(!showSkills);
//   const toggleEducationPopup = () => setShowEducation(!showEducation);
//   const toggleLicensCertificatesPopup = () =>
//     setShowLicensCertificates(!showLicensCertificates);
//   const toggleAwadsPopup = () => setShowAwads(!showAwads);

// useEffect(() => {
//   if (!authToken || !userId) {
//     navigate("/signin");
//     return;
//   }

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/api/getAllUserDetails`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authToken}`,
//         },
//         body: JSON.stringify({ userId: userId }),
//       });

//       const data = await response.json();

//       if (data.status === 200) {
//         setUserData(data.result[0]);
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError("Error fetching data");
//     }
//   };

//   fetchUserData();
// }, [authToken, userId, navigate]);

//   const handleLogout = () => {
//     Cookies.remove("authToken");
//     Cookies.remove("userId");
//     navigate("/signin");
//   };

//   if (!authToken || !userId) {
//     return <p>Please log in to view your profile.</p>;
//   }

//   return (
//     <div>
//       <div>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {userData ? (
//           <div className="empprofile-card">
//             <div className="profileCard-box">
//               <div className="profile-secOne">
//                 <div className="profileCardHead">
//                   <img src={userData.image} alt="" />
//                   <div className="cadidate-basicInfo">
//                     <h3>{userData.name}</h3>
//                     <p>{userData.currentPosition}</p>
//                     <p>Arnnima Solution</p>
//                     <div className="colOneInfoTwo">
//                       <div className="candi-personalInfo">
//                         <div className="personalInfo-colOne">
//                           <div className="colOne-details">
//                             <FaLocationDot size={20} />
//                             <p>{userData.location}</p>
//                           </div>
//                           <div className="colOne-details">
//                             <FaLaptopCode size={20} />
//                             <p>{userData.experienceInStack} Year Exp</p>
//                           </div>
//                           <div className="colOne-details">
//                             <MdOutlineCurrencyRupee size={20} />
//                             <p>{userData.salary} /-Year</p>
//                           </div>
//                         </div>
//                         <div className="personalInfo-colTwo">
//                           <div className="colTwo-details">
//                             <FaBusinessTime size={20} />
//                             <p>{userData.noticePeriod} Days (Notice period)</p>
//                           </div>
//                           <div className="colTwo-details">
//                             <IoCallSharp size={20} />
//                             <p>+91 {userData.mobileNumber}</p>
//                           </div>
//                           <div className="colTwo-details">
//                             <IoIosMail size={20} />
//                             <p>{userData.email}</p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="dropdown-container">
//                         <button className="dropdown-button">Rusume</button>
//                         <div className="dropdown-menu">
//                           <ul>
//                             <li className="resume-action-btn">
//                               <FiDownload />
//                               Download
//                             </li>
//                             <li className="resume-action-btn">
//                               <IoEyeOutline />
//                               View
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="editIconEmpTop">
//                     <button>
//                       <RiEditBoxLine size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="profile-secTwo">
//                 <div className="profile-contentBox">

//                   <div className="content-boxes">
//                     <div className="content-boxes-head">
//                       <h2>About Me</h2>
//                       <button onClick={toggleAboutMePopup}>
//                         <FaPlus size={20} className="aboutAddBtn" />
//                       </button>
//                     </div>
//                     {showAboutMe && <AboutMe onClose={toggleAboutMePopup} />}
//                     <div className="about-card-box-details">
//                       <div>
//                         <div>
//                           {userData && userData.about ? (
//                             <div className="profabout-box">
//                               <p>{userData.about}</p>
//                             </div>
//                           ) : (
//                             <p></p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmpProfPage;
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../stylesheets/CandiProfile.css";
import "../../stylesheets/EmpProfile.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FiPlus, FiX } from "react-icons/fi";
import { FaBusinessTime } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import Profile from "../../images/UserProfile.png";
import Company from "../../images/Profile/Campanyname.png";
import School from "../../images/Profile/Schoolname.png";
import Course from "../../images/Profile/Course.png";
import resumelogo from "../../images/resumelogo.png";



const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";


// Dummy Education Data
const dummyEducationData = [
  {
    id: 1,
    logo: School, // replace with import or static image path
    college: "BHAGWAN MAHAVIR COLLEGE OF ENGG. AND TECH.",
    degree: "Diploma of Education ・ Computer Engineering",
    location: "Surat, Gujarat, India",
    duration: "Mar 2020 – Aug 2023",
    grade: "Grade A+"
  }
];


const EmployeeProfile = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const authToken = Cookies.get("authToken"); // Get token from cookies
  const userId = Cookies.get("userId"); // Get user ID from cookieshe
  const navigate = useNavigate();

  const [employmentList, setEmploymentList] = useState([]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "Sayali Sarkar",
    designation: "JS Developer",
    company: "Arnnima Solution",
    location: "Ghaziabad",
    experience: "2 Year Exp",
    salary: "2000000 /-Year",
    notice: "20 Days (Notice period)",
    phone: "+91 939387736",
    email: "mnmnsjjn@gmail.com",
    profileImg: Profile,
  });

  const handleEditToggle = () => setIsEditOpen(true);
  const handleClose = () => setIsEditOpen(false);
  const handleSaveProfileWithImage = async () => {
    const form = new FormData();
    form.append("userId", userId);
    form.append("name", formData.name);
    form.append("currentPosition", formData.designation);
    form.append("company", formData.company);
    form.append("location", formData.location);
    const expRaw = formData.experience.split(" ")[0];
    form.append("experienceInStack", expRaw);
    const salaryRaw = formData.salary.split(" ")[0];
    form.append("salary", salaryRaw);
    const noticeRaw = formData.notice.split(" ")[0];
    form.append("noticePeriod", noticeRaw);
    form.append("mobileNumber", formData.phone.replace("+91", "").trim());
    form.append("email", formData.email);

    if (formData.profileImgFile) {
      form.append("image", formData.profileImgFile);
    }

    try {
      const response = await axios.put(`${baseUrl}/api/editProfile`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data.status === 200) {
        setSuccess("Profile updated successfully.");
        setIsEditOpen(false);
      } else {
        setError(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile.");
    }
  };



  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImg" && files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        profileImg: URL.createObjectURL(files[0]), // for preview
        profileImgFile: files[0], // actual file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };




  const [isAboutEditOpen, setIsAboutEditOpen] = useState(false);
  const [aboutText, setAboutText] = useState(userData?.about || "");
  const [aboutInput, setAboutInput] = useState(aboutText);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);     // holds File object or file name
  const [resumeURL, setResumeURL] = useState("");         // for full backend resume URL
  const [newResume, setNewResume] = useState(null);       // File for new upload


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewResume(file);
      setResumeFile(file.name); // Show new name immediately
      setResumeURL(URL.createObjectURL(file)); // Temporary preview
    }
  };



  // HANDLE upload to backend
  const handleUpload = async () => {
    if (!newResume) return alert("Please select a resume to upload.");

    const formData = new FormData();
    formData.append("resume", newResume);
    formData.append("userId", userId); // Ensure userId is passed if needed

    try {
      const res = await axios.put(`${baseUrl}/api/editProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await res.json();

      if (data.status === 200) {
        setResumeURL(data.result.resume); // Update backend link
        setIsModalOpen(false);
      } else {
        setError(error.response?.data?.message || "Error uploading resume.");
      }
    } catch (err) {
      setError(error.response?.data?.message || "Error uploading resume.");
    }
  };


  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [techstacklist, setTechstacklist] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await axios.get(
          "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com/withOutLogin/getAlltechStackList"
        );

        if (response.data && response.data.result) {
          setTechstacklist(response.data.result); // Extract only the first 14 tech stacks
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching tech stacks:", error);
      }
    };

    fetchTechStacks();
  }, []);

  const filteredSkills = techstacklist.filter(
    (skill) =>
      skill.tecStackName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSkills.find((s) => s.tecStackName === skill.tecStackName)
  );



  const handleAddSkill = async (skill) => {

    if (!authToken || !userId) {
      setError("Authentication failed. Please login again.");
      return;
    }

    // Prevent duplicates
    const alreadyExists = selectedSkills.some(
      (s) =>
        s.tecStackName &&
        skill.tecStackName &&
        s.tecStackName.toLowerCase() === skill.tecStackName.toLowerCase() &&
        ((s.id && skill.id && s.id === skill.id) || (s._id && skill._id && s._id === skill._id))
    );
    if (alreadyExists) return;

    // Use _id if available, else id
    const techStackId = skill._id || skill.id;
    if (!techStackId) {
      setError("Skill ID missing. Cannot add this skill.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/addSkill`,
        {
          userId,
          skillsName: skill.tecStackName,
          skillLogo: skill.techStacklogo,
          techStackId: techStackId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (
        response.data.status === 200 &&
        response.data.result &&
        response.data.result._id
      ) {
        const newSkill = {
          tecStackName: response.data.result.skillsName,
          techStacklogo: response.data.result.skillLogo || response.data.result.skilllogo, // handle both cases
          _id: response.data.result.techStackId, // ✅ Include the _id here
        };

        setSelectedSkills((prev) => [...prev, newSkill]);
        console.log("Skill added:",selectedSkills);
        setSuccess("Skill added successfully!");
      } else {
        setError(response.data.message || "Failed to add skill.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong while adding skill."
      );
    }
  };



  const handleRemoveSkill = async (tecStackName, _id) => {
    if (!authToken || !userId) {
      setError("Session expired. Please log in again.");
      console.log("expire token");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/deleteSkill`, // ⬅️ Replace with your actual delete/remove endpoint
        {
          userId,
          skillsName: tecStackName, // or skill ID, depending on how backend identifies it
          skillId: _id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === 200) {
        // Remove from local UI
        const updated = selectedSkills.filter(skill => skill.tecStackName !== tecStackName);
        setSelectedSkills(updated);
        setSuccess("Skill removed successfully.");
      } else {
        setError(response.data.message || "Failed to remove skill.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong while removing the skill."
      );
    }
  };


  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [newJob, setNewJob] = useState({
    company_Name: "",
    title: "",
    JoiningDate: "",
    endDate: "",
    location: "",
    description: "",
    isCurrentEmployment: "false"
  });

  const handleOpenModal = (index = null, _id = null) => {
    if (index !== null) {
      setNewJob(employmentList[_id]);
      setEditingIndex(index);
    } else {
      setNewJob({
        company_Name: "",
        title: "",
        JoiningDate: "",
        endDate: "",
        location: "",
        description: "",
        isCurrentEmployment: "false"
      });
      setEditingIndex(null);
    }
    setIsExperienceModalOpen(true);
  };

  const saveEmployment = async (userId, jobData, isEdit) => {

    const url = isEdit
      ? `${baseUrl}/api/editWorkExprience`
      : `${baseUrl}/api/addExperience`;

    try {
      const response = await axios.post(
        url,
        {
          userId,
          ...(isEdit
            ? {
              _id: jobData._id,
              ...jobData,
            }
            : { ...jobData }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === 200) {
        console.log(`${isEdit ? "Edited" : "Added"} experience successfully.`);
      } else {
        alert("API Error: " + response.data.message);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };


  const handleSave = async () => {
    const { company_Name, title, startDate, endDate, location, description } = newJob;

    // if (
    //   !company_Name?.trim() ||
    //   !title?.trim() ||
    //   !startDate?.trim() ||
    //   !endDate?.trim() ||
    //   !location?.trim() ||
    //   !description?.trim()
    // ) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }

    const updatedList = [...employmentList];

    if (editingIndex !== null) {
      updatedList[editingIndex] = newJob;
    } else {
      updatedList.push(newJob);
    }

    // Optimistically update local state first
    setEmploymentList(updatedList);
    setIsExperienceModalOpen(false);
    setEditingIndex(null);

    // Then call API to save on backend
    await saveEmployment(userId, newJob, editingIndex !== null);
  };


  const handleDeleteExperience = async (job_id) => {
    console.log("jobId:", job_id);
    try {
      const response = await axios.post(
        `${baseUrl}/api/deletedExperience`,
        {
          _id: job_id, // ✅ request body
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // ✅ token in correct place
          },
        }
      );


      if (response.data.status === 200) {
        // Remove the deleted job from the local state
        const updatedList = employmentList.filter((job) => job._id !== job_id);
        setEmploymentList(updatedList);
        setIsExperienceModalOpen(false);
        setEditingIndex(null);
      } else {
        console.error("Error deleting experience:", response.data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };



  const [educationList, setEducationList] = useState(dummyEducationData);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    location: "",
    startDate: "",
    endDate: "",
    grade: "",
    logo: School,
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewEducation({ ...newEducation, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (id) => {
    setEducationList(prev => prev.filter(edu => edu.id !== id));
  };

  const handleEditClick = (edu) => {
    setNewEducation(edu);
    setIsEditing(true);
    setEditId(edu.id);
    setIsEduModalOpen(true);
  };

  const [projects, setProjects] = useState([
    {
      title: "JOB PORTAL MOBILE APP DESIGN",
      date: "Sep 2022 – Present",
      associated: "BHAGWAN MAHAVIR COLLEGE OF ENGG. AND TECH, SURAT 006",
      description:
        "As one of the very few profitable pure play internet companies in the country, Info Edge is India's premier online classifieds company in recruitment, matrimony, real estate, education and related services. Provide Job and Amazing Courses For FREE.",
      image: School,
    },
    {
      title: "JOB PORTAL MOBILE APP DESIGN",
      date: "Sep 2022 – Present",
      associated: "BHAGWAN MAHAVIR COLLEGE OF ENGG. AND TECH, SURAT 006",
      description:
        "As one of the very few profitable pure play internet companies in the country, Info Edge is India's premier online classifieds company in recruitment, matrimony, real estate, education and related services. Provide Job and Amazing Courses For FREE.",
      image: School,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formProjectData, setFormProjectData] = useState({
    title: "",
    date: "",
    associated: "",
    description: "",
    image: "",
    file: null,
  });

  const handleAddEditClick = (project = null, index = null) => {
    if (project) {
      setFormProjectData({
        ...project,
        file: null, // Reset file input for edit
      });
      setEditIndex(index);
    } else {
      setFormProjectData({ title: "", date: "", associated: "", description: "", image: "", file: null });
      setEditIndex(null);
    }
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const projectData = { ...formProjectData };
    if (editIndex !== null) {
      const updated = [...projects];
      updated[editIndex] = projectData;
      setProjects(updated);
    } else {
      setProjects([...projects, projectData]);
    }
    setShowModal(false);
  };

  // const handleDelete = (index) => {
  //   const updated = projects.filter((_, i) => i !== index);
  //   setProjects(updated);
  // };


  const [certifications, setCertifications] = useState([
    {
      title: "UI/UX DESIGN MASTER PROGRAM",
      issuer: "Simplilearn",
      issuedDate: "Issued Nov 2022 · No Expiration Date",
      image: Course,
    },
    {
      title: "UI/UX DESIGN MASTER PROGRAM",
      issuer: "Simplilearn",
      issuedDate: "Issued Nov 2022 · No Expiration Date",
      image: Course,
    },
  ]);

  const [showLicensesModal, setShowLicensesModal] = useState(false);
  const [editIndexLicenses, setEditIndexLicenses] = useState(null);
  const [formLicensesData, setFormLicensesData] = useState({
    title: "",
    issuer: "",
    issuedDate: "",
    image: Course,
    credentialUrl: '',
  });

  const handleAddEditLicensesClick = (cert = null, index = null) => {
    if (cert) {
      setFormLicensesData(cert);
      setEditIndexLicenses(index);
    } else {
      setFormLicensesData({ title: "", issuer: "", issuedDate: "", image: Course, credentialUrl: "", });
      setEditIndexLicenses(null);
    }
    setShowLicensesModal(true);
  };

  const handleFormLicensesSubmit = (e) => {
    e.preventDefault();
    if (editIndexLicenses !== null) {
      const updated = [...certifications];
      updated[editIndexLicenses] = formLicensesData;
      setCertifications(updated);
    } else {
      setCertifications([...certifications, formLicensesData]);
    }
    setShowLicensesModal(false);
  };

  const handleLicensesDelete = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
  };



  useEffect(() => {
    if (!authToken || !userId) {
      navigate("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for ID:", userId);
        const response = await axios.post(
          `${baseUrl}/api/getAllUserDetails`,
          { userId: userId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
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
          setError(response.data.message || "User data not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authToken, userId, navigate]);


  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "Anjali Sharma",
        designation: userData.currentPosition || "JS Developer",
        company: userData.company || "Arnnima Solution",
        location: userData.location || "Ghaziabad",
        experience: userData.experienceInStack ? `${userData.experienceInStack} Year Exp` : "2 Year Exp",
        salary: userData.salary ? `${userData.salary} /-Year` : "2000000 /-Year",
        notice: userData.noticePeriod ? `${userData.noticePeriod} Days (Notice period)` : "20 Days (Notice period)",
        phone: userData.mobileNumber ? `+91 ${userData.mobileNumber}` : "+91 939387736",
        email: userData.email || "xyz@gmail.com",
        profileImg: userData.image || Profile,
      });


      // Optional: Set other related states
      setAboutText(userData.about || "");
      setSelectedSkills(
        (userData.skillmodels || []).map(skill => ({
          tecStackName: skill.skillsName,
          techStacklogo: skill.skillLogo,
          _id: skill._id
        }))
      );
      setEmploymentList(userData.workExperiences || []);
      setEducationList(userData.education_details || []);
      setProjects(userData.projectmodels || []);
      setCertifications(userData.lic_certis || []);
      setResumeFile(userData.resume.split("/").pop());
      setResumeURL(userData.resume);

    }
  }, [userData]);

  useEffect(() => {
    if (isAboutEditOpen) {
      setAboutInput(aboutText);
    }
  }, [isAboutEditOpen, aboutText]);

  const handleEditAbout = async () => {
    if (!authToken) {
      setError("Session expired! Please login again.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${baseUrl}/api/addAboutMe`,
        {
          about: aboutInput,
          userId: userId, // ✅ Move userId into the request body
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json", // Optional but recommended
          },
        }
      );

      if (response.data.status === 200) {
        setSuccess("About me updated successfully!");
        setAboutText(aboutInput);
        setIsAboutEditOpen(false);
      } else {
        setError(response.data.msg || "Failed to update about me.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong while updating."
      );
    } finally {
      setLoading(false);
    }
  };


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


          <div className="profile-secOne">

            {/* Profile section */}
            <div className="profileCardHead">
              <img src={formData.profileImg || Profile} alt="Profile" />

              <div className="cadidate-basicInfo">
                <div className="profile-header-top">
                  <div>
                    <h3>{formData.name}</h3>
                    <p>{formData.designation}</p>
                    <p>{formData.company}</p>
                  </div>
                  <div className="profile-actions">
                    <button className="action-btn" onClick={handleEditToggle}>
                      <MdOutlineEdit size={30} />
                    </button>
                    <button className="action-btn">
                      <FiShare2 size={30} />
                    </button>
                  </div>
                </div>

                <div className="colOneInfoTwo">
                  <div className="candi-personalInfo">
                    <div className="personalInfo-colOne">
                      <div className="colOne-details">
                        <FaLocationDot size={20} />
                        <p>{formData.location}</p>
                      </div>
                      <div className="colOne-details">
                        <FaLaptopCode size={25} />
                        <p>{formData.experience}</p>
                      </div>
                      <div className="colOne-details">
                        <MdOutlineCurrencyRupee size={25} />
                        <p>{formData.salary}</p>
                      </div>
                    </div>
                    <div className="personalInfo-colTwo">
                      <div className="colTwo-details">
                        <FaBusinessTime size={25} />
                        <p>{formData.notice}</p>
                      </div>
                      <div className="colTwo-details">
                        <IoCallSharp size={25} />
                        <p>{formData.phone}</p>
                      </div>
                      <div className="colTwo-details">
                        <IoIosMail size={25} />
                        <p>{formData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal for profile Editing */}
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
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <input
                      name="designation"
                      placeholder="Designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                    />
                    <input
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                    <input
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                    <input
                      name="experience"
                      placeholder="Experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                    <input
                      name="salary"
                      placeholder="Salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                    />
                    <input
                      name="notice"
                      placeholder="Notice Period"
                      value={formData.notice}
                      onChange={handleInputChange}
                    />
                    <input
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <input
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <input
                      type="file"
                      name="profileImg"
                      onChange={handleInputChange}
                    />

                  </div>
                  <div className="modal-buttons">
                    <button onClick={handleSaveProfileWithImage}>Save & Close</button>
                    <button type="button" onClick={handleClose}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="profile-secTwo">
            <div className="profile-contentBox">

              <div className="main-wrapper">

                {/* siderbar Link section */}
                <div className="quick-links">
                  <div className="content-boxes-head"><h2>Quick Links</h2></div>
                  <ul>
                    <li>About Me </li>
                    <li>Resume </li>
                    <li>Key skills </li>
                    <li>Employment </li>
                    <li>Education </li>
                    <li>Projects </li>
                    <li>Licenses & certifications </li>
                    <li>Accomplishments </li>
                  </ul>
                </div>

                {/* AboutMe Section */}
                <div className="content-boxes">
                  <div className="content-boxes-head">
                    <h2>About Me</h2>
                    <button className="aboutMe-editBtn" onClick={() => {
                      setAboutInput(aboutText || "");
                      setIsAboutEditOpen(true);

                    }}>
                      <FiPlus size={30} className="plus-icon" />
                    </button>
                  </div>

                  <div className="about-card-box-details">
                    <div>
                      <div>
                        <p>
                          {aboutText || (
                            `I am ${userData?.name}, a professional UI/UX, Graphics & Web Designer. ` +
                            `I'm keen to provide top-notch professional & creative design. ` +
                            `I'm here to share my work with the world. I solve user problems ` +
                            `via user experience (UX) & interaction design and add more value ` +
                            `to them with minimalistic UI design.`
                          )}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Modal for AboutMe Editing */}
                {isAboutEditOpen && (
                  <div className="modal-overlay">
                    <div className="edit-modal">
                      <h3>Edit About Me</h3>
                      <textarea
                        rows={6}
                        value={aboutInput}
                        onChange={(e) => setAboutInput(e.target.value)}
                      />
                      {error && <p style={{ color: "red" }}>{error}</p>}
                      {success && <p style={{ color: "green" }}>{success}</p>}
                      <div className="modal-actions">
                        <button onClick={handleEditAbout} disabled={loading}>
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          style={{ backgroundColor: "#f44336", color: "white" }}
                          onClick={() => setIsAboutEditOpen(false)}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resume section */}
              <div className="content-boxes">
                <div className="content-boxes-head">
                  <h2>Upload Resume</h2>
                  <button className="aboutMe-editBtn" onClick={() => setIsModalOpen(true)}>
                    <FiPlus size={30} className="plus-icon" />
                  </button>
                </div>

                <div className="resume-card-box-details">
                  {!resumeFile ? (
                    <div>
                      <img src={resumelogo} className="upload-icon" />
                      <p>Upload your Resume here</p>
                    </div>
                  ) : (
                    <div className="resume-info">
                      <p><strong>Uploaded:</strong> {resumeFile}</p>
                      <a href={resumeURL} target="_blank" rel="noopener noreferrer" className="resume-link">
                        View / Download Resume
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal for Upload Resume */}
              {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal-box">
                    <h3>Select Resume</h3>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                    <div className="modal-buttons">
                      <button onClick={handleUpload}>Upload</button>
                      <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills section */}
              <div className="content-boxes">
                <div className="content-boxes-head">
                  <h2>Key Skills</h2>
                  <button className="aboutMe-editBtn" onClick={() => setIsSkillModalOpen(true)}>
                    <FiPlus size={30} className="plus-icon" />
                  </button>
                </div>

                <div className="skills-card-box-details">
                  <div className="skillsbox-card">
                    {selectedSkills.map((skill, index) => (
                      <div className="skill-badge" key={index}>
                        <span className="skill-icon"><img
                          src={skill.techStacklogo}
                          // alt={skill.tecStackName}
                          style={{ width: "20px", height: "20px", marginRight: "8px" }}
                        /></span>
                        <span>{skill.tecStackName}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Modal for Skill editing */}
                {isSkillModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-box">
                      <h3>Edit Skills</h3>

                      <input
                        type="text"
                        placeholder="Search new skill..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="skill-search"
                      />

                      <div className="selected-skills">
                        {selectedSkills.map((skill, i) => (
                          <div key={i} className="selected-skill">
                            <span className="skill-icon"><img
                              src={skill.techStacklogo}
                              alt={skill.tecStackName}
                              style={{ width: "20px", height: "20px", marginRight: "8px" }}
                            /></span>
                            {skill.tecStackName}
                            <FiX onClick={() => handleRemoveSkill(skill.tecStackName, skill._id)} />
                          </div>
                        ))}
                      </div>

                      <div className="skill-list">
                        {filteredSkills.map((skill, i) => (
                          <div
                            key={i}
                            className="skill-option"
                            onClick={() => handleAddSkill(skill)}
                          >
                            <span className="skill-icon"><img
                              src={skill.techStacklogo}
                              alt={skill.tecStackName}
                              style={{ width: "20px", height: "20px", marginRight: "8px" }}
                            /></span>
                            {skill.tecStackName}
                          </div>
                        ))}
                      </div>

                      <div className="modal-buttons">
                        <button onClick={() => setIsSkillModalOpen(false)}>Done</button>
                        <button type="button" onClick={() => setIsSkillModalOpen(false)}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>




              {/* Experience section */}
              <div className="content-boxes">
                <div className="content-boxes-head">
                  <h2>Employment</h2>
                  <button className="aboutMe-editBtn" onClick={() => handleOpenModal()}>
                    <FiPlus size={30} className="plus-icon" />
                  </button>
                </div>
                <div className="exp-card-box-details">
                  <div className="employment-list">
                    {employmentList.map((job, index) => {
                      const duration = formatDateRange(job.startDate, job.endDate);
                      return (
                        <div className="employment-card" key={index}>
                          <div className="employment-logo"><img /></div>
                          <div className="employment-content">
                            <div className="employment-header">
                              <h3>{job.title}</h3>
                              <div className="employment-timeline">
                                <span>{duration}</span>
                              </div>
                              <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                  className="employee-editBtn"
                                  onClick={() => handleOpenModal(job._id, index)}
                                >
                                  <MdOutlineEdit size={25} />
                                </button>
                                {/* <button
                                className="employee-deleteBtn"
                                onClick={() => handleDelete(index)}
                              >
                                <FiX size={20} />
                              </button> */}
                              </div>
                            </div>
                            <p className="company-name">{job.company_Name}</p>
                            <p className="company-add">{job.location}</p>
                            <p className="employment-description">{job.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Modal for Experience Editing */}
              {isExperienceModalOpen && (
                <div className="modal-overlay">
                  <div className="modal-box">
                    <h3>{editingIndex !== null ? "Edit Employment" : "Add New Employment"}</h3>
                    {/* {newJob.companyLogo && (
                      <img src={newJob.companyLogo} alt="Preview" style={{ width: "10%", height: "auto", borderRadius: "8px", marginTop: "10px" }} />
                    )} */}
                    {/* <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewJob({ ...newJob, companyLogo: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    /> */}
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={newJob?.company_Name}
                      onChange={(e) => setNewJob({ ...newJob, company_Name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      value={newJob?.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    />
                    <input
                      type="date"
                      placeholder="Enter a Start Date"
                      value={newJob?.JoiningDate}
                      onChange={(e) => setNewJob({ ...newJob, JoiningDate: e.target.value })}
                    />
                    <input
                      type="date"
                      placeholder="Enter a End Date"
                      value={newJob?.endDate}
                      onChange={(e) => setNewJob({ ...newJob, endDate: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newJob?.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    />
                    <textarea
                      placeholder="Description"
                      rows={3}
                      value={newJob?.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    />


                    <div className="modal-buttons">
                      <button onClick={handleSave}>
                        {editingIndex !== null ? "Update" : "Add"}
                      </button>
                      <button style={{ backgroundColor: "#333" }} onClick={() => setIsExperienceModalOpen(false)}>Cancel</button>
                      {editingIndex !== null && (
                        <button type="button" onClick={() => handleDeleteExperience(newJob._id)}>
                          Delete
                        </button>
                      )}

                    </div>
                  </div>
                </div>
              )}


              {/* Education section */}
              <div className="content-boxes">
                <div className="content-boxes-head">
                  <h2>Education</h2>
                  <button className="aboutMe-editBtn" onClick={() => setIsEduModalOpen(true)}>
                    <FiPlus size={30} className="plus-icon" />
                  </button>
                </div>

                <div className="education-cards">
                  {educationList.map((edu) => {
                    const duration = formatDateRange(edu.startDate, edu.endDate);
                    return (
                      <div className="education-card" key={edu.id}>
                        <img src={edu.logo} alt="Logo" className="college-logo" />
                        <div className="education-info">
                          <h3>{edu.college}</h3>
                          <p>{edu.degree}</p>
                          <p className="location">{edu.location}</p>
                        </div>
                        <div className="education-details">
                          <div className="duration">{duration}</div>
                          <div className="grade">Grade {edu?.grade ?? "Not specified"}</div>
                        </div>
                        <button
                          className="employee-editBtn"
                          style={{ marginTop: "-40px" }}
                          onClick={() => handleEditClick(edu)}
                        >
                          <MdOutlineEdit size={25} />
                        </button>


                      </div>

                    )
                  })}
                </div>

              </div>

              {/* Modal for Education Editing */}
              {isEduModalOpen && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h3>{isEditing ? "Edit Education" : "Add Education"}</h3>

                    <input type="text" placeholder="College Name"
                      value={newEducation.college}
                      onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })}
                    />
                    <input type="text" placeholder="Degree"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    />
                    <input type="text" placeholder="Location"
                      value={newEducation.location}
                      onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={newEducation.startDate}
                      onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                    />

                    <input
                      type="date"
                      placeholder="End Date"
                      value={newEducation.endDate}
                      onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                    />

                    <input type="text" placeholder="Grade"
                      value={newEducation.grade}
                      onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })}
                    />

                    <label>Upload College Logo</label>
                    <input type="file" accept="image/*" onChange={handleLogoChange} />

                    {newEducation.logo && (
                      <img src={newEducation.logo} alt="Logo Preview" className="logo-preview" />
                    )}

                    <div className="modal-actions">
                      <button
                        onClick={() => {
                          const formattedDuration = formatDateRange(newEducation.startDate, newEducation.endDate);

                          const educationData = {
                            ...newEducation,
                            duration: formattedDuration,
                            id: isEditing ? editId : Date.now(),
                          };

                          if (isEditing) {
                            setEducationList(prev =>
                              prev.map(edu => (edu.id === editId ? educationData : edu))
                            );
                          } else {
                            setEducationList([...educationList, educationData]);
                          }

                          setNewEducation({
                            college: "",
                            degree: "",
                            location: "",
                            startDate: "",
                            endDate: "",
                            grade: "",
                            logo: School,
                          });
                          setIsEditing(false);
                          setEditId(null);
                          setIsEduModalOpen(false);
                        }}
                      >
                        {isEditing ? "Update" : "Save"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsEduModalOpen(false);
                          setIsEditing(false);
                          setEditId(null);
                        }}
                      >
                        Cancel
                      </button>

                      {isEditing && (
                        <button
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() => {
                            handleDelete(editId);
                            setIsEduModalOpen(false);
                            setIsEditing(false);
                            setEditId(null);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}




              {/* Project section */}
              <div className="content-boxes">
                <div className="content-boxes-head">
                  <h2>Projects</h2>
                  <button className="aboutMe-editBtn" onClick={() => handleAddEditClick()}>
                    <FiPlus size={30} className="plus-icon" />
                  </button>
                </div>
                <div className="education-cards">
                  {projects.map((proj, index) => {
                    const duration = formatDateRange(proj.startDate, proj.endDate);

                    return (
                      <div className="project-card" key={index}>
                        <img src={proj.image} alt="Project Logo" className="project-logo" />
                        <div className="project-info">
                          <h3>{proj.title}</h3>
                          <p className="project-date">{duration}</p>
                          <p className="project-associated">{proj.associated}</p>
                          <p className="project-description">{proj.projectDescription}</p>
                        </div>
                        <div className="project-actions">
                          <button onClick={() => handleAddEditClick(proj, index)}>
                            <MdOutlineEdit size={25} />
                          </button>
                          {/* <button onClick={() => handleDelete(index)}>Delete</button> */}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {showModal && (
                  <div className="modal-overlay">
                    <form className="modal-content" onSubmit={handleFormSubmit}>
                      <h3>{editIndex !== null ? "Edit Project" : "Add Project"}</h3>
                      <input
                        type="text"
                        placeholder="Title"
                        value={formProjectData.title}
                        onChange={(e) => setFormProjectData({ ...formProjectData, title: e.target.value })}
                        required
                      />
                      <input
                        type="date"
                        placeholder="startDate"
                        value={formProjectData.startDate}
                        onChange={(e) => setFormProjectData({ ...formProjectData, startDate: e.target.value })}
                        required
                      />
                      <input
                        type="date"
                        placeholder="EndDate"
                        value={formProjectData.endDate}
                        onChange={(e) => setFormProjectData({ ...formProjectData, endDate: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Associated With"
                        value={formProjectData.associated}
                        onChange={(e) => setFormProjectData({ ...formProjectData, associated: e.target.value })}
                        required
                      />
                      <textarea
                        placeholder="Description"
                        value={formProjectData.projectDescription}
                        onChange={(e) => setFormProjectData({ ...formProjectData, description: e.target.value })}
                        required
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const imageUrl = URL.createObjectURL(file);
                            setFormProjectData({ ...formProjectData, image: imageUrl, file: file });
                          }
                        }}
                      />
                      {formProjectData.image && (
                        <img
                          src={formProjectData.image}
                          alt="Preview"
                          style={{ width: "10%", height: "auto", borderRadius: "8px", marginTop: "10px" }}
                        />
                      )}
                      <div className="modal-buttons">
                        <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
                        <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>



              {/* Certificate and lincences section */}
              <div className="content-boxes">
                <div className="content-boxes-head">
                  <h2>Licenses & Certifications</h2>
                  <button className="aboutMe-editBtn" onClick={() => handleAddEditLicensesClick()}>
                    <FiPlus size={30} className="plus-icon" />
                  </button>
                </div>
                <div className="education-cards">
                  {certifications.map((cert, index) => (
                    <div className="license-card" key={index}>
                      <img src={cert.image} alt="Certification Logo" className="license-logo" />
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
                        href={cert.certificateUrl}  // Replace with your actual URL variable
                        target="_blank"
                        rel="noopener noreferrer"
                        className="show-credential-button"
                      >
                        Show credential
                      </a>

                      <div className="project-actions">
                        <button onClick={() => handleAddEditLicensesClick(cert, index)}>
                          <MdOutlineEdit size={25} />
                        </button>
                        {/* <button onClick={() => handleLicensesDelete(index)}>Delete</button> */}
                      </div>
                    </div>
                  ))}
                </div>
                {showLicensesModal && (
                  <div className="modal">
                    <form className="modal-form" onSubmit={handleFormLicensesSubmit}>
                      <h3>{editIndex !== null ? "Edit Certification" : "Add Certification"}</h3>
                      <input
                        type="text"
                        placeholder="Certification Title"
                        value={formLicensesData.title}
                        onChange={(e) => setFormLicensesData({ ...formLicensesData, title: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Issuer"
                        value={formLicensesData.issuer}
                        onChange={(e) => setFormLicensesData({ ...formLicensesData, issuer: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Issued Date"
                        value={formLicensesData.issuedDate}
                        onChange={(e) => setFormLicensesData({ ...formLicensesData, issuedDate: e.target.value })}
                        required
                      />
                      <input
                        type="url"
                        placeholder="Credential Link"
                        value={formLicensesData.credentialUrl}
                        onChange={(e) =>
                          setFormLicensesData({ ...formLicensesData, credentialUrl: e.target.value })
                        }
                      />

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormLicensesData({ ...formLicensesData, image: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {formLicensesData.image && (
                        <img src={formLicensesData.image} alt="Preview" style={{ width: "10%", height: "auto", borderRadius: "8px", marginTop: "10px" }} />
                      )}
                      <div className="modal-buttons">
                        <button type="submit">{editIndexLicenses !== null ? "Update" : "Add"}</button>
                        <button type="button" onClick={() => setShowLicensesModal(false)}>Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>



            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;

