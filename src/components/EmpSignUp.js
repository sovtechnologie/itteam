import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import "../stylesheets/EmpSignUp.css";

const BASE_URL = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const EmpSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpReceive, setIsOtpReceive] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    otp: "",
    email: "",
    location: "",
    experience: "",
    gender: "",
    workStatus: "",
    otpVerified: false,
    userId: "",
    resume: null,
    termsAccepted: false,
  });

  const options = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const sendOtp = async () => {
    if (!formData.mobileNumber) {
      alert("Please enter a mobile number");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/mobileNumberVerificationSendOtp`,
        {
          mobileNumber: formData.mobileNumber,
          isForLogin: 0,
        }
      );

      if (response.data.status === 200) {
        alert(response.data.message);
        setIsOtpSent(true)
        setFormData((prev) => ({
          ...prev,
          userId: response.data.result,
        }));
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP");
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    if (!formData.otp) {
      alert("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/mobileNumberVerificationSetup`,
        {
          mobileNumber: formData.mobileNumber,
          otp: formData.otp,
          id: formData.userId,
        }
      );

      if (response.data.status === 200) {
        alert("OTP Verified Successfully");
        setIsOtpReceive(true);
        setFormData((prev) => ({ ...prev, otpVerified: true }));
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("OTP verification failed");
    }
    setLoading(false);
  };

  const registerUser = async () => {

    if (!formData.termsAccepted) {
      alert("Please accept terms and conditions.");
      return;
    }
    if (!formData.otpVerified) {
      alert("Please verify OTP first");
      return;
    }
    if (!formData.fullName || !formData.email || !formData.resume || !formData.gender) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("mobileNumber", formData.mobileNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("experienceInStack", formData.experience);
      formDataToSend.append("workStatus", formData.workStatus);
      formDataToSend.append("termsAccepted", formData.termsAccepted);

      if (formData.resume) {
        formDataToSend.append("resume", formData.resume); // resume must be a File object
      }

      const response = await axios.post(`${BASE_URL}/api/register`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      if (response.data.status === 200) {
        alert("Registration successful! You can login now...");
        navigate("/signin?role=candidate");

        console.log(response.data.result);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/getAllUserDetails`, {
        params: { userId: formData.userId },
      });

      if (response.data.status === 200) {
        const result = response.data.result;
        setFormData((prev) => ({
          ...prev,
          fullName: result.name,
          email: result.email,
          location: result.location,
          experience: result.experienceInStack,
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (formData.userId) {
      fetchUserData();
    }
  }, [formData.userId]);


  return (
    <>
      <div className="signUpform">
        <div className="formCols">
          <div className="formColOne">
            <div className="signUpform-emp">
              <div className="signUpform-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  name="fullName"
                  placeholder="Your Full Name"
                  onChange={handleChange}
                />
              </div>
              <div className="signUpform-group">
                <label htmlFor="mobile">Mobile Number</label>
                <div className="send-otp">
                  <input
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                    disabled={isOtpSent}
                  />
                  <button onClick={sendOtp}>Send OTP</button>
                </div>
              </div>
              <div className="signUpform-group">
                <label htmlFor="verify-otp">OTP</label>
                <div className="send-otp">
                  <input
                    name="otp"
                    placeholder="Enter OTP"
                    onChange={handleChange}
                    disabled={isOtpReceive}
                  />
                  <button onClick={verifyOtp}>Verify OTP</button>
                </div>
              </div>
              <div className="signUpform-group">
                <label htmlFor="workStatus">Work Status</label>
                <div className="radio-group" style={{ display: 'flex', gap: '20px', marginTop: '0px' }}>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="experience"
                      name="workStatus"
                      value="experience"
                      onChange={handleChange}
                      checked={formData.workStatus === "experience"}
                      className="custom-radio"

                    />
                    <label htmlFor="experience" style={{ marginLeft: '8px' }}>Experience</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="fresher"
                      name="workStatus"
                      value="fresher"
                      onChange={handleChange}
                      checked={formData.workStatus === "fresher"}
                      className="custom-radio"
                    />
                    <label htmlFor="fresher" style={{ marginLeft: '8px' }}>Fresher</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="formColTwo">
            <div className="signUpform-emp">
              <div className="signUpform-group">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="signUpform-group">
                <label htmlFor="location">Location</label>
                <input
                  name="location"
                  placeholder="Location"
                  onChange={handleChange}
                />
              </div>
              <div className="signUpform-group">
                <label htmlFor="experience">Experience</label>
                <input
                  name="experience"
                  placeholder="Experience"
                  onChange={handleChange}
                />
              </div>

              {/* <div className="signUpform-emp dropdown-main">
                <div className="dropdown">
                  <label htmlFor="isImmediateJoiner">
                    How soon can you join
                  </label>{" "}
                  <br />
                  <select
                    className="form-select"
                    name="noticePeriod"
                    onChange={handleChange}
                    value={formData.noticePeriod}
                  >
                    {immediate.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

              <div className="signUpform-emp dropdown-main dropdown-optns">
                <div className="dropdown">
                  <label htmlFor="">Gender</label> <br />
                  <select
                    className="form-select"
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="upload-section">
          <label>Upload Resume</label>
          <div className="upload-box">
            <FiUpload
              style={{
                marginRight: "10px",
                fontSize: "20px",
                color: "#1783D0",
              }}
            />
            <span>Upload your Resume here</span>
            <input
              type="file"
              name="resume"
              onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
            />
             
          </div>
        </div> */}
        <div className="upload-box" onClick={() => document.getElementById("resumeInput").click()}>
          {!formData.resume && (
            <FiUpload
              style={{
                marginRight: "10px",
                fontSize: "20px",
                color: "#1783D0",
              }}
            />
          )}
          <span>{formData.resume?.name || "Upload your Resume here"}</span>
          <input
            id="resumeInput"
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
          />
        </div>

        <div className="terms-section">
          <input
            type="checkbox"
            id="terms"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
          />
          <label htmlFor="terms">
            I accept all{" "}
            <a href="/terms&condition" target="_blank" rel="noopener noreferrer" className="highlight" style={{ textDecorationLine: "none" }}>
              terms and condition
            </a>
          </label>

        </div>
        <div className="register-btn">
          <button onClick={registerUser} disabled={loading}>
            {loading ? "Registering..." : "Register Now"}
          </button>
          {loading && <p className="loading">Processing...</p>}
        </div>

      </div>
    </>
  );
};

export default EmpSignUp;
