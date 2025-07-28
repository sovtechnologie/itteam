import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../stylesheets/SignIn.css";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const EmpSignIn = () => {
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
    setLoading(true);
    setMessages([]);
    try {
      const response = await fetch(
        `${baseUrl}/api/mobileNumberVerificationSendOtp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobileNumber: formData.mobileNumber,
            isForLogin: 1,
          }),
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        setVerificationId(data.result);
        // alert("OTP Sent Successfully");
        setIsOtpSent(true);
        setMessages([{ field: 'mobileNumber', message: 'OTP sent successfully to your registered mobile.' }]);
        setTimeout(() => setIsOtpSent(false), 10000); // Enable after 30 seconds
      } else {
        setErrors([
          {
            field: "mobileNumber",
            message: data.message || "Failed to send OTP",
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
      const response = await fetch(
        `${baseUrl}/api/mobileNumberVerificationSetup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: verificationId, otp: formData.otp }),
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        // alert("OTP Verification Successful!");
        if (data.token) {
          Cookies.set("authToken", data.token, { expires: 1 });
          Cookies.set("userId", data.result._id);
          Cookies.set("role", "candidate");
          setOtpVerified(true);
          setIsOtpSent(false);
          setMessages([{ field: 'otp', message: 'OTP verified!' }]);
          navigate("/employee-page");
        }
      } else {
        setErrors([
          {
            field: "otp",
            message: data.message || "OTP verification failed",
          },
        ]);
      }
    } catch (error) {
      setErrors([
        {
          field: "otp",
          message: error.message || "Something went wrong.",
        },
      ]);
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
            disabled={isOtpSent}
            required
          />
          <button type="button" onClick={sendOtp} disabled={isOtpSent}>
          {loadingSendOtp ? "Sending..." : "Send OTP"}
          </button>

        </div>
        {getError("mobileNumber") && (
          <p className="error-text" style={{ color: "red" }}>{getError("mobileNumber")}</p>
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
        <button onClick={verifyOtp} disabled={loadingVerify}>
          Login
        </button>
        <p>
          Don't have an account? <Link to="/signup">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default EmpSignIn;
