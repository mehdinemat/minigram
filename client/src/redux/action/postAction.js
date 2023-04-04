import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./GLOBALTYPES"
import { createNotify  , removeNotify} from "./notifyAction"
import { imageUpload } from "../../utils/checkImage"
export const POST_TYPE={
    CREATE_POST:"CREATE_POST",
    LOADING_POST:"LOADING_POST",
    GET_POST:"GET_POST",
    UPDATE_POST :"UPDATE_POST",
    POST_DETAILS:"POST_DETAILS",
    POST_DETAILS_UPDATE :"POST_DETAILS_UPDATE",
    DELETE_POST:"DELETE_POST",
    SAVE_POST : "SAVE_POST"
}

export const getPost = (auth)=>async(dispatch)=>{
    
    try{
        
        dispatch({type:POST_TYPE.LOADING_POST , payload:true})
        
        const res = await getDataAPI('posts' , auth.token)
        dispatch({type:POST_TYPE.GET_POST , payload:{...res.data , page:2}})
        
    }catch(err){dispatch({type:GLOBALTYPES.ALERT , payload:err.message})}
    
}
export const createPost =({content , newMedia , auth , socket})=>async(dispatch)=>{

    try{
        dispatch({type:GLOBALTYPES.ALERT , payload:{loading:true}})
        console.log(content , newMedia)
        const res = await postDataAPI('posts' , {content , newMedia  } , auth.token)

        dispatch({type:POST_TYPE.CREATE_POST , payload:{...res.data.newPost , user:auth.user}})
        
        const msg ={
            id : res.data.newPost._id , 
            text : 'added a new post',
            recipients : res.data.newPost.user.followers,
            url : `/post/${res.data.newPost._id}`,
            content 
        }
        console.log(msg)
        
        dispatch(createNotify({msg , auth , socket}))


    }catch(err){}

}
export const updatePost = ({content  , auth , status ,imagesPost})=>async(dispatch)=>{
    
    try{

        let media = []
        let imgOld = []
        console.log(imagesPost)
        const imgNewUrl = imagesPost.filter(img=> !img.onedit)
        const imgOldUrl = imagesPost.filter(img=> img.onedit)
        imgOldUrl.forEach((item)=>{
            imgOld.push(item.onedit)
        })
        console.log(imgOld)
        if(status.content === content 
            && imgNewUrl.length === 0
            && imgOldUrl.length === status.images.length
        ) return;

        dispatch({type:GLOBALTYPES.ALERT , payload:{loading:true}})
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)
        
        const res = await patchDataAPI(`post/${status._id}` , {content , images:[...imgOld
             , ...media] } , auth.token )
        
        
        dispatch({type:POST_TYPE.UPDATE_POST , payload:res.data.newPost})
        
        dispatch({type:GLOBALTYPES.ALERT , payload:{loading:false}})
        
    }catch(err){ dispatch({type:GLOBALTYPES.ALERT , payload:{error:err.message}}) }
    
}
export const likePost = ({post , auth , socket})=>async(dispatch)=>{
    
    try{
        
        
        const newPost = {...post , likes:[...post.likes , auth.user._id]}
        dispatch({type:POST_TYPE.UPDATE_POST , payload:newPost})
        socket.emit('likePost' , newPost)
        const res = await postDataAPI(`post/${post._id}/like` , null , auth.token )
        
        const msg ={
            id :  auth.user._id , 
            text : 'like your post.',
            recipients : [post.user._id],
            url : `/post/${post._id}`,
            content :post.content 
        }
        
        dispatch(createNotify({msg , auth , socket}))
        
        
    }catch(err){ dispatch({type:GLOBALTYPES.ALERT , payload:err.message}) }
    
}
export const unLikePost = ({post ,auth , socket})=>async(dispatch)=>{
    try{
        const newPost = {...post  , likes:post.likes.filter((item)=> item !== auth.user._id)}
        dispatch({type:POST_TYPE.UPDATE_POST , payload:newPost})
        const res = await postDataAPI(`post/${post._id}/unlike` , null , auth.token)
    socket.emit('unlikePost' , newPost)

    const msg ={
        id :  auth.user._id , 
        text : 'unlike your post.',
        recipients : [post.user._id],
        url : `/post/${post._id}`,
        content :post.content 
    }
    
    dispatch(createNotify({msg , auth , socket}))
    
    
}catch(err){dispatch({type:GLOBALTYPES.ALERT , payload:err.message})}
}
export const getDetailsPost = ({auth , id})=>async(dispatch)=>{
    
    try{
        
        const post=  await getDataAPI(`postdetails/${id}` , auth.token)
        
        
        dispatch({type:POST_TYPE.POST_DETAILS , payload:post.data.post})
        
        
    }catch(err){dispatch({type:GLOBALTYPES.ALERT , payload:err.message})}
    
}
export const deletePost = ({ post ,auth , socket })=>async(dispatch)=>{
    
    console.log(post , auth)
    dispatch({type:GLOBALTYPES.ALERT , payload:{loading:true}})
    dispatch({type:POST_TYPE.DELETE_POST , payload:post})
    try{
        console.log(post._id , 'postid')
        const postdelete = await deleteDataAPI(`posts/${post._id}` , auth.token)
        dispatch({type:GLOBALTYPES.ALERT , payload:{loading:false}})
        socket.emit('deletePost' ,post )
        
        const msg = {
            id:post._id,
            url:`/post/${post._id}`
        }
        dispatch(removeNotify({msg , auth}))

        
    }catch(err){
        console.log(post._id , 'postnotid')
        dispatch({type:GLOBALTYPES.ALERT , payload:err.message})
    }
    
}
export const savePost = ({post , auth})=> async(dispatch)=>{
    
    try{
        const res = await patchDataAPI(`saved/${post._id}` , null , auth.token)
        
        console.log(res.data.save)
        dispatch({type:POST_TYPE.SAVE_POST , payload:res.data.save})
    }catch(err){ dispatch({type:GLOBALTYPES.ALERT , payload:err.message}) }
    
}
export const unSavePost =({post , auth})=>async(dispatch)=>{
    
    try{
        
        const res = await patchDataAPI(`unsaved/${post._id}` , null , auth.token)
        dispatch({type:POST_TYPE.SAVE_POST , payload:res.data.save})

    }catch(err){
        dispatch({type:GLOBALTYPES.ALERT , payload:err.message})
    }

    
}