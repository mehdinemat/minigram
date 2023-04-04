import { GLOBALTYPES } from "./GLOBALTYPES";
import { postDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";
export const login =(data)=>async(dispatch)=>{

    try{
        dispatch({type:GLOBALTYPES.ALERT , payload:{loading:true}})
        const res = await postDataAPI('login'  , data)
        console.log('salam')
        dispatch({type:GLOBALTYPES.AUTH , payload:{
            token:res.data.accessToken , user:res.data.user 
        }})
        localStorage.setItem('firstLogin' , true)
        dispatch({type:GLOBALTYPES.ALERT , payload:{
            success : res.data.msg
        }})


    }catch(err){
        dispatch({type:GLOBALTYPES.ALERT , payload:{
            error:err.message
        }})
    }    




}
export const register=  (data)=>async(dispatch)=>{

   const check =  valid(data)
  
    if(check.errLength > 0){
       return dispatch({type:GLOBALTYPES.ALERT , payload:check.errMsg})
    }
    try{
        dispatch({type:GLOBALTYPES.ALERT , payload:{
            loading:true
        }})
        const res =await postDataAPI('register' , data)
        dispatch({type:GLOBALTYPES.AUTH , payload:{
            token : res.data.accessToken , 
            user : res.data.user
        }})

        dispatch({type:GLOBALTYPES.ALERT , payload:{
            success:res.data.msg
        }})

    }catch(err){
        dispatch({type:GLOBALTYPES.ALERT , payload:{
            error:err.message
        }})
    }

}
export const refresh_token = ()=>async(dispatch)=>{

    dispatch({type:GLOBALTYPES.ALERT , payload:{loading:true}})
    console.log('run is true')
    try{

        const res = await postDataAPI('refresh_token')
        dispatch({type:GLOBALTYPES.AUTH , payload:{
            token:res.data.accessToken ,
            user:res.data.user
        }})

        dispatch({type:GLOBALTYPES.ALERT , payload:{}})

    }catch(err){dispatch({type:GLOBALTYPES.AUTH , payload:{error:'THIS RUN'}})}


}
export const logout =()=>async(dispatch)=>{

    dispatch({type:GLOBALTYPES.ALERT , payload:{loading:true}})
    try{
        localStorage.removeItem('firstLogin')
        const res = await postDataAPI('logout')
        dispatch({type:GLOBALTYPES.AUTH , payload:{}})

        dispatch({type:GLOBALTYPES.ALERT , payload:{success:res.data.msg}})

        window.location.href = "/"

    }catch(err){dispatch({type:GLOBALTYPES.ALERT , payload:{success:err.message}})}

}
