import { deleteDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./GLOBALTYPES"
import { POST_TYPE } from "./postAction"
import { createNotify } from "./notifyAction"

export const createComment =({newComment , post , auth , socket})=>async(dispatch)=>{

    const newPost = { ...post  , comments:[...post.comments , newComment ] }
    dispatch({type:POST_TYPE.UPDATE_POST , payload:newPost})

    const newData = {...newComment , postId:post._id , postUserId:post.user._id}

    try{
        const res = await postDataAPI('comment' , newData , auth.token)

        const new_data = {...res.data.newComment , user:auth.user}

        const new_post = {...post , comments:[...post.comments , new_data]}

        dispatch({type:POST_TYPE.UPDATE_POST , payload:new_post})
        socket.emit('createComment' , new_post)

        const msg ={
            id :  auth.user._id , 
            text : 'new comment in your post.',
            recipients : [post.user._id],
            url : `/post/${post._id}`,
            content :post.content 
        }
        dispatch(createNotify({msg , auth , socket}))
    
    }catch(err){ dispatch({type:GLOBALTYPES.ALERT , payload:{error:err.message}}) }



}
export const updateComment = ({content , comment, post , auth})=>async(dispatch)=>{

  
    try{
        
        const newData = post.comments.map((item)=>
           ( item._id === comment._id ? {...comment , content:content} : item)
            )
            const newPost = {...post , comments:[...newData]}
            dispatch({type:POST_TYPE.UPDATE_POST , payload:newPost})

            const res = await patchDataAPI(`comment` , {commentId:comment._id , content} , auth.token)

    }catch(err){}


}
export const deleteComment = ({post , comment , auth , socket})=>async(dispatch)=>{

    try{
        const newData = post.comments.filter((item)=> (item._id !== comment._id))
        console.log(newData)
        const newPost = {...post , comments:[...newData]}
        dispatch({type:POST_TYPE.UPDATE_POST , payload:newPost})
        const res = await deleteDataAPI(`comment/${comment._id}` , auth.token)
        console.log('deleteeeecomment')
        socket.emit('deleteComment' , newPost)

    }catch(err){

    }

}
export const likeComment = ({post , comment , auth})=>async(dispatch)=>{

    try{
        

        const newComment = {...comment , likes:[...comment.likes , auth.user]}

       const new_data = post.comments.map((item)=>(
            item._id === comment._id ? newComment : item
        ))
        const newData = {...post , comments:[...new_data]}
        dispatch({type:POST_TYPE.UPDATE_POST ,  payload:newData})

        const res = await patchDataAPI(`comment/${comment._id}/like` , null , auth.token)

    }catch(err){}


}
export const unLikeComment = ({post , comment , auth})=>async(dispatch)=>{

    try{

        const new_comment = comment.likes.filter((item)=>(item._id !== auth.user._id))
        const newComment = {...comment , likes:[...new_comment]}
        const cm = post.comments.map((item)=>(
            item._id === comment._id ? newComment : item
        ))
        const newData = {...post , comments:[...cm]}
        dispatch({type:POST_TYPE.UPDATE_POST ,  payload:newData})

        const res = await patchDataAPI(`comment/${comment._id}/unlike` , null , auth.token)

        

    }catch(err){}

}