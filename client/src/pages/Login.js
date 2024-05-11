import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { loginUser } from '../redux/Auth/authActions';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

export default function Login() {
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const [formData,setFormData] = useState({
      email:"",
      password:"",
    });
    const { userInfo,loading } = useSelector((state) => state.auth);
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
    const {email,password}=formData
    const handleOnChange=(e)=>{
        const {name,value}= e.target;
        setFormData({
          ...formData,
          [name]:value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        try{
          dispatch(loginUser(formData))

          
        }
        catch(error){
          console.error(error.message);
        }
    }
  return (
    <div className='register h-screen  flex flex-col items-center justify-center relative'>
        <div className='font-extrabold text-5xl absolute top-10'>Notes App</div>
        <div className='w-1/3 flex flex-col items-center mt-5'>
        <h2 className='font-extrabold text-white text-4xl'>Sign In</h2>
        <form className='w-2/3' onSubmit={handleSubmit}>
            <div className='text-left mt-5'>
            <label className='block'>E-mail:</label>
            <input onChange={handleOnChange} className='rounded-md w-full text-black border-yellow-300 border-2' type='email' name='email' placeholder='john@example.com' value={email}/>
            </div>
            <div className='text-left'>
            <label className='block'>Password:</label>
            <input onChange={handleOnChange} className='rounded-md w-full text-black border-yellow-300 border-2' type='password' name='password' placeholder='*****' value={password}/>
            </div>
            <button className=' text-center w-full text-black bg-yellow-300 mt-4 text-2xl rounded font-bold hover:bg-black hover:text-yellow-300'>{loading?<Loading/>:'Sign In'}</button>

        </form>
        <div>
          Don't have an account? <span onClick={()=>{navigate('/register')}} className='text-white text-xl cursor-pointer underline' >Sign Up Here</span>
        </div>
        </div>
    
    
    
    
    </div>
  )
}
