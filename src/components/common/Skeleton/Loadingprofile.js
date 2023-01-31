import React from 'react'
import { Skeleton } from '@mui/material'

function Loadingprofile({fields,height}) {
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
              margin: 'auto',
              maxWidth: '90%',
            }} 
            height={height||50}
            animation="wave"/>)
        })
      }
    </div>
    
  )
}

export default Loadingprofile