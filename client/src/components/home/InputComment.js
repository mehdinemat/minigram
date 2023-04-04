import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { createComment } from '../../redux/action/commentAction'
import moment from 'moment'
import Icons from '../Icons'
const InputComment = ({post , reply}) => {

    const [content , setContent ] = useState('')
    const dispatch = useDispatch()
    const {auth , socket} = useSelector((state)=>state)
    const handleSubmitComment = e=>{
        e.preventDefault()

        const newComment= {
            content , 
            user:auth.user,
            likes:[],
            createdAt:new Date().toISOString(),
            reply:reply,tag:''
        }

        dispatch(createComment({newComment , post , auth , socket}))
    }

  return (
    <form className='commentInput' onSubmit={handleSubmitComment}>
        <input type='text' placeholder='Add your comment...'
         value={content} onChange={(e)=>setContent(e.target.value)}/>
          <Icons content={content} setContent={setContent} color='#eeeeee' padding='5px'/>
        <button type='submit' className='commentPostSend'>Post</button>


    </form>
  )
}

export default InputComment
