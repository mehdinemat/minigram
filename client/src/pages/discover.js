import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { DISCOVER_TYPES, getDiscoverPost } from '../redux/action/discoverAction'
import PostThumb from '../components/PostThumb'
import loading from '../images/loading.gif'
import { getDataAPI } from '../utils/fetchData'
const Discover = () => {

  const dispatch = useDispatch()
  const [load , setLoad] = useState(false)

  const {auth , discoverReducer} = useSelector((state)=>state)

  useEffect(()=>{
    if(!discoverReducer.firstLoad){
      dispatch(getDiscoverPost({auth}))

    }


  },[auth.token])

  const handleLoadMoreDiscover =async ()=>{
    setLoad(true)
    console.log(discoverReducer.page  * 9)
    const res = await getDataAPI(`getpostdiscover?num=${discoverReducer.page * 9}` , auth.token)
    dispatch({type:DISCOVER_TYPES.UPDATE_POST , payload:res.data})
    setLoad(false)

  }


  return (
   discoverReducer && !load 
   ?
   <> <div className={`discoverMain ${discoverReducer.post.length > 1 ? ''
   :
   'discoverMainSingle'}`}> <PostThumb posts={discoverReducer.post}/>
   </div> <div className='d-flex flex-row justify-content-center align-items-center my-2'><button className='btn btn-primary' onClick={handleLoadMoreDiscover}>loadMore</button></div></> 
    :
     <div className='d-flex flex-row justify-content-center align-items-center ' style={{marginTop:'90px'}}><img src={loading} /></div>
  )
}

export default Discover
