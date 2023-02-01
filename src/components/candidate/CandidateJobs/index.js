import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../FirebaseConfig';
import CandidateJobCard  from './CandidateJobCard';
import Loadingprofile from '../../common/Skeleton/Loadingprofile'

function CandidateJobs() {
  const [allJobs,setAllJobs] = useState(null);
  const fetchAllJobs = async () => {
    //call firebase to check if  all the jobs with the employer id is the same as the current user

    const q = query(collection(db, "jobs"));
    
    const querySnapshot = await getDocs(q);
    const allJobs = [];
    querySnapshot.forEach((doc)=>{
      allJobs.push(doc.data());
    });
    setAllJobs(allJobs);

  };

  useEffect(() => {
    fetchAllJobs();
  }, []);
  return (
    !allJobs?(
    <div>
      <Loadingprofile fields={4} height={250}/>
    </div>
    ): allJobs.length === 0 ? 
      (
        <div>no data</div>
      ):(
        <div>
          {
            allJobs.map((job)=>{
              return <CandidateJobCard job={job}/>
            })
          }
        </div>
      )
  )
  
}

export default CandidateJobs