import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

export default function Profile() {
  const dispatch= useDispatch();
  const {userId}= useParams()
  useEffect(()=>{
    const token= localStorage.getItem('token')
    
    
    //dispatch(userId,token)
  })

  
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Navbar/>
      
      <div className='flex flex-col bg-yellow-400 w-1/3 h-1/2 '>
          <div id='avatar'>avatar
            <img/>
          </div>
          
          <div className='username text-black text-xl'>
            <label className=''>Kullanıcı adı</label>
            <div className='bg-white w-1/2 text-purple-950 font-extrabold'>
              aaa
            </div>
          </div>
          <div className='username text-black text-xl'>
            <label>Email</label>
            <div className='bg-white w-1/2 text-purple-950 font-extrabold'>
              sss
            </div>
          </div>
          


      </div>



    </div>
  )
}
