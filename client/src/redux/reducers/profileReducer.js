import { PROFILE_TYPES } from "../action/profileAction"
const initialReducer = { loading:false , ids:[] , users:[] , posts:[] }
const profileReducer= (state=initialReducer , action)=>{

    switch(action.type){

        case PROFILE_TYPES.LOADING:
            return { ...state , loading:action.payload }
            case PROFILE_TYPES.GET_USER:
                return {
                    ...state , users:[...state.users , action.payload.user]
                }
                case PROFILE_TYPES.FOLLOWER:
                    return {
                        ...state , users:action.payload
                    }
                    case PROFILE_TYPES.GET_ID:
                        return {
                            ...state , ids:[...state.ids , action.payload]
                        }
                        case PROFILE_TYPES.GET_PROFILE_POST:
                            return { 
                                ...state , posts:[...state.posts , ...action.payload.post]
                            }

            default:
                return {...state}

    }




}
export default profileReducer