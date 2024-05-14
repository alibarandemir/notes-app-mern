import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getProfile } from '../redux/User/userActions';
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";


export default function Profile() {
  
  const dispatch= useDispatch();
  const {userId}= useParams();
  const [editInform,setEditInform]=useState(false)
  

  const {userName,avatar,email}= useSelector((state)=>state.user)
  useEffect(()=>{
    const token= localStorage.getItem('token')
    const data={userId:userId,token:token}
    setUserData({ avatar, userName, email });
    
    dispatch(getProfile(data))
  },[avatar,userName,email])
  
  const [userData,setUserData]= useState({
    avatar:null,
    userName:null,
    email:null,
  })
  console.log(userData.userName)
  const handleOnChange=(e)=>{
    if(e.target.name=='avatar'){
        console.log('a')
    }
    else{
      const {name,value}= e.target;
        setUserData({
          ...userData,
          [name]:value
        })}
    }
  
  
  return (
    <div className='w-full h-screen flex  justify-center items-center'>
      <Navbar/>
      <div className=' avatar flex flex-col rounded bg-yellow-400 w-1/3 h-1/2'>
        <div className='flex flex-col items-center'>
          <label className='text-black text-xl font-bold mb-2'>Avatar</label>
          <div className='relative w-36 h-36 rounded-full border-4 border-purple-950 overflow-hidden'>
            <img className='w-full h-full object-cover' src={avatar} alt="Avatar"/>
          </div>
        </div>
          
        <div className='username flex flex-col items-start'>
          <div className='ml-6 mb-2 text-black text-xl'>
            Kullanıcı adı:
          </div>
          <div className='w-3/4 ml-14 bg-white flex text-purple-950 font-extrabold'>
            <input name='userName' className='w-full text-center border-purple-950 border-4' onChange={handleOnChange} value={userData.userName} disabled={!editInform}/>
          </div>
        </div>
        <div className='email flex flex-col items-start'>
          <div className='ml-6 mb-2 text-black text-xl'>
            Email:
          </div>
          <div className='w-3/4 ml-14 bg-white flex text-purple-950 font-extrabold'>
            <input name='email' className='w-full text-center border-purple-950 border-4' value={userData.email} onChange={handleOnChange} disabled={!editInform}/>
          </div>
        </div>
        <div className='w-full flex justify-center mt-5'>
        <button onClick={()=>setEditInform(true)} className=' hover:opacity-90 bg-purple-950 w-1/3 flex justify-center items-center rounded mr-3'>
          {editInform?<span>Kaydet</span>:<span>Düzenle</span>}
          {!editInform&&
          <FaLock className=' ml-3 text-yellow-300 text-xl'/>}
        </button>
        {editInform&&<button onClick={()=>setEditInform(false)} className=' hover:opacity-90 bg-gray-700 text-white w-1/4 flex justify-center items-center rounded'>Vazgeç<FaUnlock className=' ml-3 text-yellow-300 text-xl' /></button>}
        </div>
    
      </div>
  
    </div>
  )
}
