import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchNote from '../components/SearchNote';
import NoteList from '../components/NoteList';
import CreateNoteButton from '../components/CreateNoteButton';
import Navbar from '../components/Navbar';


function Home() {
  const dispatch= useDispatch();
  useEffect(()=>{

  },[dispatch])
  const {userInfo} = useSelector((state)=>state.auth)
  console.log(userInfo)
  return (
    <div className='absolute w-full h-full'>
        <Navbar/>
        <div  className='text-2xl flex w-1/6 justify-center items-center relative top-7'>
         {userInfo.success? <p className='text-white'>{userInfo.user.userName}<span className='text-yellow-500 font-bold'>'s Notes</span></p>:<p></p>}
        </div>
        <div id='tools' className='flex min-w-full overflow-visible items-center justify-center absolute top-8'>
          <SearchNote/>
          <CreateNoteButton/> 
        </div>
        <div className=' w-full h-full flex justify-center items-center p-24  '>
        <NoteList/>
        </div>
        
    </div>
  )
}

export default Home