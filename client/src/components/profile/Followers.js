import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
const Followers = ({users , auth ,setShowFollowers}) => {

   

  return (
    <div className='followMain'>
      
        <div className='followers'>
        <div className="close" onClick={() => setShowFollowers(false)}>
                    &times;
                </div>
            <h4 className='followersTitle'>Followers</h4>
        {users.length >  0 ? users.map((item)=>
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
              {auth.user._id === item._id ? '' : <FollowBtn user={users[0]}/>}

            </div>
            
        ) : 'No Followers'}

        </div>
    
    </div>
  )
}

export default Followers
