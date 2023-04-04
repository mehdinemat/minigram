import React , {useEffect , useState} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { follow, unFollow } from '../redux/action/profileAction'
const FollowBtn = ({user}) => {
  const {auth , profile} = useSelector((state)=>state)

  const dispatch = useDispatch()

  const [followed , setFollowed] = useState(false)

  const [load , setLoad] = useState(false)

  useEffect(()=>{
    if(auth.user.following.find(item => item._id === user._id || item._id === user ))
    {
      setFollowed(true)
    }
    return ()=>setFollowed(false)

  },[auth.user.following])
  const handleUnFollowClick = ()=>{
    if(load) return 
    setLoad(true)
   dispatch(unFollow(auth , user , profile))
    setLoad(false)

  }
  const handleFollowClick = ()=>{
    if(load) return 
    setLoad(true)
    dispatch(follow(auth , user , profile))
    setLoad(false)
  }

  return (
    <div>
      {
        followed ? <button className='unFollowButton' onClick={()=>handleUnFollowClick()}>unfollow</button> : <button className='followButton' onClick={handleFollowClick}>follow</button>
      }
    </div>
  )
}

export default FollowBtn
