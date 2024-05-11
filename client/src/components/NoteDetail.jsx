import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { deleteNote, updateNote } from '../redux/Note/noteActions';
import toast from 'react-hot-toast';
import Loading from './Loading';
import { MdDelete } from "react-icons/md";

export default function NoteDetail() {
    const navigate= useNavigate()
    const location= useLocation();
    const noteData= location.state.note;
    const dispatch= useDispatch();
    const params= useParams();
    console.log(params)
   
    const {token}=useSelector((state)=>state.auth)
    const {loading,success,message}= useSelector((state)=>state.note)
    
    console.log(noteData)
    const [note,setNote]= useState({title:noteData.title,
content:noteData.content,
token:token,
noteId:noteData._id})


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
    
    const handleUpdateNote=(e)=>{
        e.preventDefault();
        try{
            
            const id= noteData._id
            console.log(id)
            dispatch(updateNote(note))
            if(success){
                toast.success('Not başarıyla güncellendi')
            }
            
        }
        catch (error) {
            console.error('Note update failed:', error);
            toast.error('Failed to update note');
        }
    }
    const handleDelete=()=>{
        try{
            dispatch(deleteNote(note))
            if(success){
                toast.success('Not Başarıyla silindi')
            }
            navigate('/')
        }
        catch(e){
            console.error(message)
        }
    }
    
  return (
    <div className='w-full h-screen'>
        <Navbar/>
        <div className='w-full h-full flex justify-center items-center'>
        <form className='w-1/2 h-1/2' onSubmit={handleUpdateNote}>
        <div className=' w-full h-full bg-yellow-400 flex flex-col items-center relative rounded-lg'>
            <div onClick={handleDelete} className='bg-purple-950 rounded absolute top-2 right-12 flex justify-center items-center cursor-pointer w-7 h-7 '><MdDelete className='text-yellow-400 text-xl'/></div>
            <div className='bg-purple-950 rounded absolute right-2 top-2 cursor-pointer w-7 h-7' onClick={()=>{navigate('/')}}>
                X
            </div>
            <div id='title' className='flex flex-col w-1/2'>
                <label className='text-left text-white text-xl'>Title</label>
                <input className='text-purple-950' name='title' onChange={handleOnChange} value={note.title}/>
            </div>
            <div id='content' className='flex flex-col w-1/2'>
                <label className='text-left text-white text-xl'>Content</label>
                <input className='text-purple-950' name='content' onChange={handleOnChange} value={note.content}/>
            </div>
            <div>
                <button className='bg-purple-950 p-4 rounded-lg'>
                    {loading ? <Loading/>:'Update Note'}
                </button>
            </div>
            </div>
            </form>
        </div>
        </div>
  )
}
