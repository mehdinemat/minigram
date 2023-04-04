import { POST_TYPE } from "../action/postAction"
import { EditData, GLOBALTYPES , deleteData } from "../action/GLOBALTYPES"
const initialState  = {
    loading:false , 
    posts:[],
    result:0,
    page:1,
    postDetails:{}
}
export const postReducer = (state=initialState , action)=>{
    switch(action.type){
        case POST_TYPE.CREATE_POST:
            return {
                ...state , posts:[action.payload , ...state.posts]
            }
            case POST_TYPE.LOADING_POST:
                return {
                    ...state, loading:action.payload
                }
                case POST_TYPE.GET_POST:
                    return {
                        ...state , 
                        posts:[...state.posts , ...action.payload.posts] , result:action.payload.result , page:action.payload.page
                    }
                    case POST_TYPE.UPDATE_POST:
                        return {
                            ...state ,posts:EditData( {post:state.posts , newPost:action.payload }) , postDetails:action.payload
                        }

                        case POST_TYPE.POST_DETAILS:
                            return {
                                ...state , postDetails:action.payload
                            }
                            case POST_TYPE.DELETE_POST:
                                return {
                                    ...state , posts:deleteData({posts:state.posts , deletePost:action.payload})
                                }
                               
                           

            default:
                return {
                    ...state
                }
    }
}