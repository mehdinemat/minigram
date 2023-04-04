import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { deleteNotifies , isReadNotify, NOTIFY_TYPE} from '../redux/action/notifyAction'
const NotifyModal = () => {

  const {notifyReducer , auth , socket} = useSelector((state)=>state)
  const dispatch = useDispatch()
  const handleIsRead = (item)=>{
    dispatch(isReadNotify({item , auth , socket}) )
  }
  const handleDeleteNotifies = ()=>{

    dispatch(deleteNotifies({auth}))

  }
  const handleSound = ()=>{
    dispatch({type:NOTIFY_TYPE.UPDATE_SOUND , payload:!notifyReducer.sound})
  }

  return (
    <div className='d-flex flex-column notifMain'>
      <div className='d-flex flex-row justify-content-between notifMainNotif'>
        <h3 >Notification</h3>
        {
          notifyReducer.sound ? <i style={{cursor:'pointer'}} className="fas fa-bell text-danger" onClick={handleSound} /> :<i style={{cursor:'pointer'}} className="fas fa-bell-slash text-danger" onClick={handleSound} />
        }
      </div>
    {  notifyReducer.data.map((item)=>(
        <div className='notifList'>
        <Link to={item.url} className='d-flex flex-row justify-content-between my-1 p-2 notifMainLink' onClick={()=>handleIsRead(item)}>
        
        <img src={item.user.avatar} className='smallAvatar'/>
        <div className='d-flex flex-column mx-2'>
          <div className='fontThin'><h6 className='fontBold'>{item.user.username}</h6>  {item.text}</div>
          <div className='fontThin'>{item.content}</div>
        </div>
        <img src={item.user.avatar}  className='smallAvatar'/>
        
        </Link>
        <small className='mx-4'>{moment(item.createdAt).fromNow()}</small>
        </div>
      ))}
      <span onClick={handleDeleteNotifies} style={{color:'crimson' , cursor:'pointer'}} className='p-3'>Delete Notifies</span>
    </div>
  )
}

export default NotifyModal
