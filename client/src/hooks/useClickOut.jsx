import React, { useEffect, useRef } from 'react'

export default function useClickOut(callback) {
  const ref= useRef()
  useEffect(()=>{
    const handleClickOutside =(e)=>{
      if(ref.current && !(ref.current.contains(e.target))){
        callback()
      }
      
    }
    document.addEventListener('click',handleClickOutside)
      return ()=>{
        document.removeEventListener('click',handleClickOutside)
      }
  },[ref])
  return ref; 
  
}
