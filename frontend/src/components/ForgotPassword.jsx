import React from 'react'
import { useRef } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
// import { forgotPassword } from '../../actions/userActions'
const ForgotPassword = () => {
  const dispatch = useDispatch()
 const email = useRef(null)
  const formHandler = async(e) => {
   
      e.preventDefault()
      if(!email.current.value){
        console.log("please enter then email address to processed")
      }
      else{
        console.log(email.current.value)
        try {
          const data = await axios.post("http://localhost:3000/api/auth/forgotpassword",{email:email.current.value},{withCredentials:true})
          console.log(data)
        } catch (error) {
          console.log(error.message,error.code)
        }
       
        
          
      }
  }
  return (
    <div>
       <form action="" onSubmit={formHandler} className='flex h-[50dvh]  justify-center items-center'>
        <div className='flex flex-col justify-center items-center space-y-3 '>
        
        <input className='px-5 py-1  border-2 w-full' ref={email} type="email" placeholder='Enter email address' />
        <button type='submit' className='bg-blue-600 px-2  py-1  text-white w-full  rounded'>Continue</button>
        </div>
       
        
        
      </form>
    </div>
  )
}

export default ForgotPassword
