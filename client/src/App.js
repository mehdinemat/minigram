import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import PageRender from './customRouter/PageRender';
import Home from './pages/home';
import Login from './pages/login'
import Alert from './components/alert/alert';
import { useSelector , useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { refresh_token } from './redux/action/authAction';
import Header from './components/header/header';
import PrivateRoute from './customRouter/PrivateRoute';
import StatusModal  from './components/StatusModal';
import { getPost } from './redux/action/postAction';
import {io} from 'socket.io-client'
import { GLOBALTYPES } from './redux/action/GLOBALTYPES';
import SocketClient from './SocketClient';
import { getNotify } from './redux/action/notifyAction';
import CallModal from './components/CallModal';
import Peer from 'peerjs'
import Register from './pages/Register';
function App() {
  
  const {auth , socket , status , callReducer , peerReducer} = useSelector((state)=>state)
  const dispatch = useDispatch()
  const [peerR , setPeerR] = useState('')
  useEffect(()=>{

    if(auth.token){
      
    
      const socket = io.connect('http://localhost:5000')
      dispatch({type:GLOBALTYPES.SOCKET , payload:socket})
      return () => socket.close()
    }
   

  },[auth.token])

  useEffect(()=>{
  
        dispatch(refresh_token())
        dispatch(getPost(auth))
        dispatch(getNotify({auth}))
    
  },[auth.token ])

  useEffect(()=>{
    const newPeer = new Peer(undefined , {
      host:'/' , port:'5001'

    })
    setPeerR(newPeer)
   dispatch({type:GLOBALTYPES.PEER , payload:newPeer})

  },[dispatch])

  return (
    <Router>
      <Alert/>
      {auth.token && <Header/>}
      {socket.connected && <SocketClient/>}
      <input type="checkbox" id="theme" />
      <div className='App'>
      {callReducer && peerReducer._open && <CallModal peerR={peerR}/>}
      <Routes>
        {socket.connected && auth.user && <Route extact path='/:page' element={<PrivateRoute><PageRender/></PrivateRoute>} />}
        {auth.user && <Route extact path='/:page/:id' element={<PrivateRoute><PageRender/></PrivateRoute>} />}
      {<Route extact path='/register' element={<Register/>} />}

        <Route extact path='/'  element={auth.token ? <Home/> : <Login/>}/>
        {/* <Route extact path='/' element={<Home/>}/> */}
      </Routes>
      
      {status && <StatusModal />}
      </div>

    </Router>
  );
}

export default App;
