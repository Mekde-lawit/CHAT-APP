import { Routes, Route } from 'react-router-dom'
import { Loader } from 'lucide-react'

import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LogInPage.jsx'
import SettingsPage from './pages/SettingPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import NavBar from './components/NavBar.jsx'

import {useAuthStore} from './store/useAuthStore.js'
import { useEffect } from 'react'
 

const App = () => {

  const { isCheckingAuth,authUser, checkAuth } = useAuthStore();
  useEffect (()=>{
    checkAuth();
  },[checkAuth]);

  console.log("Auth User:", {authUser});

  if (isCheckingAuth && !authUser) return (
    <div className="flex justify-center items-center h-screen"> 
    <Loader className="size-10 animate-spin text-blue-500" />
    </div>
  )

  return (
   <div>
     <NavBar />
     <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/signup" element={<SignupPage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path='/settings' element={<SettingsPage />} />
       <Route path="/profile" element={<ProfilePage />} />

     </Routes>
   </div>
  )
}

export default App