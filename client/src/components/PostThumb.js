import React from 'react'
import { Link } from 'react-router-dom'
import loading from '../images/loading.gif'
const PostThumb = ({posts}) => {

  return (
    posts ?   
     
    posts.length > 0 ? 
    <>
   {  posts.map((item)=>(
        <Link className='postItem' to={`/post/${item._id}`}>
         {item.images[0]?.length > 1 ? item.images[0].match(/video/i) ? <video src={item.images[0]} alt={item.images[0]} />  : <img src={item.images[0]} /> : 'dsfsdf'}
         
          <div className="post_thumb_menu">
            <i className="far fa-heart">{item.likes.length}</i>
            <i className="far fa-comment">{item.comments.length}</i>
          </div>
          </Link>

      )) }
      </> : <div className='d-flex flex-row justify-content-center'> <h6 className='noPost d-flex justify-content-center align-item-center flex-row border-top py-5'>No Post</h6> </div>
      
     : <img  src={loading}/>
  )
}

export default PostThumb
