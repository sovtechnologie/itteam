import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../stylesheets/Header.css";
import HeaderLogo from "../images/headerLogo.svg";
import defaultLogo from "../images/defaultImg.png";

const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const Header = ({ isHomePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [employerName, setEmployerName] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("userId");

  const handleMouseEnter = () => setMenuOpen(true);
  const handleMouseLeave = () => setMenuOpen(false);

  useEffect(() => {
    if (!authToken || !userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/getAllUserDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ userId }),
        });

        if (response.status === 401) {
          Cookies.remove("authToken");
          Cookies.remove("userId");
          navigate("/");
          return;
        }

        const data = await response.json();
        if (data.status === 200) {
          setEmployerName(data.result[0]?.name || "Employer");
          setImage(data.result[0]?.image || "Employer");
          return;
        }

        // If not found, try company API
        response = await fetch(`${baseUrl}/employer/getEmployerAllDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ employerId: userId }),
        });

        if (response.status === 401) {
          Cookies.remove("authToken");
          Cookies.remove("userId");
          navigate("/");
          return;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [authToken, userId]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    navigate("/");
  };

  return (
    <header className={`header main-header ${isHomePage ? "home-header" : ""}`}>
      {/* <div className="header-container"> */}
      <div id="left">
        <Link to="/" className="header-logo">
          <img src={HeaderLogo} alt="Logo" />
        </Link>
      </div>
      <div className="right-container" id="nav-menu">
        <nav className="nav">
          <div id="mid">
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About us</Link>
              </li>
              <li>
                <Link to="/ourTeam">Our Team</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
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
                {/* <p>{employerName || "Employer Name"}</p> */}
                <img
                  src={image || defaultLogo}
                  alt="profile"
                  height={50}
                  width={50}
                />
                {menuOpen && (
                  <div className="headerProfDropdown">
                    <Link to="/employee-page">View Profile</Link>
                    <button onClick={handleLogout} className="emprSignOut-btn">
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
            
              </>
            )}
          </div>
        </nav>
      </div>
   
    </header>
  );
};

export default Header;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import "../stylesheets/Header.css";
// import HeaderLogo from "../images/headerLogo.svg";
// import defaultLogo from "../images/defaultImg.png";

// const baseUrl = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

// const Header = () => {

//   // const [menuOpen, setMenuOpen] = useState(false);
//   // const { user, employerName, logout } = useAuth();
//   // const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [employerName, setEmployerName] = useState(null);
//   const navigate = useNavigate();
//   const authToken = Cookies.get("authToken");
//   const userId = Cookies.get("userId");

//   const handleMouseEnter = () => setMenuOpen(true);
//   const handleMouseLeave = () => setMenuOpen(false);

//   useEffect(() => {
//     if (!authToken || !userId) return;

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/api/getAllUserDetails`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//           body: JSON.stringify({ userId }),
//         });

//         const data = await response.json();
//         if (data.status === 200) {
//           setEmployerName(data.result[0]?.name || "Employer");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [authToken, userId]);

//   const handleLogout = () => {
//     Cookies.remove("authToken");
//     Cookies.remove("userId");
//     navigate("/signin");
//   };

//   return (
//     <header>
//       <Link to="/">
//         <div className="header-logo">
//           <img src={HeaderLogo} alt="Logo" />
//         </div>
//       </Link>
//       <nav>
//         <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/aboutus">About Us</Link></li>
//           <li><Link to="/contactus">Contact Us</Link></li>
//         </ul>

//         {/* <div className="nav-btn">
//           {user ? (
//             <div
//               className="headerLoginProfile"
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//             >
//               <p>{employerName || "Employer Name"}</p>
//               <img src={defaultLogo} alt="" height={25} />
//               {menuOpen && (
//                 <div className="headerProfDropdown">
//                   <Link to="/employer" >View Profile</Link>
//                   <button onClick={handleLogout} className="emprSignOut-btn">
//                     Log Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link to="/signin" className="sign-btn">Log In</Link>
//               <Link to="/signup" className="signup-btn">Sign Up</Link>
//             </>
//           )}
//         </div> */}
//         <div className="nav-btn">
//   {authToken ? (
//     <div
//       className="headerLoginProfile"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <p>{employerName || "Employer Name"}</p>
//       <img src={defaultLogo} alt="" height={25} />
//       {menuOpen && (
//         <div className="headerProfDropdown">
//           <Link to="/employee-page">View Profile</Link>
//           <button onClick={handleLogout} className="emprSignOut-btn">
//             Log Out
//           </button>
//         </div>
//       )}
//     </div>
//   ) : (
//     <>
//       <Link to="/signin" className="sign-btn">Log In</Link>
//       <Link to="/signup" className="signup-btn">Sign Up</Link>
//     </>
//   )}
// </div>

//       </nav>
//     </header>
//   );
// };

// export default Header;
