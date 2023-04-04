import React , {useEffect, useState , useRef, useCallback}from 'react'
import { useSelector , useDispatch} from 'react-redux'
import Peer from 'peerjs'
import { GLOBALTYPES } from '../redux/action/GLOBALTYPES'
import {addMessage} from '../redux/action/messageAction'
const CallModal = ({peerR}) => {


  const yourVideo = useRef()
  const otherVideo = useRef()

  const [answer , setAnswer]=useState(false)
  const [track , setTrack] = useState(null)
  const [minute , setMinute]=useState(0)
  const [second , setSecond]=useState(0)
  const [hour , setHour]=useState(0)
  const [total , setTotal]=useState(0)
  const [newCall , setNewCall] = useState(null)
  const {callReducer , auth , peerReducer , socket} = useSelector((state)=>state)
  const dispatch = useDispatch()


  const addCallMessage = useCallback((call , times)=>{

    if(call.recipient !== auth.user._id )
    {
      const msg = {
        sender : call.sender , 
        recipient : call.recipient , 
        text:'',
        media:[],
        call:{video:call.video  ,times},
        createdAt:new Date().toISOString()
      }
      dispatch(addMessage({msg , auth , socket}))
    }

  },[auth , dispatch , socket])
  
  
  const handleEndCall = ()=>{
    track && track.forEach((t)=>t.stop())
    if(newCall) newCall.close()
    let times = answer ? total  : 0 ;
    socket.emit('endCall' , {...callReducer , times})
    addCallMessage(callReducer , times)
  
    dispatch({type:GLOBALTYPES.CALL , payload:null})
  }
  
  const openStream = (video)=>{
    console.log(peerR)
    const config = { audio:true , video }
    return navigator.mediaDevices.getUserMedia(config)
  }

  const playStream = (tag , stream)=>{
    console.log('two twooo')
    let video = tag 
    video.srcObject = stream 
    video.play()
  }
  
  const handleAnswer = ()=>{
    
    openStream(callReducer.video).then(stream=>{
      playStream(yourVideo.current , stream)
      setAnswer(true)
      const t = stream.getTracks()
      setTrack(t)
      const newCall = peerReducer.call(callReducer.peerId , stream)
      newCall.on('stream', function(remoteStream) {
        playStream(otherVideo.current, remoteStream)
    });
    
    setNewCall(newCall)
    
  })
  
}
useEffect(()=>{
  
  if(peerReducer._open){
    peerReducer.on('call' , newCall=>{
      openStream(callReducer.video).then(stream => {
        if(yourVideo.current){
          playStream(yourVideo.current, stream)
        }
        const t = stream.getTracks()
        setTrack(t)
        
        newCall.answer(stream)
        newCall.on('stream' , function(remoteStream){
          console.log('this is remote stream')
          if(otherVideo.current){
            playStream(otherVideo.current, remoteStream)
          }
        })
        setAnswer(true) 
      })
      setNewCall(newCall)
      
      
    })
   }
  },[peerReducer , callReducer.video])


  useEffect(()=>{

    const setTime = ()=>{

      setTotal(t=>t+1)
      setTimeout(setTime, 1000)
    }
    setTime()
    return ()=>setTotal(0)
  },[])

  useEffect(()=>{
  
    setSecond(total%60)
    setMinute(parseInt(total/60))
    setHour(parseInt(total/3600))



  },[total])

  useEffect(()=>{
    socket.on('endCallToClient' , data=>{
      console.log('endcallishere')
      track && track.forEach(track=>track.stop())
      if(newCall) newCall.close()
      addCallMessage(data, data.times)
      dispatch({ type: GLOBALTYPES.CALL, payload: null })
    })
    return () => socket.off('endCallToClient')
  },[socket , dispatch , track , addCallMessage , newCall])



  return (
    <div className='callModalMain'>
      <div className='callModalForm' style={{display:(answer && callReducer.video) ? 'none' : 'flex'}}>
        <div className='d-flex flex-column'>
          <img src={callReducer.avatar} className='mediumAvatar'/>
          <small style={{color:'#f8f9fa'}}>{callReducer.fullname}</small>
          <small style={{color:'#f8f9fa'}}>{callReducer.username}</small>
        </div>
       {
        answer ? <><div>
        { hour.toString().length < 2 ? '0'+hour  : hour}
        :
        {minute.toString().length < 2 ? '0'+minute :minute}
        :
        {second.toString().length < 2 ? '0'+second :second}
      </div>
      <div>
        
      </div> </> : 
        callReducer && callReducer.video ? <span>calling video...</span> : <span>calling audio...</span>
        
      }
       {
         
         !answer && <div><small>{minute.toString().length < 2 ? '0'+minute :minute}</small>:<small>{second.toString().length < 2 ? '0'+second :second}</small></div>
        }
       <div className='optionsCall'>
        {
         callReducer && callReducer.recipient === auth.user._id && !answer && <>
          {
           callReducer.video ? <button className="material-icons text-success"
         onClick={handleAnswer}>
             videocam
         </button>
         : <button className="material-icons text-success"
         onClick={handleAnswer}>
             call
         </button>
          }
          </>
        }
       <button className='material-icons' onClick={handleEndCall}>call_end</button>
       </div>
      </div>

        <div className='baseVideoCall d-flex flex-column justify-content-center align-items-center'>
        <div className='videoPlayer' style={{opacity:(answer ) ? '1':'0'}}>
          <video ref={yourVideo} muted playsInline/>
          <video ref={otherVideo} playsInline/>
         
        </div>
       <div className='VideoOption' style={{opacity:(answer ) ? '1':'0'}}>
       <div className="time_video">
                    <span>{ hour.toString().length < 2 ? '0' + hour : hour }</span>
                    <span>:</span>
                    <span>{ minute.toString().length < 2 ? '0' + minute : minute }</span>
                    <span>:</span>
                    <span>{ second.toString().length < 2 ? '0' + second : second }</span>
          </div>
              <button className="material-icons text-danger end_call "
                onClick={handleEndCall}>
                    call_end
                </button>
       </div>
       </div>

    </div>
  )
}

export default CallModal
