import React from 'react'
import {MutatingDots, TailSpin} from 'react-loader-spinner'

function Loading() {
  return (
    <div className='z-10'>
        <TailSpin 
            color='#F8E559'
            width="30"
            height="30"
            radius="4"
        />

    </div>
  )
}

export default Loading