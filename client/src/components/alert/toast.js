import React from 'react'

const Toast = ({msg , handleShow , bgColor}) => {
  return (
    <div className={`${bgColor} toast show position-fixed text-light`} style={{top:'5px' , right:'5px'}}>
        <div className='toast-header' style={{direction:'rtl'}}>
          <strong className='text-light  mb-1' >{msg.title}</strong>
            <button onClick={handleShow} className='position-absolute mb-1 close text-dark' style={{outline:'none' , left:'10px'}} data-dismiss="toast">&times;</button>
        </div>
        <div className='toast-body'>
          {msg.body}
        </div>
      
    </div>
  )
}

export default Toast
