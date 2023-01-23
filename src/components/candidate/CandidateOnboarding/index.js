import React from 'react'
import { useContext } from 'react';
import { userContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import {auth,db} from '../../../components/FirebaseConfig'
import { Button,Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import Dropdown from '../../common/Dropdown';
import FileUpload from '../../common/FileUpload';
import './onBoarding.css'
import { primaryRole , skills} from '../../../constant';
import SearchDropdown from '../../common/SearchDropdown';
import { doc, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import toastMessage from '../../../util/toastMessage';

function CandidateOnboarding() {
  const [state , dispatch] = useContext(userContext);
  const [userData, setUserData] = useState({
    name: state.userInfo.displayName,
    email: state.userInfo.email ,
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

  const handleSkills = (newval)=>{

    console.log(newval)
    if(userData.skills.includes(newval.value)) return;
    else{
    setUserData({...userData, skills:[...userData.skills,newval.value]})
  }}
  useEffect(()=>{
    console.log(userData)
  },[userData]);

  const handleDelete = (item)=>{
    setUserData({...userData, skills: userData.skills.filter((skill)=> skill !== item)})
  }

  const submit = async(e) => {
    e.preventDefault()
    console.log(userData);

    // setDoc(docref, data)
    //doc(db ref, collection name, doc id)
    const userId = state.userInfo.uid;
    try{
      await setDoc(doc(db,"userInfo", userId ),{
        ...userData,
        userType: "candidate",
      })
      toastMessage({message: 'Profile created Successfully', type: 'success'})
      navigate("/candidate/profile")
    }
    catch(error){
      console.log(error)
      toastMessage({message: 'err.message',type: 'error'})
    }

  }
  return (
    <form
    onSubmit={(e)=> submit(e)}
    >
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
             disabled
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
          <SearchDropdown
          dropdowndata={skills}
          onChange={(newval)=> handleSkills(newval)}
          values = {userData.skills}
          handleDelete={handleDelete}
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
          <FileUpload
          required = {true}
          onUpload={(url)=> setUserData({...userData, resume: url})}
          value={userData.resume}
          type='file'
          />
        </Grid>

        <Grid item xs={12}>
          <Button 
           disabled={
            userData.name === "" ||
            userData.email === "" ||
            userData.phoneNumber === ""||
            userData.primaryRole === ""||
            userData.resume === ""||
            userData.skills.length === 0
           }
          variant='contained' type='submit' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default CandidateOnboarding