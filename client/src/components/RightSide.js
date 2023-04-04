import React, { useEffect, useState ,useRef} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useParams , useNavigate } from 'react-router-dom'
import {getMessage , addMessage ,deleteUser, MESS_TYPES , deleteMessagesUser , deleteMessage, readMessage} from '../redux/action/messageAction'
import MsgDisplay from './message/MsgDisplay'
import axios from 'axios'
import { imageUpload } from '../utils/checkImage'
import Loading from '../images/loading.gif'
import Icons from './Icons'
import { GLOBALTYPES } from '../redux/action/GLOBALTYPES'
const RightSide = () => {

    const [data , setData ] = useState([])
    const [fullData , setFullData] = useState([])
    const [ result , setResult ] = useState(9)
    const [text , setText] = useState('')
    const [media , setMedia] = useState([])
    const [user , setUser] = useState()
    const [loadingMedia , setLoadingMedia] = useState(false)
    const {messageReducer , auth , socket , peerReducer} = useSelector((state)=>state)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const displayRef = useRef()
    const disRef = useRef()
    const diRef = useRef()

    const handleMessageDelete = ({msgId , msg , index})=>{

      dispatch(deleteMessage({auth , msgId , msg:fullData, id , socket}))
    }

    useEffect(()=>{
       
      data.forEach((item)=>{
        if(!item.read){
          socket.emit('readData' , item)
          dispatch(readMessage({item , auth}))
        } 
      })
      },[id , socket , data.length])
    
   
     
    useEffect(()=>{
      displayRef.current?.scrollIntoView({behavior:'smooth'})
      
    },[auth , data])


    useEffect(()=>{

      const newData = messageReducer.data.find((data)=>(
        data._id === id
        ))
        if(newData){
            setData(newData.messages)
            setResult(newData.result)
            setFullData(newData)
       }

    },[messageReducer.data , id , messageReducer.data.result , socket])

    useEffect(()=>{

        const user = messageReducer.users.find((user)=>(
          user._id === id
        ))
        if(!user) return 
        setUser(user)

    },[ messageReducer.users , id ])

    useEffect(()=>{

      if(messageReducer.data.every((item)=>item._id !== id))
      {
        dispatch(getMessage({auth , id}))
      }

    },[auth.token , dispatch  , id])

    useEffect(()=>{

        if(messageReducer.data.every((data)=>( data._id !== id ))){

        }

    },[id , dispatch , messageReducer.data])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setText('')
        setMedia([])
        setLoadingMedia(true)
        const newMedia =await imageUpload(media)
        if(text === '' && !media.length > 0) return setLoadingMedia(false)
        const msg ={
          sender : auth.user._id , recipient:id , media:newMedia ,text , createdAt : new Date().toISOString()
        }
        dispatch(addMessage({msg  ,auth , id , socket}))
        setLoadingMedia(false)
    }
    
    const handleFileUpload = (e)=>{

      console.log('files')
      const newMedia = []
      const err = ""
      const files= [...e.target.files]
      files.forEach((item)=>{
        if(!item) return err="File does not exist"

        if(item.size > 1024*1024 *5) return err="The image/video largest is 5mb"

          return newMedia.push(item)
      })
    
      setMedia([...media , ...newMedia])

    }
    const handleDeleteMedia = (index)=>{
      const newArr = [...media]
      newArr.splice(index , 1)
      setMedia(newArr)
    }
    const handleDeleteConversation = ()=>{
          dispatch(deleteUser({auth , id}))
          dispatch(deleteMessagesUser({auth , id}))
        navigate('/message')
    }
    const caller = ({video})=>{

      const {_id , fullname , username , avatar} = user

      const msg = {
        sender : auth.user._id,
        recipient : _id , 
        fullname , username , avatar , video
      }
      dispatch({type:GLOBALTYPES.CALL , payload:msg})

    }
    const callUser = ({video})=>{

      const { _id ,  fullname , username , avatar} = auth.user

      const msg = {
        sender:_id , recipient:user._id , fullname , username , avatar , video
      }

      if(peerReducer._open) {msg.peerId=peerReducer._id}
      
      socket.emit('callUser' , msg)
    }
    const handleAudioCall = ()=>{
      caller({video:false})
      callUser({video:false})
    }
    const handleVideoCall = ()=>{
      caller({video:true})
      callUser({video:true})
    }

  return (
    <div className='w-100' >
      <div className='headerMessage d-flex flex-row align-items-center justify-content-between'>
      {
       user && <> <img src={user.avatar} className='smallAvatar AV' />
      <span >{user.fullname}</span>
      
      </>
      }
      <div>
      <i className="fas fa-phone-alt"
      onClick={handleAudioCall} />
      <i className="fas fa-video mx-3"
      onClick={handleVideoCall} />
      <i className="fas fa-trash text-danger" onClick={handleDeleteConversation} />  
      </div>
      </div>
      <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-between align-items-between messageForm messageList'>
        <div className={`d-flex flex-column  ${media.length > 0 ? 'mediaActive' : ''} p-2`} >

    {
     data && data.map((item , index)=>(
        item.sender === auth.user._id ?
          <div className='d-flex messageChat'><MsgDisplay user={auth.user} index={index} msg={item} message={true} handleMessageDelete={handleMessageDelete} ></MsgDisplay></div>
         : <div className='d-flex messageOtherChat '><MsgDisplay user={user} index={index} msg={item} message={false} ></MsgDisplay></div>

               ))
              }
              {
                loadingMedia &&<div className='d-flex justify-content-end'> <img src={Loading} className='text-right p-3 mediumAvatar'/></div>
              }
          <div  ref={displayRef}/>
        </div>
        
        <div className='formMessage'>
          <div className={`mediaShow ${media.length > 0 ? 'active' :''}`}>
            {
              media.map((item , index)=>(
                
              <div className='mediaGroup'>
              <span className='closeMedia' onClick={()=>handleDeleteMedia(index)}>&times;</span>
               {
                
                 item.type.match("image/jpeg") ?
                <img  src={URL.createObjectURL(item)} className='imageSendMessage'/>:
               <video controls src={URL.createObjectURL(item)} className='imageSendMessage'/>
               }
               </div>
              ))
            }
          </div>
        <input placeholder='Enter you message...' value={text} onChange={(e)=>setText(e.target.value)} />
        <div className='fileUpload'>
          <i className='fas fa-image text-danger'/>
          <input type='file'  name='file' id='file' multiple accept='image/*,video/*' onChange={handleFileUpload}/>

        </div>
       
        <button type='submit' className='material-icons'>
            near_me
        </button>
            <Icons content={text} setContent={setText} />
        </div>
      </form>
    </div>
  )
}

export default RightSide
