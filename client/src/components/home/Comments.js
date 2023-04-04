import React, { useEffect ,useState} from 'react'
import CommentDisplay from './comment/CommentDisplay'
const Comments = ({post}) => {
  const [comment , setComment] = useState([])
  const [next , setNext] = useState(2)
  const [showComment , setShowComment]= useState([])
  const [replyComment  , setReplyComment] = useState([])

  useEffect(()=>{

    const newCm = post.comments.filter(cm=> !cm.reply)
    setComment(newCm)
    setShowComment(newCm.slice(newCm.length - next))
  },[post.comments , next])

  useEffect(()=>{

    const newRep = post.comments.filter((cm)=> cm.reply)
    setReplyComment(newRep)
  },[post.comments])


  return (
    <div>
      {
       showComment.map((item , index)=>(
          <CommentDisplay key={index} comment={item} post={post} replyCm={replyComment.filter((rep)=>( rep.reply === item._id ))}/>
        ))
      }
      {
      comment.length - next > 0 ? <span onClick={()=>setNext(next +1)}> See more comments... </span> :comment.length > 2 && <span onClick={()=>setNext(2)}>Hide comments</span>
      }
    </div>
  )
}

export default Comments
