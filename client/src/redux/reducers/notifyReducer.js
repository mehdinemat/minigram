import { EditData } from '../action/GLOBALTYPES'

const {NOTIFY_TYPE} = require('../action/notifyAction')

    const initialState = {
        loading:false , 
        data:[],
        sound:false
    }

export const notifyReducer = (state=initialState , action)=>{


    switch(action.type){
        case NOTIFY_TYPE.CREATE_NOTIFY:
            return {
                ...state  , data:[action.payload ,...state.data  ]
            }
            case NOTIFY_TYPE.GET_NOTIFY:
                return {
                    ...state , data:[...action.payload]
                }
                case NOTIFY_TYPE.UPDATE_NOTIFY:
                    return {
                        ...state , data:EditData({post:state.data , newPost:action.payload})
                    }
                    case NOTIFY_TYPE.UPDATE_SOUND:
                        return {
                            ...state , sound:action.payload
                        }
            default:
            return state
    }

}