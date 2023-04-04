import React , {useEffect, useState , useRef} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { NOTIFY_TYPE } from './redux/action/notifyAction'
import { POST_TYPE } from './redux/action/postAction'
import { MESS_TYPES } from './redux/action/messageAction'
import audiobel from './audio/client_src_audio_got-it-done-613.mp3'
import { GLOBALTYPES } from './redux/action/GLOBALTYPES'
const SocketClient = () => {
    const {  auth  , socket ,notifyReducer } = useSelector((state)=>state)
    const [ss , setSS] = useState(socket)
    const dispatch = useDispatch()
    const audioRef = useRef()
    useEffect(()=>{
     socket.emit('joinUser' , auth.user)
     return () => socket.off('likeToClient')
    },[socket])

    useEffect(()=>{

 socket.on('likeToClient' , (newPost)=>{
      console.log(newPost)
        dispatch({type:POST_TYPE.UPDATE_POST, payload:newPost})
        return () => socket.off('unLikeToClient')
      })
    },[socket])

    useEffect(()=>{

      socket.on('unlikeToClient' , newPost=>{
        dispatch({type:POST_TYPE.UPDATE_POST, payload:newPost})
        return () => socket.off('unLikeToClient')
      })
      
    },[socket])
    
    useEffect(()=>{
      
      socket.on('createCommentToClient' , newPost=>{
        dispatch({type:POST_TYPE.UPDATE_POST, payload:newPost})
        return () => socket.off('createCommentToClient')
      })

    },[socket])

    useEffect(()=>{
      
      socket.on('deleteCommentToClient' , newPost=>{
        dispatch({type:POST_TYPE.UPDATE_POST, payload:newPost})
        return () => socket.off('deleteCommentToClient')
      })

    },[socket])

    useEffect(()=>{

      socket.on('deletePostToClient' , Post=>{
        dispatch({type:POST_TYPE.DELETE_POST, payload:Post})
        return () => socket.off('deletePostToClient')
      })

    },[socket])

    useEffect(()=>{

      socket.on('createNotifyToClient' , notify=>{
        dispatch({type:NOTIFY_TYPE.CREATE_NOTIFY , payload:notify})
       if(notifyReducer.sound) {console.log('audioooo') 
       audioRef.current.play()}
      })

    },[socket])

    
    
    useEffect(()=>{

      socket.on('sendMessageToClient' , msg=>{
        console.log('sendMessageToClient')
        dispatch({type:MESS_TYPES.ADD_MESSAGE , payload:msg})
        const text = msg.text ? msg.text.slice(0,10)+'...' : ''
        dispatch({type:MESS_TYPES.UPDATE_USER , payload:{id:msg.sender , text:text , media:msg.media}})
      })

    },[socket])

    useEffect(()=>{

      socket.on('deleteMessageToClient' , msg=>{
        console.log(msg)
        dispatch({type:MESS_TYPES.DELETE_MESSAGE , payload:{newArr:msg.newArr , id:msg.msgId}})
      })

    },[socket])
    useEffect(() => {
      socket.on('callUserToClient', data =>{
          dispatch({type: GLOBALTYPES.CALL, payload: data})
      })

      return () => socket.off('callUserToClient')
  },[socket, dispatch])

    useEffect(()=>{

      socket.on('readDataToClient', data=>{
        console.log(data , 'readdataclient')
        dispatch({type:MESS_TYPES.UPDATE_MESSAGE , payload:data})
      })

    },[socket])

    

  return (
    <div>
      <audio controls ref={audioRef} style={{display:'none'}}>
        <source src={audiobel} type='audio/mp3'/>
      </audio>
    </div>
  )
}

export default SocketClient
