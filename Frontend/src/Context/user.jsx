import { useContext, useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "./axios.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  async function registerUser(name, email, password, navigate) {
    setButtonLoading(true);

    try {
      const { data } = await axios.post(
        "/api/user/register",
        { name, email, password },
        { withCredentials: true }
      );

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setButtonLoading(false);
    }
  }

  async function loginUser(email, password, navigate) {
    setButtonLoading(true);

    try {
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setButtonLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me", {
        withCredentials: true,
      });

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
    try {
      const { data } = await axios.get("/api/user/users", {
        withCredentials: true,
      });
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(id) {
    try {
      const { data } = await axios.delete(`/api/user/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

 async function logoutUser(navigate) {
  try {
    const { data } = await axios.get("/api/user/logout", {
      withCredentials: true,
    });

    setUser(null);
    setIsAuth(false);

    toast.success(data.message || "Logged out successfully");

    navigate("/login", { replace: true });
  } catch (error) {
    toast.error(error?.response?.data?.message || "Logout failed");
  }
}

  async function addToPlaylist(id) {
    try {
      const { data } = await axios.post(
        "/api/user/song/" + id,
        {},
        { withCredentials: true }
      );

      toast.success(data.message);
      fetchUser();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    }
  }

  async function toggleLikeSong(id) {
    try {
      const { data } = await axios.post(
        "/api/user/like/" + id,
        {},
        { withCredentials: true }
      );

      toast.success(data.message);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }

  async function getLikedSongs() {
    const { data } = await axios.get("/api/user/liked", {
      withCredentials: true,
    });
    return data;
  }
  async function buyPremium() {
  try {
    setButtonLoading(true);

    const { data } = await axios.post(
      "/api/payment/subscribe",
      {},
      { withCredentials: true }
    );

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Payment start nahi hua");
  } finally {
    setButtonLoading(false);
  }
}
async function cancelPremium() {
  try {
    setButtonLoading(true);

    const { data } = await axios.post(
      "/api/payment/cancel-subscription",
      {},
      { withCredentials: true }
    );

    toast.success(data.message || "Subscription cancelled");
    await fetchUser();
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Subscription cancel nahi hua"
    );
  } finally {
    setButtonLoading(false);
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
        loading,
        fetchUsers,
        deleteUser,
        users,
        toggleLikeSong,
        getLikedSongs,
        fetchUser, 
        buyPremium ,
        cancelPremium
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);