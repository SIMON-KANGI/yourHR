import React from 'react'
import NavBar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import Jobs from './pages/jobs/jobs'
import JobDetails from './pages/jobs/jobDetails'
import Home from './pages/Home'
import AppDetails from './pages/applications/AppDetails'
import Footer from './components/Footer'
function App() {
  return (
    <main id="app" className='min-h-screen'>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:title" element={<JobDetails />} />
      <Route path="/jobs/applicants/:username" element={<AppDetails />} />
    </Routes>
    <Footer/>
    </main>
  )
}

export default App
