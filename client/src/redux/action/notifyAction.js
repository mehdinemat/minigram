import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData"

export const NOTIFY_TYPE={
    CREATE_NOTIFY:"CREATE_NOTIFY",
    GET_NOTIFY:"GET_NOTIFY",
    UPDATE_NOTIFY:"UPDATE_NOTIFY",
    UPDATE_SOUND :"UPDATE_SOUND"
}
export const createNotify = ({msg , auth , socket})=>async(dispatch)=>{
    
    const res = await postDataAPI('notify' , msg , auth.token )
    socket.emit('createNotify' , {...res.data.notify , user:{
        username:auth.user.username,
        avatar:auth.user.avatar
    }})

}
export const removeNotify = ({msg , auth}) => async(dispatch)=>{
    console.log('delete post')
    const res = await deleteDataAPI(`notify/${msg.id}?url=${msg.url}` , auth.token)
    
}
export const getNotify = ({auth})=>async(dispatch)=>{
    console.log(auth.token)
    const res = await getDataAPI('notify' , auth.token)
    dispatch({type:NOTIFY_TYPE.GET_NOTIFY , payload:res.data.notif})
    

}
export const isReadNotify = ({item , auth , socket})=>async(dispatch)=>{

    const msg = {...item , isRead:true}
    dispatch({type:NOTIFY_TYPE.UPDATE_NOTIFY , payload:msg})
    const notify = await patchDataAPI(`notify/${msg._id}` , null, auth.token)
    dispatch(getNotify({auth}))
}
export const deleteNotifies = ({auth})=>async(dispatch)=>{

    const notify = await deleteDataAPI(`notify` , auth.token)

    dispatch(getNotify({auth}))

}