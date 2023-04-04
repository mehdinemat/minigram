import React , {useState} from 'react'
import { useLocation , Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/action/GLOBALTYPES'
import { logout } from '../../redux/action/authAction'
import Avatar from '../Avatar'
import NotifyModal from '../../components/NotifyModal'
const Menu = () => {

    const {auth , alert , theme , notifyReducer} = useSelector((state)=>state)
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const navLinks = [
        { lable:'Home' , icon:'home' , path:'/' },
        { lable:'Message' , icon:'near_me' , path:'/message' },
        { lable:'Discover' , icon:'explore' , path:'/discover' }
    ]
    const isActive = (pt)=>{
        if(pt === pathname) return 'active'
    }

  return (
    <div className='headerMain'>
        <ul className='navbar-nav flex-row menu subHeader'>
            {
                navLinks.map((item , index)=>(
                    
                   <li className={`${isActive(item.path)}`}>
                        <Link to={item.path}>
                        <span className='material-icons'>{item.icon}</span>
                        </Link>
                   </li> 
                ))

            }

                <li className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link position-relative" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        <span className="material-icons" 
                      style={{color: notifyReducer.data.length > 0 ? 'crimson' : ''}}
                        >
                            favorite
                        </span>

                        <span className="notify_length">
                            {notifyReducer.data.length}
                            </span>

                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                    style={{transform: 'translateX(75px)'}}>
                         <NotifyModal />
                    </div>
                        
                </li>


                <li className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium-avatar" />
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>

                    <label htmlFor="theme" className="dropdown-item"
                    onClick={() => dispatch({
                        type: GLOBALTYPES.THEME, payload: !theme
                    })}>

                        {theme ? 'Light mode' : 'Dark mode'}
                    </label>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/"
                    onClick={() => dispatch(logout())}>
                        Logout
                    </Link>
                </div>
            </li>

        </ul>
      
    </div>
  )
}

export default Menu
