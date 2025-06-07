import axios from "axios";

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


export const fetchEmployment = async ({ authToken }) => {
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
