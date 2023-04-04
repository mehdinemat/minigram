import React , {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import Avatar from '../../Avatar'
import moment from 'moment'
import CommentMenu from './CommentMenu'
import LikeButton from '../../LikeButton'
import { updateComment , likeComment , unLikeComment} from '../../../redux/action/commentAction'
import InputComment from '../InputComment'

const CommentCard = ({children , comment , post , reply }) => {
  const [onEdit , setOnEdit] = useState(false)
  const [readMore , setReadMore ] = useState(false)
  const [content , setContent] = useState('')
  const [isLiked ,setIsLiked] = useState(false)
  const {auth} = useSelector((state)=>state)
  //const [replyUser , setReplyUser] = useState( `@${comment.user.fullname}`)
  const[showReply , setShowReply] = useState(false)
  const [rp , setRp] = useState(!reply)
  const dispatch = useDispatch()
  const [next , setNext] = useState(0)
  const handleLike = ()=>{

    dispatch(likeComment({post , comment , auth}))

  }
  const handleUnLike = ()=>{

    dispatch(unLikeComment({post , comment ,auth}))

  }
  useEffect(()=>{

   if(comment?.likes)
   {
    setContent(comment.content)
    const like = comment.likes.find((item)=>(
      item._id === auth.user._id
    ))
   if(like){
      setIsLiked(true)
   }else {
      setIsLiked(false)
   }
   }

  },[comment.likes ,dispatch] )

  const handleUpdateComment= ()=>{
    if(content !== comment.content)
    {
    dispatch(updateComment({ content , comment , post , auth}))
    setOnEdit(false)
    }else {
      setOnEdit(false)
    }

  }
  const handleShowMoreReply = ()=>{
    setNext(next + 5)
  }
  const handelreplay = ()=>{
    setShowReply(true)
  }

  // const handleReplyArea = (e)=>{
  //   setReplyUser(`${e.target.value}`)
  // }

  const handleShowLess = ()=>{
    setNext(0)
  }

  return (
     comment?.user && <div className={reply ? 'reply commentCard' :'commentCard'}>
      {console.log(comment.user._id)}
   <Link to={`profile/${comment.user._id}`} >
        <Avatar src={comment.user.avatar} size='smallAvatar' />
        <h6>{comment.user.username}</h6>
      </Link>
      <div className='commentSection'>
       <div className='commentContentSection'>
       {
          onEdit ? <textarea value={content} onChange={(e)=>setContent(e.target.value)} className='editComment'/> : <div>
            {
             content && content.length < 100 ? content : readMore ? content + ' ' : content.slice(0,100) + '....'
            }
            {
              content.length > 100 && <span className='readMore' onClick={()=>setReadMore(!readMore)}>{readMore ? 'Hide content' : 'Read more'}</span>
            }

          </div>
        }
        <div className='commentInfo'>
          <span>{moment(comment.createdAt).fromNow()}</span>
          <span>{comment.likes.length} likes</span>
          {
            onEdit ? <><span onClick={()=>handleUpdateComment()}>update</span> <span onClick={()=>setOnEdit(false)}>cancel</span> </>: reply ?'' : <span onClick={handelreplay}>reply</span>
          }
        </div>
       
          <div>
           { 
            showReply && <InputComment post={post} reply={comment._id}/>
           }
          </div>
          {
            children && children.length > 0 ?children.length > next ?<span onClick={()=>handleShowMoreReply()}>show more</span>: <span onClick={handleShowLess}>show less</span>  :'sss'
          }
       </div>
        <div className='editSection'>
        <CommentMenu comment={comment} post={post} auth={auth} onEdit={setOnEdit}/>
        <div>
        {
            isLiked ? <i className='fas fa-heart' onClick={handleUnLike} /> :<i className='far fa-heart' onClick={handleLike} />
        }
     
    </div>
        </div>
      </div>
      {
        children && children.length > 0 ? children.slice(children.length - next) :''
      }
    </div>
  )
}

export default CommentCard
