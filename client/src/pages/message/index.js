import React from 'react'
import message from '../../styles/message.css'
import LeftSide from '../../components/message/LeftSide'
import { useSelector } from 'react-redux'
const Message = () => {
  const {socket} = useSelector((state)=>state)
  return (
    socket && <div className='message d-flex'>
        <div className='col-md-4 leftSide'>{<LeftSide />}</div>
        <div className='col-md-8 messageSection'>
            <div className='d-flex justify-content-center align-items-center flex-column h-100'>
            <i className="fab fa-facebook-messenger text-primary"
                    style={{fontSize: '5rem'}} />
                    <h4>Messenger</h4>
            </div>
        </div>
    </div>
  )
}

export default Message
