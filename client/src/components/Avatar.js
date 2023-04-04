import React from 'react'
import { useSelector } from 'react-redux'
const Avatar = ({src , size}) => {
  
    const {theme , auth} = useSelector((state)=>state)
 
    return (
    <img className={size} src={src ? src : auth.user.avatar} style={{filter:`${theme} ? 'invert(1)' : 'invert(0)'`}} />
  )
}

export default Avatar
