import React from 'react'
import FollowBtn from '../FollowBtn'
import { Link } from 'react-router-dom'
const Following = ({users , auth ,setShowFollowing}) => {
  console.log(users)
  return (
    <div className='followMain'>
      
        <div className='followers'>
        <div className="close" onClick={() => setShowFollowing(false)}>
                    &times;
                </div>
            <h4 className='followersTitle'>Followings</h4>
        {users.length > 0 ? users.map((item)=>
            <div className='followersList'>
              <Link className='followersList' to={`/profile/${item._id}`} >
                <div className='followerInfo'>
                <img src={item.avatar} className='followersImg'/>
                <div className='followersInfo'>
                <span>{item.username}</span>
                <span>{item.fullname}</span>
                </div>
            { }
                </div>
            </Link>
              {auth.user._id === item._id ? '' : <FollowBtn user={item}/>}
            </div>
            
        ) : 'No Following'}

        </div>
    
    </div>
  )
}

export default Following
