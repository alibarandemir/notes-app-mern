import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { registerUser } from '../redux/Auth/authActions';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../components/Loading';
import '../input.css'



export default function Register() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [avatarPreview, setAvatarPreview] = useState(null);

    const [formData,setFormData] = useState({
      avatar:"",
      userName:"",
      email:"",
      password:"",
    });
    
    const { userInfo,loading,error,token } = useSelector((state) => state.auth);
    useEffect(() => {
      if(userInfo.message){
        toast(userInfo.message)
        }
      if(userInfo.success){
        console.log(userInfo);
        navigate('/')
      }
      }
    , [userInfo]);
    const showAndUploadİmg=(file)=>{
        const reader = new FileReader();
        reader.onload = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
        console.log(avatarPreview)
    }
    const {userName,email,password}=formData
    const handleOnChange=(e)=>{
        if(e.target.name=='avatar'){
          const file=e.target.files[0];
          setFormData({
            ...formData,
            avatar:file
          })
          showAndUploadİmg(file);
          
        }
        else{
        const {name,value}= e.target;
        setFormData({
          ...formData,
          [name]:value
        })}
    }
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
          const userData = new FormData();
          userData.append('avatar',formData.avatar); // Add avatar file to form data
          userData.append('userName', formData.userName);
          userData.append('email', formData.email);
          userData.append('password', formData.password);
          
           await dispatch(registerUser(userData))
           
        }
        catch(error){
          console.error(error.message)
          if(error){
            toast.error(error.message);
          }
        }
        // setFormData((prev)=>{{...prev,
        //   userName:"",
        //   email:"",
        //   password:"",
        // }})
        
    }
  return (
    <div className='register h-screen  flex flex-col items-center justify-center relative'>
      
        <div className='font-extrabold text-5xl absolute top-10'>Notes App</div>
        <div className='w-1/3 flex flex-col items-center mt-5'>
        <h2 className='font-extrabold text-white text-4xl'>Sign Up</h2>
        <form enctype="multipart/form-data" className='w-2/3' onSubmit={handleSubmit}>
          <div className='text-left mt-5'>
            <label className='block'>Avatar:</label>
            <div className='flex flex-col border-2 border-yellow-300'><input multiple={false} type='file' name='avatar' onChange={handleOnChange} className='input-style' placeholder='john123' required/>
              <div>
                
                <img src={avatarPreview}/>
              </div>
            
            </div>
            
          </div>
          <div className='text-left mt-5'>
            <label className='block'>User Name:</label>
            <input type='text' name='userName' value={userName} onChange={handleOnChange} className='input-style' placeholder='john123' required/>
            </div>
            <div className='text-left'>
            <label className='block'>E-mail:</label>
            <input onChange={handleOnChange} className='input-style' type='email' name='email' placeholder='john@example.com' value={email}/>
            </div>
            <div className='text-left'>
            <label className='block'>Password:</label>
            <input onChange={handleOnChange} className='input-style' type='password' name='password' placeholder='*****' value={password}/>
            </div>
            <button className='w-full h-9 text-black bg-yellow-300 mt-4 text-2xl rounded font-bold hover:bg-black hover:text-yellow-300 flex justify-center items-center overflow-hidden'>
            {loading ? <Loading/> : 'Register'}
            
            
            </button>

        </form>
        <div>
          Do you have already an <span onClick={()=>{navigate('/login')}} className='text-white text-xl cursor-pointer underline' >Account?</span>
        </div>
        </div>
    
    
    
    
    </div>
  )
}
