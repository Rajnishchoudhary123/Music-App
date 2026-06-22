import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { UserData } from "./Context/user";
import Loading from "./components/Loading";
import Admin from "./pages/Admin";
import PlayList from "./pages/PlayList";
import Premium from "./pages/Premium";
import Success from "./pages/Success";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AlbumPage from "./pages/AlbumPage";
import Albums from "./components/Album";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import Player from "./components/Player";
import AllSongs from "./pages/AllSongs";
import LikedSongs from "./pages/LikedSongs";

function AppRoutes({ isAuth, user }) {
  const location = useLocation();

  // jin routes par player hide chahiye
  const hidePlayerRoutes = ["/login", "/register", "/admin"];
  const shouldHidePlayer = hidePlayerRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route
          path="/playlist"
          element={isAuth ? <PlayList user={user} /> : <Login />}
        />
        <Route path="/premium" element={<Premium />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recently-played" element={<RecentlyPlayed />} />
        <Route path="/songs" element={<AllSongs/>} />
        <Route path="/liked" element={<LikedSongs />} />
      </Routes>

      {!shouldHidePlayer && isAuth && <Player />}
    </>
  );
}

const App = () => {
  const { loading, user, isAuth } = UserData();

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <AppRoutes isAuth={isAuth} user={user} />
    </BrowserRouter>
  );
};

export default App;