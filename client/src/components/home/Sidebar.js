import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { getSuggestion} from '../../redux/action/suggestionAction'
import { Link } from 'react-router-dom'
import LoadRefresh from './LoadRefresh'
import FollowBtn from '../FollowBtn'
import loading from '../../images/loading.gif'
import { SUGGEST_TYPE } from '../../redux/action/suggestionAction'
import { getDataAPI } from '../../utils/fetchData'
const Sidebar = () => {
  const [load , setLoad] = useState(false) 
  const {auth , suggestionReducer} = useSelector((state)=>state)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getSuggestion({auth}))
  },[])

  const handleRefreshIcon =async ()=>{
    setLoad(true)
    dispatch({type:SUGGEST_TYPE.LOADING , payload:true})
    console.log(auth.user._id , 'id')
    const res = await getDataAPI(`suggestion/${auth.user._id}` , auth.token)
   dispatch({type:SUGGEST_TYPE.GET_USERS , payload:res.data.users})
    dispatch({type:SUGGEST_TYPE.LOADING , payload:false})

      setLoad(false)
  }

  return (
    <div className='d-flex flex-column sidebarMain'>
      <div className='d-flex flex-row'>
      <img src={auth.user.avatar}/>
      <div className='d-flex flex-column mx-2'>
        <span >{auth.user.fullname}</span>
      <span>{auth.user.username}</span>
      </div>
      </div>
      <div>
       <div className='d-flex my-3 mx-2 justify-content-between'>
        <span>Suggestion for you</span>
         <LoadRefresh refresh={handleRefreshIcon} load={load}/>
       </div>
      { !suggestionReducer.loading ? <div className='d-flex flex-column my-4 justify-content-center'>
          {
            suggestionReducer.suggestion.map((item)=>(
             <div className='d-flex flex-row suggestList'>
             <Link className='followersList' to={`/profile/${item._id}`} >
              <div className='followerInfo'>
              <img src={item.avatar} className='followersImg'/>
              <div className='followersInfo'>
              <span>{item.username}</span>
              <span className='fullSuggestName'>{item.fullname}</span>
              </div>
              </div>
          </Link>
            {auth.user._id === item._id ? '' : <FollowBtn user={item}/>}
          </div>
            ))
          }
        </div> : <div className='d-flex justify-content-center w-100'><img  src={loading} /></div>}
      </div>
    </div>
  )
}

export default Sidebar
