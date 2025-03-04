import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import {Toaster} from 'react-hot-toast'

function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()

  console.log({onlineUsers});
  

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  
  if(isCheckingAuth&&!authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to={'/login'}/>}/>
        <Route path='/signup' element={!authUser?<Signup/>:<Login/>}/>
        <Route path='/login' element={!authUser?<Login/>:<Navigate to={'/'}/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profile' element={authUser?<Profile/>:<Navigate to={'login'}/>}/>
      </Routes>
    </div>
  )
}

export default App
