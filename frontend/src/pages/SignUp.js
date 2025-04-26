import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import {  GoEyeClosed } from 'react-icons/go';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helper/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {
    const[showPassword,setShowPassword]=useState(false);
    const[showConfirmPassword,setShowConfirmPassword]=useState(false);
    const[data,setData]=useState({
      email:'',
      password:'',
      name:'',
      confirmPassword:'',
      profilePic:''
    })
    const navigate = useNavigate()
    const handleOnChange=(e)=>{
      const{name,value}=e.target
      setData((prev=>{
        return{
          ...prev,
          [name]:value
        }
      }))
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(data.password === data.confirmPassword){

        const dataResponse = await fetch(SummaryApi.signUP.url,{
            method : SummaryApi.signUP.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })
    
          const dataApi = await dataResponse.json()

          if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }
    
      }else{
        toast.error("Please check password and confirm password")
      }
    }
    const handleUploadPic=async(e)=>{
      const file = e.target.files[0];
    
    const imagePic = await imageToBase64(file);
    
    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })
    }
    console.log(data); 
  return (
    <section id='signup'>
    <div className='mx-auto container p-4'>

        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
          <div>
              <img src={data.profilePic || loginIcons} alt="login-icon"/>
              </div>
              <form>
                <label>
                <div className=' bg-opacity-80 text-xs bg-slate-200 pb-4 pt-1 cursor-pointer text-center absolute bottom-0 w-full'>
                Upload Photo
              </div>
              <input type='file' className='hidden' onChange={handleUploadPic}/>
                </label>
              </form>
          </div>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='grid'>
              <label>Name : </label>
              <div className='bg-slate-100 p-2 '>
              <input 
              type="text" 
              placeholder='Enter your name' 
              name='name'
              value={data.value}
              className='w-full h-full outline-none bg-transparent'
              onChange={handleOnChange}
              required
              ></input>
              </div>
            </div>
            <div className='grid'>
              <label>Email : </label>
              <div className='bg-slate-100 p-2 '>
              <input 
              type="email" 
              placeholder='Enter email' 
              name='email'
              value={data.value}
              className='w-full h-full outline-none bg-transparent'
              onChange={handleOnChange}
              required
              ></input>
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex'>
              <input 
               type={showPassword?"text":"password"}
               placeholder='Enter password' 
               onChange={handleOnChange}
               name='password'
               value={data.password}
               required
               className='w-full h-full outline-none bg-transparent' 
               ></input>
              <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                <span>
                  {
                    showPassword?(
                      <FaEyeSlash/>
                      
                    ):(
                      <FaEye/>
                    )
                  }
                  
                 
                </span>
              </div>
              </div>

            </div>
            
            <div>
              <label>Confirm Password : </label>
              <div className='bg-slate-100 p-2 flex'>
              <input 
               type={showConfirmPassword?"text":"password"}
               placeholder='Enter confirm password' 
               onChange={handleOnChange}
               required
               name='confirmPassword'
               value={data.confirmPassword}
               className='w-full h-full outline-none bg-transparent' 
               ></input>
              <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                <span>
                  {
                    showConfirmPassword?(
                      <GoEyeClosed/>
                      
                    ):(
                      <FaEye/>
                    )
                  }
                  
                 
                </span>
              </div>
              </div>

            </div>

            <button className='bg-red-600 text-white px-6 py-2  mx-w-[110px] rounded-full hover:bg-red-700 hover:scale-110 transition-all mx-auto block mt-6'> Sign Up</button>

          </form>
          <p className='my-5'>Already have account? <Link to={"/login"} className='text-red-600 hover:underline hover:text-red-800'>Login</Link></p>
        </div>
    </div>
  </section>
  )
}

export default SignUp