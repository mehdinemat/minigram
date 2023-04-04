import React from 'react'
import Avatar from '../Avatar'
import Times from './Times'
const MsgDisplay = ({user , msg  , message , index , handleMessageDelete}) => {
  return (
   user && <div className='d-flex flex-column messageDisplay'>
    {
      msg.text ? msg.text&&<div className='d-flex flex-row '>
           {  message ? msg.read ?<i class={`fa fa-check my-2`} style={{color:'green'}}  aria-hidden="true"></i>:<i class={`fa fa-check my-2`} style={{opacity:0.2}} aria-hidden="true"></i>:''}
         <div className={`mx-3 ${message ? 'myMessage' : 'otherMessage'}`}>
      { msg.text}
    </div>
      </div>:
      msg?.call &&<div className='d-flex flex-row'>
      {  message ? msg.read ?<i class={`fa fa-check my-2`} style={{color:'green'}}  aria-hidden="true"></i>:<i class={`fa fa-check my-2`} style={{opacity:0.2}} aria-hidden="true"></i>:''}
      <div className={message ? 'myMessage' : 'otherMessage'}>  <span className="material-icons font-weight-bold mr-1"
      style={{ 
        fontSize: '2.5rem', color: msg.call.times === 0 ? 'crimson' : 'green'
      }}>
       {
           msg.call.times === 0
           ? msg.call.video ? 'videocam_off' : 'phone_disabled'
           : msg.call.video ? 'video_camera_front' : 'call'
       }
      </span>
         <h6>{msg?.call ? 'Video Call' : 'Audio Call'}</h6> <Times total={msg.call.times}/> </div>
      <i className={`fas fa-trash text-danger ${message  ? 'trashMyMessage' : 'trashOtherMessage'}`} onClick={()=>handleMessageDelete({msgId:msg._id , msg , index})} /></div>
    }
    <div className='mediaSendedShow'>
    { 
     msg.media.map((item)=>(
     <>{  message ? msg.read ?<i class={`fa fa-check my-2 mx-2`} style={{color:'green'}}  aria-hidden="true"></i>:<i class={`fa fa-check my-2 mx-2`} style={{opacity:0.2}} aria-hidden="true"></i>:''}
     { item.match(/video/i) ?
      <video controls src={item} className="mediaSended "/>:
      <img  src={item} className="mediaSended "/>}
      
      </>
     ))
     }
    </div>
    <i className={`fas fa-trash text-danger ${message  ? 'trashMyMessage' : 'trashOtherMessage'}`} onClick={()=>handleMessageDelete({msgId:msg._id , msg , index})} />


    {
      
      message ? <div className='my-1'>
      <span className='mx-1'>{user.fullname}</span>
    <Avatar src={user.avatar} size='smallAvatar'/>
    </div> :<div className='my-1'>
    <Avatar src={user.avatar} size='smallAvatar'/>
      <span className='mx-1'>{user.fullname}</span>
    </div>
    }
    <small>{new Date(msg.createdAt).toLocaleString()}</small>
    
    </div>
  )
}

export default MsgDisplay
