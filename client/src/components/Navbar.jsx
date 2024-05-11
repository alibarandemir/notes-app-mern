import React, { useEffect, useRef } from 'react'
import { FaHome,FaUser } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from '../redux/Auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function Navbar() {
    const dispatch= useDispatch();
    const navigate=useNavigate();
    const ref= useRef()
    
    const {token} = useSelector((state)=>state.auth)
    const {userId}= useSelector((state)=>state.note)
   
   console.log(userId)
    useEffect(()=>{
      
      
      if(token==null){
        navigate('/login');
      }
      
    },)
    const handleLogout=()=>{
      dispatch(logout())
    }
  return (
    <div className='leftnavbar bg-yellow-300 fixed left-0 h-2/3 w-14 flex items-center justify-center mt-32 '>
            <div className='flex flex-col gap-y-9'>
                <div>
                <Link ref={ref}>
                    <FaHome  className='text-4xl cursor-pointer text-white bg-purple-950'/>
                  </Link>
                </div>
                
                <div>
                <Link to={`/profile/${userId}`} ref={ref}>
                  <FaUser className='text-white cursor-pointer text-4xl'/>
                </Link>
                </div>
                <div>
                  <Link>
                    <HiOutlineLogout className='text-4xl text-white cursor-pointer' onClick={handleLogout}/>
                  </Link>
                </div>
            </div>
        </div>
  )
}
