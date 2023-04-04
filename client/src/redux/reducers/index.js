import { combineReducers } from "redux";
import {auth} from './authReducer'
import {alert} from './alertReducer'
import { theme } from "./themeReducer";
import profile from './profileReducer'
import {postReducer} from './postReducer';
import { status } from "./statusReducer";
import  discoverReducer  from './discoverReducer'
import { suggestionReducer } from "./suggestionReducer";
import {notifyReducer} from './notifyReducer'
import socket from "./socketReducer";
import {messageReducer} from './messageReducer';
import peerReducer from './peerReducer';
import callReducer from './callReducer'
export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    postReducer,
    status,
    discoverReducer,
    suggestionReducer,
    socket,
    notifyReducer,
    messageReducer,
    peerReducer,
    callReducer
})

