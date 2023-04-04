import { GLOBALTYPES } from "../action/GLOBALTYPES" 
const initialState ={}
export const alert = (state=initialState , action)=>{

    switch(action.type){
        case GLOBALTYPES.ALERT:
            return action.payload
        default:
            return {
                ...state={}
            }

    }


}