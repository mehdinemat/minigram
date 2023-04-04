import React from 'react'
import Avatar from '../../Avatar'
import moment from 'moment'
import {useDispatch ,  useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../../redux/action/GLOBALTYPES'
import { deletePost } from '../../../redux/action/postAction'
import { Link } from 'react-router-dom'
const CardHeader = ({post}) => {
  const {auth , socket} = useSelector((state)=>state)
  const dispatch = useDispatch()
  const handleEditPost = ()=>{
    dispatch({type:GLOBALTYPES.STATUS , payload:{...post , onEdit:true}})
  }
  const handleDeletePost = ()=>{
    dispatch(deletePost({post , auth , socket}))
  }

  return (
    <div  className='cartHeaderBorder d-flex  justify-content-between'>
      <Link to={`/profile/${post.user._id}`} className='cardHeader cartHeaderInfo'>
          <Avatar src={post.user.avatar} size="postInfoImg"/>
        <div className='cartHeaderUser'>
          <h6 className='cardHeaderFullName'>{ post.user.username }</h6>
          <small>{ moment(post.createdAt).fromNow() }</small>
        </div>
      </Link>
      <div>
        
      <div class="btn-group">
        <span type="button" className='material-icons more_horiz'  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        more_horiz
        </span>
        <div class="dropdown-menu dropdown-menu-right">
        {

        post &&  auth.user._id === post.user._id && <>
          <button class="dropdown-item" onClick={handleEditPost} > <span className='material-icons'>create</span> Edit Post</button>
          <button class="dropdown-item" onClick={handleDeletePost} > <span className='material-icons'>delete_outline</span> Remove Post</button>
          </>
        }
          <button class="dropdown-item" ><span className='material-icons'>content_copy</span>Copy Link</button>
        </div>
      </div>

      </div>
    </div>
  )
}

export default CardHeader
