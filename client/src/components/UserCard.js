import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
const UserCard = ({handleClose , user , border , flexType , messageReducer}) => {
  return (
    <div className={`${border} d-flex p-2 align-items-center flex-row justify-content-between w-100`}>

        {
          !flexType ?
          <Link to={`/profile/${user._id}`} onClick={()=>handleClose()} className={`d-flex `}>

          <Avatar src={user.avatar} size="medium-avatar"/>
          <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                        <span className="d-block">{user.username}</span>
                        
                        <small style={{opacity: 0.7}}>
                            {
                                 user.fullname
                            }
                        </small>
                    </div>

        </Link>          
          :
          <div role='button'  className={`d-flex w-100  flex-${flexType} cursor align-items-center justify-content-between`}>

          <Avatar src={user.avatar} size="medium-avatar"/>
          <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                        <span className="d-block">{user.username}dd</span>
                        
                        <small style={{opacity: 0.7}}>
                            {
                                 user.text ? user.text : user.media && user.media.length > 0 ? <i className='fas fa-image' /> : ''
                            }
                        </small>
                    </div>
                    <i className="fas fa-circle text-success" />

        </div>
        }

    </div>
  )
}

export default UserCard
