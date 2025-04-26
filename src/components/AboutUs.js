import React from "react";
import "../stylesheets/AboutUs.css";
import aboutOfferImg from "../images/aboutOfferImg.png";
import OurTeam from "./cards/OurTeam";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>


      <div className="about-us-section">
        <div className="overlay">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtext">
            As the fastest-growing online Job board, our mission is to help
            great individuals connect with great companies.
          </p>
          <div className="about-stats">
            <div className="stat">
              <h2 className="stat-value">52,015</h2>
              <p className="stat-label">Job Posted</p>
            </div>
            <div className="stat">
              <h2 className="stat-value">24,325</h2>
              <p className="stat-label">Successful Hires</p>
            </div>
            <div className="stat">
              <h2 className="stat-value">1,532</h2>
              <p className="stat-label">Verified Companies</p>
            </div>
            <div className="stat">
              <h2 className="stat-value">1.2M</h2>
              <p className="stat-label">Monthly Visitors</p>
            </div>
          </div>
        </div>
      </div>


      <section className="company-about">
        <div className="company-text">
          <h1>
            About Our <span className="highlight">Company</span>
          </h1>
          <p>
            We deliver innovative tech solutions for project management and supply chain challenges, backed by
            deep expertise in Oracle enterprise products. Founded in 2007 by pioneers of Oracle’s Supply Chain
            and Primavera products, Gaea has successfully deployed solutions for over 100 clients worldwide,
            managing $10 billion in capital projects. Our goal is simple: to provide top-tier software solutions
            that maximize ROI.
          </p>
          <Link to="/contactus">
  <button className="contact-btn">Contact Us →</button>
</Link>
        </div>
      </section>


      <section className="enterprise-section">
        <div className="text-logos">
          <h2>
            A Trusted Partner for<br />
            <span className="highlight">Top Enterprises Across Sectors</span>
          </h2>

          <div className="logo-grid">
            <img src="/assets/invasystems.png" alt="Invasystems" />
            <img src="/assets/nttdata.png" alt="NTT Data" />
            <img src="/assets/ncs.png" alt="NCS" />
            <img src="/assets/malpani.png" alt="Malpani" />
            <img src="/assets/wetnjoy.png" alt="Wet n Joy" />
            <img src="/assets/imagicaa.png" alt="Imagicaa" />
          </div>
        </div>
        <div className="partner-image">
          <img src="/assets/woman-laptop.png" alt="Woman with Laptop" />
        </div>
      </section>



      <section className="hero-sections">
        <div className="hero-left">
          <img
            src="https://img.freepik.com/free-photo/asian-woman-posing-looking-camera_23-2148255359.jpg"
            alt="Team"
            className="team-image"
          />

          <div className="rating-card">
            <div className="rating-left">
              <span className="rating-number">4.6</span>
              <p className="rating-text">Reviews</p>
            </div>
            <div className="rating-star">⭐</div>
            <div className="rating-logos">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
              <img src="https://seeklogo.com/images/C/clutch-logo-CE9ECF7E07-seeklogo.com.png" alt="Clutch" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Trustpilot_Logo.svg/2560px-Trustpilot_Logo.svg.png" alt="Trustpilot" />
            </div>
          </div>


          <div className="profile-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Kaya Jons" />
            <div>
              <p className="profile-name">Kaya Jons</p>
              <p className="profile-role">React.js Developer</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <h1>
            Trusted & Popular <br />
            <span className="highlight">Job Portal</span>
          </h1>
          <p className="description">
            Find your dream job from thousands daily updated job vacancies.
            Find the best jobs online from UK job sites or apply directly on a
            business website. Search and find jobs today!
          </p>
          <div className="hero-buttons">
            <button className="btn-outline">Join as Jobseeker</button>
            <button className="btn-filled">Join as Company</button>
          </div>
        </div>
      </section>

      <div className="job-hunting-container">
        <h1 className="job-hunting-title">A job hunting experience <br />like no other</h1>
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



      {/* <div className="aboutUs">
        <div className="aboutus-top">
          <div className="aboutBox">
            <h1>About Us</h1>
            <div className="aboutTop">
              <Link to="/home">Home</Link> {" / "}
              <Link to="/aboutus">About us</Link>
            </div>
          </div>
        </div>
        <div className="aboutContent">
          <div className="aboutContentOne">
            <h2>About Our Company</h2>
            <p>
              We provide inventive technology solutions for your most
              challenging project management and supply chain problems. And we
              do it with an intimate knowledge of the Oracle enterprise products
              that we helped pioneer along with considerable expertise in all
              the industries we serve.Back in 2007, a group of thought leaders
              who architected Oracle’s Supply Chain and Primavera products
              founded Gaea. Since then, we have helped client after client
              successfully deploy enterprise applications all over the world.
              We’ve implemented solutions for more than 100 clients worldwide,
              and our clients manage more than $10-billion in capital projects
              using our solutions. Simply put, we want to build and implement
              the best software solutions possible, and deliver the best ROI
              possible.
            </p>
          </div>
          <div className="aboutContentTwo">
            <div className="contentTwoBox">
              <div className="contentTwoBox-left">
                <img src={aboutOfferImg} alt="aboutOfferImg" />
              </div>
              <div className="contentTwoBox-right">
                <h2>What We Offer?</h2>
                <p>
                  Aenean sollicituin, lorem quis bibendum auctor nisi elit
                  consequat ipsum sagittis sem nibh id elit. Duis sed odio sit
                  amet nibh vulputate cursus a sit amet maurisorbi accumsan
                  ipsum velit. Nam nec tellus a odio tincidunt auctora ornare
                  odio. Aenean sollicituin, lorem quis bibendum auctor nisi elit
                  consequat ipsum sagittis sem nibh id elit. Duis sed odio sit
                  amet nibh vulputate cursus a sit amet maurisorbi accumsan
                  ipsum velit. Nam nec tellus a odio tincidunt auctora ornare
                  odio.
                </p>
              </div>
            </div>
          </div>
          <div className="aboutContentThree">
            <h2>Meet Our Team</h2>
            <p>
              Our team is dedicated to connecting job seekers with employers,
              offering seamless experiences, innovative solutions, and
              exceptional support for both candidates and businesses.
            </p>
          </div>
        </div>
        <OurTeam />
      </div> */}
    </>
  );
};

export default AboutUs;
