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
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [errors, setErrors] = useState([]);
  const [messages,setMessages] = useState([]);
  const [registerLoading,setRegisterLoading]  = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    otp: "",
    email: "",
    location: "",
    state: "",
    experience: "",
    gender: "",
    workStatus: "",
    otpVerified: false,
    userId: "",
    resume: null,
    termsAccepted: false,
  });

 
const handleChange = (e) => {
  const { name, type, files, checked, value } = e.target;
  let newValue;

  if (type === "checkbox") {
    newValue = checked;
  } else if (type === "file") {
    newValue = files[0];
  } else {
    newValue = value;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));

  // Clear error for this specific field
  setErrors((prev) => prev.filter((err) => err.field !== name));
};



  const sendOtp = async () => {
     if (!validateSendOtp()) return;
    if (!formData.mobileNumber) {
      return;
    }
    setLoading(true);
    setMessages([]);
    setErrors([]);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/mobileNumberVerificationSendOtp`,
        {
          mobileNumber: formData.mobileNumber,
          isForLogin: 0,
        }
      );

      if (response.data.status === 200) {
        setIsOtpSent(true);
        setFormData((prev) => ({
          ...prev,
          userId: response.data.result,
        }));
        setMessages([{ field: 'mobileNumber', message: 'OTP sent successfully to your registered mobile.' }])
      }
      else if(response.data.status === 404){
        setErrors([
          {
            field: "mobileNumber",
            message: response.data.message || "Failed to send OTP",
          },
        ]);
      }
    } catch (error) {
      setErrors([
        {
          field: "mobileNumber",
          message: error.message || "Something went wrong.",
        },
      ]);
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
     if (!validateVerifyOtp()) return;
    if (!formData.otp) {
      return;
    }

    setLoading(true);
    setMessages([]);
    setErrors([]);
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
        setIsOtpReceive(true);
        setIsOtpSent(false);
        setFormData((prev) => ({ ...prev, otpVerified: true }));
        setMessages([{ field: 'otp', message: 'OTP verified!' }])
      }
      else{
        setErrors([{ field:"otp",message:response.data.message}])
      }
    } catch (error) {
      if(error.status === 400){
        setErrors([{ field:"otp",message:"Otp Not Matched"}])
        setIsOtpSent(false);
      }
      else{
        setErrors([{ field:"otp",message:error.message}])
      }
      
    }
    setLoading(false);
  };

  const registerUser = async () => {
     if (!validateRegister()) return;
    if (!formData.termsAccepted) {
      alert("Please accept terms and conditions.");
      return;
    }
    if (!formData.otpVerified) {
      alert("Please verify OTP first");
      return;
    }
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.resume ||
      !formData.gender
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setRegisterLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("mobileNumber", formData.mobileNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("experienceInStack", formData.experience);
      formDataToSend.append("Job_type", Number(formData.workStatus));
      formDataToSend.append("termsAccepted", formData.termsAccepted);

      if (formData.resume) {
        formDataToSend.append("resume", formData.resume); // resume must be a File object
      }

      const response = await axios.post(
        `${BASE_URL}/api/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        navigate("/signin?role=candidate");

        console.log(response.data.result);
      } else {
        console.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }finally{
     setRegisterLoading(false);
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
    axios
      .get(`${BASE_URL}/withOutLogin/get-state-list`, {
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
        .post(`${BASE_URL}/withoutLogin/getCityList`, {
          stateName: selectedStateCode,
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

  // validation
  const validateSendOtp = () => {
  const errs = [];
  if (!/^\d{10}$/.test(formData.mobileNumber)) {
    errs.push({ field: "mobileNumber", message: "Enter a valid 10-digit mobile number" });
  }
  setErrors(errs);
  return errs.length === 0;
};

const validateVerifyOtp = () => {
  const errs = [];
  if (!formData.otp) {
    errs.push({ field: "otp", message: "Enter the OTP received" });
  }
  setErrors(errs);
  return errs.length === 0;
};

const validateRegister = () => {
  const errs = [];
  if (!formData.fullName) {
    errs.push({ field: "fullName", message: "Name is required" });
  }
  if (!formData.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    errs.push({ field: "email", message: "Enter a valid email address" });
  }
  if (!formData.resume) {
    errs.push({ field: "resume", message: "Resume is required" });
  }
  if (!formData.gender) {
    errs.push({ field: "gender", message: "Gender is required" });
  }
   if (!formData.mobileNumber) {
    errs.push({ field:"mobileNumber", message: "mobile Number is required" });
  }
   if (!formData.otp) {
    errs.push({ field:"otp", message: "otp is required" });
  }
  if(!formData.state){
     errs.push({ field: "state", message: "State is required" });
  }
   if(!formData.location){
     errs.push({ field: "location", message: "city is required" });
  }
   if(!formData.workStatus){
     errs.push({ field: "workStatus", message: "Workmode is required" });
  }
   if(!formData.experience){
     errs.push({ field: "experience", message: "Experience is required" });
  }
  if (!formData.termsAccepted) {
    errs.push({ field: "termsAccepted", message: "You must accept terms" });
  }
  setErrors(errs);
  return errs.length === 0;
};

const getError = (field) => errors.find((e) => e.field === field)?.message;
  const getSuccess = (field) =>
    messages.find((s) => s.field === field)?.message || '';

 useEffect(() => {
    if (messages) {
      const timer = setTimeout(() => setMessages([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

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
                {getError("fullName") && <p className="error-text">{getError("fullName")}</p>}
              </div>
              <div className="signUpform-group">
                <label htmlFor="mobile">Mobile Number</label>
                <div className="send-otp">
                  <input
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    maxLength={10}
                    minLength={10}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onChange={handleChange}
                    disabled={isOtpSent}
                  />
                  
                  <button onClick={sendOtp} disabled={isOtpSent}>Send OTP</button>
                </div>
                {getError("mobileNumber") && <p className="error-text">{getError("mobileNumber")}</p>}
                 {!getError('mobileNumber') && getSuccess('mobileNumber') && (
          <p className="success-text">{getSuccess('mobileNumber')}</p>
        )}
              </div>

              <div className="signUpform-group">
                <label htmlFor="state">State</label>
                <select
                  name="state"
                  value={formData.state || ""}
                  onChange={(e) => {
                    handleChange(e);
                    const selected = statesList.find(
                      (state) => (state.name || state) === e.target.value
                    );
                    setFormData((prev) => ({ ...prev, state: e.target.value }));
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
                {getError("state") && <p className="error-text">{getError("state")}</p>}
              </div>

              <div className="signUpform-group">
                <label htmlFor="workStatus">Work Mode</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="WFO"
                      name="workStatus"
                      value="1"
                      onChange={handleChange}
                      checked={formData.workStatus === "1"}
                      className="custom-radio"
                    />
                    <label
                      htmlFor="W.F.O"
                      style={{ marginLeft: "8px", marginBottom: "0px" }}
                    >
                      W.F.O
                    </label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="Remote"
                      name="workStatus"
                      value="2"
                      onChange={handleChange}
                      checked={formData.workStatus === "2"}
                      className="custom-radio"
                    />
                    <label htmlFor="Remote" style={{ marginLeft: "8px" }}>
                      Remote
                    </label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="Hybrid"
                      name="workStatus"
                      value="3"
                      onChange={handleChange}
                      checked={formData.workStatus === "3"}
                      className="custom-radio"
                    />
                    <label htmlFor="Hybrid" style={{ marginLeft: "8px" }}>
                      Hybrid
                    </label>
                  </div>
                </div>
                {getError("workStatus") && <p className="error-text">{getError("workStatus")}</p>}
              </div>

              <div className="signUpform-group">
                <label htmlFor="gender">Gender</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                      checked={formData.gender === "male"}
                      className="custom-radio"
                    />
                    <label htmlFor="male" style={{ marginLeft: "8px" }}>
                      Male
                    </label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                      checked={formData.gender === "female"}
                      className="custom-radio"
                    />
                    <label htmlFor="female" style={{ marginLeft: "8px" }}>
                      Female
                    </label>
                  </div>
                </div>
                {getError("gender") && <p className="error-text">{getError("gender")}</p>}
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
                 {getError("email") && <p className="error-text">{getError("email")}</p>}
              </div>

              <div className="signUpform-group">
                <label htmlFor="verify-otp">OTP</label>
                <div className="send-otp">
                  <input
                  type="password"
                    name="otp"
                    placeholder="Enter OTP"
                    onChange={handleChange}
                    disabled={isOtpReceive}
                    maxLength={6}
                  />
                   
                  <button onClick={verifyOtp}>Verify OTP</button>
                </div>
                {getError("otp") && <p className="error-text">{getError("otp")}</p>}
                 {!getError('otp') && getSuccess('otp') && (
          <p className="success-text">{getSuccess('otp')}</p>
        )}
              </div>

              <div className="signUpform-group">
                <label htmlFor="location">City</label>
                <select
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  className="form-select"
                  disabled={!selectedState}
                >
                  <option value="">Select City</option>
                  {citiesList.map((city) => (
                    <option
                      key={city._id || city.id || city.name || city}
                      value={city.name || city}
                    >
                      {city.name || city}
                    </option>
                  ))}
                </select>
                {getError("location") && <p className="error-text">{getError("location")}</p>}
              </div>
              {/* <div className="signUpform-group">
                <label htmlFor="location">City</label>
                <input
                  name="location"
                  placeholder="Select City"
                  onChange={handleChange}
                />
              </div> */}

              <div className="signUpform-group">
                <label htmlFor="experience">Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Experience</option>
                  <option value="1">Fresher</option>
                  <option value="2">Junior</option>
                  <option value="3">Mid-level</option>
                  <option value="4">Senior</option>
                </select>
                {getError("experience") && <p className="error-text">{getError("experience")}</p>}
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

              {/* <div className="signUpform-emp dropdown-main dropdown-optns">
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
              </div> */}
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
        <div
          className="upload-box"
          onClick={() => document.getElementById("resumeInput").click()}
        >
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
            onChange={handleChange}
            
          />
        </div>
         {getError("resume") && <p className="error-text">{getError("resume")}</p>}

        <div className="terms-section">
          <input
            type="checkbox"
            id="terms"
            checked={formData.termsAccepted}
            onChange={(e) =>
            {
              setFormData({ ...formData, termsAccepted: e.target.checked })
              setErrors((prev) => prev.filter((err) => err.field !== "termsAccepted"));
            }
            }
            // onChange={handleChange}
          />
          <label htmlFor="terms">
            I accept all{" "}
            <a
              href="/terms&condition"
              target="_blank"
              rel="noopener noreferrer"
              className="highlight"
              style={{ textDecorationLine: "none" }}
            >
              terms and condition
            </a>
          </label>
        </div>
        {getError("termsAccepted") && <p className="error-text">{getError("termsAccepted")}</p>}
        <div className="register-btn">
          <button onClick={registerUser} disabled={loading}>
            {registerLoading ? "Registering..." : "Register Now"}
          </button>
          {registerLoading && <p className="loading">Processing...</p>}
        </div>
      </div>
    </>
  );
};

export default EmpSignUp;
