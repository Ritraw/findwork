import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../FirebaseConfig';

function FileUpload({
    type='file',
    onUpload,
    value,
    required = false
}) {
    const [progress, setProgress] = useState(0)

    const onChange = (e) =>{
        setProgress(1)
        const file = e.target.files[0]
        
const storageRef = ref(storage, `${type}/${file.name}`);

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + p + '% done');
    setProgress(p)
  }, 
  (error) => {
    console.log(error, "error while uploading ")
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      onUpload(downloadURL)
      setProgress(0);
    });
  }
);
    }
    
  return (
    <>
    {
        progress > 0 ? (<div>{progress}%</div>):
        (
        <div>
        <TextField
        required
        value={value}
        sx={{
            display:"none"
        }}
        />

        <TextField
            size='small'
            inputProps={{
                accept: type === "image"? "image/*": "application/pdf",
            }}
            fullwidth
            type={'file'}
            onChange={onChange}
        />
        <div>
            {value&&
                (type === "iamge"?(
                    <img src={value} alt="resume"/>
                ):(
                    <a href={value} target="_blank" rel="noreferrer">
                        View Resume
                    </a>
                ))
            }
        </div>
        
        </div>)
    }
    </>
    
  )
}

export default FileUpload