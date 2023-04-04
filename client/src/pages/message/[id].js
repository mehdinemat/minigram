import React from 'react'
import message from '../../styles/message.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LeftSide from '../../components/message/LeftSide'
import RightSide from '../../components/RightSide'
const Message = () => {

  const {socket} = useSelector((state)=>state)
  const {id} = useParams()
  return (
    socket &&  <div className='message d-flex'>
    <div className='col-md-4 leftSide leftSideId'>{<LeftSide/>}</div>
    <div className='col-md-8 messageSection messageSectionId'>
        <div className='d-flex  w-100 h-100'>
         
          <RightSide id={id} />
        </div>
    </div>
</div>
  )
}

export default Message
