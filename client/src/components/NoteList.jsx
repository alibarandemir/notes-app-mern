import React, { useEffect,useState,useRef } from 'react'
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { deleteNote, getNotes } from '../redux/Note/noteActions';
import NoteItem from './NoteItem';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

export default function NoteList() {
  const refDeleteItem= useRef();
  const refDeleteZone= useRef();
  const dispatch = useDispatch()
  const [isDragging, setIsDragging] = useState(false); 
  const [collisionDetected,setCollisionDetected]= useState(false)
  const [deletedNoteInform,setDeletedNoteInform]= useState({
    noteId:'',
    token:'',
  })
  useEffect(()=>{
    const token= localStorage.getItem('token')
    console.log(token)
    if(token){
       dispatch(getNotes(token))
       setDeletedNoteInform({noteId:'',token:token})
    }
  },[])

  
  const handleDrag=(e,data)=>{
    const deleteZone= refDeleteZone.current
    
    console.log(data)
    const rect1= data.node.getBoundingClientRect();
    const rect2= deleteZone.getBoundingClientRect();
    if (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    ) {
      setCollisionDetected(true);
    } else {
      setCollisionDetected(false);
    }
    const deletedNoteId= data.node.id
    setDeletedNoteInform((prevState)=>{
      return {...prevState,noteId:deletedNoteId}
    })


  }
  const handleDrop=(e,data)=>{
    console.log(refDeleteItem.current);
    console.log(data.node.id)
    const token= localStorage.getItem('token')
    
    if(collisionDetected){
        
        console.log(deletedNoteInform)
        console.log('artık not silinebilir')
        dispatch(deleteNote(deletedNoteInform))
        dispatch(getNotes(token))
        
        
    }
  }
  const {notes}= useSelector((state)=>state.note)
  console.log(notes)
  return (
    <div className=' w-full border-4 border-gray-700 h-full flex flex-wrap justify-around relative '>
      {notes.map((note,index)=>{
        return (<NoteItem ref={refDeleteItem}  note={note}  key={index} isDragging={isDragging} setIsDragging={setIsDragging} handleDrag={handleDrag} handleStop={handleDrop}/>)
      })}
       {isDragging&&
      <div  ref={refDeleteZone} className='bg-gray-600 absolute w-full bottom-0 flex justify-center opacity-60 '>
          <div style={collisionDetected?{backgroundColor:'red'}:{}} className=' opacity-100 bg-white rounded w-12 h-12 flex justify-center items-center'>
          <MdDelete style={collisionDetected?{color:'white'}:{}} className='text-xl text-red-600'/>
          </div>
        </div>}
    </div>
  )
}
