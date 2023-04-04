import  {deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI}  from '../../utils/fetchData'
import {GLOBALTYPES} from '../action/GLOBALTYPES'
export const MESS_TYPES = {
    ADD_USER:"ADD_USER",
    GET_MESSAGE:"GET_MESSAGE",
    ADD_MESSAGE : "ADD_MESSAGE",
    UPDATE_USER:"UPDATE_USER",
    DELETE_USER:"DELETE_USER",
    DELETE_MESSAGES : "DELETE_MESSAGES",
    DELETE_MESSAGE:"DELETE_MESSAGE",
    UPDATE_MESSAGE :"UPDATE_MESSAGE"
}

export const getMessage = ({auth , id})=>async(dispatch)=>{

    try{

       // dispatch({type:GLOBALTYPES.ALERT , payload:{loading:true}})
        
        const res = await getDataAPI(`message/${id}` , auth.token )
        
        const newArr = {...res.data , messages:res.data.messages.reverse()}
        
        
        dispatch({type:MESS_TYPES.GET_MESSAGE , payload:{...newArr , _id:id} })
        console.log({...newArr , _id:id} )
        //dispatch({type:GLOBALTYPES.ALERT , payload:{loading:false}})



    }catch(err){ dispatch({type:GLOBALTYPES.ALERT , payload:err.message}) }


}
export const addMessage = ({msg , auth , id , socket})=>async(dispatch)=>{

        const text = msg.text ? msg.text.slice(0,10)+'...' : ''

        dispatch({type:MESS_TYPES.UPDATE_USER , payload:{id , text:text , media:msg.media}})
        const res = await postDataAPI('message' , {msg} , auth.token)
        dispatch({type:MESS_TYPES.ADD_MESSAGE , payload:res.data.newMessage})
        socket.emit('sendMessage' , res.data.newMessage)

}
export const getConversation = ({auth})=>async(dispatch)=>{

    try{

        const res = await getDataAPI('conversation' , auth.token)
        console.log(res.data.conversation)
        res.data.conversation.map((item)=>{
            const newArr = item.text.length > 10 ? item.text.slice(0,10)+'...' : item.text
            item.recipients.map((user)=>(
              user._id !== auth.user._id ? dispatch({type:MESS_TYPES.ADD_USER , payload:{...user , text:newArr , media:[]}}) :''
            ))
          
            })

    }catch(err){}

}
export const deleteUser = ({auth , id})=>async(dispatch)=>{

    dispatch({type:MESS_TYPES.DELETE_USER , payload:id})

    const res = await deleteDataAPI(`conversation/${id}` , auth.token)

}
export const deleteMessagesUser = ({auth , id})=>async(dispatch)=>{

    dispatch({type:MESS_TYPES.DELETE_MESSAGES , payload:id})


}
export const deleteMessage  = ({auth , msg , msgId , id , socket})=>async(dispatch)=>{
    console.log(msg , msgId)
    const newArr ={...msg , messages:msg.messages.filter((item)=>( item._id !== msgId ))}
    socket.emit('deleteMessage' , {newArr:{...newArr , _id:auth.user._id} , msgId:auth.user._id , id})
   dispatch({type:MESS_TYPES.DELETE_MESSAGE , payload:{newArr , id}})
   const res = await deleteDataAPI(`message/${msgId}` , auth.token)

}
export const readMessage = ({item ,auth})=>async(dispatch)=>{
    const res =await patchDataAPI('readmessage' , {item} , auth.token ) 

}