
import React, { useEffect } from 'react'
import Layout from './components/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Forms from './components/Form';
import Home from './components/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/ForgotPassword';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, setUserLoading } from './features/authentication/authSlice';
import Content from './components/Content';
import ResetPassword from './components/ResetPassword';
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Forms/> 
  },
  {
    path:'/home',
    element:<Home/> 
  }
  
 , {
    path:'/forgotpassword',
    element:<ForgotPassword/>
    },
    {
      path:'resetpassword/:token',
      element:<ResetPassword/>
    }
])
const App = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(store => store.user)
  // console.log(userInfo)
  const loadUser = async() => {
    // console.log('hello')
    try{
      const {data} = await axios.get('http://localhost:3000/api/getProfile',{withCredentials:true})
      // console.log(data)
      dispatch(setUser(data.userDetails))
      dispatch(setUserLoading(false))
    }catch(error){
  console.log(error.message,error.code)
    }
  }
  useEffect(() => {
    console.log("load user")
    console.log(userInfo)
  !userInfo && loadUser()
  },[])
  return (
   
    <RouterProvider router={appRouter}>
    <div className=''>
     <Layout/>
    </div>
    </RouterProvider>
    
  )
}

export default App
