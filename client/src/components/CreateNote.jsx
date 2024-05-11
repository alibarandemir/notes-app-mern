import React, { useRef, useState } from 'react'
import useClickOut from '../hooks/useClickOut'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import { createNote } from '../redux/Note/noteActions'
import toast from 'react-hot-toast';

export default function CreateNote({isOpen, setIsOpen}) {
  const {token}= useSelector((state)=>state.auth)
  const [note,setNote]= useState({
    title:"",
    content:"",
    token:token
  })
  const ref= useClickOut(()=>setIsOpen(false))
  const dispatch=useDispatch()
  const {loading} = useSelector((state)=>state.note)
  
  const handleOnChange=(e)=>{
      const {name,value} = e.target;
      toast.dismiss();
     if(e.target.name=='title' && e.target.value.length<=20){
      setNote({
        ...note,
        [name]:value
      })
     }
     else if(e.target.name=='title' && e.target.value.length>20){
      toast.error('Başlık 20 karakterden fazla olamaz')
     }
     else{
      setNote({
        ...note,
        [name]:value
      })
     }
  }
  const handleOnSubmit= async(e)=>{
    try{
      e.preventDefault();
       await dispatch(createNote(note))

      //setIsOpen(false);
    } 
    catch(e){

    }
  }
  return (
    <div ref={ref} className=' bg-yellow-400 relative w-1/3 h-2/3 rounded-xl z-50'>
            <div className='bg-black text-yellow-500 w-1/6 absolute right-0 -top-5 cursor-pointer block rounded-full' onClick={()=>{setIsOpen(false)}}>
              X
            </div>
            <form onSubmit={handleOnSubmit}>
            <div className='block w-full mt-7 px-4 border-b-2 border-b-black'>
                <input name='title' value={note.title} onChange={handleOnChange} className='outline-none bg-transparent w-full text-white text-2xl' placeholder='Başlık..' id='title' type="text" />
            </div>
            <div className='w-full mt-3 px-4 h-3/4 '>
                <textarea name='content' value={note.content} onChange={handleOnChange}  className='min-h-full outline-none bg-transparent w-full text-white' placeholder='Not Alın..'></textarea>
            </div>

            <div className='note-buttons'>
                <button  className='bg-black text-yellow-400 p-3'>
                  {loading ? <Loading/>:'Notu Kaydet' }
                  
                  </button>
            </div>
            </form>
    </div>
  )
}

