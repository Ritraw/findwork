import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../FirebaseConfig';
import './fileupload.css'

function FileUpload({
    type='file',
    onUpload,
    value,
    disabled,
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
    
    return disabled ? (
      <div style={{ width: "200px", margin: "10px auto" }}>
        {type === "image" ? (
          <img width="100%" src={value} alt="resume" />
        ) : (
          <a href={value} target="_blank" rel="noreferrer">
            view Resume
          </a>
        )}
      </div>
    ) : (
      <>
        {progress > 0 ? (
          <div>{progress}%</div>
        ) : (
          <div className="input-cointainer">
            <TextField
              required={required}
              value={value}
              sx={{
                display: "none",
              }}
            />
            <TextField
              size="small"
              inputProps={{
                accept: type === "image" ? "image/*" : "application/pdf",
              }}
              type={"file"}
              onChange={onChange}
            />
            <div style={{ width: "200px", margin: "10px auto" }}>
              {value &&
                (type === "image" ? (
                  <img width="100%" src={value} alt="resume" />
                ) : (
                  <a href={value} target="_blank" rel="noreferrer">
                    view Resume
                  </a>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }

export default FileUpload