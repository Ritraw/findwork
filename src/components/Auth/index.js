import React, { useContext } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../components/FirebaseConfig'
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { userContext } from '../context/userContext';


function Auth({ type }) {
  const [state,dispatch] = useContext(userContext);
  const navigate = useNavigate();
  const signIn = () => {
    console.log('sing in')
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result, 'result')
        const { user } = result;
        const {displayName, email,photoURL,uid} = user;
        dispatch({
          type: "LOGIN",
          payload: {
            type,
            user,
            displayName, 
            email,
            photoURL,
            uid,
          }
        })

        // if (
        //   //1user is in our database
        //   true
        // ) {

        //   if (type === "candidate") {
        //     if (
        //       //user is candidate
        //       true
        //     ) {
        //       navigate("/candidate/profile")
        //     } else {
        //       // show error
        //     }
        //     if (
        //       // user is stored as employer
        //       true
        //     ) {
        //       navigate("/employer/profile");
        //       //redirect to employer profile
        //     }
        //     else {
        //       //show error message
        //     }
        //   }
        // }
        // 2 user is not there in database
        // a) user is stored as candidate
        //b) user is stored as employer

        if (type === "candidate") {
          navigate("/candidate/onboarding")
        }
        else {
          navigate("/employer/onboarding")
        }


      }).catch((error) => {
        // Handle Errors here.
        console.log(error, 'Error')
      });

  }
  return (
    <div className='auth-container'>
      <h1>Welcome {type}</h1>
      <h2>Sign In</h2>
      <button
        onClick={signIn}
      >Google</button

      >
    </div>
  )
}

export default Auth