import { getDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./GLOBALTYPES"

export const DISCOVER_TYPES ={
    GET_DISCOVER_POST : "GET_DISCOVER_POST",
    UPDATE_POST : "UPDATE_POST"
}

export const getDiscoverPost = ({auth})=>async(dispatch)=>{

    dispatch({type:GLOBALTYPES.ALERT , payload:{loading:true}})

    try{
        console.log
        (auth , 'token discover')
        const res = await getDataAPI('getpostdiscover' , auth.token )


        dispatch({type:DISCOVER_TYPES.GET_DISCOVER_POST , payload:res.data.post})
        dispatch({type:GLOBALTYPES.ALERT , payload:{loading:false}})

    }catch(err){dispatch({type:GLOBALTYPES.ALERT , payload:{err:err.message}})}
    

}