import { SUGGEST_TYPE } from "../action/suggestionAction"

const initialState = {
    loading:false , suggestion:[]
}
export const suggestionReducer = (state=initialState , action)=>{

    switch(action.type){

        case SUGGEST_TYPE.LOADING:
            return {
                ...state , loading:action.payload
            }
            case SUGGEST_TYPE.GET_USERS:
                return {
                    ...state , suggestion:action.payload
                }
                default:
                    return {
                        ...state 
                    }

    }


}