import axios from 'axios';
import React from 'react'
import { useRef,ref } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
const ResetPassword = () => {
  const {token} = useParams()
  console.log(token)
  const dispatch = useDispatch()

  const newPassword = useRef(null);
  const confirmNewPassword = useRef(null)
  const formHandler = async(e) => {
    e.preventDefault()
   

    if(!( newPassword.current.value || confirmNewPassword.current.value)){
      console.log("Fields missing")

    }
    else if(newPassword.current.value !== confirmNewPassword.current.value){
      console.log("password not matched")
    }
    else{
     console.log(newPassword.current.value)
    try {
      const data = await axios.post(`http://localhost:3000/api/auth/resetpassword/${token}`,{password:newPassword.current.value})
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
    }
  }
  return (
    <div className=''>
      <form action="" onSubmit={formHandler} className='flex h-[70dvh]  justify-center items-center'>
        <div className='flex flex-col justify-center items-center space-y-3 '>
    
        <input className='px-5 py-1  border-2 w-full' ref={newPassword} type="password" placeholder='Enter new password' />
        <input className='px-5 py-1  border-2 w-full' ref={confirmNewPassword} type="password" placeholder='Confirm new password' />
        <button className='bg-blue-600 px-2  py-2  text-white w-full  rounded'>Proceed</button>
        </div>
       
        
        
      </form>
    </div>
  )
}

export default ResetPassword
