import React from 'react'
import Search from './search'
import Menu from './menu'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='headerMain'>
      <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle">

                <Link to="/" className="logo">
                    <h1 className="navbar-brand text-uppercase p-0 m-0"
                    onClick={() => window.scrollTo({top: 0})}>
                       Minigram
                    </h1>
                </Link>

                <Search />
                
                <Menu />
            </nav>
        </div>
    </div>
  )
}

export default Header
