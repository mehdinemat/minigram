import React, { useEffect, useState } from 'react'
import PostCart from '../PostCart'
import { useSelector } from 'react-redux'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { useDispatch } from 'react-redux'
import { POST_TYPE } from '../../redux/action/postAction'
const Posts = ({postDetails , singlePost}) => {
    const dispatch = useDispatch()
    const {postReducer , auth} = useSelector((state)=>state)
    const [load , setLoad] = useState(false)
    const [pr , setPr] = useState([])

  useEffect(()=>{

    setPr(postDetails)

  },[auth , dispatch])

  const handleLoadMore =async ()=>{

    setLoad(true)

    const res = await getDataAPI(`posts?page=${postReducer.page}` , auth.token)

    dispatch({type:POST_TYPE.GET_POST , payload:{...res.data , page:postReducer.page + 1}})
    
    setLoad(false)
  }


  return (
    <div className={`posts ${singlePost ? 'singlePost' :''}`}>
      
     { 
            postDetails ? <PostCart post={postDetails} />  : postReducer.posts.map((post)=>
                  (  <PostCart key={post._id} post={post} />)
                  )
      }
  {singlePost ? '' :<LoadMoreBtn handleLoadMore={handleLoadMore} load={load}/ >}
    
    </div>
  )
}

export default Posts
