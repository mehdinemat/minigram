import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import PostThumb from '../PostThumb'
const Posts = ({id , auth , profile , savedPost , isSaved}) => {
    const dispatch = useDispatch()
    const [post , setPost] = useState([])
    useEffect(()=>{
    var post =  profile.posts.filter((item)=>(
        
        item.user === id
      ))
      setPost(post)
      console.log(id )
    },[profile.posts , id])
  return (
      <div className='profilePosts'>
       {
      !isSaved ? <PostThumb posts={savedPost}/> :  <PostThumb posts={post}/>
       }
      </div>
  )
}

export default Posts
