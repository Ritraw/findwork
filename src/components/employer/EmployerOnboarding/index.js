import React, { useContext } from 'react'
import { userContext } from '../../context/userContext'
import {auth} from '../../../components/FirebaseConfig'
import { useNavigate } from 'react-router-dom'

function EmployerOnboarding() {
  const [state , dispatch] = useContext(userContext)
  const navigate = useNavigate(); 
  const logout = ()=>{
    auth.signOut()
    dispatch({
      type: "LOGOUT",
    })
    navigate('/employer/auth')
  }

  return (
    <div>
      <button
        onClick={logout}
      >Logout</button>
      EmployerOnboarding

    </div> 
  )
}

export default EmployerOnboarding