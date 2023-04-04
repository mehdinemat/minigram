import { GLOBALTYPES } from "../action/GLOBALTYPES";    


    export const status=(state=false , action)=>{
        switch(action.type){
            case GLOBALTYPES.STATUS:
                return action.payload
                default:
                    return state;
        }
    }