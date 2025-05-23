import React from "react";
import "../stylesheets/OurTeam.css";
import founderImg from "../images/founderImage.png";
import dotImage from "../images/dotpattern.png";

const OurTeam = () => {

    return (
        <>
            <div className="leadership-section">
                <div className="overlay">
                    <div className="leadership-wrapper">
                        <h1 className="title-line">LEADERSHIP TEAM</h1>
                        <div className="bar-block">
                            <div className="bar"></div>
                            <div className="bar-text">
                                <h1>LEADING WITH</h1>
                                <h1>PURPOSE</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="section-title">
                Meet Our <span className="highlight"> Founder</span>
            </h1>

            <section className="founder-section">
                <div className="founder-left">
                    <p>
                        With a strong foundation in leading high-impact technology projects, our founder brings a wealth of experience from the telecommunications and consulting industries. At Comviva, he served as Senior Project Development Manager, spearheading transformative telecom initiatives using Agile methodologies. His leadership emphasized seamless team collaboration and efficient workflow management—ensuring the timely delivery of high-quality digital services in a rapidly evolving landscape.

                    </p>
                    <p>
                        Before Comviva, he held the role of Scrum Master at Accenture, where he championed a culture of empowerment within cross-functional teams. Through effective facilitation of Scrum practices and agile coaching, he played a key role in enhancing team performance, product quality, and operational flow.

                    </p>
                    <p>

                        All his experiences has lead a deep commitment to innovation, strategic alignment, and continuous improvement—values that form the backbone of our company’s approach today.
                    </p>
                    <button className="founder-button">Join with us</button>
                </div>

                <div className="founder-right">
                    <div className="image-wrapper">
                        <div className="dot-pattern"> <img src={dotImage} /></div>
                        <img src={founderImg} alt="Founder" />
                        <div className="name-tag">
                            <strong>Suraj Vishwakarma</strong>
                            <span>(Founder & CEO)</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default OurTeam;