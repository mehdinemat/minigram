import React from 'react'
import Loading from './loading'
import Toast from './toast'
import { useSelector , useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../../redux/action/GLOBALTYPES'
const Alert = () => {
  const dispatch = useDispatch()
  const {alert } = useSelector((state)=>state)
  
  return (
    <div style={{zIndex:999 , position:'fixed'}}>
      {alert.loading && <Loading/>}
      {alert.error && <Toast msg={{title:'خطا' , body:alert.error}} bgColor='bg-danger' handleShow={()=>dispatch({type:GLOBALTYPES.ALERT , payload:{}})}/>}
      {alert.success && <Toast msg={{title:'موفق' , body:alert.success}} bgColor='bg-success' handleShow={()=>dispatch({type:GLOBALTYPES.ALERT , payload:{}})}/>}
    </div>
  )
}

export default Alert
