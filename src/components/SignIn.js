import React, { useState } from "react";
import "../stylesheets/SignIn.css";
import signInEmp from "../images/signInEmp.png";
import wavinghand from "../images/waving-hand.png";
import EmprSignIn from "./EmprSignIn";
import EmpSignIn from "./EmpSignIn";
import k5Img from "../images/Group 2.png";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="signinBox">
      <div className="signin-container">
        <div className="left-box">
          <div className="signin-left">
            {/* <img src={signInEmp} alt="Sign In" /> */}
            {isLogin ? <>
              <div className="welcome-message">
                <h1>Find & hire the right<br /> talent with us</h1>
                <div className="stats">
                  <p>Trusted by 9 Cr+ candidates |</p>
                  <p>5 Lakh+ employers</p>
                  <img src={k5Img} alt="" />
                </div>
              </div></> : <><div className="new-to-it">
                <h1>New to IT Team?</h1>
                <ul>
                  <li>One click apply using naukri profile.</li>
                  <li>Get relevant job recommendations.</li>
                  <li>Showcase profile to top companies and consultants.</li>
                  <li>Know application status on applied jobs.</li>
                </ul>
              </div>
              <h1>
                 Let Job Find You
              </h1>
              <p style={{fontSize:"20px"}}>
                you will never know everything <br /> But you will Know more
              </p>
            </>}


            <button className="register-button">Register For Free</button>
          </div>
        </div>

        <div className="right-form">
          <div className="right-form-head">
            <img src={wavinghand} alt="Hello" className="hello-icon" />
            <h2>Welcome back!</h2>
            <p>Please login to access your account</p>
          </div>

          <div className="signInRight">
            <div className="signInForm">
              <div className="signIn-toggle">
                <button
                  className={isLogin ? "active signBtn" : ""}
                  onClick={() => setIsLogin(true)}
                >
                  Employer
                </button>
                <button
                  className={!isLogin ? "active signBtn" : ""}
                  onClick={() => setIsLogin(false)}
                >
                  Employee
                </button>
              </div>

              {isLogin ? <EmprSignIn /> : <EmpSignIn />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
