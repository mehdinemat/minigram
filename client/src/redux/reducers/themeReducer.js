
import { GLOBALTYPES } from "../action/GLOBALTYPES"
const initialState =false
export const theme = (state=initialState , action)=>{

    switch(action.type){
        case GLOBALTYPES.THEME:
        return action.payload
        default:
            return false 
                
            
    }

}