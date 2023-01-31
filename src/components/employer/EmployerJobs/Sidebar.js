import { Button, Grid, TextField,IconButton, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './employerjob.css'
import SearchIcon from "@mui/icons-material/Search";
import EmployerJobCard from './EmployerJobCard';
import Loadingprofile from '../../common/Skeleton/Loadingprofile';

function Sidebar({setMobileFormView,selectedJob, setSelectedJob}){
    const [search, setSearch] = useState("");
    
    useEffect(()=>{

    },[search])
    return(
        <div
        className='sidebar-container'
        >
            <Grid item xs={12}>
            <div>
            <Button
            className="post-btn"
            onClick={()=> setMobileFormView(true)}
            >
             <div>+ post a job</div>
             <div>Post your requirements and hire candidates</div>
            </Button>

            <TextField
                size="small"
                fullWidth
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
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

            {false?(
                <Loadingprofile fields={10} height={200}/>
            ):(    
            <Grid item xs={12}>
            {[1,2,3,4,5].map((item,i)=>{
                return(
                    <EmployerJobCard
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                    jobTitle="job-title"
                    createdAt="created at"
                    jobLocation="job location"
                    jobType="job-type"
                    jobId={i}
                    />
                )
            })
                
            }
            </Grid>
            )}
        </div>
    )

}

export default Sidebar