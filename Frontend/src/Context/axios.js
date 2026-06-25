import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER
console.log("Base URL:", baseURL);
export default axios.create({
    
  baseURL: baseURL,

  withCredentials: true
});