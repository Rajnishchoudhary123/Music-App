import React from 'react'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import { UserData } from './Context/user'
import Loading from './components/Loading'
import Admin from './pages/Admin'
import PlayList from './pages/PlayList'
import Premium from './pages/Premium'
import Success from './pages/Success'
import Profile from "./pages/Profile";
import Player from './components/Player'

import Dashboard from './pages/Dashboard'
import AlbumPage from './pages/AlbumPage'
import Albums from './components/Album'
import RecentlyPlayed from './pages/RecentlyPlayed'




const App = () => {

  const {loading , user , isAuth} = UserData();

  return (
    <>  
    {loading ? (<Loading/>):(
<BrowserRouter>

<Routes>

<Route path='/' element={isAuth ?<Home/>:<Login/>} />
<Route path='/playlist' element={isAuth ? <PlayList user={user} /> : <Login/>} />
<Route path='/premium' element={<Premium/>} />
<Route path="/success" element={<Success/>}/>
<Route path='/admin' element={isAuth ? <Admin/> : <Login/>} />
<Route path='/login' element={isAuth ?<Home/>:<Login/>} />
<Route path='/register' element={isAuth? <Home/>:<Register/>}/>
<Route path="/profile" element={<Profile />} />
<Route path="/albums" element={<Albums/>} />
<Route path="/album/:id" element={<AlbumPage/>} />
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/recently-played' element={<RecentlyPlayed/>} />
</Routes>


</BrowserRouter>
    )}



    </>
  )
}

export default App