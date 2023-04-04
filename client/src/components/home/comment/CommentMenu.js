import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../redux/action/commentAction'
const CommentMenu = ({comment , post, onEdit}) => {
  const dispatch = useDispatch()
  const { auth , socket} = useSelector((state)=>state)
  const handleDeleteItem = ()=>{
    dispatch(deleteComment({post , comment ,auth , socket}))


  }

  const ItemMenu = ()=> 
 { return (
    
 <>
   <div class="dropdown-item menuIcons" href="#" onClick={()=>onEdit(true)}><span className='material-icons'>create</span><span>Edit</span></div>
   <div class="dropdown-item menuIcons" href="#" onClick={()=>handleDeleteItem()}><span className='material-icons'>delete_outline</span><span>Remove</span></div>
  </>
  )
}

  return (
    <div>
      {
        (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
        <div class="dropdown show">
        <span class="material-icons " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          more_vert
        </span>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">

       { post.user._id === auth.user._id ? comment.user._id === auth.user._id ? ItemMenu():  
   <div class="dropdown-item menuIcons" href="#" onClick={()=>handleDeleteItem()}><span className='material-icons'>delete_outline</span><span>Remove</span></div>
   :    <div class="dropdown-item menuIcons" href="#" onClick={()=>handleDeleteItem()}><span className='material-icons'>delete_outline</span><span>Remove</span></div>}
        </div> 
        </div>
      }
    </div>
  )
}

export default CommentMenu
