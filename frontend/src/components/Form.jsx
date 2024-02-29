import React, { useState, useRef } from "react";
import { Ring } from "./Load";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { setUser } from "../features/authentication/authSlice";
import { Link } from "react-router-dom";
const Forms = () => {
  // console.log("form")
  const dispatch = useDispatch()
  const navigate = useNavigate()
   const [isSignInForm, setIsSignInForm] = useState(true);
   const [load, setLoad] = useState(false)
   const [errMessage, setErrMessage] = useState(null);
   const name = useRef(null);
   const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrMessage(null)
  };
  const formHandler = async(e) => {
    e.preventDefault();
      setLoad(true)
        if(isSignInForm){
          const userInfo = {
           email : email.current.value,
           password : password.current.value,
          }
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials:true
          };
          console.log(userInfo)
         const {data} = await axios.post("http://localhost:3000/api/login",userInfo,config)
        
        
         dispatch(setUser(data.existingUser))
        
          navigate('/home')
         
        }
        else{
          const userInfo = {
            name : name.current.value,
           email : email.current.value,
           password : password.current.value,
           constituency:"kamareddy"
          }
          const config = {
            headers: {
              "Content-Type": "application/json",
            },withCredentials:true
          };
          console.log(userInfo)
         const {newUser} = await axios.post("http://localhost:3000/api/register",userInfo)
         console.log(newUser)
         dispatch(setUser(newUser))
         navigate('/home')
          console.log(name.current.value,password.current.value)
        }
          
         

          setLoad(false)
          // ...
        }
       
  return (
    <>
   
    
     <div className="relative flex  justify-center ">
      <div className="w-full h-full absolute bg-black opacity-40 "></div>
      <div className=" w-full bg-cover ">
        {/* <img className=" h-[100vh] md:h-full  " src={''} alt="bg-logo" /> */}
      </div>
      <div className="absolute top-[6rem] ">
        <form
          onSubmit={formHandler}
          action=""
          className=" rounded-md w-[25rem] p-10 flex flex-col justify-center text-white  bg-black bg-opacity-80 "
        >
          <h2 className="font-semibold text-[2rem] p-2 py-4 m-2 text-white">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>
          {!isSignInForm ? (
            <input
              ref={name}
              type="name"
              className=" p-2 m-2 bg-gray-700 outline-none rounded-md"
              placeholder="Full Name"
              required
            />
          ) : (
            ""
          )}
          <input
            ref={email}
            type="email"
            className=" p-2 m-2 bg-gray-700 outline-none rounded-md"
            placeholder="Enter Email or Phone number"
            required
          />
          <input
            ref={password}
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            className=" p-2 m-2 bg-slate-700 outline-none rounded-md"
            placeholder="Enter Password"
            required
          />
          {errMessage ? (
            <p className=" p-2 m-2   text-red-600 font-semibold ">
              {errMessage}
            </p>
          ) : (
            ""
          )}

         {load?<Ring/>:<button
            type="submit"
            className=" p-2 m-2  outline-none rounded-md bg-red-600 text-white font-semibold "
            
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
            
          </button>} 
          <p className="text-white text-right px-2 cursor-pointer hover:text-gray-600"> 
          <Link to="/forgotpassword">
                forgot password ?
                </Link></p>
         {load? null: <p className="text-gray-600 p-2 m-2 cursor-pointer">
            {isSignInForm ? "New to Netflix?" : "Already a Member?"}{" "}
            <span className="text-white" onClick={toggleSignInForm}>
              {" "}
              {isSignInForm ? "Sign Up" : "Sign In"}
            </span>
          </p>}
        </form>
      </div>
    </div>
    </>
   
  );
};

export default Forms;
