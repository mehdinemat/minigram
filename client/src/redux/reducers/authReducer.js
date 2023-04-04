import { GLOBALTYPES } from "../action/GLOBALTYPES"
import { POST_TYPE } from "../action/postAction"
const initialState = {user:{} , token:''}
export const auth =(state={auth:{}} , action)=>{
    switch(action.type){
        case GLOBALTYPES.AUTH:
            return {...state , token:action.payload.token , user:action.payload.user}
                case GLOBALTYPES.FOLLOW:
                    return {...state , user:action.payload}
                    case POST_TYPE.SAVE_POST:
                        return {
                           ...state , user:action.payload
                        }
                    
            default:
                return {...state}
    }

}