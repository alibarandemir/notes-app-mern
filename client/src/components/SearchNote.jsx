import React, { useEffect,useState } from 'react'
import { FaSearch } from "react-icons/fa";

export default function SearchNote() {
  const [searchTerm,setSearchTerm]= useState('')
  const handleOnChange=(e)=>{
    setSearchTerm(e.target.value);
  }
  useEffect(()=>{
    //her hearch term değiştiğinde useEffect ile be istek atıp not arayacaksın
  },[searchTerm])

  
  return (
    <div className='flex bg-white rounded-lg gap-x-3 mr-4'>
        <div className='bg-yellow-300'><FaSearch className='text-white text-2xl cursor-pointer'/></div>
        
        <div><input value={searchTerm} onChange={handleOnChange} type='text' className='outline-none border-none text-black'/></div>
        


    </div>
  )
}
