import { getDataAPI } from "../../utils/fetchData"

export const SUGGEST_TYPE ={
    LOADING:"LOADING",GET_USERS:"GET_USERS"
}

export const getSuggestion = ({auth})=>async(dispatch)=>{

    try{

       dispatch({type:SUGGEST_TYPE.LOADING , payload:true})
        console.log(auth.user._id , 'id')
        const res = await getDataAPI(`suggestion/${auth.user._id}` , auth.token)
       dispatch({type:SUGGEST_TYPE.GET_USERS , payload:res.data.users})
        dispatch({type:SUGGEST_TYPE.LOADING , payload:false})

    }catch(err){dispatch({type:SUGGEST_TYPE.LOADING , payload:false})}


}