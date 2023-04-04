
import { MESS_TYPES } from "../action/messageAction"
const initialState  ={
    users:[],
    resultUsers:0,
    data:[],
    firstLoad:false
}
export const messageReducer = (state=initialState , action)=>{

    switch(action.type){

        case MESS_TYPES.ADD_USER:
            if(state.users.every((user)=>( user._id !==  action.payload._id))){
                return {
                    ...state , users:[action.payload , ...state.users]
                }
            }
            return state

            case MESS_TYPES.UPDATE_USER:
                return {
                    ...state , users:state.users.map((user)=>(
                            user._id === action.payload.id ? {...user , text:action.payload.text , media:action.payload.media} : user
                    ))
                }

            case MESS_TYPES.GET_MESSAGE:
                return {
                    ...state , data:[...state.data , action.payload]
                }
                case MESS_TYPES.ADD_MESSAGE:
                    return {
                        ...state , data:state.data.map((data)=>(
                            data._id === action.payload.sender || data._id === action.payload.recipient ?
                            {
                                ...data , messages:[...data.messages , action.payload] , result:data.result+1
                            } : data

                        ))
                    }
                    case MESS_TYPES.UPDATE_MESSAGE:
                        console.log(action.payload)
                    return {
                        ...state , data:state.data.map((data)=>(
                            data._id === action.payload.sender || data._id === action.payload.recipient ?
                            {
                                ...data , messages:data.messages.map((item)=>(
                                    item._id === action.payload._id ? action.payload : item
                                )) , result:data.result+1
                            } : data

                        ))
                    }
                    case MESS_TYPES.DELETE_USER:
                        return {
                            ...state , users:state.users.filter((item)=>(
                                item._id !== action.payload
                            ))
                        }
                        case MESS_TYPES.DELETE_MESSAGES:
                            return {
                                ...state , data:state.data.filter((item)=>(
                                        item._id !== action.payload
                                ))
                            }
                            case MESS_TYPES.DELETE_MESSAGE:
                                return{
                                   ...state , data:state.data.map((item)=>( item._id === action.payload.id ? action.payload.newArr : item ))
                                }
            default:
                return state
        
    }


}