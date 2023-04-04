import React from 'react'
import {useDispatch , useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/action/GLOBALTYPES'
import Avatar from '../Avatar'
const Status = () => {

    const {auth}=useSelector((state)=>state)
    const dispatch = useDispatch()
    const handleCreatePostButton = ()=>{

     dispatch({type:GLOBALTYPES.STATUS , payload:true}) 

    }

  return (
    <div className='d-flex status my-3'>
        <Avatar  src={auth.user.avatar} />
        <button className='mx-3' onClick={handleCreatePostButton}>
            {auth.user.fullname} , what are you thinking ?
        </button>
      
    </div>
  )
}

export default Status
