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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendOtp = async () => {
    setLoading(true);
    setError(null);

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
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    setError(null);

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
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.termsAccepted) {
      alert("Please accept terms and conditions.");
      return;
    }
    if (!formData.otpVerified) {
      alert("Please verify OTP first");
      return;
    }
    if (!formData.fullname || !formData.email || !formData.companyName) {
      alert("Please fill in all required fields.");
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
        setError(response.data.message);
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
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
              </div>

              <div className="signUpform-group">
                <label htmlFor="mobile">Mobile Number</label>
                <div className="send-otp no-spinner">
                  <input
                    type="number"
                    id="mobile"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    disabled={isOtpSent}
                  />
                  <button type="button" onClick={sendOtp} disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </div>
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
              </div>

              <div className="signUpform-group">
                <label htmlFor="state">State</label>
                <select
                  name="state"
                  value={formData.state || ""}
                  onChange={(e) => {
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
                  <button type="button" onClick={verifyOtp} disabled={loading}>
                    {loading ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                </div>
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
        <div className="register-btn">
          <div className="register-btns">
            <button type="submit" onClick={handleSubmit}>
              {loading ? "Registering..." : "Register Now"}
            </button>
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
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
