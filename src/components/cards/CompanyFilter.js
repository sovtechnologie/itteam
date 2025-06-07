import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../../stylesheets/CompFilter.css";
import SalaryFilterCard from "./SalaryFilterCard";

import { useNavigate, useSearchParams } from "react-router-dom";

import JobCard from "./JobCard";


const CompanyFilter = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [searchParams] = useSearchParams();

    const [salaryRange, setSalaryRange] = useState([2, 20]);
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);


    const BASE_URL = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";
    const profilesPerPage = 12;

    const [filters, setFilters] = useState({
        workMode: [],
        experienceInStack: [],
        activeJoiners: [],
        state: "",
        location: "",
        currentPosition: "",
        expertTecStack: "",
        skillName: [],
        noticePeriod: [],
        salary: [0, 2000000]
    });


 

    const handleCheckboxChange = (category, value) => {
        setFilters((prevFilters) => {
            let updatedValues = [...prevFilters[category]];
            if (updatedValues.includes(value)) {
                updatedValues = updatedValues.filter((v) => v !== value);
            } else {
                updatedValues.push(value);
            }
            return { ...prevFilters, [category]: updatedValues };
        });
    };

    const handleLocationChange = (event) => {
        setFilters((prevFilters) => ({ ...prevFilters, location: event.target.value }));
    };

    const handleStackChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            expertTecStack: event.target.value,
            currentPosition: event.target.value,
        }));
    };
    console.log("Filters:", filters);

    const handleResetFilters = () => {
        setFilters({
            workMode: [],
            experienceInStack: [],
            activeJoiners: [],
            state: "",
            location: "",
            currentPosition: "",
            expertTecStack: "",
            skillName: [],
            noticePeriod: [],
            salary: [0, 200000],
        });
    };

    useEffect(() => {
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
            setRole(searchParams.get("role"));
        }
    }, []);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                setIsLoading(true);
                setError(null);

                let validFilters = {};

                if (filters.workMode.length) validFilters.Job_type = filters.workMode;
                if (filters.experienceInStack.length) validFilters.experienceInStack = filters.experienceInStack;
                if (filters.activeJoiners.length) validFilters.activeJoiners = filters.activeJoiners;
                if (filters.state) validFilters.state = filters.state;
                if (filters.location) validFilters.location = filters.location;
                if (filters.currentPosition) validFilters.currentPosition = filters.currentPosition;
                if (filters.expertTecStack) validFilters.expertTecStack = filters.expertTecStack;
                if (filters.skillName.length) validFilters.skillName = filters.skillName;
                if (filters.noticePeriod.length) validFilters.noticePeriod = filters.noticePeriod;


                let response = Object.keys(validFilters).length
                    ? await axios.post(`${BASE_URL}/api/userFilter`, validFilters)
                    : await axios.post(`${BASE_URL}/api/userFilter`);

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

        const timeoutId = setTimeout(() => fetchProfiles(), 500);
        return () => clearTimeout(timeoutId);
    }, [filters]);

    const handleSalaryChange = (range) => {
        setFilters((prev) => ({ ...prev, salary: range }));
    };

    useEffect(() => {
        axios.post(`${BASE_URL}/api/userFilter`).then((res) => {
            if (res.data.status === 200) {
                setUsers(res.data.result);
            }
        }).catch((err) => console.error("API Error:", err));
    }, []);

    useEffect(() => {
        axios.get(`${BASE_URL}/withOutLogin/getAllCompanyHomePage`).then((response) => {
            if (response.data.status === 200) {
                setCompanies(response.data.result);
            }
        }).catch((error) => console.error("Error fetching companies:", error));
    }, []);

    

    // Fetch cities when state changes
    useEffect(() => {
        const fetchCities = async () => {
            setLoadingCities(true);
            try {
                const response = await axios.get(`${BASE_URL}/withoutLogin/getActiveLocation`);
                if (response.data?.locations) {
                    setCities(response.data.locations);
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
            } finally {
                setLoadingCities(false);
            }
        };

        fetchCities();
    }, []);

    

    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = companies.slice(indexOfFirstProfile, indexOfLastProfile);

    const totalPages = Math.ceil(companies.length / profilesPerPage);

    const paginationRange = useMemo(() => {
        const startPages = [1, 2, 3];
        const endPages = [totalPages - 2, totalPages - 1, totalPages];
        const pagination = [...startPages];

        if (totalPages > 6) {
            pagination.push("...");
            pagination.push(...endPages);
        } else {
            for (let i = 4; i <= totalPages; i++) pagination.push(i);
        }
        return pagination;
    }, [totalPages]);

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1);
    }, [totalPages, currentPage]);

    const noticePeriodLabel = (value) => {
        switch (value) {
            case "1":
            case 1:
                return "Immediate";
            case "2":
            case 2:
                return "7 days N.P";
            case "3":
            case 3:
                return "15 days N.P";
            case "4":
            case 4:
                return "30 days N.P";
            case "5":
            case 5:
                return "45 days N.P";
            default:
                return "Not specified";
        }
    };


    return (
        <>

            <div className="job-search-bar">
                <div className="search-fields"> {/* 🆕 Wrap fields separately */}
                  

                    <input
                        type="text"
                        className="search-input"
                        placeholder="Enter keyword / designation"
                        value={filters.expertTecStack}
                        onChange={handleStackChange}
                    />

                    <div className="divider" />

                   
                   
                 




                    <div className="select-wrapper">
                        <select
                            className="search-select"
                            value={filters.location || ""}
                            onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                        >
                            <option value="">Select City</option>
                            {loadingCities ? (
                                <option disabled>Loading...</option>
                            ) : (
                                cities.map((city, index) => (
                                    <option key={city.location} value={city.location}>
                                        {city.location}
                                    </option>
                                ))
                            )
                            }
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
                        {[
                            { label: "W.F.O", value: 1 },
                            { label: "Remote", value: 2 },
                            { label: "Hybrid", value: 3 },
                        ].map((mode) => (
                            <div key={mode.value}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filters.workMode.includes(mode.value)}
                                        onChange={() => handleCheckboxChange("workMode", mode.value)}
                                    />
                                    {mode.label}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h3 style={{ marginBottom: "10px" }}>Experience level</h3>

                        {[
                            { label: "Fresher", value: 1 },
                            { label: "Junior", value: 2 },
                            { label: "Mid-Level", value: 3 },
                            { label: "Senior", value: 4 },
                        ].map((exp) => (
                            <div key={exp.label}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filters.experienceInStack.includes(exp.value)}
                                        onChange={() => handleCheckboxChange("experienceInStack", exp.value)}
                                    />
                                    {exp.label}
                                </label>
                            </div>
                        ))}

                    </div>

                    <div className="filter-group">
                        <h3 style={{ marginBottom: "10px" }}>Active Joiner</h3>
                        {[
                            { label: "Immediate", value: 1 },
                            { label: "Within 7 Days", value: 2 },
                            { label: "Within 15 Days", value: 3 },
                            { label: "Within 30 Days", value: 4 },
                            { label: "Within 45 Days", value: 5 },
                        ].map((joiner) => (
                            <label key={joiner.value}>
                                <input
                                    type="checkbox"
                                    checked={filters.activeJoiners.includes(joiner.value)}
                                    onChange={() => handleCheckboxChange("activeJoiners", joiner.value)}
                                />
                                {joiner.label}
                            </label>
                        ))}
                    </div>

                </div>

                <div className="job-cards-section">

                    {/* Show message if no profiles found */}
                    {(!isLoading && (error || companies.length === 0)) && (
                        <div
                            className="no-data-message"
                        >
                            {error || "No profiles found for the selected filters."}
                        </div>
                    )}

                    {   currentProfiles.map((job) => (
                            <JobCard key={job._id} {...job} />
                        ))
                        }
                </div>
            </div>


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
















        </>
    );
};

export default CompanyFilter;
