import axios from "axios";

export default axios.create({
  baseURL: ["http://localhost:5000", 
    import.meta.env.VITE_SERVER
  ],
  withCredentials: true
});