import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'

function PrivateRoute({children}) {
    const {userInfo}= useSelector((state)=>state.auth)
    console.log(userInfo);
    
    
  return (
    
        userInfo.success ? children : <Navigate to='/register'/>
    


    
  )
}

export default PrivateRoute