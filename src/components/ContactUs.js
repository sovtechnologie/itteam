import React, { useState } from "react";
import "../stylesheets/ContactUs.css";
import { IoMdHome } from "react-icons/io";
import { TbPhoneCall } from "react-icons/tb";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const ContactUs = () => {
  const [inputData, setInputData] = useState({
    cname: "",
    cemail: "",
    cphoneNumber: "",
    cmessage: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      name: inputData.cname,
      emailId: inputData.cemail,
      contactNumber: inputData.cphoneNumber,
      feedback: inputData.cmessage,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/withOutLogin/contacUs`,
        formattedData
      );
      console.log("Success:", response.data);

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      setInputData({
        cname: "",
        cemail: "",
        cphoneNumber: "",
        cmessage: "",
      });
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <section className="contact-us">
      <div className="content">
        <h1>Contact Us</h1>
        <p>
          Contact us with any questions or inquiries. Our team is ready to assist
          and provide the support you need. Reach out today, and let’s discuss
          how we can work together.
        </p>
        <button className="contact-button">Contact Us</button>
      </div>
    </section>

    <section className="contact-details">
      <div className="left-side">
        <h1>Contact <span className="highlight">Us</span></h1>

        <div className="info-block">
          <div className="icon">
            📍
          </div>
          <p>Shop No 2, Veer Sawarkar<br/>Nagar Thane west, 400606</p>
        </div>

        <div className="info-block">
          <div className="icon">
            📞
          </div>
          <p>+91 7738311925</p>
        </div>

        <div className="info-block">
          <div className="icon">
            ✉️
          </div>
          <p>info@itteam.com</p>
        </div>
      </div>

      <div className="map-side">
        <iframe
          title="location-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.617132407066!2d73.00378307500443!3d18.547066082551864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfa727aa2f23%3A0x6cfe8a637f6a8d3e!2sMalpani%20Group!5e0!3m2!1sen!2sin!4v1683189837652!5m2!1sen!2sin"
          width="100%"
          height="480"
          style={{ border: '0', borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="form-side">
        <h3>Enquire Now</h3>
        <form className="enquire-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email ID" />
          <input type="text" placeholder="Phone number" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Submit →</button>
        </form>
      </div>
    </section>


    <div className="job-hunting-container">
        <h1 className="job-hunting-title">A job hunting experience <br/>like no other</h1>
        <p className="job-hunting-subtitle">Why search when you can discover? Let the right job come to you.</p>

        <div className="job-hunting-form">
          <input
            type="email"
            placeholder="Enter Your Mail"
            className="job-hunting-input"
          />
          <button className="job-hunting-button">Subscribe</button>
        </div>
      </div>


      {/* <div className="contactBox">
        <div className="contactContainer">
          <div className="contact-head">
            <h1>Contact Us</h1>
            <div className="contactTop">
              <Link to="/home">Home</Link> {"/"}
              <Link to="/contactus">Contact us</Link>
            </div>
          </div>
        </div>
        <div className="contact-content">
          <div className="contact-left">
            <h2>Get In Touch With Us</h2>
            <p className="ContactleftContent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
            <div className="contact-details">
              <span>
                <IoMdHome />
              </span>
              <div className="contact-detail">
                <h3>Our Location</h3>
                <p>Shop No 2, Veer Sawarkar Nagar Thane west, 400606</p>
              </div>
            </div>
            <div className="contact-details">
              <span>
                <TbPhoneCall />
              </span>
              <div className="contact-detail">
                <h3>Contact Number</h3>
                <p>+91 77383 11925</p>
                <p>+91 9717569519</p>
              </div>
            </div>
            <div className="contact-details">
              <span>
                <IoIosMail />
              </span>
              <div className="contact-detail">
                <h3>Email Address</h3>
                <p>info@sovtechnologies.com</p>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <div className="contact-form">
              <form className="contactForm-input" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="cname"
                  value={inputData.cname}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  name="cemail"
                  value={inputData.cemail}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  placeholder="Your Phone"
                  name="cphoneNumber"
                  value={inputData.cphoneNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Your Message"
                  name="cmessage"
                  value={inputData.cmessage}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className="messgPopup">
            <div className="mesgBox">
              <h3>Message sent successfully!</h3>
              <p>We will connect with you very soon</p>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default ContactUs;
