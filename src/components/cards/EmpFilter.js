import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../stylesheets/EmpFilter.css";
import SalaryFilterCard from "./SalaryFilterCard";
import SelectedProfCard from "../profileCards/SelectedProfCard";
import { TbMinusVertical } from "react-icons/tb";
import { FaAngleDown } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import Pagination from "../Pagination";
import vector from "../../images/Vector.png";
import JobCard from "./JobCard";
import company from "../../images/CompanyProfilelogo.png";

const EmpFilter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [profiles, setProfiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [searchParams] = useSearchParams();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [salaryRange, setSalaryRange] = useState([2, 20]);


  const BASE_URL = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";
  // const cardsPerPage = 12;
  // const indexOfLastCard = currentPage * cardsPerPage;
  // const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // const currentCards = profiles.slice(indexOfFirstCard, indexOfLastCard);


  const profilesData = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    name: "Kaya Jons",
    designation: "React.JS Developer",
    company: "SOV Technology",
    location: "Noida",
    noticePeriod: "30 days N.P",
    skills: ["HTML", "CSS", "JAVA"],
    desc: "We are looking for someone with experience using AI software to create realistic product photos.",
    img: "https://img.freepik.com/free-photo/asian-woman-posing-looking-camera_23-2148255359.jpg", // dummy image link
  }));

  const jobs = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    companyLogo: company,
    companyName: `Sov Technologies`,
    jobTitle: 'React.JS Developer',
    location: 'Mumbai, India - Onsite',
    tags: ['Junior', '7 Days N.P', 'Contract'],
    salary: '₹5 L.P.A',
    postedAgo: `${i + 1} Day${i === 0 ? '' : 's'} Ago`,
  }));

  const profilesPerPage = 12;

  // Calculate current profiles
  const filteredProfiles = role === "Company" ? companies : users;

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);
  const getPaginationRange = (totalPages) => {
    const startPages = [1, 2, 3];
    const endPages = [totalPages - 2, totalPages - 1, totalPages];

    const pagination = [...startPages];

    if (totalPages > 6) {
      pagination.push("...");
      pagination.push(...endPages);
    } else {
      // No need for dots if total pages <= 6
      for (let i = 4; i <= totalPages; i++) {
        pagination.push(i);
      }
    }

    return pagination;
  };

  const paginationRange = getPaginationRange(totalPages);




  const [filters, setFilters] = useState({
    workMode: [],
    experienceInStack: [],
    activeJoiners: [],
    location: [],
    expertTecStack: [],
    skillName: [],
    currentPosition: [],
    noticePeriod: [],
    salary: [2, 20]
  });


  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      let updatedValues = [...prevFilters[category]];
      if (updatedValues.includes(value)) {
        updatedValues = updatedValues.filter((v) => v !== value);
      } else {
        updatedValues.push(value);
      }

      // Handle experienceInStack category
      if (category === "experienceInStack") {
        const labelToYears = {
          "Fresher": [1],
          "Junior": [1, 2],
          "Associate": [3, 4, 5],
          "Mid-Level": [6, 7, 8, 9, 10],
          "Senior": [11, 12, 13],
        };

        const mappedExperience = updatedValues
          .map((label) => labelToYears[label] || [])
          .flat();

        return {
          ...prevFilters,
          experienceInStack: updatedValues,
          mappedExperience: mappedExperience, // Optionally store the mapped values
        };
      }

      // Handle activeJoiners and noticePeriod categories
      if (category === "activeJoiners") {
        let noticePeriodValues = [];
        if (updatedValues.includes("Within 7 Days")) {
          noticePeriodValues.push("0-7");
        }
        if (updatedValues.includes("Within 15 Days")) {
          noticePeriodValues.push("8-15");
        }
        if (updatedValues.includes("Within 30 Days")) {
          noticePeriodValues.push("16-30");
        }
        if (updatedValues.includes("Within 45 Days")) {
          noticePeriodValues.push("31-45");
        }
        return {
          ...prevFilters,
          activeJoiners: updatedValues,
          noticePeriod: noticePeriodValues, // Add the corresponding noticePeriod filter
        };
      }

      return { ...prevFilters, [category]: updatedValues };
    });
  };

  const handleLocationChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: event.target.value,
    }));
  };

  const handleStackChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      expertTecStack: event.target.value,
      currentPosition: event.target.value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      workMode: [],
      experienceInStack: [],
      activeJoiners: [],
      location: [],
      expertTecStack: [],
      skillName: [],
      currentPosition: [],
      noticePeriod: [],
      salary: [2, 20]
    });
  };

  // const handleNextClick = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  // const handlePreviousClick = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage((prevPage) => prevPage - 1);
  //   }
  // };

  useEffect(() => {
    // if (searchParams.get("location")) {
    //   setFilters((prevFilters) => ({
    //     ...prevFilters,
    //     location: searchParams.get("location"),
    //   }));
    // }
    if (searchParams.get("expertTecStack")) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        expertTecStack: searchParams.get("expertTecStack"),
      }));
    }
    if (searchParams.get("experienceInStack")) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        experienceInStack: searchParams.get("experienceInStack"),
      }));
    }
    if (searchParams.get("activeJoiners")) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        activeJoiners: searchParams.get("activeJoiners"),
      }));
    }
    if (searchParams.get("role")) {
      setRole(searchParams.get("role"))
    }
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let validFilters = {};

        if (filters.workMode.length) {
          validFilters.workMode = filters.workMode.join(",");
        }
        if (filters.experienceInStack.length) {
          validFilters.experienceInStack = filters.experienceInStack.join(",");
        }
        if (filters.activeJoiners.length) {
          validFilters.activeJoiners = filters.activeJoiners.join(",");
        }
        if (filters.location) {
          validFilters.location = filters.location;
        }
        if (filters.currentPosition) {
          validFilters.currentPosition = filters.currentPosition;
        }
        if (filters.expertTecStack) {
          validFilters.expertTecStack = filters.expertTecStack;
        }
        if (filters.skillName.length) {
          validFilters.skillName = filters.skillName.join(",");
        }
        if (filters.noticePeriod.length) {
          validFilters.noticePeriod = filters.noticePeriod.join(",");
        }

        console.log("Filters:", filters);
        console.log("API Request Params:", validFilters);

        let response;

        if (Object.keys(validFilters).length) {
          response = await axios.get(`${BASE_URL}/api/userFilter`, {
            params: validFilters,
          });

          if (response.data.status === 404) {
            console.warn("No data found, refetching without filters...");
            response = await axios.get(`${BASE_URL}/api/userFilter`); // Fallback call
          }
        } else {
          response = await axios.get(`${BASE_URL}/api/userFilter`);
        }

        if (response.data.status === 200) {
          setUsers(response.data.result);
        } else {
          setError("No profiles found");
        }
      } catch (err) {
        setError("Error fetching profile data");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProfiles();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleSalaryChange = (range) => {
    setFilters((prev) => ({
      ...prev,
      salary: range,
    }));
  };


  useEffect(() => {
    fetch(
      "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com/api/userFilter"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("filter data", data);
        if (data.status === 200) {
          setUsers(data.result);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/withOutLogin/getAllCompanyHomePage`
        );
        console.log("filter companies", response);
        if (response.data.status === 200) {
          setCompanies(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com/withOutLogin/get-state-list",
          {
            params: { countryCode: "IN" },
          }
        );


        console.log("loaction", response);
        if (response.data && response.data.data) {
          setLocations(response.data.data);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);


  return (
    <>

      <div className="job-search-bar">
        <div className="search-fields"> {/* 🆕 Wrap fields separately */}
          <div className="select-wrapper">
            <select className="search-select">
              <option value="">Select job type</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="freelance">Freelance</option>
            </select>
            <span className="dropdown-icon">▼</span>
          </div>

          <div className="divider" />

          <input
            type="text"
            className="search-input"
            placeholder="Enter keyword / designation"
            value={filters.expertTecStack}
            onChange={handleStackChange}
          />

          <div className="divider" />

          <div className="select-wrapper">
            <select className="search-select">
              <option value="">Experience</option>
              <option value="fresher">Fresher</option>
              <option value="1year">1 Year</option>
              <option value="2year">2+ Years</option>
            </select>
            <span className="dropdown-icon">▼</span>
          </div>

          <div className="divider" />

          <div className="select-wrapper">
            <select
              className="search-select"
              value={filters.location}
              onChange={handleLocationChange}
            >
              <option value="">Select Location</option>
              {loading ? (
                <option disabled>Loading...</option>
              ) : (
                locations.map((loc) => (
                  <option key={loc._id} value={loc.name}>
                    {loc.name}
                  </option>
                ))
              )}
            </select>
            <span className="dropdown-icon">▼</span>
          </div>
        </div>

        <button className="search-button">
          🔍 Search
        </button>
      </div>


      <div className="job-listing-container">
        <div className="filter-section">
          {/* Filters here */}
          <div className="filter-header">
            <h3>Filter</h3>
            <button className="reset-btn" onClick={handleResetFilters}>Reset</button>
          </div>

          <div className="filter-group">
            <h3 style={{ marginBottom: "10px" }}>Salary Range</h3>
            <SalaryFilterCard
              salaryRange={filters.salary}
              onSalaryChange={handleSalaryChange}
            />


          </div>

          <div className="filter-group">
            <h3 style={{ marginBottom: "10px" }}>Work mode</h3>
            <label><input type="checkbox" /> W.F.O</label>
            <label><input type="checkbox" /> Remote</label>
            <label><input type="checkbox" /> Hybrid</label>
          </div>

          <div className="filter-group">
            <h3 style={{ marginBottom: "10px" }}>Experience level</h3>

            {[
              { label: "Fresher", value: 0 },
              { label: "Junior", value: 1 },
              { label: "Associate", value: [2, 5] },
              { label: "Mid-Level", value: [5, 10] },
              { label: "Senior", value: [10, 50] },
            ].map((exp) => (
              <div key={exp.label}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.experienceInStack.includes(exp.label)}
                    onChange={() => handleCheckboxChange("experienceInStack", exp.label)}
                  />
                  {exp.label}
                </label>
              </div>
            ))}

          </div>

          <div className="filter-group">
            <h3 style={{ marginBottom: "10px" }}>Active Joiner</h3>
            <label><input type="checkbox" /> Immediate</label>
            <label><input type="checkbox" /> Within 7 Days</label>
            <label><input type="checkbox" /> Within 15 Days</label>
            <label><input type="checkbox" /> Within 30 Days</label>
            <label><input type="checkbox" /> Within 45 Days</label>
          </div>

        </div>

        <div className="job-cards-section">

          {role == "Company" ? (
            currentProfiles.map((job) => (
              <JobCard key={job._id} {...job} />
            ))) : currentProfiles.map((profile) => (
              <div className="job-card" key={profile._id}>
                <div className="job-card-header">
                  <img src={profile.image} alt="profile" className="profile-img" />
                  <div>
                    <h3>{profile.name}</h3>
                    <p>{profile.currentPosition}</p>
                    <p className="companyname">{profile.currentCompanyName}</p>
                  </div>
                  <button className="bookmark-btn"><img src={vector} /></button>
                </div>

                <p className="job-desc">
                  {(() => {
                    const words = profile.about ? profile.about.split(" ") : [];
                    if (words.length <= 10) return profile.about;
                    return words.slice(0, 10).join(" ") + " ...";
                  })() || "We are looking for someone with experience using AI software to create realistic product photos."}
                </p>


                <div className="job-infos">
                  <span> <MdOutlineLocationOn color="#3399ff" size={25} /> {profile.location}</span>
                  <span><IoMdTime color="#3399ff" size={25} />  {profile.noticePeriod
                    ? `${profile.noticePeriod} Days N.P`
                    : "20 Days N.P"
                  }
                  </span>
                </div>

                <div className="skills">
                  {profile.skillName.slice(0, 4).map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}

                </div>

                <button className="view-profile-btn" onClick={() => navigate(`/employee-profile/${profile._id}`)} >View Profile</button>
              </div>
            ))}





        </div>
      </div>

      {/* Pagination */}
      {/* <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(profilesData.length / profilesPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &#8249; Prev
        </button>

        {paginationRange.map((page, index) =>
          page === "..." ? (
            <span key={index} className="dots">...</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next &#8250;
        </button>
      </div>
















      {/* <div className="emp-filterBox">
        <div className="filter-container">
          <div className="sidebar">
            <div className="sidebar-boxOne">
              <div className="sidbar-filter-head">
                <p className="sidebar-heading">Filter</p>
                <button onClick={handleResetFilters}>Reset</button>
              </div>

              <div className="employment-filter">
                <p className="sidebar-heading">Work mode</p>
                {["Work from office", "Remote", "Hybrid"].map((mode) => (
                  <div className="empTypeOne" key={mode}>
                    <input
                      type="checkbox"
                      checked={filters.workMode.includes(mode)}
                      onChange={() => handleCheckboxChange("workMode", mode)}
                    />
                    <p>{mode}</p>
                  </div>
                ))}
              </div>

              <div className="salary-range">
                <p className="sidebar-heading">Salary Range</p>
                <SalaryFilterCard />
              </div>

              <div className="employment-filter">
                <p className="sidebar-heading">Experience Level</p>
                {[
                  { label: "Fresher (1 year experience)", value: 1 },
                  { label: "Junior (2 year experience)", value: 2 },
                  { label: "Associate (2-5 year experience)", value: "2-5" },
                  { label: "Mid Level (5-10 year experience)", value: "5-10" },
                  { label: "Senior (10+ year experience)", value: "10+" },
                ].map((exp) => (
                  <div className="empTypeOne" key={exp.value}>
                    <input
                      type="checkbox"
                      checked={filters.experienceInStack.includes(exp.value)}
                      onChange={() =>
                        handleCheckboxChange("experienceInStack", exp.value)
                      }
                    />
                    <p>{exp.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-boxTwo">
              <div className="employment-filter">
                <p className="sidebar-heading">Active Joiner</p>
                {[
                  "Within 7 Days",
                  "Within 15 Days",
                  "Within 30 Days",
                  "Within 45 Days",
                ].map((time) => (
                  <div className="empTypeOne" key={time}>
                    <input
                      type="checkbox"
                      checked={filters.activeJoiners.includes(time)}
                      onChange={() =>
                        handleCheckboxChange("activeJoiners", time)
                      }
                    />
                    <p>{time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="filter-cards">
            <div className="filter-top">
              <div className="top-filters">
                <div className="input-with-icon">
                  <input
                    type="text"
                    name="jobType"
                    placeholder="Select Job Type"
                    value={filters.expertTecStack}
                    onChange={handleStackChange}
                  />
                </div>
                <div className="filter-topverti-icon">
                  <TbMinusVertical size={30} color="#ddd" />
                </div>
                <div className="input-with-icon">
                  <input
                    type="text"
                    name="designation"
                    value={filters.designation}
                    placeholder="Enter Keyword/Designation"
                    onChange={handleStackChange}
                    onKeyDown={handleStackChange}
                  />
                </div>
                <div className="filter-topverti-icon">
                  <TbMinusVertical size={30} color="#ddd" />
                </div>
                <div className="input-with-icon">
                  <input
                    type="text"
                    name="experience"
                    value={filters.designation}
                    placeholder="Experience"
                    onChange={handleStackChange}
                    onKeyDown={handleStackChange}
                  />
                </div>

                <div className="filter-topverti-icon">
                  <TbMinusVertical size={30} color="#ddd" />
                </div>
                <div className="input-with-icon">
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    placeholder="Enter location"
                    onChange={handleLocationChange}
                    onKeyDown={handleLocationChange}
                  />
                </div>
              </div>
              <button className="filter-search-btn">Search</button>
            </div>

            <div className="topfilt-details">
              <p>{profiles.length} Frontend Developer Candidates</p>
              <a href="#">Send me jobs like these</a>
              <p>
                <span>Sort by:</span> Recommended <FaAngleDown />
              </p>
            </div>

            <div className="all-cards">
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                currentCards.map((profile) => (
                  <SelectedProfCard
                    key={profile._id}
                    id={profile._id}
                    selectprof={
                      profile.image ||
                      "https://img.freepik.com/free-photo/asian-woman-posing-looking-camera_23-2148255359.jpg"
                    }
                    selProfname={profile.name}
                    role={profile.currentPosition}
                    companyName={profile.currentCompanyName}
                    location={profile.location}
                    noticePeriod={profile.noticePeriod}
                    gender={profile.gender}
                    about={profile.about}
                    skills={profile.skillName}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="nextpage-btns">
          <div className="filtPageBtns">
            <button
              className="previousfiltBtn"
              onClick={handlePreviousClick}
              disabled={currentPage === 1}
            >
              <GoArrowLeft
                size={22}
                color="#ea4232"
                className="nextIconBottom"
              />{" "}
              Previous
            </button>

            <button className="currentpagefiltBtn">{currentPage}</button>

            <button className="nextfiltBtn" onClick={handleNextClick}>
              Next{" "}
              <GoArrowRight
                size={22}
                color="#ea4232"
                className="previewIconBottom"
              />
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default EmpFilter;
