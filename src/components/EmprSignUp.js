import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";



const EmprSignUp = () => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    otp: "",
    fullname: "",
    companyName: "",
    email: "",
    state: "",
    currentRole: "",
    city: "",
    location: [],
    otpVerified: false,
    termsAccepted: false,
  });

  const [verificationId, setVerificationId] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [errors, setErrors] = useState([]);
  const [messages, setMessages] = useState([]);

  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const navigate = useNavigate();

 const handleChange = (e) => {
  const { name, type, checked, files, value } = e.target;
  const newValue = type === "checkbox"
    ? checked
    : type === "file"
    ? files[0]
    : value;

  setFormData(prev => ({
    ...prev,
    [name]: newValue,
  }));

  // Clear existing error or success message for this field
  setErrors(prev => prev.filter(err => err.field !== name));
  setMessages(prev => prev.filter(msg => msg.field !== name));
};



  const sendOtp = async () => {

     if (!validateSendOtp()) return;
    if (!formData.mobileNumber) {
      return;
    }
    setMessages([]);
    setErrors([]);
    setLoadingSendOtp(true);

    try {
      const response = await axios.post(
        `${baseUrl}/employer/mobileNumberVerificationSendOtp`,
        {
          mobileNumber: formData.mobileNumber,
          isForLogin: 0,
        }
      );
      if (response.data.status === 200) {
        setIsOtpSent(true);
        setVerificationId(response.data.result);
         setMessages([{ field: 'mobileNumber', message: 'OTP sent successfully to your registered mobile.' }])
      } else {
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
    } finally {
      setLoadingSendOtp(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!validateVerifyOtp()) return;
    if (!formData.otp) {
      return;
    }
    setMessages([]);
    setErrors([]);
    setLoadingVerify(true);
   

    try {
      const response = await axios.post(
        `${baseUrl}/employer/mobileNumberVerificationSetup`,
        {
          id: verificationId,
          otp: formData.otp,
        }
      );

      if (response.data.status === 200) {
        setFormData((prev) => ({ ...prev, otpVerified: true }));
         setMessages([{ field: 'otp', message: 'OTP verified!' }])
      } else {
        setErrors([{field:'otp', message:response.data.message}]);
      }
    } catch (error) {
      setErrors([{
        field: 'otp',
        message : error.response.data.message || "Something went wrong",
      }]
      );
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleSubmit = async (e) => {
     if (!validateRegister()) return;
    e.preventDefault();
    setLoadingRegister(true);
    setErrors([]);

    if (!formData.otpVerified) {
      setLoadingRegister(false);
      return;
    }

    if (!formData.termsAccepted) {
      setLoadingRegister(false);
      return;
    }

    if (!formData.fullname || !formData.email || !formData.companyName) {
      setLoadingRegister(false);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/employer/register`, {
        email: formData.email,
        name: formData.fullname,
        contactNumber: formData.mobileNumber,
        companyName: formData.companyName,
        location: formData.location,
        state: formData.state,
        city: formData.location, // Assuming location is the city
        designationName: formData.currentRole,
      });

      if (response.data.status === 200) {
        alert("User registered successfully!");
        console.log(response.data.result);

        navigate("/signin?role=company");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
     console.log("error")
    } finally {
      setLoadingRegister(false);
    }
  };

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
    if (!formData.fullname) {
      errs.push({ field: "fullname", message: "Name is required" });
    }
    if (!formData.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      errs.push({ field: "email", message: "Enter a valid email address" });
    }
    if(!formData.mobileNumber){
      errs.push({ field: "mobileNumber", message: "mobile Number is required" });
    }
    if(!formData.otp){
      errs.push({ field: "otp", message: "otp is required" });
    }
    if(!formData.state){
      errs.push({ field: "state", message: "State is required" });
    }
    if(!formData.location){
      errs.push({ field: "location", message: "City is required" });
    }
     if(!formData.city){
      errs.push({ field: "city", message: "City is required" });
    }
    if(!formData.companyName){
      errs.push({ field: "companyName", message: "companyName is required" });
    }
    if(!formData.currentRole){
      errs.push({ field: "currentRole", message: "currentRole is required" });
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

  return (
    <>
      <div className="signUpform">
        <div className="formCols">
          <div className="formColOne">
            <div className="signUpform-emp">
              <div className="signUpform-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Your Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                 {getError("fullname") && <p className="error-text">{getError("fullname")}</p>}
              </div>

              <div className="signUpform-group">
                <label htmlFor="mobile">Mobile Number</label>
                <div className="send-otp no-spinner">
                  <input
                    type="tel"
                    id="mobile"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleChange({ target: { name: 'mobileNumber', value: cleaned } });
                    }}
                    disabled={isOtpSent}
                    maxLength={10}
                    pattern="\d{10}"
                    inputMode="numeric"
                  />

                  <button type="button" onClick={sendOtp} disabled={loadingSendOtp}>
                    {loadingSendOtp ? "Sending OTP..." : "Send OTP"}
                  </button>
                </div>
                {getError("mobileNumber") && <p className="error-text">{getError("mobileNumber")}</p>}
                 {!getError('mobileNumber') && getSuccess('mobileNumber') && (
          <p className="success-text">{getSuccess('mobileNumber')}</p>
        )}
              </div>

              <div className="signUpform-group">
                <label htmlFor="currentrole">Your Current Role</label>
                <input
                  type="text"
                  id="currentrole"
                  name="currentRole"
                  placeholder="Your Current Role"
                  value={formData.currentRole}
                  onChange={handleChange}
                />
                {getError("currentRole") && <p className="error-text">{getError("currentRole")}</p>}
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
            </div>
          </div>

          <div className="formColTwo">
            <div className="signUpform-emp">
              <div className="signUpform-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {getError("email") && <p className="error-text">{getError("email")}</p>}
              </div>

              <div className="signUpform-group">
                <label htmlFor="verify-otp">OTP</label>
                <div className="send-otp">
                  <input
                    type="password"
                    id="verify-otp"
                    name="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                  />
                  <button type="button" onClick={verifyOtp} disabled={loadingVerify}>
                    {loadingVerify ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                </div>
                  {getError("otp") && <p className="error-text">{getError("otp")}</p>}
                 {!getError('otp') && getSuccess('otp') && (
          <p className="success-text">{getSuccess('otp')}</p>
        )}
              </div>

              {/* <div className="signUpform-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div> */}

              <div className="signUpform-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
                {getError("companyName") && <p className="error-text">{getError("companyName")}</p>}
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
                <label htmlFor="companysize">Company Size</label>
                <input
                  type="text"
                  id="companysize"
                  name="companySize"
                  placeholder="Company Size"
                  value={formData.companySize}
                  onChange={handleChange}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div className="terms-section">
          <input
            type="checkbox"
            id="terms"
            checked={formData.termsAccepted}
            onChange={(e) =>
              setFormData({ ...formData, termsAccepted: e.target.checked })
            }
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
          <div className="register-btns">
            <button type="submit" onClick={handleSubmit} disabled={loadingRegister}>
              {loadingRegister ? "Registering..." : "Register Now"}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default EmprSignUp;

// import React from "react";

// const EmprSignUp = () => {
//   return (
//     <>
//       <div className="signUpform">
//         <div className="formCols">
//           <div className="formColOne">
//             <div className="signUpform-emp">
//               <div className="signUpform-group">
//                 <label htmlFor="name">Full Name</label>
//                 <input type="text" id="fullname" placeholder="Your Full Name" />
//               </div>

//               <div className="signUpform-group">
//                 <label htmlFor="mobile">Mobile Number</label>
//                 <div className="send-otp no-spinner">
//                   <input
//                     type="number"
//                     id="mobile"
//                     placeholder="Mobile Number"
//                   />
//                   <button>Send OTP</button>
//                 </div>
//               </div>
//               <div className="signUpform-group">
//                 <label htmlFor="mobile">OTP</label>
//                 <div className="send-otp">
//                   <input
//                     type="password"
//                     id="verify-otp"
//                     placeholder="Enter OTP"
//                   />
//                   <button>Verify OTP</button>
//                 </div>
//               </div>
//               <div className="signUpform-group">
//                 <label htmlFor="name">Your Current role</label>
//                 <input
//                   type="text"
//                   id="currentrole"
//                   placeholder="Your Current Role"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="formColTwo">
//             <div className="signUpform-emp">
//               <div className="signUpform-group">
//                 <label htmlFor="companyname">Company Name</label>
//                 <input type="text" id="company" placeholder="Company Name" />
//               </div>

//               <div className="signUpform-group">
//                 <label htmlFor="email">Email</label>
//                 <div className="send-otp">
//                   <input type="email" id="email" placeholder="Email" />
//                 </div>
//               </div>
//               <div className="signUpform-group">
//                 <label htmlFor="location">Location</label>
//                 <div className="send-otp">
//                   <input type="text" id="location" placeholder="Location" />
//                 </div>
//               </div>
//               <div className="signUpform-group">
//                 <label htmlFor="name">Company Size</label>
//                 <input
//                   type="text"
//                   id="companysize"
//                   placeholder="Company Size"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="register-btn">
//           <div className="register-btns">
//             <button>Register Now</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EmprSignUp;
