import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER || "http://localhost:5000";
console.log("Base URL:", baseURL);
export default axios.create({
    
  baseURL: baseURL,

  withCredentials: true
});