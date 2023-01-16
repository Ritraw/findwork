import React from 'react'
import { useContext } from 'react';
import { userContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import {auth} from '../../../components/FirebaseConfig'
import { Button,Grid, TextField } from '@mui/material';
import { useState } from 'react';
import Dropdown from '../../common/Dropdown';
import './onBoarding.css'
import { primaryRole } from '../../../constant';

function CandidateOnboarding() {
  const [state , dispatch] = useContext(userContext);
  const [userData, setUserData] = useState({
    name: "",
    email:"",
    photo:"",
    uid:"",
    phoneNumber:"",
    primaryRole:"",
    linkedIn:"",
    skills:[],
    bio:"",
    resume:""
  })
  const navigate = useNavigate(); 
  const logout = ()=>{
    auth.signOut()
    dispatch({
      type: "LOGOUT",
    })
    navigate('/candidate/auth')
  }

  return (
      <Grid className='onboarding-container' container spacing={3}>
        <Grid item xs={12}>
          <Button onClick={logout} variant='contained' color='primary'>Logout</Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className='label'>Name</div>
          <TextField size='small' fullWidth
            value={userData.name}
            required
            onChange={(e)=> setUserData({...userData, name: e.target.value})}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className='label'>Email</div>
          <TextField size='small' fullWidth
             value={userData.email}
             required
             onChange={(e)=> setUserData({...userData, email: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='label'>Phone NO.</div>
          <TextField size='small' fullWidth
             value={userData.phoneNumber}
             required
             onChange={(e)=> setUserData({...userData, phoneNumber: e.target.value})}
            />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className='label'>PrimaryRole</div>
          <Dropdown
            dropdowndata={primaryRole}

            onChange={(newval)=>setUserData({...userData,primaryRole:newval})}
            value={userData.primaryRole}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className='label'>linkedIn</div>
          <TextField size='small' fullWidth
           value={userData.linkedIn}
           required
           onChange={(e)=> setUserData({...userData, linkedIn: e.target.value})}
        />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className='label'>Skills</div>
          <TextField size='small' fullWidth
          value={userData.skills}
          required
          onChange={(e)=> setUserData({...userData, skills: e.target.value})}
        />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className='label'>Bio</div>
          <TextField size='small' fullWidth
           value={userData.bio}
           required
           onChange={(e)=> setUserData({...userData, bio: e.target.value})}
        />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className='label'>Resume</div>
          <TextField size='small' fullWidth
          type={"file"}
          // value={userData.resume}
          // required
          // onChange={(e)=> setUserData({...userData, resume: e.target.value})}
       />
        </Grid>

        <Grid item xs={12}>
          <Button variant='contained' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
  )
}

export default CandidateOnboarding