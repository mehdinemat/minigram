import {DISCOVER_TYPES} from '../action/discoverAction'
const initialState = { loading :false , post:[] , result: 9,
    page: 2,
    firstLoad: false}
const discoverReducer = (state=initialState , action)=>{

    switch(action.type){
        case DISCOVER_TYPES.GET_DISCOVER_POST:
            return {
                ...state , post:action.payload , firstLoad: true
            }
            case DISCOVER_TYPES.UPDATE_POST:
                return {
                    ...state ,  post: action.payload.post,page: state.page + 1
                }
            default:
                return {...state}
    }

}
export default discoverReducer