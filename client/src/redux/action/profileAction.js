import { getDataAPI  , patchDataAPI} from "../../utils/fetchData"
import { GLOBALTYPES } from "./GLOBALTYPES"
import { imageUpload } from "../../utils/checkImage"
export const PROFILE_TYPES = {
    LOADING : "LOADING",
    GET_USER : "GET_USER",
    FOLLOWER:"FOLLOWER",
    GET_ID:"GET_ID",
    GET_PROFILE_POST:"GET_PROFILE_POST"
}

export const getProfileUser = ({id , auth})=>async(dispatch)=>{
    
            dispatch({type:PROFILE_TYPES.GET_ID , payload:id})

        try{

            dispatch({type:PROFILE_TYPES.LOADING , payload:true})

            const {data} =await getDataAPI(`user/${id}` , auth.token)
            const res = await getDataAPI(`profilepost/${id}`, auth.token)


            dispatch({type:PROFILE_TYPES.GET_USER , payload:data})
            dispatch({type:PROFILE_TYPES.GET_PROFILE_POST , payload:res.data})

            dispatch({type:PROFILE_TYPES.LOADING , payload:false})


        }catch(err){ dispatch({type:GLOBALTYPES.ALERT ,payload:err.message }) }
}

export const updateProfileuser = ({userData , auth , avatar})=>async(dispatch)=>{
    console.log(userData)
    if(!userData.fullname) {return dispatch({type:GLOBALTYPES.ALERT , payload:{error:"Please add your full name"}})}
    if(userData.fullname.length > 25)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your full name too long."}})

    if(userData.story.length > 200)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your story too long."}})

    try{
        let media
        dispatch({type:GLOBALTYPES.ALERT , payload:{loading:true}})


         const res = await patchDataAPI('user' , {userData , avatar} , auth.token)
         console.log(res.data)
        dispatch({type:GLOBALTYPES.AUTH , payload:{ ...auth , user:{...auth.user , ...userData , avatar:res.data.avatar} }})

        dispatch({type:GLOBALTYPES.ALERT , payload:{success:res.data.msg}})

    }catch(err){ dispatch({type:GLOBALTYPES.ALERT , payload:{error:err.message}}) }

}
export const follow = ( auth , user  , profile )=>async(dispatch)=>{

    let newUsers =[] 

    console.log(user)
    dispatch({type:GLOBALTYPES.FOLLOW , payload:{...auth , ...auth.user, following:[...auth.user.following , user]}})

    profile.users.forEach(item=>{
        if(item._id !== user._id){
           newUsers = [...newUsers , item]
        }else {
            newUsers = [...newUsers , {...user , followers:[...user.followers , auth.user._id]}]
        }
    })
    console.log(newUsers)
    dispatch({type:GLOBALTYPES.FOLLOWER , payload:newUsers})

    const res = await patchDataAPI(`user/${user._id}/follow` , null , auth.token)

    dispatch({type:GLOBALTYPES.ALERT , payload:res.data.msg})

}
export const unFollow  = (auth , user , profile)=>async(dispatch)=>{
    console.log('unfollow')

    let newUsers = []
    const followers = auth.user.following.filter(item=>item._id !== user._id)

    dispatch({type:GLOBALTYPES.FOLLOW , payload:{...auth , ...auth.user , following:followers}})
    
   profile.users.forEach(item =>{
    if(item._id !== user._id){
        newUsers = [...newUsers , item]
    }else {
        let followers =[]
       followers = user.followers.filter(item=> item._id !== auth.user._id)
        newUsers = [...newUsers , {...user , followers:followers}]
    }
   })
    
    dispatch({type:GLOBALTYPES.FOLLOWER , payload:newUsers})
    const res = await patchDataAPI(`user/${user._id}/unfollow` , null , auth.token)
}
