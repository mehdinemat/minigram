import React from 'react'
import {useNavigate} from 'react-router-dom'
const PrivateRoute = ({children}) => {
    const navigate= useNavigate()
    const firstLogin = localStorage.getItem('firstLogin')
  return firstLogin ? children : navigate('/')
}

export default PrivateRoute
