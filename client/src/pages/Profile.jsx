import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { editProfile, getProfile } from '../redux/User/userActions';
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import { MdEdit } from "react-icons/md";



export default function Profile() {
  const dispatch= useDispatch();
  const [editInform,setEditInform]=useState(false)
  const {userId}= useParams();
  const {userName,avatar,email,message,loading}= useSelector((state)=>state.user)
  console.log(userName)
  console.log(avatar)
  const [originalUserData, setOriginalUserData] = useState({
    userId:userId,
    avatar:avatar,
    userName:userName,
    email:email,
    token:localStorage.getItem('token')
  });

  const [userData, setUserData] = useState({
    userId,
    avatar,
    userName,
    email,
    token:localStorage.getItem('token')
  });
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      const initialUserData = { userId, token };
      dispatch(getProfile(initialUserData));
    }, [dispatch, userId]);
  
    useEffect(() => {
      setUserData({
        userId,
        avatar,
        userName,
        email,
        token:localStorage.getItem('token')
      });
      setOriginalUserData({
        userId,
        avatar,
        userName,
        email,
        token:localStorage.getItem('token')
      });
    }, [avatar, userName, email]);
  const handleOnChange=(e)=>{
    if(e.target.name=='avatar'){
        setUserData({...userData,avatar:e.target.files[0]})
    }
    else{
      const {name,value}= e.target;
        setUserData({
          ...userData,
          [name]:value
        })}
    }
    const handleEdit=()=>{
      try{

        dispatch(editProfile(userData)).then(() => {
          dispatch(getProfile({ userId, token: localStorage.getItem('token') }));
          setEditInform(false);
          toast.success(message);
        
      })}
      catch(e){
        console.error(e.message)
      }
    }
    const handleCancel=()=>{
      setUserData(originalUserData);
      setEditInform(false);
    }
  
  
  return (
    <div className='w-full h-screen flex  justify-center items-center'>
      <Navbar/>
      <div className=' avatar relative flex flex-col rounded bg-yellow-400 w-1/3 h-1/2'>
        <div className='flex flex-col items-center'>
          <label className='text-black text-xl font-bold mb-2'>Avatar</label>
          <div className='relative w-36 h-36 rounded-xl border-4 border-purple-950 overflow-hidden'>
            <img className='w-full h-full object-cover' src={avatar} alt="Avatar"/>
          </div>
          {editInform && 
             <div className='relative w-1/4 h-1/6 cursor-pointer z-50'>
             <input
               type="file"
               name="avatar"
               accept="image/*"
               onChange={handleOnChange}
               className="absolute inset-0 opacity-0 cursor-pointer z-50"
             />
             <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
               <MdEdit className='text-white text-2xl' />
             </div>
           </div>
          }
          
        
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
          {editInform?<span onClick={handleEdit}>{loading?<Loading/>:"Kaydet"}</span>:<span>Düzenle</span>}
          {!editInform&&
          <FaLock className=' ml-3 text-yellow-300 text-xl'/>}
        </button>
        {editInform&&<button onClick={handleCancel} className=' hover:opacity-90 bg-gray-700 text-white w-1/4 flex justify-center items-center rounded'>Vazgeç<FaUnlock className=' ml-3 text-yellow-300 text-xl' /></button>}
        </div>
    
      </div>
  
    </div>
  )
}
