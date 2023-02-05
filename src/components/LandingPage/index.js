import React from 'react'
import Nav from './NavBar'
import RightJobs from './RightJobs'

function LandingPage() {
  return (
    <div>
      <Nav/>
      <RightJobs/>
      <div className='content'
      style={{ textAlign: "center"} }>
      <h2>One Platform Many Solutions</h2>
      <h2>Featured Job Circulars</h2>
      <h2>Upload CV Section</h2>
      </div>
    </div>
  )
}

export default LandingPage