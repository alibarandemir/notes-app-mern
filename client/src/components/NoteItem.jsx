import React, { useState,useEffect } from 'react'
import Draggable from 'react-draggable'
import { RxDragHandleDots1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { highlightMatch } from '../redux/Note/noteSlice';


export default function NoteItem({note,isDragging,setIsDragging,handleDrag,handleStop,ref}) {
  const navigate=useNavigate()
  const dispatch= useDispatch();
  const showNote=()=>{
    navigate(`/${note._id}`,{state:{'note':note}})
  }
 

  // Handle drag start event (optional: visual feedback)
  const handleDragStart = () => {
    setIsDragging(true); // Set dragging state for collision detection
    // Add visual indication of dragging (e.g., opacity change)
  };

  // Handle drag stop event (optional: reset visual feedback)
  const handleDragStop = (e,data) => {
    setIsDragging(false); // Reset dragging state
    // Remove visual indication of dragging
    handleStop(e,data);
  };

  useEffect(()=>{
    if(isDragging){
      //deleteZone
    }
  })
  const style={
    opacity:'0.6',
    border:'2px solid black',
  }
  const {searchTerm} = useSelector((state)=>state.note)
  useEffect(()=>{
    
  },[searchTerm])
  const highlightMatch=(text)=>{
    console.log(searchTerm)
    console.log(text)
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? <span key={index} className="bg-purple-500 opacity-75">{part}</span> : part
    );
}
  return (
    
    <Draggable onStart={handleDragStart}
    onStop={handleDragStop}
    onDrag={handleDrag} bounds='parent' handle='.handle' grid={[80,80]}>
    <div ref={ref} id={note._id} style={ isDragging ? style: '' } className='bg-yellow-400  flex flex-col w-36 h-48 rounded-lg '>
      <div className='text-black text-xl flex-grow-1 overflow-auto max-h-[100px]' id='title'>
        {highlightMatch(note.title)}
      </div>
      <div id='content' className='text-white  text-left flex-grow-4 cursor-pointer' onClick={showNote}>
        {highlightMatch(note.content.slice(0,80))}
      </div>
      <div className='handle flex flex-col items-center cursor-pointer '>
        <p>Drag  here</p>
        <RxDragHandleDots1 />
      </div>
    </div>
   
    
    </Draggable>
    
        
  )
}
