import React, { useRef, useState } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import CreateNote from './CreateNote';


export default function CreateNoteButton() {

    const [isOpen,setIsOpen]= useState(false);
    console.log(isOpen)
    console.log('a')
    
  return (
    <div>
      
        <FaPlusCircle aria-disabled className='cursor-pointer text-2xl' onClick={(e)=>{ e.stopPropagation(); setIsOpen(true)}}/>
      <div>
        {isOpen&&
        <div  className='flex justify-center w-screen h-screen absolute top-0 left-0 items-center'>
            <CreateNote isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        
        
        }
      </div>

    </div>
  )
}
