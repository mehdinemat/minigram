import React, { useEffect, useState } from 'react'
import { getDataAPI } from '../../utils/fetchData'
import { useSelector ,useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../../redux/action/GLOBALTYPES'
import UserCart from '../../components/UserCard'
import { useNavigate , useParams } from 'react-router-dom'
import {MESS_TYPES , getConversation} from '../../redux/action/messageAction'

const LeftSide = () => {
  const navigate = useNavigate()
   const [search , setSearch] = useState('')
   const [searchUser , setSearchUser]= useState([])
    const dispatch = useDispatch()
   const { auth , messageReducer  , socket} = useSelector((state)=>state)

    useEffect(()=>{

        dispatch(getConversation({auth}))

    },[messageReducer.users , auth.token])


const handleSubmitSearch =async(e)=>{
    e.preventDefault()
    if(!search){return }
    const res = await getDataAPI(`search?username=${search}`, auth.token)
    setSearchUser(res.data.user)
    
    try
    {

    }catch(err){dispatch({type:GLOBALTYPES.ALERT , payload:{error:err.response.data.msg}})}

}
const handleAddUser =async (user)=>{
    setSearch('')
    setSearchUser([])
    
    const res = await getDataAPI(`conversation/${user._id}` , auth.token)
    console.log(res.data.text)
    dispatch({type:MESS_TYPES.ADD_USER , payload:{...user , text:res.data.text , media:[]}})
    return navigate(`/message/${user._id}`)

}

useEffect(()=>{
   messageReducer.users.forEach((data)=>{

       socket.emit('isOnlineUser' , {data , id:auth.user._id})
   })

},[messageReducer.users ])

        

    return (
    <div className='leftSideMessageMain'>
      <form onSubmit={(e)=>handleSubmitSearch(e)}>
            <input placeholder='Enter to Search' type='text'onChange={(e)=>setSearch(e.target.value)}/>
            <button >search</button>
      </form>

       {
        searchUser.length > 0 ? 
        <>
        
        {
            searchUser ? searchUser.map((user , index)=>(
                <div key={index} onClick={()=>handleAddUser(user)} className='userSearchHover border-bottom'>
                    <UserCart user={user} flexType='row' messageReducer={messageReducer}/>
                </div>
            )) : 'Waitting' 
        }
    </>
        :
        <>
          { 
           messageReducer.users ? messageReducer.users.map((user)=>(
            <div onClick={()=>handleAddUser(user)}> 
             <UserCart user={user} flexType='row' />
             </div>
         )) : 'waitin' 
            }
        </>
       }

    </div>
  )
}

export default LeftSide
