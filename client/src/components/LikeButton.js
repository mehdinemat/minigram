import React , {useEffect, useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { likePost  , unLikePost} from '../redux/action/postAction'
const LikeButton = ({post , auth , isLiked , setIsLiked}) => {
   

    const dispatch = useDispatch()
    const {socket} = useSelector((state)=>state)
 

    const [load , setLoad] = useState(false)

    const handleUnLike = ()=>{
        if(load){return}
        setLoad(true)
        dispatch(unLikePost({post , auth , socket}))
        setIsLiked(false)
        setLoad(false)
        
        
    }
    const handleLike = ()=>{
        if(load)return ;
       setLoad(true)
       dispatch(likePost({post , auth , socket}))
       setIsLiked(true)
       setLoad(false)

    }

    // useEffect(()=>{

    //    if (post.likes.find((item)=> (item === auth.user._id)))
    //    {
    //     setIsLiked(true)
    //    }else {
    //     setIsLiked(false)
    //    }

    // },[dispatch])
    
  return (
    <div style={{cursor:'pointer'}}>
        {
            isLiked ? <i className='fas fa-heart' onClick={handleUnLike} /> :<i className='far fa-heart' onClick={handleLike} />
        }
     
    </div>
  )
}

export default LikeButton
