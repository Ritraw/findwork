import { Button, Grid, TextField,IconButton, InputAdornment } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import './employerjob.css'
import SearchIcon from "@mui/icons-material/Search";
import EmployerJobCard from './EmployerJobCard';
import Loadingprofile from '../../common/Skeleton/Loadingprofile';
import { userContext } from '../../context/userContext';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import {doc,query,setDoc,where} from 'firebase/firestore';
import {db} from '../../FirebaseConfig';

function Sidebar({setMobileFormView,selectedJob, setSelectedJob}){
  
  const [search, setSearch] = React.useState("");
  const [state,dispatch] = React.useContext(userContext);
  const [allJobs, setAllJobs] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState(null);
  useEffect(() => {
   const filter= allJobs?.filter((job) => {
      return job.jobTitle.toLowerCase().includes(search.toLowerCase());
    })
    setFilteredJobs(filter);
    
  }, [search]);

  const fetchAllJobs = async () => {
    //call firebase to check if all the jobs with the employer id is the same as the current user

    const q = query(collection(db, "jobs"), where("companyId", "==", state.userInfo.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const alljobs = [];
      querySnapshot.forEach((doc) => {
        alljobs.push(doc.data());
      });
      setAllJobs(alljobs);
    });
    return () => unsubscribe();

  };

  useEffect(() => {
    fetchAllJobs();
  }, []);
  return (
    <div
    className="sidebar-container"
   
    >
      <Grid item xs={12}>
        <div>
      <button
      className="post-btn"
        onClick={() => {setMobileFormView(true);setSelectedJob(null)}}
      >
       <div>+ post a job</div>
       <div>Post your requirements and hire candidates</div>
      </button>
      <TextField
        size="small"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          margin: "10px 0px",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        />
        </div>
      </Grid>
     

       {filteredJobs==null?(
        <Loadingprofile fields={10} height={200} />
       ):filteredJobs.length===0?(<div>no data</div>)
       :
       ( <Grid item xs={12}>
          {filteredJobs.map((item,i) => {
            return(
              <EmployerJobCard
              item={item}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
              
              />
            )
          })}
          </Grid>)}
    </div>
  );
}

export default Sidebar;