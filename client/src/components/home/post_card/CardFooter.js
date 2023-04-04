import React , {useEffect, useState} from 'react'
import send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import {Link} from 'react-router-dom'
import {useDispatch ,  useSelector } from 'react-redux'
import ShareModal from '../../../components/ShareModal'
import {BASE_URL} from '../../../utils/config'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import { savePost, unSavePost } from '../../../redux/action/postAction'

const CardFooter = ({post}) => {

  const [saved , setSaved] = useState(false)
  const [isLiked , setIsLiked] = useState(false)
  const { auth  } = useSelector((state)=>state)
  const [share , setShare] = useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{

   const all =post.likes.filter((item)=> {if(item === auth.user._id){setIsLiked(true)} })
  
  },[post])

  useEffect(()=>{
    const saved =  auth.user.saved.find((item)=>(
      item._id === post._id
    ))
    if(saved){
      setSaved(true)
    }else {
      setSaved(false)
    }

  },[auth.user.saved])

  const handlesaveClick = ()=>{
    dispatch(savePost({post , auth}))
  }
  const handleUnSaveClick = ()=>{
    dispatch(unSavePost({post , auth}))
  }

  return (
    <div className='cardFooter'>
      <div className='cardIcon'>
    <div className='cart_icon_menu'>
       <LikeButton post={post} auth={auth} isLiked={isLiked} setIsLiked={setIsLiked}/>

      <Link to={`post/${post._id}`}>
        <i className='far fa-comment' />
      </Link>

      <img style={{cursor:'pointer'}} src={send} onClick={()=>setShare(!share)}/>
    </div>
        {
          saved ? <i className='fas fa-bookmark' style={{cursor:'pointer'}} onClick={handleUnSaveClick}/> : <i className='far fa-bookmark' style={{cursor:'pointer'}} onClick={()=>handlesaveClick()} />
        }
      </div>
      <div className='likeComment'>
        <small>{post.likes.length} likes</small>
        <small>{post.comments.length} comments</small>
      </div>
      {
        share && <ShareModal url={`${BASE_URL}post/${post._id}`}/>
      }
    </div>
  )
}

export default CardFooter
