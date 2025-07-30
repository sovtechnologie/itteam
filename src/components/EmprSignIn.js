import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../components/AuthContext";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const EmprSignIn = () => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    otp: "",
  });

  const [verificationId, setVerificationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => prev.filter((err) => err.field !== name));
  };

  const sendOtp = async () => {
    const newErrors = [];
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.push({ field: 'mobileNumber', message: 'Enter a valid 10-digit mobile number' });
    }
    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }
    setErrors([]);

    setLoadingSendOtp(true);
    setMessages([]);
    try {
      const response = await axios.post(
        `${baseUrl}/employer/mobileNumberVerificationSendOtp`,
        {
          mobileNumber: formData.mobileNumber,
          isForLogin: 1,
        }
      );

      if (response.data.status === 200) {
        setVerificationId(response.data.result);
        setIsOtpSent(true);
        setMessages([{ field: 'mobileNumber', message: 'OTP sent successfully to your registered mobile.' }]);
      } else {
        setErrors([
          {
            field: "mobileNumber",
            message: response.data.message || "Failed to send OTP",
          },
        ]);
      }
    } catch (error) {
      if (error.status === 404) {
        setErrors([
          {
            field: "mobileNumber",
            message: "Mobile Number not found",
          },
        ]);
      }
      else {
        setErrors([
          {
            field: "mobileNumber",
            message: error.message || "Something went wrong.",
          },
        ]);
      }

    } finally {
      setLoadingSendOtp(false);
    }
  };

  const verifyOtp = async () => {
    const newErrors = [];
    if (!verificationId) {
      newErrors.push({ field: 'mobileNumber', message: 'Please request OTP first' });
    }
    if (!formData.otp) {
      newErrors.push({ field: 'otp', message: 'Enter the OTP received' });
    }
    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }
    setErrors([]);
    setLoadingVerify(true);
    setMessages([]);

    try {
      const response = await axios.post(
        `${baseUrl}/employer/mobileNumberVerificationSetup`,
        {
          id: verificationId,
          otp: formData.otp,
        }
      );
      const data =  response.data;
      console.log("mu data",data)

      if (data?.status === 200) {
        const employer = data.result;

        Cookies.set("authToken", response.data.token, { expires: 1 });
        Cookies.set("userId", employer._id);
        Cookies.set("role", "company");
        setMessages([{ field: 'otp', message: 'OTP verified!' }])
        setOtpVerified(true);
        setIsOtpSent(false);

        const userData = {
          name: employer.name,
          mobile: employer.contactNumber,
          image: employer.logo,
        };
        login(userData);

        navigate("/employer");
      } else {
        setErrors([
          {
            field: "otp",
            message: data.message || "OTP verification failed",
          },
        ]);
        setIsOtpSent(false);
      }
    } catch (error) {
      if(error.status === 400){
      setErrors([
        {
          field: "otp",
          message: "OTP Not Matched",
        },
      ]);
      setIsOtpSent(false);
      }else{
          setErrors([
        {
          field: "otp",
          message: error.message || "Something went wrong.",
        },
      ]);
      setIsOtpSent(false);
      }
     
    } finally {
      setLoadingVerify(false);
    }
  };
  const getError = (field) => {
    const err = errors.find((e) => e.field === field);
    return err ? err.message : "";
  };
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
      <div className="form">
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <div className="input-otp">
            <input
              type="tel"
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
              value={formData.mobileNumber}
              onChange={handleChange}
              name="mobileNumber"
            />
            <button
              type="button"
              className="mainfont"
              onClick={sendOtp}
              disabled={isOtpSent}
            >
         {loadingSendOtp ? "Sending..." : "Send OTP"}
            </button>
          </div>
          {getError("mobileNumber") && (
            <p className="error-text" style={{ color: "red"  }}>{getError("mobileNumber")}</p>
          )}
          {!getError('mobileNumber') && getSuccess('mobileNumber') && (
            <p className="success-text">{getSuccess('mobileNumber')}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input
            type="password"
            placeholder="OTP"
            maxLength={8}
            value={formData.otp}
            onChange={handleChange}
            name="otp"
          />
          {getError("otp") && (
            <p className="error-text" style={{ color: "red" }}>{getError("otp")}</p>
          )}
          {!getError('otp') && getSuccess('otp') && (
            <p className="success-text">{getSuccess('otp')}</p>
          )}
        </div>

        <div className="login-btn">
          <button onClick={verifyOtp} disabled={loadingVerify}>Login</button>
          <p>
            Don't have an account? <Link to="/signup">Register Now</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default EmprSignIn;
