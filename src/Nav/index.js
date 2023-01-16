import { RouterSharp } from '@mui/icons-material';
import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Auth from '../components/Auth';
import CandidateOnboarding from '../components/candidate/CandidateOnboarding';
import CandidateProfile from '../components/candidate/CandidateProfile';
import CandidateJobs from '../components/candidate/CandidateJobs';
import CandidateApplications from '../components/candidate/CandidateApplications';
import CandidateConversations from '../components/candidate/CandidateConversations';

import EmployerOnboarding from '../components/employer/EmployerOnboarding';
import EmployerProfile from '../components/employer/EmployerProfile';
import EmployerJobs from '../components/employer/EmployerJobs';
import EmployerApplications from '../components/employer/EmployerApplications';
import EmployerConversations from '../components/employer/EmployerConversations';

function Nav () {
  const CandidateProtectedRoutes = () =>{
    if(
      true
    ){
      return <Outlet/>;
    }

    else{
      return <Navigate to="/auth"/>;
    }
  }; 
    
  const EmployerProtectedRoutes = ()=>{
    if(
      true
    ){
      return <Outlet/>;
    } else{
      return <Navigate to="/auth"/>;
    }
  }
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/candidate/auth" element={<Auth type={'candidate'}/>}/>
            <Route path="/employer/auth" element={<Auth type={'employer'}/>}/>


            <Route element={<CandidateProtectedRoutes/>}>
              <Route path="/candidate/onboarding" element={<CandidateOnboarding/>}/>
              <Route path="/candidate/profile" element={<CandidateProfile/>}/>
              <Route path="/candidate/jobs" element={<CandidateJobs/>}/>
              <Route path="/candidate/applications" element={<CandidateApplications/>}/>
              <Route path="/candidate/conversations" element={<CandidateConversations/>}/>
            </Route>

            <Route element={<EmployerProtectedRoutes/>}>
              <Route path="/employer/onboarding" element={<EmployerOnboarding/>}/>
              <Route path="/employer/profile" element={<EmployerProfile/>}/>
              <Route path="/employer/jobs" element={<EmployerJobs/>}/>
              <Route path="/employer/applications" element={<EmployerApplications/>}/>
              <Route path="/employer/conversations" element={<EmployerConversations/>}/>
            </Route>
            
            

        </Routes>
    </BrowserRouter>
  )
}

export default Nav