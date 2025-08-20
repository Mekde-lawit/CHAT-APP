import { Routes, Route } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LogInPage.jsx'
import SettingsPage from './pages/SettingPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import NavBar from './components/NavBar.jsx'

import {useAuthStore} from './store/useAuthStore.js'
import { useEffect } from 'react'
  

const App = () => {

  const { isCheckingAuth, checkAuth,authUser } = useAuthStore();
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
       <Route path="/" element={authUser ?<HomePage /> : <Navigate to="/login"/>}/>
       <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/"/>} />
       <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
       <Route path='/settings' element={<SettingsPage />} />
       <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

     </Routes>
   </div>
  )
}

export default App