import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true, 
});

api.interceptors.request.use(
  (config) => {
    console.log('All Cookies:', Cookies.get("jwtToken")); // Log all cookies

    const token = Cookies.get("jwtToken")

    console.log('Extracted Token:', token || 'Token not found');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    

    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login...");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default api;
// import axios from "axios";

// // Function to get JWT Token from document.cookie
// const getTokenFromCookie = () => {
//   const cookies = document.cookie.split("; ");
//   const jwtCookie = cookies.find((row) => row.startsWith("jwtToken="));
//   console.log(jwtCookie)
//   return jwtCookie ? jwtCookie.split("=")[1] : null;
// };

// const api = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com",
//   withCredentials: true, // Ensures credentials (cookies) are sent
// });
// // Request Interceptor: Attach Authorization Token
// api.interceptors.request.use(
//   (config) => {
//     const token = getTokenFromCookie(); // Get token from cookie
//     console.log("Extracted Token: ", token);

//     if (!token) {
//       console.warn("No auth token found, request blocked.");
//       return Promise.reject("No authentication token.");
//     }

//     config.headers.Authorization = `Bearer ${token}`;
//     console.log("Request Sent with Auth Token: ", config);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log("Response Received: ", response);
//     return response;
//   },
//   (error) => {
//     console.error("Error Response: ", error);
//     return Promise.reject(error);
//   }
// );

// export default api;
