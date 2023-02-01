import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../FirebaseConfig';
import CandidateJobCard  from './CandidateJobCard';
import Loadingprofile from '../../common/Skeleton/Loadingprofile'
import {userContext} from '../../context/userContext'
import {v4 as uuidv4} from 'uuid'
import toastMessage from '../../../util/toastMessage'
import { async } from '@firebase/util';

function CandidateJobs() {
  const [allJobs,setAllJobs] = useState(null);
  const [state,dispatch] = useContext(userContext);
  
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

  const applyJob = async(job) =>{
    console.log(job);
    const candidateId = state.userInfo.uid;
    const applicationId = uuidv4();
    // add check to see if this user has already applied for a job
    //1. get all docs from the application collection where the candidate id is the same as the current user id
    //2. from that list of docs, check if the job id is the same as the jov that the user if trying to apply for
    //3. if the jobid is same , the the user has already applied for this job , show message "u already applied"
    //4. if the jobId is not the same, then the user has not applied for this job, so we can proceed to apply for this job
    try{
      const q=query(collection(db,"applications"),where("candidateId","==",candidateId))
      const querySnapshot=await getDocs(q)
      const allApplications=[]
      querySnapshot.forEach((doc)=>{
        allApplications.push(doc.data())
      })
    
    let exist=allApplications.find((application)=> application.jobId===job.jobId)
    if(exist){
      toastMessage({
        message:"You have already applied for this job",
        type:"error"
      })
      return
    }

    }
    catch(err){
      console.log(err)
    }

    // call firebase to add the job to candidate applied job
    const data={
      jobId:job.jobId,
      jobTitle:job.jobTitle,
      companyName:job.companyName,
      companyLogo:job.companyLogo,
      jobLocation:job.jobLocation,
      companyId:job.companyId,
      candidateId:candidateId,
      applicationId:applicationId,
      candidateName:state.userInfo.displayName, //userInfo coming from userContext
      candidateEmail:state.userInfo.email,
      createdAt:new Date().toISOString(),
      status:"applied"
    }
    //call firebase
    // setDoc function take document referrence (doc) and data in doc we have collection name and id and (db) referrecne
   try{
    await setDoc(doc(db,"applications",applicationId),data);
    toastMessage({
      message:"Applied Successfully",
      type:"Success"
    })
  }
  catch(err){
    console.log(err)
    toastMessage({
      message:"Something went wrong",
      type: "error"
    })
  }
  }

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
              return <CandidateJobCard 
              key={job.jobId}
              applyJob={applyJob}
              job={job}/>
            })
          }
        </div>
      )
  )
  
}

export default CandidateJobs