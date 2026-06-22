import { useContext, useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "./axios.js";
import { data } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users , setUsers] = useState([])
  async function registerUser(name, email, password, navigate) {
    setButtonLoading(true);

    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password
      });

      toast.success(data.message);

      setUser(data.user);
      setIsAuth(true);

      navigate("/");

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      setButtonLoading(false);
    }
  }


  async function loginUser(email, password, navigate) {
    setButtonLoading(true);

    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password
      });

      toast.success(data.message);

      setUser(data.user);
      setIsAuth(true);

      navigate("/");

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setButtonLoading(false);
    }
  }

   async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");

      setUser(data);
      setIsAuth(true);

    } catch (error) {
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUsers() {

    try{

      const {data} = await axios.get("/api/user/users")
      
      setUsers(data)


    }catch(error){

      console.log(error)

    }
  
  }

   async function deleteUser(id) {
  try {
    const { data } = await axios.delete(`/api/user/${id}`);

    toast.success(data.message);

    fetchUsers();
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
}


  async function logoutUser() {
    try {
      await axios.get("/api/user/logout");

      setUser(null);
      setIsAuth(false);

      window.location.href = "/login";

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Logout failed"
      );
    }
  }



  async function addToPlaylist(id) {
    try {
      const { data } = await axios.post(
        "/api/user/song/" + id
      );

      toast.success(data.message);

      fetchUser();

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed"
      );
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);




  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        addToPlaylist,
        user,
        isAuth,
        buttonLoading,
        loading ,
        fetchUsers ,
        deleteUser,
        users
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
