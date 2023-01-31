import React, { useContext, useState } from 'react'
import { Button, Grid, TextField } from "@mui/material";
import Dropdown from '../../common/Dropdown';
import SearchDropdown from '../../common/SearchDropdown';
import { primaryRole, skills, jobType,jobLocation,currency,experience } from '../../../constant';
import {addDoc,collection,doc,getDocs,query,setDoc,where} from 'firebase/firestore';
import {db} from '../../FirebaseConfig';
import toastMessage from '../../../util/toastMessage';
import { userContext } from '../../context/userContext';
function JobForm({ selectedJob, setSelectedJob,setMobileFormView }) {
  const[state,dispatch] = useContext(userContext);
  const [isEdit, setIsEdit] = useState(selectedJob ? true : false);
  const [jobData, setjobData] = useState({
    jobTitle: "", 
    jobType: "", 
    jobLocation: "", 
    jobDescription: "", 
    primaryRole: "", 
    yearsOfExperience: "", 
    salaryRange: {
      min: "",
      max: "",
      currency: "",
    },
    skills: [],
  });
  const handleSkills = (newval)=>{

    console.log(newval)
    if(jobData.skills.includes(newval.value)) return;
    else{
    setjobData({...jobData, skills:[...jobData.skills,newval.value]})
  }}

  const handleDelete = (item)=>{
    setjobData({...jobData, skills: jobData.skills.filter((skill)=> skill !== item)})
  }
  
  const submit= async(e)=>{
    e.preventDefault()
    console.log(jobData)
    const q = query(collection(db,"userInfo"),where("userId","==",state.user.uid))
    // store job in firebase
    try{
    await addDoc(collection(db,"jobs"),{
      ...jobData,
      createdAt: new Date(),
      companyId: "",
      companyName: "",
      companyLogo: "",
     });
     toastMessage({
      type:"success",
      message: "Job added Successfully"
     })
    }
    catch(err){
      console.log(err);
      toastMessage({
        type:"error",
        message:"Something went wrong"
      })
    }
  }
  
 



  return (
    <form
    onSubmit={(e)=> submit(e)}
    >
      <Grid className='onboarding-container' container spacing={3}>
        <Grid item xs={12}>
        <Button
            variant="contained"
            color="primary"
            sx={{
              marginRight: "10px",
            }}
            onClick={() => setIsEdit((p) => !p)}
          >
            {isEdit ? "cancel" : "Edit"}
          </Button>
          
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className='label'>Job Title</div>
          <TextField 
            disabled={!isEdit}
            size='small' fullWidth
            value={jobData.jobTitle}
            required
            onChange={(e)=> setjobData({...jobData, jobTitle: e.target.value})}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className='label'>Job Type</div>
          <Dropdown
          disabled={!isEdit}
            dropdowndata={jobType}

            onChange={(newval)=>setjobData({...jobData,jobType:newval})}
            value={jobData.jobType}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className='label'>Job Location</div>
          <Dropdown
          disabled={!isEdit}
            dropdowndata={jobLocation}

            onChange={(newval)=>setjobData({...jobData,jobLocation:newval})}
            value={jobData.jobLocation}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className='label'>PrimaryRole</div>
          <Dropdown
          disabled={!isEdit}
            dropdowndata={primaryRole}

            onChange={(newval)=>setjobData({...jobData,primaryRole:newval})}
            value={jobData.primaryRole}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className='label'>yearsOfExperience</div>
          <Dropdown
          disabled={!isEdit}
            dropdowndata={experience}

            onChange={(newval)=>setjobData({...jobData,yearsOfExperience:newval})}
            value={jobData.yearsOfExperience}
          />
        </Grid>
        
        <Grid item xs={12}>
          <div className="label">Salary Range</div>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Dropdown
                disabled={!isEdit}
                dropdowndata={currency}
                onChange={(newval) =>
                  setjobData({
                    ...jobData,
                    salaryRange: { ...jobData.salaryRange, currency: newval },
                  })
                }
                value={jobData.salaryRange.currency}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={!isEdit}
                size="small"
                fullWidth
                value={jobData.salaryRange.min}
                onChange={(e) =>
                  setjobData({
                    ...jobData,
                    salaryRange: {
                      ...jobData.salaryRange,
                      min: e.target.value,
                    },
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={!isEdit}
                size="small"
                fullWidth
                value={jobData.salaryRange.max}
                onChange={(e) =>
                  setjobData({
                    ...jobData,
                    salaryRange: {
                      ...jobData.salaryRange,
                      max: e.target.value,
                    },
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className="label">Job Description</div>
          <TextField
            disabled={!isEdit}
            multiline
            rows={4}
            size="small"
            fullWidth
            value={jobData.jobDescription}
            onChange={(e) =>
              setjobData({
                ...jobData,
                jobDescription: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className='label'>Skills</div>
          <SearchDropdown
          disabled={!isEdit}
          dropdowndata={skills}
          onChange={(newval)=> handleSkills(newval)}
          values = {jobData.skills}
          handleDelete={handleDelete}
          /> 
        </Grid>

        <Grid item xs={12}>
          {isEdit && (
          <Button
          className='submit-btn' 
           disabled={
            jobData.name === "" ||
            jobData.email === "" ||
            jobData.phoneNumber === ""||
            jobData.primaryRole === ""||
            jobData.resume === ""||
            jobData.skills.length === 0
           }
          variant='contained' type='submit' color='primary'>
            Submit
          </Button>
          )}
        </Grid>
      </Grid>
    </form>
  )
}

export default JobForm