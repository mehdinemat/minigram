import React , {useEffect , useState , useRef} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../redux/action/GLOBALTYPES'
import { imageShow , videoShow } from '../utils/imageShow'
import {createPost , updatePost} from '../redux/action/postAction'
import { imageUpload } from '../utils/checkImage'
import Icons from './Icons'
const StatusModal = () => {
  const videoRef = useRef()
  const dispatch = useDispatch()
  const refCanvas = useRef()
  const [tracks , setTracks] = useState('')
  const [content , setContent] = useState('')
  const [stream , setStream] = useState(false)
  const {auth , status , socket} = useSelector((state)=>state)
  const [images , setImages] = useState([])
  const [imagesPost , setImagePost ] = useState([])




  const deleteImages = (index , number)=>{
    const newImg = [...images]
    const newImgPost = [...imagesPost]

        newImgPost.splice(index , 1)
        newImg.splice(index , 1)
    
    setImages(newImg)
    console.log(number)
    setImagePost(newImgPost)
  }

  const handelClose = ()=>{
    dispatch({type:GLOBALTYPES.STATUS , payload:false})
  }


  const handleStream = ()=>{
    setStream(true)
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({video:true}).then(mediaStream=>{
        
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()

        const track = mediaStream.getTracks()
        setTracks(track[0])
      })
    }
  }
  const handleCapture = ()=>{
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width" , width)
    refCanvas.current.setAttribute("height" , height)

    const ctx = refCanvas.current.getContext('2d')
    ctx.drawImage(videoRef.current , 0 , 0 ,width , height)
    let URL = refCanvas.current.toDataURL();
    setImagePost([...imagesPost,{camera:URL}])
  }
  const handleSubmit =async(e)=>{

    e.preventDefault()
    if(imagesPost.length === 0){return  dispatch({type:GLOBALTYPES.ALERT , payload:{error:"Please add your photo."}})}
    if(status.onEdit){
      dispatch(updatePost({content  , auth , status , imagesPost}))
    }else {
      const newMedia = await imageUpload(imagesPost)
      dispatch(createPost({content ,newMedia , auth , socket}))
    }

    dispatch({type:GLOBALTYPES.STATUS , payload:false})


  }
  const handleChangeImages = (e)=>{
    let err =""
    let newArr = []
    let newImages= imagesPost
    const files = [...e.target.files]
    files.forEach((item)=>{
      newArr.push(item)
    })
     
    setImagePost([...imagesPost , ...newArr])
  }
  const handleStopStream = ()=>{
    tracks.stop()
    setStream(false)
  }
  useEffect(()=>{
    let onEditImg = []
    if(status.onEdit){

      setContent(status.content)
      status.images.forEach((item)=>{
         
          onEditImg.push({onedit:item})
        })
        setImages(onEditImg)
        setImagePost(onEditImg)
    }


  },[status])

  return (
    <div className='statusModal'>
     {auth &&  <form onSubmit={handleSubmit}>
        <div className='status_header'>
          <h4>Create Post</h4>
          <div className="close" onClick={handelClose} >
                    &times;
            </div>
        </div>

        <div className='status_body'>
          <textarea name='content' value={content} onChange={e=>setContent(e.target.value)} placeholder={`${auth.user.fullname}, what are you thinking?`}/>
          
        </div>
          <div className='showImages'>
            {console.log(
             
            )}
            {
              imagesPost.map((img ,index)=>(
                <div className='showImage'>
                  {console.log(img)}
                  {!img.onedit?.match(/video/i) ?  img.camera ? imageShow(img.camera) : img.onedit ? imageShow(img.onedit) :!img.type.match(/video/i) ? imageShow(URL.createObjectURL(img)): videoShow(URL.createObjectURL(img)) : <video className='postImage' controls src={img.onedit} />}
                  <span onClick={()=> img.camera? deleteImages(index , 1) : img.onedit ? deleteImages(index , 2):deleteImages(index,0) }>&times;</span>
               </div>
       
              ))
            }
          </div>

          {
            stream &&
            <div>
              <video autoPlay muted ref={videoRef} width='100%'height='100%' />
              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas}/>
            </div>
          }
        <div className='d-flex flex-row justify-content-center align-items-center'><Icons content={content} setContent={setContent}/></div>
       <div className='inputImage'>
        {
          stream ? <i className='fas fa-camera' onClick={handleCapture}></i> : <><i className="fas fa-camera" onClick={handleStream}/>
          <div className='file_upload'>
            <i className='fas fa-image' />
            <input type='file' name='file' id='file'  multiple accept='image/*,video/*' onChange={handleChangeImages} />
          </div> </>
        }
      
       </div>


        <div className='status_footer'>
          <button className='btn btn-secondary w-100' type='submit'>Post</button>
        </div>

      </form>}
    </div>
  )
}

export default StatusModal
