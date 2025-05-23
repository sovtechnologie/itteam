import React, { useState, useEffect } from "react";
import "../stylesheets/SignUp.css";
import signUpEmp from "../images/signupFromImg.png";
import illustration from "../images/SignupImg.png"
import EmprSignUp from "./EmprSignUp"; // For company register
import EmpSignUp from "./EmpSignUp";  // For candidate register

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState("candidate"); // Default role

  useEffect(() => {
    // Extract the 'role' from the query string (either 'candidate' or 'company')
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <div className="signup-box">
      <div className="signup-container">
        <div className="leftBox">
          {/* {isLogin ? (
            <div className="signup-left">
              <h1>Finding top talent from India is like finding a needle in a haystack</h1>
              <p>We're excited to introduce and show you how <br />our platform simplifies hiring</p>
              <p className="login-prompt" style={{ marginTop: "70px" }}>
                Already Registered? <a href="#">Login here</a>
              </p>
              <img src={illustration} alt="Signup" />
            </div>
          ) : ( */}
          <div className="signup-left">
            {userRole === "company" ? (
              <>
                <div className="benefits-section">
                  <h1>Finding top talent from India is<br /> like finding a needle in a<br /> haystack</h1>
                  <p>We're excited to introduce and show you how <br />our platform simplifies hiring</p>
                </div>
              </>
            ) : (
              <div className="benefits-section">
                <h1>On registering, you can</h1>
                <ul>
                  <li>Build your profile and let recruiters find you</li>
                  <li>Get job postings delivered right to your email</li>
                  <li>Find a job and grow your career</li>
                </ul>
                <h1>Let Job Find You</h1>
                <p className="subtitle">
                  you will never know everything But you will <strong>Know more.</strong>
                </p>
              </div>
            )}

            <p className="login-prompt">Already Registered? <a href="#">Login here</a></p>
            <img src={illustration} alt="Signup" style={{ width: "auto", height: "320px", marginLeft: "90px" , marginTop:"30px"}} />
          </div>
          {/* )} */}
        </div>

        <div className="rightForm">
          <div className="signUpRight">
            <div className="signInForm">
              <div className="signIn-toggle">
                <button
                  className={isLogin ? "active signBtn" : "signBtn"}
                  onClick={() => {
                    const queryParams = new URLSearchParams(window.location.search);
                    const role = queryParams.get("type") || "candidate"; // Get current role
                    window.location.href = `/signin?role=${userRole}`;
                  }}
                  style={{ paddingRight: '30px' }}
                >
                  Login
                </button>
                <button
                  className={!isLogin ? "active signBtn" : "signBtn"}
                  onClick={() => setIsLogin(false)}
                  style={{ paddingLeft: '30px' }}
                >
                  Register
                </button>
              </div>
              <h1 style={{marginBottom:"20px",color:"#1783D0"}}>Register As {userRole === "company" ? "Company Employee" : "Job Seeker"}</h1>
              {userRole === "company" ? <EmprSignUp /> : <EmpSignUp />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


// import React, { useState, useEffect } from "react";
// import "../stylesheets/SignUp.css";
// import axios from "axios";
// import signUpEmp from "../images/signupFromImg.png";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

// const SignUp = () => {
//   const [isLogin, setIsLogin] = useState(false);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobileNumber: "",
//     otp: "",
//     email: "",
//     designationName: "",
//     companyName: "",
//     location: "",
//     companySize: "",
//     otpVerified: false,
//     id: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const sendOtp = async () => {
//     if (!formData.mobileNumber) {
//       alert("Please enter a mobile number");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/employer/mobileNumberVerificationSendOtp`,
//         {
//           mobileNumber: formData.mobileNumber,
//           isForLogin: 0,
//         }
//       );

//       if (response.data.status === 200) {
//         alert(response.data.message);
//         console.log("Received ID:", response.data.result);

//         setFormData((prev) => ({
//           ...prev,
//           id: response.data.result,
//         }));
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       alert("Failed to send OTP");
//     }
//     setLoading(false);
//   };

//   const verifyOtp = () => {
//     if (otp === "1234") {
//       alert("OTP Verified Successfully");
//       setFormData((prev) => ({
//         ...prev,
//         otpVerified: true,
//         otp: otp,
//       }));
//     } else {
//       alert("Invalid OTP. Please try again.");
//     }
//   };

//   const registerEmployer = async () => {
//     try {
//         console.log("Register Employer Data:", formData);

//         if (!formData.otpVerified) {
//             alert("Please First Verify Mobile Number");
//             return;
//         }

//         const response = await axios.post(`${BASE_URL}/employer/register`, {
//             email: formData.email,
//             name: formData.fullName,
//             contactNumber: formData.mobileNumber,
//             otpVerified: formData.otpVerified,
//             otp: formData.otp,
//             designationName: formData.designationName,
//             companyName: formData.companyName,
//             location: formData.location,
//             companySize: formData.companySize,
//             id: formData.id,
//         });

//         console.log("Server Response:", response.data);

//         if (response.data.success) {
//             alert("Registration Successful!");
//         } else {
//             alert("Registration Failed: " + response.data.message);
//         }
//     } catch (error) {
//         console.error("API Error:", error);
//         alert("Something went wrong. Please try again.");
//     }
// };

//   return (
//     <div className="signup-box">
//       <div className="signup-container">
//         <div className="leftBox">
//           <div className="signup-left">
//             <img src={signUpEmp} alt="" />
//             <h3>
//               {isLogin ? "Find Immediate Joiners for You" : "Let Job Find You"}
//             </h3>
//             <p>You will never know everything, but you will know more.</p>
//           </div>
//         </div>

//         <div className="rightForm">
//           <div className="signUpRight">
//             <div className="signInForm">
//               <div className="signUp-toggle">
//                 <button
//                   className={isLogin ? "active signUpBtn" : ""}
//                   onClick={() => setIsLogin(true)}
//                 >
//                   Employer
//                 </button>
//                 <button
//                   className={!isLogin ? "active signUpBtn" : ""}
//                   onClick={() => setIsLogin(false)}
//                 >
//                   Employee
//                 </button>
//               </div>
//               {isLogin ? (
//                 <div className="signUpform">
//                   <div className="formCols">
//                     <div className="formColOne">
//                       <div className="signUpform-emp">
//                         <div className="signUpform-group">
//                           <label htmlFor="name">Full Name</label>
//                           <input
//                             type="text"
//                             id="fullname"
//                             name="fullName"
//                             placeholder="Your Full Name"
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className="signUpform-group">
//                           <label htmlFor="mobile">Mobile Number</label>
//                           <div className="send-otp no-spinner">
//                             <input
//                               type="number"
//                               id="mobile"
//                               name="mobileNumber"
//                               placeholder="Mobile Number"
//                               onChange={handleChange}
//                             />
//                             <button onClick={sendOtp}>Send OTP</button>
//                           </div>
//                         </div>
//                         <div className="signUpform-group">
//                           <label htmlFor="mobile">OTP</label>
//                           <div className="send-otp">
//                             <input
//                               type="password"
//                               id="verify-otp"
//                               placeholder="Enter OTP"
//                               value={otp}
//                               onChange={(e) => setOtp(e.target.value)}
//                             />
//                             <button onClick={verifyOtp}>Verify OTP</button>
//                           </div>
//                         </div>
//                         <div className="signUpform-group">
//                           <label htmlFor="name">Your Current role</label>
//                           <input
//                             type="text"
//                             id="currentrole"
//                             name="designationName"
//                             placeholder="Your Current Role"
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="formColTwo">
//                       <div className="signUpform-emp">
//                         <div className="signUpform-group">
//                           <label htmlFor="companyname">Company Name</label>
//                           <input
//                             type="text"
//                             id="company"
//                             name="companyName"
//                             placeholder="Company Name"
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className="signUpform-group">
//                           <label htmlFor="email">Email</label>
//                           <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             placeholder="Email"
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className="signUpform-group">
//                           <label htmlFor="location">Location</label>
//                           <input
//                             type="text"
//                             id="location"
//                             name="location"
//                             placeholder="Location"
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className="signUpform-group">
//                           <label htmlFor="name">Company Size</label>
//                           <input
//                             type="text"
//                             id="companysize"
//                             name="companySize"
//                             placeholder="Company Size"
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="register-btn">
//                     <button onClick={registerEmployer}>Register Now</button>
//                   </div>
//                 </div>
//               ) : (
//                 <p>Employee registration form remains unchanged.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
