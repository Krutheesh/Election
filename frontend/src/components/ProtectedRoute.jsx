
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import Home from './Home'
const ProtectedRoute = ({component}) => {
  // console.log(component)
  const navigate = useNavigate()
  console.log("protected route")
  const {isLoading,userInfo} = useSelector(store => store.user)
  console.log(userInfo)
  useEffect(() => {
    console.log(userInfo)
    if(!userInfo) return navigate('/')
  },[userInfo])

  if (!userInfo){
   navigate('/login')
  } 
 
  
}

export default ProtectedRoute
