import React from 'react'
import { Skeleton } from '@mui/material'

function Loadingprofile({fields}) {
  let list = [...Array(fields).keys()]
  return (
    <div style={{
      maxwidth: '800px',
      margin: '50px auto'
    }}>
      {
        list.map((item)=>{
          return (<Skeleton
            sx={{
              margin: '10px 0',
              maxWidth: '90%',
            }} 
            height={50}
            animation="wave"/>)
        })
      }
    </div>
    
  )
}

export default Loadingprofile