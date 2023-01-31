import React, { useState } from 'react'
import { Button, Grid } from '@mui/material'
import Sidebar from './Sidebar'
import JobForm from './JobForm'

function EmployerJobs() {
  const [mobileFormView, setMobileFormView] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  return (
    <Grid 
      sx={{
        margin: "10px auto",
      }}
      container 
    >
      <Grid
      sx={{
        display: { xs: mobileFormView ? "none" : "block", sm: "block"}
      }}
      item xs={12} md={3}
      >
        <Sidebar setMobileFormView={setMobileFormView}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}/>
      </Grid>

      <Grid
        sx={{
          border: "1px solid #000",
          display: { xs: mobileFormView ? "block" : "none", sm: "block"}
        }}
        item xs={12} md={9}
      >
        <JobForm/>
      </Grid>
    </Grid>
  )
}

export default EmployerJobs