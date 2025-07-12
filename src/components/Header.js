import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../stylesheets/Header.css";
import HeaderLogo from "../images/HeaderLogo copy.svg";
import defaultLogo from "../images/defaultImg.png";
import { useLocation } from "react-router-dom";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const Header = ({ isHomePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("userId");
  const role = Cookies.get("role"); // 'candidate' or 'company'
  console.log("userId in header", userId);
  console.log("user Role in header", role);

  const handleMouseEnter = () => setMenuOpen(true);
  const handleMouseLeave = () => setMenuOpen(false);

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    Cookies.remove("role");
    navigate("/");
  };

  useEffect(() => {
    if (!authToken || !userId || !role) return;

    const fetchUserDetails = async () => {
      let endpoint = "";
      let options = {};

      if (role === "company") {
        // ✅ Company: GET with token only
        endpoint = `${baseUrl}/employer/getEmployerAllDetails`;
        options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        };
      } else {
        // ✅ Candidate: POST with userId in body
        endpoint = `${baseUrl}/api/getAllUserDetails`;
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ userId: userId }),
        };
      }

      try {
        const response = await fetch(endpoint, options);

        if (response.status === 401) {
          handleLogout();
          return;
        }

        const data = await response.json();

        if (data.status === 200) {
          let userData, image;

          if (role === "company") {
            userData = data.res;
            image = userData?.logo;
          } else {
            userData = Array.isArray(data.result)
              ? data.result[0]
              : data.result;
            image = userData?.image;
          }

          setUserName(userData?.name || "User");
          setUserImage(image || null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserDetails();
  }, [authToken, userId, role]);

  useEffect(() => {
    if (authToken && isTokenExpired(authToken)) {
      handleLogout();
    }
  }, [authToken]);

  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  return (
    <header className={`header main-header ${isHomePage ? "home-header" : ""}`}>
      <div id="left">
        <Link to="/" className="header-logo">
          <img style={{ width: "80px" }} src={HeaderLogo} alt="Logo" />
        </Link>
      </div>

      <div className="right-container" id="nav-menu">
        <nav className="nav">
          <div id="mid">
            <ul className="nav-links">
              <li>
                <Link to="/" className={currentPath === "/" ? "active" : ""}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className={currentPath === "/aboutus" ? "active" : ""}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/ourTeam"
                  className={currentPath === "/ourteam" ? "active" : ""}
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className={currentPath === "/pricing" ? "active" : ""}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-btn">
            {authToken ? (
              <div
                className="headerLoginProfile"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={userImage || defaultLogo}
                  alt="profile"
                  height={50}
                  width={50}
                />
                {menuOpen && (
                  <div className="headerProfDropdown">
                    <Link
                      to={role === "company" ? "/employer" : "/employee-page"}
                    >
                      View Profile
                    </Link>
                    <button onClick={handleLogout} className="emprSignOut-btn">
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="header-buttons">
                <button
                  onClick={() =>
                    (window.location.href = "/signin?role=candidate")
                  }
                  className="sign-btn"
                >
                  Join as Jobseeker
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/signin?role=company")
                  }
                  className="signup-btn"
                >
                  Join as Company
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
