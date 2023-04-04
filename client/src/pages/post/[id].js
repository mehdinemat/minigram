import React, { useEffect, useState } from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import {getDetailsPost} from '../../redux/action/postAction'
import Posts from '../../components/home/Posts'
import {refresh_token} from '../../redux/action/authAction'
const Post = () => {
console.log('sssss')
    const {postReducer, auth} = useSelector((state)=>state)
    
    const {id} = useParams()
    const dispatch = useDispatch()
    const [ post , setPost] = useState([])
    
    const {postDetails} = useSelector((state)=>state.postReducer)
    useEffect(()=>{
      if(auth.token){
        
          dispatch(getDetailsPost({auth , id}))
          setPost(postDetails)

        
      }
      
    },[ id ])
    

    useEffect(()=>{
      if(!auth.token)
      {
        dispatch(refresh_token())
      }
      
      
     
      
    },[])


  return (
  postDetails._id === id ? <div className='productDetails'>
        <Posts postDetails={postDetails} singlePost={true}/>
    </div> : <div className='d-flex flex-row justify-content-center align-item-center my-5'><div class="spinner-border m-5" role="status">
   <span class="sr-only">Loading...</span>
  </div></div>
  )
}

export default Post
