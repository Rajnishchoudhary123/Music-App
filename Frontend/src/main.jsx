import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Context/user.jsx'
import { SongProvider } from './Context/song.jsx'
import Player from './components/Player.jsx'
// import FullScreenPlayer from './components/FullScreenPlayer.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
   
   <UserProvider>
  <SongProvider>

   <App />

  </SongProvider>

 

   </UserProvider>

  

   
   

  

   

   

  
   
  </StrictMode>,
)
