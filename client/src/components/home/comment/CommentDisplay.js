import React, {useState,  useEffect } from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../Avatar'
import CommentCard from './CommentCard'
const CommentDisplay = ({comment , post , replyCm}) => {

  // const [ replyCmShow , setReplyCmShow ] = useState([])
  // useEffect(()=>{

  //   const rp = replyCm.slice(replyCm.length - next)
  //   setReplyCmShow(rp)

  // },[])

  return (
    <div >

      <CommentCard comment={comment} post={post} >
        {
          replyCm.map((item)=>(
            <CommentCard comment={item} post={post} reply={true} />
          ))
        }
        </CommentCard >
    </div>
  )
}

export default CommentDisplay
