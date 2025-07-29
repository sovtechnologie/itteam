import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../stylesheets/CandiProfile.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FiPlus, FiX } from "react-icons/fi";
import { FaBusinessTime } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import Company from "../../images/Profile/Campanyname.png";
import School from "../../images/Profile/Schoolname.png";
import Course from "../../images/Profile/Course.png";
import resumelogo from "../../images/resumelogo.png";
import { fetchEmployment, fetchProjects } from "../../services/apiService";
import femaleAvator from "../../images/female.png";
import MaleAvator from "../../images/male.png";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const MAX_WORDS = 200;
const MIN_WORDS = 200;

const countWords = (text) => {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
};

const EmpProfPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const authToken = Cookies.get("authToken"); // Get token from cookies
  const userId = Cookies.get("userId"); // Get user ID from cookieshe
  const navigate = useNavigate();
  const [employmentList, setEmploymentList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    state: "",
    location: "",
    experience: "",
    salary: "",
    notice: "",
    phone: "",
    email: "",
    profileImg: "",
  });

  const handleEditToggle = () => setIsEditOpen(true);
  const handleClose = () => setIsEditOpen(false);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Full name is required.";
    if (!formData.designation.trim()) errors.designation = "Designation is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format.";

    if (!formData.state.trim()) errors.state = "State is required.";
    if (!formData.location.trim()) errors.location = "City is required.";

    if (!formData.experience) errors.experience = "Experience level is required.";
    if (!formData.salary.trim()) errors.salary = "Salary is required.";
    if (!formData.notice) errors.notice = "Notice period is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProfileWithImage = async () => {
    if (!validateForm()) return;

    const form = new FormData();
    form.append("userId", userId);
    form.append("name", formData.name);
    form.append("currentPosition", formData.designation);
    form.append("currentCompany", formData.company);
    form.append("state", formData.state);
    form.append("location", formData.location);
    const expRaw = formData.experience;
    form.append("experienceInStack", expRaw);
    const salaryRaw = formData.salary.split(" ")[0];
    form.append("salary", salaryRaw);
    const noticeRaw = formData.notice;
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
        window.dispatchEvent(new Event("profile-updated"))
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
      setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
       setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    }
  };

  const [isAboutEditOpen, setIsAboutEditOpen] = useState(false);
  const [aboutText, setAboutText] = useState(userData?.about || "");
  const [aboutInput, setAboutInput] = useState(aboutText);
  const [aboutError, setAboutError] = useState("");
  const [minWordsReached, setMinWordsReached] = useState(false);
  const [error, setError] = useState("");
  const [modalErrors, setModalErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeURL, setResumeURL] = useState(""); // for full backend resume URL
  const [newResume, setNewResume] = useState(null); // File for new upload
  const [resumeError, setResumeError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewResume(file);
      setResumeFile(file.name); // Show new name immediately
      setResumeURL(URL.createObjectURL(file)); // Temporary preview
      setResumeError(""); // Clear any previous error
    }
  };

  // HANDLE upload to backend
  const handleUpload = async () => {
    if (!newResume) return setResumeError("Please select a resume to upload.");

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
      console.log("status after upload resume", res.data.status);
      // const data = await res.json();

      if (res.data.status === 200) {
        // setResumeURL(data.result.resume); // Update backend link
        setIsModalOpen(false);
        setResumeError('');
      } else {
        setResumeError(error.response?.data?.message || "Error uploading resume.");
      }
      setIsModalOpen(false);
    } catch (err) {
      setResumeError(error.response?.data?.message || "Error uploading resume.");
    }
  };

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [techstacklist, setTechstacklist] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  // Add state to manage errors (already exists)
  const [skillError, setSkillError] = useState("");

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
    setSkillError(""); // Clear old errors

    // Prevent empty or malformed skills
    if (!skill || !skill.tecStackName) {
      setSkillError("Invalid skill selected.");
      return;
    }


    // Prevent duplicates
    const alreadyExists = selectedSkills.some(
      (s) =>
        s.tecStackName &&
        skill.tecStackName &&
        s.tecStackName.toLowerCase() === skill.tecStackName.toLowerCase() &&
        ((s.id && skill.id && s.id === skill.id) ||
          (s._id && skill._id && s._id === skill._id))
    );
    if (alreadyExists) {
      setSkillError("Skill already added.");
      return;
    }

    // Use _id if available, else id
    const techStackId = skill._id || skill.id;
    if (!techStackId) {
      setSkillError("Skill ID missing. Cannot add this skill.");
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
          techStacklogo:
            response.data.result.skillLogo || response.data.result.skilllogo, // handle both cases
          _id: response.data.result.techStackId, // ✅ Include the _id here
        };

        setSelectedSkills((prev) => [...prev, newSkill]);
        setSkillError("");
        setSuccess("Skill added successfully!");
      } else {
        setSkillError(response.data.message || "Failed to add skill.");
      }
    } catch (error) {
      setSkillError(
        error.response?.data?.message ||
        "Something went wrong while adding skill."
      );
    }
  };

  const handleRemoveSkill = async (tecStackName, _id) => {
    if (!authToken || !userId) {
      setError("Session expired. Please log in again.");

      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/deleteSkill`, // ⬅️ Replace with your actual delete/remove endpoint
        {
          userId,
          skillsName: tecStackName, // or skill ID, depending on how backend identifies it
          skillId: _id,
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
        const updated = selectedSkills.filter(
          (skill) => skill.tecStackName !== tecStackName
        );
        setSelectedSkills(updated);
        setSuccess("Skill removed successfully.");
      } else {
        setError(response.data.message || "Failed to remove skill.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong while removing the skill."
      );
    }
  };

  // Fetch employment list from backend
  const fetchEmploymentList = async () => {
    try {
      const response = await fetchEmployment(authToken);
      if (response) {
        setEmploymentList(response || []);
        console.log("Employment list fetched successfully:", response);
      }
    } catch (error) {
      console.error("Error fetching employment list:", error);
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
    isCurrentEmployment: "false",
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
        isCurrentEmployment: "false",
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

      return response;
    } catch (error) {
      alert("Network error: " + error.message);
      return null;
    }

  };


  const handleSave = async () => {
    const { company_Name, title, JoiningDate, endDate, location, description } = newJob;

    setModalErrors([]);
    // Validate inputs
    const errs = [];
    if (!company_Name?.trim()) errs.push({ field: "company_Name", message: "Company Name is required." });
    if (!title?.trim()) errs.push({ field: "title", message: "Position is required." });
    if (!JoiningDate) errs.push({ field: "JoiningDate", message: "Start Date is required." });
    if (!endDate) errs.push({ field: "endDate", message: "End Date is required." });
    if (new Date(endDate) < new Date(JoiningDate))
      errs.push({ field: "endDate", message: "End date cannot be earlier than start date." });
    if (!location?.trim()) errs.push({ field: "location", message: "Location is required." });
    if (!description?.trim()) errs.push({ field: "description", message: "Description is required." });

    if (errs.length) {
      setModalErrors(errs);
      return;
    }

    const updatedList = [...employmentList];

    if (editingIndex !== null) {
      updatedList[editingIndex] = newJob;
    } else {
      updatedList.push(newJob);
      // employmentList.push(newJob); // Ensure the new job is added to the original list
    }

    // Optimistically update local state first
    const response = await saveEmployment(
      userId,
      newJob,
      editingIndex !== null
    );

    if (response && response.data && response.data.status === 200) {
      const savedExperience = response.data.result;
      let updatedList;
      if (editingIndex !== null) {
        updatedList = [...employmentList];
        updatedList[editingIndex] = savedExperience;
      } else {
        updatedList = [...employmentList];
      }
      setEmploymentList(updatedList);
      await fetchEmploymentList();
      setIsExperienceModalOpen(false);
      setEditingIndex(null);
    } else {
      setModalErrors([{ field: "general", message: "Failed to save experience." }]);
    }
  };


  const handleDeleteExperience = async (job_id) => {
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

  const [educationList, setEducationList] = useState([]);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [modalErrorsEdu, setModalErrorsEdu] = useState([]);
  const [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    location: "",
    startDate: "",
    endDate: "",
    grade: "",
  });

  const addEducation = async (education) => {

    const formData = new FormData();

    for (let key in education) {
      if (education[key]) {
        formData.append(key, education[key]);
      }
    }

    return await axios.post(`${baseUrl}/api/addEducation`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const updateEducation = async (education) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/editEducation`,
        {
          id: education._id, // Your backend expects '_id'
          college: education.college,
          degree: education.degree,
          startDate: education.startDate,
          endDate: education.endDate,
          location: education.location,
          grade: education.grade,
          specialization: education.specialization || "", // optional
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Always return the updated education object
      console.log("edit education", response.data.res);
      return response.data && response.data.res ? response.data.res : null;
    } catch (error) {
      console.error("Failed to update education:", error);
      throw error;
    }
  };

  const handleDeleteEducation = async (id) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/deletedEducation`,
        {
          id: id, // ✅ request body
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // ✅ token in correct place
          },
        }
      );

      if (res.data.status === 200) {
        setEducationList((prev) => prev.filter((edu) => edu._id !== id));
      } else {
        alert("Failed to delete education.");
      }
    } catch (err) {
      console.error("Delete education failed:", err);
      alert("Error deleting education.");
    }
  };

  const handleEditClick = (edu) => {
    setNewEducation(edu);
    setIsEditing(true);
    setEditId(edu._id);
    setIsEduModalOpen(true);
  };

  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [modalErrorsProj, setModalErrorsProj] = useState([]);
  const [formProjectData, setFormProjectData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    associated: "",
    projectDescription: "",
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
      setFormProjectData({
        title: "",
        startDate: "",
        endDate: "",
        associated: "",
        ProjectDescription: "",
        image: "",
        file: null,
      });
      setEditIndex(null);
    }
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setModalErrorsProj([]);

    const { title, startDate, endDate, associated, projectDescription } = formProjectData;
    const errs = [];

    if (!title?.trim()) errs.push({ field: "title", message: "Title is required." });
    if (!startDate) errs.push({ field: "startDate", message: "Start date is required." });
    if (!endDate) errs.push({ field: "endDate", message: "End date is required." });
    else if (new Date(endDate) < new Date(startDate))
      errs.push({ field: "endDate", message: "End date cannot be before start date." });
    if (!associated?.trim()) errs.push({ field: "associated", message: "Associated field is required." });
    if (!projectDescription?.trim()) errs.push({ field: "projectDescription", message: "Description is required." });

    if (errs.length > 0) {
      setModalErrorsProj(errs);
      return;
    }
    try {
      const projectPayload = { ...formProjectData };
      if (editIndex !== null) {
        projectPayload._id = projects[editIndex]._id;
        const res = await editProject(projectPayload);
        // const updated = res.data.res;
        const updated = await fetchProjects({ authToken });

        setProjects(updated || []); // Update projects with the latest data
      } else {
        const res = await addProject(projectPayload);
        const projectsData = await fetchProjects({ authToken });
        console.log("res", await fetchProjects({ authToken }));
        setProjects(projectsData || []);
      }

      setShowModal(false);
      setFormProjectData({
        title: "",
        startDate: "",
        endDate: "",
        associated: "",
        projectDescription: "",
        image: "",
        file: null,
      });
      setEditIndex(null);
    } catch (err) {
      console.error("Project submission failed:", err);
      alert("Error submitting project.");
    }
  };

  const addProject = async (projectData) => {
    console.log("Adding project:", projectData);
    // const formData = new FormData();

    // formData.append("title", projectData.title);
    // formData.append("startDate", projectData.startDate);
    // formData.append("endDate", projectData.endDate);
    // formData.append("associated", projectData.associated);
    // formData.append("projectDescription", projectData.projectDescription);

    // if (projectData.file) {
    //   formData.append("image", projectData.file); // assuming you will later handle the file
    // }

    return await axios.post(`${baseUrl}/api/addProjects`, projectData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  };

  const editProject = async (projectData) => {
    return await axios.put(
      `${baseUrl}/api/editProjects`,
      {
        id: projectData._id, // backend expects 'id'
        title: projectData.title,
        startDate: projectData.startDate,
        associated: projectData.associated,
        projectDescription: projectData.projectDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/deleteProject`,
        { id: projectId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200) {
        setProjects((prev) => prev.filter((proj) => proj._id !== projectId));
      } else {
        alert(response.data.message || "Failed to delete project.");
      }
      setShowModal(false);
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting project.");
    }
  };

  const [certifications, setCertifications] = useState([]);
  const [showLicensesModal, setShowLicensesModal] = useState(false);
  const [editIndexLicenses, setEditIndexLicenses] = useState(null);
  const [modalErrorsLic, setModalErrorsLic] = useState([]);
  const [formLicensesData, setFormLicensesData] = useState({
    title: "",
    issuer: "",
    issuedDate: "",
    image: Course,
    credentialUrl: "",
  });

  const handleAddEditLicensesClick = (cert = null, index = null) => {
    console.log("editlincences", cert, index);
    if (cert) {
      setFormLicensesData({
        title: cert.courses || cert.title || "",
        issuer: cert.company_Name || cert.issuer || "",
        issuedDate: cert.issued_Date || cert.issuedDate || "",
        image: cert.image || Course,
        credentialUrl: cert.certificateUrl || cert.credentialUrl || "",
        _id: cert._id, // keep _id for editing
      });
      setEditIndexLicenses(index);
    } else {
      setFormLicensesData({
        title: "",
        issuer: "",
        issuedDate: "",
        image: Course,
        credentialUrl: "",
      });
      setEditIndexLicenses(null);
    }
    setShowLicensesModal(true);
  };


  const handleFormLicensesSubmit = async (e) => {
    e.preventDefault();
    setModalErrorsLic([]);

    const { title, issuer, issuedDate, credentialUrl } = formLicensesData;
    const errs = [];
    if (!title?.trim()) errs.push({ field: "title", message: "Title is required." });
    if (!issuer?.trim()) errs.push({ field: "issuer", message: "Issuer is required." });
    if (!issuedDate) errs.push({ field: "issuedDate", message: "Issued date is required." });
    if (!credentialUrl?.trim()) errs.push({ field: "credentialUrl", message: "Credential URL is required." });
    if (credentialUrl && !/^https?:\/\/.+\..+/.test(credentialUrl)) {
      errs.push({ field: "credentialUrl", message: "Enter a valid URL." });
    }

    if (errs.length) {
      setModalErrorsLic(errs);
      return;
    }


    try {
      let response;
      if (editIndexLicenses !== null && formLicensesData._id) {
        // Edit existing license
        response = await axios.put(
          `${baseUrl}/api/editCertificate`,
          {
            id: formLicensesData._id,
            courses: formLicensesData.title,
            company_Name: formLicensesData.issuer,
            issued_Date: formLicensesData.issuedDate,
            certificateUrl: formLicensesData.credentialUrl,
            // image: formLicensesData.image, // send image if needed
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === 200) {
          const updated = [...certifications];
          updated[editIndexLicenses] = response.data.res;
          setCertifications(updated);
        }
      } else {
        // Add new license
        response = await axios.post(
          `${baseUrl}/api/addCertificate`,
          {
            userId,
            courses: formLicensesData.title,
            company_Name: formLicensesData.issuer,
            issued_Date: formLicensesData.issuedDate,
            certificateUrl: formLicensesData.credentialUrl,
            // image: formLicensesData.image, // send image if needed
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === 200) {
          setCertifications([...certifications, response.data.result]);
        }
      }
      setShowLicensesModal(false);
      setEditIndexLicenses(null);
    } catch (error) {
      alert(
        error.response?.data?.message || "Error saving license/certification."
      );
    }
  };

  const handleDeleteLicenses = async (certId) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/deleteCertificate`,
        { id: certId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200) {
        setCertifications((prev) => prev.filter((cert) => cert._id !== certId));
      } else {
        alert(response.data.message || "Failed to delete certification.");
      }
      setShowLicensesModal(false);
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting certification.");
    }
  };



  useEffect(() => {
    if (!authToken || !userId) {
      navigate("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
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
  }, [authToken, userId]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

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
        salary: userData.salary ? `${userData.salary}` : "",
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
      setResumeFile(userData.resume.split("/").pop());
      setResumeURL(userData.resume);
    }
  }, [userData]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/withOutLogin/get-state-list`, {
        params: { countryCode: "IN" },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setStatesList(response.data.data);
          console.log("States List:", response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  useEffect(() => {
    if (selectedStateCode) {
      axios
        .post(`${baseUrl}/withoutLogin/getCityList`, {
          stateName: selectedStateCode, // Use selectedState directly if it's the state name
          countryCode: "IN",
        })
        .then((response) => {
          if (response.data && response.data.result) {
            setCitiesList(response.data.result);
          }
        })
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCitiesList([]); // Clear cities if no state selected
    }
  }, [selectedStateCode]);

  useEffect(() => {
    if (isAboutEditOpen) {
      setAboutInput(aboutText);
    }
  }, [isAboutEditOpen, aboutText]);


  const handleEditAbout = async () => {
    setAboutError('')
    if (!authToken) {
      setAboutError("Session expired! Please login again.");
      return;
    }
    const words = aboutInput.trim().split(/\s+/);
    if (words.length < MIN_WORDS) {
      setAboutError(`About me must be at least ${MIN_WORDS} words long.`);
      return;
    }


    setLoading(true);
    // setError(""); 
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
        setAboutError('')
      } else {
        setAboutError(response.data.msg || "Failed to update about me.");
      }
    } catch (error) {
      setAboutError(
        error.response?.data?.message || "Something went wrong while updating."
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

  const getProfileSrc = () => {
    if (formData.profileImg) return formData.profileImg;

    switch ((userData.gender || "").toLowerCase()) {
      case "female":
        return femaleAvator;
      case "male":
        return MaleAvator;
    }
  };


  return (
    <>
      <div className="empprofile-card">
        <div className="profileCard-box">
          <div className="profile-secOne">
            {/* Profile section */}
            <div className="profileCardHead">
              <img src={getProfileSrc()} alt="Profile" />

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
                  </div>
                </div>

                <div className="colOneInfoTwo">
                  <div className="candi-personalInfo">
                    <div className="personalInfo-colOne">
                      <div className="colOne-details">
                        <FaLocationDot size={20} />
                        <p>
                          {formData.location},{formData.state}
                        </p>
                      </div>
                      <div className="colOne-details">
                        <FaLaptopCode size={25} />
                        <p>{experienceLabel(formData.experience)}</p>
                      </div>
                      <div className="colOne-details">
                        <MdOutlineCurrencyRupee size={25} />
                        <p>{formData.salary}</p>
                      </div>
                    </div>
                    <div className="personalInfo-colTwo">
                      <div className="colTwo-details">
                        <FaBusinessTime size={25} />
                        <p>{noticePeriodLabel(formData.notice)}</p>
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
                  {/* <h3>Edit Profile</h3> */}

                  <div className="modal-header">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <h2 className="edit-about">Edit Profile</h2>
                      <button
                        style={{
                          marginTop: "0px",
                        }}
                        className="fancy-close"
                        onClick={handleClose}
                        aria-label="Close"
                      ></button>
                    </div>
                  </div>

                  {/* {formData.profileImg && ( */}
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
                        onClick={handleImageClick}
                      >
                        <img
                          src={formData.profileImg || getProfileSrc()}
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
                         {formErrors.profileImg && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.profileImg}</p>
                      )}
                      </div>
                    </div>
                  {/* )} */}

                  <div className="form-grid">
                    <div>
                      <label className="company-label">Enter Your Full Name</label>
                      <input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {formErrors.name && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="company-label">Enter Your Designation  </label>
                      <input
                        name="designation"
                        placeholder="Designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                      />
                      {formErrors.designation && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.designation}</p>
                      )}
                    </div>
                    <div>
                      <label className="company-label">Enter Your Email Id</label>
                      <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {formErrors.email && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="company-label">Select State</label>
                      <div className="signUpform-group">
                        <select
                          name="state"
                          value={formData.state || ""}
                          onChange={(e) => {
                            const selected = statesList.find(
                              (state) => (state.name || state) === e.target.value
                            );
                            setFormData((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }));
                            setSelectedState(e.target.value);
                            setSelectedStateCode(selected?.isoCode || ""); // if you want to use for city dropdown
                          }}
                          className="form-select"
                        >
                          <option value="">Select State</option>
                          {statesList.map((state) => (
                            <option
                              key={state._id || state.id || state}
                              value={state.name || state}
                            >
                              {state.name || state}
                            </option>
                          ))}
                        </select>
                        {formErrors.state && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.state}</p>
                      )}
                      </div></div>



                    <div>
                      <label className="company-label">Select city</label>
                      <div className="signUpform-group">

                        <select
                          name="location"
                          value={formData.location || ""}
                          onChange={handleInputChange}
                          className="form-select"
                          disabled={!selectedState}
                        >
                          <option value="">{formData.location || ""}</option>
                          {citiesList.map((city) => (
                            <option
                              key={city._id || city.id || city.name || city}
                              value={city.name || city}
                            >s
                              {city.name || city}
                            </option>
                          ))}
                        </select>
                        {formErrors.location && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.location}</p>
                      )}
                      </div></div>

                    <div>
                      <label className="company-label">Enter Experience Level</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                      >
                        <option value="">Select Experience Level</option>
                        <option value="1">Fresher</option>
                        <option value="2">Junior</option>
                        <option value="3">Mid-Level</option>
                        <option value="4">Senior</option>
                      </select>
                      {formErrors.experience && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.experience}</p>
                      )}
                      </div>

                    <div>
                      <label className="company-label">Enter Salary</label>
                      <input
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                      />
                      {formErrors.salary && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.salary}</p>
                      )}
                      </div>

                    <div>
                      <label className="company-label">Select Notice Period</label>
                      <select
                        name="notice"
                        value={formData.notice}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Notice Period</option>
                        <option value="1">Immediate</option>
                        <option value="2">Within 7 Days</option>
                        <option value="3">Within 15 Days</option>
                        <option value="4">Within 30 Days</option>
                        <option value="5">Within 45 Days</option>
                      </select>
                      {formErrors.notice && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.notice}</p>
                      )}
                      </div>

                    <div>
                      <label className="company-label">Enter Your Phone Number</label>
                      <input
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        disabled="true"
                      />
                      {formErrors.phone && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.phone}</p>
                      )}
                      </div>

                    <input
                      type="file"
                      accept="image/*"
                      name="profileImg"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="modal-buttons" style={{ marginTop: "10px" }}>
                    <button onClick={handleSaveProfileWithImage}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="quick-links-wrapper">
            <div className="profile-secTwo">
              <div className="aside">
                <div className="profile-contentBox">
                  <div className="main-wrapper">
                    {/* siderbar Link section */}
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

              {/* AboutMe Section */}
              <div className="right-aside">
                <div>
                  <div className="content-boxes">
                    <div className="content-boxes-head">
                      <h2>About Me</h2>
                      <button
                        className="aboutMe-editBtn"
                        onClick={() => {
                          setAboutInput(aboutText || "");
                          setIsAboutEditOpen(true);
                        }}
                      >
                        <FiPlus size={30} className="plus-icon" />
                      </button>
                    </div>

                    <div className="about-card-box-details" id="about">
                      <div>
                        <div>
                          <p>
                            {aboutText}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Modal for AboutMe Editing */}
                    {isAboutEditOpen && (
                      <div className="modal-overlay">
                        <div className="edit-modal">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <h3 className="edit-about">Edit About</h3>

                            <button
                              className="fancy-close"
                              onClick={() => setIsAboutEditOpen(false)}
                              aria-label="Close"
                            ></button>
                          </div>

                          <textarea
                            rows={6}
                            value={aboutInput}
                            onChange={(e) => {
                              const text = e.target.value;
                              const words = text
                                .trim()
                                .split(/\s+/)
                                .filter(Boolean);

                              // truncate above max
                              if (words.length > MAX_WORDS) {
                                const trimmed = words
                                  .slice(0, MAX_WORDS)
                                  .join(" ");
                                setAboutInput(trimmed + " ");
                                setAboutError('')
                              } else {
                                setAboutInput(text);
                                setAboutError('')
                              }

                              // update minWordsReached flag
                              setMinWordsReached(words.length >= MIN_WORDS);
                            }}
                          />
                          <br />
                          <small>
                            {countWords(aboutInput)} / {MAX_WORDS} words (min{" "}
                            {MIN_WORDS})
                          </small>

                          {aboutError && <p style={{ color: "red" }}>{aboutError}</p>}
                          {/* {success && (
                            <p style={{ color: "green" }}>{success}</p>
                          )} */}
                          <div className="modal-actions">
                            <button
                              onClick={handleEditAbout}
                            // disabled={loading || !minWordsReached}
                            >
                              {loading ? "Saving..." : "Save"}
                            </button>

                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Resume section */}

                <div className="content-boxes" id="resume">
                  <div className="content-boxes-head">
                    <h2>Upload Resume</h2>
                    <button
                      className="aboutMe-editBtn"
                      onClick={() => setIsModalOpen(true)}
                    >
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
                    )}
                  </div>
                  {/* Modal for Upload Resume */}
                  {isModalOpen && (
                    <div className="modal-overlay">
                      <div className="modal-box">
                        <div className="modal-header">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <h2 className="edit-about">Upload Resume</h2>
                            <button
                              className="fancy-close"
                              onClick={() => setIsModalOpen(false)}
                              aria-label="Close"
                            ></button>
                          </div>
                        </div>

                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                        {resumeError && (
                          <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                            {resumeError}
                          </p>
                        )}
                        <div
                          className="modal-buttons"
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <button onClick={handleUpload}>Upload</button>

                        </div>
                      </div>

                    </div>
                  )}
                </div>

                {/* Skills section */}
                <div className="content-boxes" id="skills">
                  <div className="content-boxes-head">
                    <h2>Key Skills</h2>
                    <button
                      className="aboutMe-editBtn"
                      onClick={() => setIsSkillModalOpen(true)}
                    >
                      <FiPlus size={30} className="plus-icon" />
                    </button>
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
                  {/* Modal for Skill editing */}
                  {isSkillModalOpen && (
                    <div className="modal-overlay">
                      <div className="modal-box">
                        <div className="modal-header">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <h2 className="edit-about">Skills</h2>
                            <button
                              className="fancy-close"
                              onClick={() => setIsSkillModalOpen(false)}
                              aria-label="Close"
                            ></button>
                          </div>
                        </div>

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
                              <span className="skill-icon">
                                <img
                                  src={skill.techStacklogo}
                                  alt={skill.tecStackName}
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    marginRight: "8px",
                                  }}
                                />
                              </span>
                              {skill.tecStackName}
                              <FiX
                                onClick={() =>
                                  handleRemoveSkill(
                                    skill.tecStackName,
                                    skill._id
                                  )
                                }
                              />
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
                              <span className="skill-icon">
                                <img
                                  src={skill.techStacklogo}
                                  alt={skill.tecStackName}
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    marginRight: "8px",
                                  }}
                                />
                              </span>
                              {skill.tecStackName}
                            </div>
                          ))}
                        </div>

                        <div
                          className="modal-buttons"
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <button onClick={() => setIsSkillModalOpen(false)}>
                            Save
                          </button>
                        </div>
                        {skillError && (
                          <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                            {skillError}
                          </p>
                        )
                        }
                      </div>
                    </div>
                  )}

                </div>

                {/* Experience section */}
                <div className="content-boxes" id="employment">
                  <div className="content-boxes-head">
                    <h2>Employment</h2>
                    <button
                      className="aboutMe-editBtn"
                      onClick={() => handleOpenModal()}
                    >
                      <FiPlus size={30} className="plus-icon" />
                    </button>
                  </div>
                  <div className="exp-card-box-details">
                    <div className="employment-list">
                      {employmentList.map((job, index) => {
                        const duration = formatDateRange(
                          job?.startDate,
                          job?.endDate
                        );
                        return (
                          <div className="employment-card" key={index}>
                            <div className="employment-logo">
                              <img src={Company} />
                            </div>
                            <div className="employment-content">
                              <div className="employment-header">
                                <h3>{job?.title}</h3>
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <div className="duration">
                                    <span>{duration}</span>
                                  </div>
                                  <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                      className="employee-editBtn"
                                      onClick={() =>
                                        handleOpenModal(job._id, index)
                                      }
                                    >
                                      <MdOutlineEdit size={25} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <p className="company-name">
                                {job?.company_Name} | {job?.location}
                              </p>
                              <p className="employment-description">
                                {job?.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Modal for Experience Editing */}
                  {isExperienceModalOpen && (
                    <div className="modal-overlay">
                      <div className="modal-box">

                        <div className="modal-header">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <h2 className="edit-about">Add Experience</h2>
                            <button
                              className="fancy-close"
                              onClick={() => setIsExperienceModalOpen(false)}
                              aria-label="Close"
                            ></button>
                          </div>
                        </div>

                        <div>
                          <label className="company-label">Company Name</label>
                          <input
                            type="text"
                            placeholder="Company Name"
                            value={newJob?.company_Name}
                            onChange={(e) => {
                              setNewJob({
                                ...newJob,
                                company_Name: e.target.value,
                              })
                              setModalErrors(prev => prev.filter(err => err.field !== "company_Name"));
                            }
                            }
                            required
                          />
                          {modalErrors.find(e => e.field === "company_Name") && (
                            <p className="error-text">{modalErrors.find(e => e.field === "company_Name").message}</p>
                          )}
                        </div>

                        <div>
                          <label className="company-label">Position</label>
                          <input
                            type="text"
                            placeholder="Position"
                            value={newJob?.title}
                            onChange={(e) => {
                              setNewJob({ ...newJob, title: e.target.value })
                              setModalErrors(prev => prev.filter(err => err.field !== "title"));
                            }
                            }
                            required
                          />
                          {modalErrors.find(e => e.field === "title") && (
                            <p className="error-text">{modalErrors.find(e => e.field === "title").message}</p>
                          )}
                        </div>

                        <div className="start-end-date">
                          <div className="start-date">
                            <label className="company-label">
                              Enter a Start Date
                            </label>
                            <input
                              className="end-date"
                              type="date"
                              placeholder="Enter a Start Date"
                              value={newJob?.JoiningDate}
                              onChange={(e) => {
                                setNewJob({
                                  ...newJob,
                                  JoiningDate: e.target.value,
                                })
                                setModalErrors(prev => prev.filter(err => err.field !== "JoiningDate"));
                              }
                              }
                              required
                            />
                            {modalErrors.find(e => e.field === "JoiningDate") && (
                              <p className="error-text">{modalErrors.find(e => e.field === "JoiningDate").message}</p>
                            )}
                          </div>
                          <div className="end-date">
                            <label className="company-label">
                              Enter a End Date
                            </label>
                            <input
                              className="end-date"
                              type="date"
                              placeholder="Enter a End Date"
                              value={newJob?.endDate}
                              onChange={(e) => {
                                setNewJob({
                                  ...newJob,
                                  endDate: e.target.value,
                                })
                                setModalErrors(prev => prev.filter(err => err.field !== "endDate"));
                              }
                              }
                              required
                            />
                            {modalErrors.find(e => e.field === "endDate") && (
                              <p className="error-text">{modalErrors.find(e => e.field === "endDate").message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="company-label">Location</label>
                          <input
                            type="text"
                            placeholder="Location"
                            value={newJob?.location}
                            onChange={(e) => {
                              setNewJob({
                                ...newJob,
                                location: e.target.value,
                              })
                              setModalErrors(prev => prev.filter(err => err.field !== "location"));
                            }
                            }
                          />
                          {modalErrors.find(e => e.field === "location") && (
                            <p className="error-text">{modalErrors.find(e => e.field === "location").message}</p>
                          )}
                        </div>

                        <div>
                          <label className="company-label">Description</label>
                          <textarea
                            className="discription"
                            placeholder="Description"
                            rows={3}
                            value={newJob?.description}
                            onChange={(e) => {
                              setNewJob({
                                ...newJob,
                                description: e.target.value,
                              })
                              setModalErrors(prev => prev.filter(err => err.field !== "description"));
                            }
                            }
                          />
                          {modalErrors.find(e => e.field === "description") && (
                            <p className="error-text">{modalErrors.find(e => e.field === "description").message}</p>
                          )}
                        </div>

                        <div className="modal-buttons">
                          {editingIndex !== null && (
                            <div
                              type="button"
                              onClick={() => handleDeleteExperience(newJob._id)}
                            >
                              Delete Experience
                            </div>
                          )}
                          <button onClick={handleSave}>
                            {editingIndex !== null ? "Save" : "Add"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Education section */}

                <div className="content-boxes" id="education">
                  <div className="content-boxes-head">
                    <h2>Education</h2>
                    <button
                      className="aboutMe-editBtn"
                      onClick={() => setIsEduModalOpen(true)}
                    >
                      <FiPlus size={30} className="plus-icon" />
                    </button>
                  </div>

                  <div className="education-cards">
                    {educationList.map((edu) => {
                      const duration = formatDateRange(
                        edu?.startDate,
                        edu?.endDate
                      );
                      return (
                        <div className="education-card" key={edu?._id}>
                          <img
                            src={School}
                            alt="Logo"
                            className="college-logo"
                          />
                          <div className="education-info">
                            <h3>{edu?.college}</h3>
                            <p>{edu?.degree}</p>
                            <p className="location">{edu?.location}</p>
                          </div>
                          <div className="education-details">
                            <div className="duration">{duration}</div>
                            <div className="grade">
                              Grade {edu?.grade ?? "Not specified"}
                            </div>
                          </div>
                          <button
                            className="employee-editBtn"
                            style={{ marginTop: "-40px" }}
                            onClick={() => handleEditClick(edu)}
                          >
                            <MdOutlineEdit size={25} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {/* Modal for Education Editing */}
                  {isEduModalOpen && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        {/* <h3>{isEditing ? "Edit Education" : "Add Education"}</h3> */}

                        <div className="modal-header">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <h2 className="edit-about">Education</h2>
                            <button
                              className="fancy-close"
                              onClick={() => {
                                setIsEduModalOpen(false);
                                setIsEditing(false);
                                setEditId(null);
                              }}
                              aria-label="Close"
                            ></button>
                          </div>
                        </div>

                        <div>
                          <label className="company-label">College Name</label>
                          <input
                            type="text"
                            placeholder="College Name"
                            value={newEducation.college}
                            onChange={(e) => {
                              setNewEducation({
                                ...newEducation,
                                college: e.target.value,
                              })
                              setModalErrorsEdu((prev) => prev.filter(err => err.field !== "college"));
                            }
                            }
                          />
                          {modalErrorsEdu.find(e => e.field === 'college') && (
                            <p className="error-text">{modalErrorsEdu.find(e => e.field === 'college').message}</p>
                          )}
                        </div>
                        <div>
                          <label className="company-label">Degree</label>
                          <input
                            type="text"
                            placeholder="Degree"
                            value={newEducation.degree}
                            onChange={(e) => {
                              setNewEducation({
                                ...newEducation,
                                degree: e.target.value,
                              })
                              setModalErrorsEdu((prev) => prev.filter(err => err.field !== "degree"));
                            }
                            }
                          />
                          {modalErrorsEdu.find(e => e.field === 'degree') && (
                            <p className="error-text">{modalErrorsEdu.find(e => e.field === 'degree').message}</p>
                          )}
                        </div>
                        <div>
                          <label className="company-label"> Location</label>
                          <input
                            type="text"
                            placeholder="Location"
                            value={newEducation.location}
                            onChange={(e) => {
                              setNewEducation({
                                ...newEducation,
                                location: e.target.value,
                              })
                              setModalErrorsEdu((prev) => prev.filter(err => err.field !== "location"));
                            }
                            }
                          />
                          {modalErrorsEdu.find(e => e.field === 'location') && (
                            <p className="error-text">{modalErrorsEdu.find(e => e.field === 'location').message}</p>
                          )}
                        </div>

                        <div className="start-end-date">
                          <div className="start-date">
                            <label className="company-label">
                              Enter a Start Date
                            </label>
                            <input
                              className="start-date"
                              type="date"
                              placeholder="Start Date"
                              value={newEducation.startDate}
                              onChange={(e) => {
                                setNewEducation({
                                  ...newEducation,
                                  startDate: e.target.value,
                                })
                                setModalErrorsEdu((prev) => prev.filter(err => err.field !== "startDate"));
                              }
                              }
                            />
                            {modalErrorsEdu.find(e => e.field === 'startDate') && (
                              <p className="error-text">{modalErrorsEdu.find(e => e.field === 'startDate').message}</p>
                            )}
                          </div>

                          <div className="end-date">
                            <label className="company-label">
                              Enter a End Date
                            </label>
                            <input
                              className="end-date"
                              type="date"
                              placeholder="End Date"
                              value={newEducation.endDate}
                              onChange={(e) => {
                                setNewEducation({
                                  ...newEducation,
                                  endDate: e.target.value,
                                })
                                setModalErrorsEdu((prev) => prev.filter(err => err.field !== "endDate"));
                              }
                              }
                            />
                            {modalErrorsEdu.find(e => e.field === 'endDate') && (
                              <p className="error-text">{modalErrorsEdu.find(e => e.field === 'endDate').message}</p>
                            )}
                          </div>
                        </div>

                        <label className="company-label">Grade</label>
                        <input
                          type="text"
                          placeholder="Grade"
                          value={newEducation.grade}
                          onChange={(e) => {
                            setNewEducation({
                              ...newEducation,
                              grade: e.target.value,
                            })
                            setModalErrorsEdu((prev) => prev.filter(err => err.field !== "grade"));
                          }
                          }
                        />
                        {modalErrorsEdu.find(e => e.field === 'grade') && (
                          <p className="error-text">{modalErrorsEdu.find(e => e.field === 'grade').message}</p>
                        )}



                        <div className="modal-actions">
                          {isEditing && (
                            <div
                              // style={{
                              //   backgroundColor: "red",
                              //   color: "white",
                              // }}
                              onClick={() => {
                                handleDeleteEducation(editId);
                                setIsEduModalOpen(false);
                                setIsEditing(false);
                                setEditId(null);
                              }}
                            >
                              Delete Education
                            </div>
                          )}
                          <button
                            onClick={async () => {
                              const { college, degree, location, startDate, endDate, grade } = newEducation;
                              const errs = [];

                              if (!college.trim()) errs.push({ field: "college", message: "College is required." });
                              if (!degree.trim()) errs.push({ field: "degree", message: "Degree is required." });
                              if (!location.trim()) errs.push({ field: "location", message: "Location is required." });
                              if (!startDate) errs.push({ field: "startDate", message: "Start Date is required." });
                              if (!endDate) errs.push({ field: "endDate", message: "End Date is required." });
                              else if (new Date(endDate) < new Date(startDate))
                                errs.push({ field: "endDate", message: "End Date can't be before Start Date." });
                              if (!grade.trim()) errs.push({ field: "grade", message: "Grade is required." });

                              if (errs.length) {
                                setModalErrorsEdu(errs);
                                return;
                              }
                              const educationData = {
                                ...newEducation,
                              };

                              try {
                                if (isEditing) {
                                  const res = await updateEducation(
                                    educationData
                                  );
                                  // Ensure the returned object has _id
                                  console.log(
                                    "Update education response:",
                                    res
                                  );
                                  if (!res || (!res._id && !res.id)) {
                                    alert(
                                      "Failed to update education. Please try again."
                                    );
                                    return;
                                  }
                                  const updatedEdu = {
                                    ...res,
                                    _id: res._id || res.id,
                                  };
                                  setEducationList((prev) =>
                                    prev.map((edu) =>
                                      edu._id === editId ? updatedEdu : edu
                                    )
                                  );
                                } else {
                                  const res = await addEducation(educationData);
                                  setEducationList([
                                    ...educationList,
                                    res.data.result,
                                  ]);
                                }

                                // Reset modal state
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
                              } catch (err) {
                                setModalErrorsEdu([{ field: "general", message: err.message || "Failed to save education." }]);
                              }
                            }}
                          >
                            {isEditing ? "Save" : "Save"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project section */}
                <div className="content-boxes" id="projects">
                  <div className="content-boxes-head">
                    <h2>Projects</h2>
                    <button
                      className="aboutMe-editBtn"
                      onClick={() => handleAddEditClick()}
                    >
                      <FiPlus size={30} className="plus-icon" />
                    </button>
                  </div>
                  <div className="education-cards">
                    {projects.map((proj, index) => {
                      const duration = formatDateRange(
                        proj?.startDate,
                        proj?.endDate
                      );

                      return (
                        <div className="project-card" key={index}>
                          <img
                            src={proj?.image || School}
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
                              <h3>{proj?.title}</h3>
                              <p className="duration">{duration}</p>
                            </div>
                            <p className="project-associated">
                              {proj?.associated}
                            </p>
                            <p className="project-description">
                              {proj?.projectDescription}
                            </p>
                          </div>
                          <div className="project-actions">
                            <button
                              onClick={() => handleAddEditClick(proj, index)}
                            >
                              <MdOutlineEdit size={25} />
                            </button>
                            {/* <button onClick={() => handleDelete(index)}>Delete</button> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {showModal && (
                    <div className="modal-overlay">
                      <form
                        className="modal-content"
                        onSubmit={handleFormSubmit}
                      >
                        <div className="modal-header">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <h2 className="edit-about">Add Project</h2>
                            <button
                              className="fancy-close"
                              onClick={() => setShowModal(false)}
                              aria-label="Close"
                            ></button>
                          </div>
                        </div>

                        <div>
                          <label className="company-label">Title</label>
                          <input
                            type="text"
                            placeholder="Title"
                            value={formProjectData.title}
                            onChange={(e) => {
                              setFormProjectData({
                                ...formProjectData,
                                title: e.target.value,
                              })
                              setModalErrorsProj(prev => prev.filter(err => err.field !== "title"));
                            }
                            }

                          />
                          {modalErrorsProj.find(e => e.field === "title") && (
                            <p className="error-text">{modalErrorsProj.find(e => e.field === "title").message}</p>
                          )}
                        </div>

                        <div className="start-end-date">
                          <div className="start-date">
                            <label className="company-label">
                              Enter a Start Date
                            </label>
                            <input
                              className="start-date"
                              type="date"
                              placeholder="startDate"
                              value={formProjectData.startDate}
                              onChange={(e) => {
                                setFormProjectData({
                                  ...formProjectData,
                                  startDate: e.target.value,
                                })
                                setModalErrorsProj(prev => prev.filter(err => err.field !== "startDate"));
                              }
                              }
                            />
                            {modalErrorsProj.find(e => e.field === "startDate") && (
                              <p className="error-text">{modalErrorsProj.find(e => e.field === "startDate").message}</p>
                            )}
                          </div>

                          <div className="end-date">
                            <label className="company-label">
                              Enter a End Date
                            </label>
                            <input
                              className="end-date"
                              type="date"
                              placeholder="EndDate"
                              value={formProjectData.endDate}
                              onChange={(e) => {
                                setFormProjectData({
                                  ...formProjectData,
                                  endDate: e.target.value,
                                })
                                setModalErrorsProj(prev => prev.filter(err => err.field !== "endDate"));
                              }
                              }
                            />
                            {modalErrorsProj.find(e => e.field === "endDate") && (
                              <p className="error-text">{modalErrorsProj.find(e => e.field === "endDate").message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="company-label">
                            Associated With
                          </label>
                          <input
                            type="text"
                            placeholder="Associated With"
                            value={formProjectData.associated}
                            onChange={(e) => {
                              setFormProjectData({
                                ...formProjectData,
                                associated: e.target.value,
                              })
                              setModalErrorsProj(prev => prev.filter(err => err.field !== "associated"));
                            }
                            }

                          />
                          {modalErrorsProj.find(e => e.field === "associated") && (
                            <p className="error-text">{modalErrorsProj.find(e => e.field === "associated").message}</p>
                          )}
                        </div>

                        <div>
                          <label className="company-label">Description</label>
                          <textarea
                            placeholder="Description"
                            value={formProjectData.projectDescription}
                            onChange={(e) => {
                              setFormProjectData({
                                ...formProjectData,
                                projectDescription: e.target.value,
                              })
                              setModalErrorsProj(prev => prev.filter(err => err.field !== "projectDescription"));
                            }
                            }

                          />
                          {modalErrorsProj.find(e => e.field === "projectDescription") && (
                            <p className="error-text">{modalErrorsProj.find(e => e.field === "projectDescription").message}</p>
                          )}
                        </div>


                        <div className="modal-buttons">
                          {editIndex !== null && formProjectData._id && (
                            <div
                              type="button"

                              onClick={() =>
                                handleDeleteProject(formProjectData._id)
                              }
                            >
                              Delete Project
                            </div>
                          )}
                          <button type="submit">
                            {editIndex !== null ? "Update" : "Add"}
                          </button>

                        </div>
                      </form>
                    </div>
                  )}
                </div>

                {/* Certificate and lincences section */}
                <div className="content-boxes" id="certifications">
                  <div className="content-boxes-head">
                    <h2>Licenses & Certifications</h2>
                    <button
                      className="aboutMe-editBtn"
                      onClick={() => handleAddEditLicensesClick()}
                    >
                      <FiPlus size={30} className="plus-icon" />
                    </button>
                  </div>

                  <div className="education-cards">
                    {certifications.map((cert, index) => (
                      <div className="license-card" key={index}>
                        <img
                          src={cert?.image || Course}
                          alt="Certification Logo"
                          className="license-logo"
                        />
                        <div className="license-info">
                          <h3>{cert?.courses}</h3>
                          <p className="issuer">{cert?.company_Name}</p>
                          <p className="issued">
                            Issued {formatDate(cert?.issued_Date)}
                            {cert?.endDate
                              ? ` · Expires ${formatDate(cert.endDate)}`
                              : " · No Expiration Date"}
                          </p>
                        </div>
                        <a
                          href={cert?.certificateUrl} // Replace with your actual URL variable
                          target="_blank"
                          rel="noopener noreferrer"
                          className="show-credential-button"
                        >
                          Show credential
                        </a>

                        <div className="project-actions">
                          <button
                            onClick={() =>
                              handleAddEditLicensesClick(cert, index)
                            }
                          >
                            <MdOutlineEdit size={25} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {showLicensesModal && (
                    <div className="modal">
                      <form
                        className="modal-form"
                        onSubmit={handleFormLicensesSubmit}
                      >

                        <div className="modal-header">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <h2 className="edit-about">Add Certification</h2>
                            <button
                              className="fancy-close"
                              onClick={() => setShowLicensesModal(false)}
                              aria-label="Close"
                            ></button>
                          </div>
                        </div>

                        <input
                          type="text"
                          placeholder="Certification Title"
                          value={formLicensesData.title}
                          onChange={(e) => {
                            setFormLicensesData(prev => ({ ...prev, title: e.target.value }));
                            setModalErrorsLic(prev => prev.filter(err => err.field !== "title"));
                          }}

                        />
                        {modalErrorsLic.find(e => e.field === "title") && (
                          <p className="error-text">{modalErrorsLic.find(e => e.field === "title").message}</p>
                        )}
                        <input
                          type="text"
                          placeholder="Issuer"
                          value={formLicensesData.issuer}
                          onChange={(e) => {
                            setFormLicensesData(prev => ({ ...prev, issuer: e.target.value }));
                            setModalErrorsLic(prev => prev.filter(err => err.field !== "issuer"));
                          }}

                        />
                        {modalErrorsLic.find(e => e.field === "issuer") && (
                          <p className="error-text">{modalErrorsLic.find(e => e.field === "issuer").message}</p>
                        )}
                        <input
                          type="date"
                          placeholder="Issued Date"
                          value={formLicensesData.issuedDate}
                          onChange={(e) => {
                            setFormLicensesData(prev => ({ ...prev, issuedDate: e.target.value }));
                            setModalErrorsLic(prev => prev.filter(err => err.field !== "issuedDate"));
                          }}

                        />
                        {modalErrorsLic.find(e => e.field === "issuedDate") && (
                          <p className="error-text">{modalErrorsLic.find(e => e.field === "issuedDate").message}</p>
                        )}

                        <input
                          type="url"
                          placeholder="Credential Link"
                          value={formLicensesData.credentialUrl}
                          onChange={(e) => {
                            setFormLicensesData(prev => ({ ...prev, credentialUrl: e.target.value }));
                            setModalErrorsLic(prev => prev.filter(err => err.field !== "credentialUrl"));
                          }}
                        />
                        {modalErrorsLic.find(e => e.field === "credentialUrl") && (
                          <p className="error-text">{modalErrorsLic.find(e => e.field === "credentialUrl").message}</p>
                        )}

                        <div className="modal-buttons">
                          <button type="submit">
                            {editIndexLicenses !== null ? "Update" : "Add"}
                          </button>
                          {editIndexLicenses !== null &&
                            formLicensesData._id && (
                              <button
                                type="button"
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                                onClick={() =>
                                  handleDeleteLicenses(formLicensesData._id)
                                }
                              >
                                Delete
                              </button>
                            )}
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpProfPage;
