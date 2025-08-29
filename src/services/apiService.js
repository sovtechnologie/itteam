import axios from "axios";
import api from "./api";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

const BASE_URL = "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com";

export const fetchTechStacks = async () => {
  try {
    const response = await axios.get(
      "https://qi0vvbzcmg.execute-api.ap-south-1.amazonaws.com/withOutLogin/tech-stack-list"
    );

    if (response.data && response.data.result) {
      return response.data.result
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
  }
};


export const fetchEmployment = async (authToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/getAllExperience`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      }
    }
    );

    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error fetching employment types:", error);
  }
}

export const fetchEducation = async ({ authToken }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/getAllEducations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      }
    }
    );

    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error fetching education types:", error);
  }
};


export const fetchProjects = async ({ authToken }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/getAllProjects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      }
    }
    );

    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}


export const fetchSkills = async ({ authToken }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/getAllSkills`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      }
    }
    );

    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error fetching skills:", error);
  }
}

export const fetchAboutUs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/getAboutMe`);

    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error fetching About Us data:", error);
  }
}

export const fetchLicenses = async ({ authToken }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/getAllCertificate`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      }
    }
    );

    if (response.data && response.data.res) {
      return response.data.res;
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Error fetching licenses:", error);
  }
}

export const fetchtopskillandlocation = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/home/getSkillCountAndLocationCount`
    );
    if (response.data) {
      return response.data;
    } else {
      console.error('Invalid response format:', response);
    }

  } catch (error) {
    console.error("Error fetching topskill and location for job")
  }
}

export const fetchStateList = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/withOutLogin/get-state-list`, {
      params: { countryCode: "IN" },
    }
    )
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      console.error("Invalid response format:", response);
      return []; // return empty array on unexpected response
    }

  } catch (error) {
    throw error.response?.data || " Failed to fetch State list";
  }
}
export const fetchCityList = async (selectedStateCode) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/withoutLogin/getCityList`, {
      stateName: selectedStateCode, // Use selectedState directly if it's the state name
      countryCode: "IN",
    }
    )
    if (response.data) {
      return response.data.result;
    } else {
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    throw error.response?.data || " Failed to fetch City list";
  }
}

export const postJob = async (jobData) => {
  try {
    const response = await api.post(
      "employer/addJobs",
      jobData
    );
    return response.data;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error.response?.data || "Failed to post job";
  }
};

export const getAllJobs = async () => {
  try {
    const response = await api.get("/withoutLogin/getAllLatestJobs");
    return response?.data;
  } catch (error) {
    console.error("Error fetching job ", error);
    throw error.response?.data || "Failed to fetch jobs"
  }
}

export const fetchJobPosts = async () => {
  try {
    const response = await api.get("employer/getAllJobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error.response?.data || "Failed to fetch job posts";
  }
};

export const EditJobPost = async (updatedJobData) => {
  try {
    const response = await api.put('employer/editJobs', updatedJobData);
    return response.data;
  } catch (error) {
    console.error("Error updating job post:", error);
    throw error.response?.data || "Failed to update job post";
  }
};

export const deleteJobPost = async (userId) => {
  try {
    const response = await api.post('employer/deleteJobs', { userId });
    return response.data;
  } catch (error) {
    console.error("Error deleting job post:", error);
    throw error.response?.data || "Failed to delete job post";
  }
};


export const getSingleJob = async (jobId) => {
  try {
    const response = await api.post('withoutLogin/getSingleJobs', { jobId });
    return response?.data;
  } catch (error) {
    console.error("Error get details job post:", error);
    throw error.response?.data || "Failed to get details job post";
  }
}



// export const fetchActiveJoiners = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/withOutLogin/active-limited-joiner`);

//     if (response.headers["content-type"]?.includes("application/json")) {
//       return response.data;
//     } else {
//       throw new Error("Invalid response format. Expected JSON.");
//     }
//   } catch (error) {
//     console.error("Error fetching active joiners:", error);
//     throw error.response?.data || "Failed to fetch active joiners";
//   }
// };

// export const sendOtp = async (mobileNumber, countryCode, purpose) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/mobileNumberVerificationSendOtp`, {
//       mobile: mobileNumber,
//       country_code: countryCode,
//       purpose,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     throw error.response?.data || "Failed to send OTP";
//   }
// };




// export const verifyOtp = async (otp, verificationId) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/mobileNumberVerificationSetup`, {
//       otp,
//       id: verificationId,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     throw error.response?.data || "Failed to verify OTP";
//   }
// };

// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/register`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("Error during registration:", error);
//     throw error.response?.data || "Failed to register";
//   }
// };
