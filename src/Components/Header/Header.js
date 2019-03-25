import React from 'react'
import './Header.scss'
import {Link} from 'react-router-dom'

const Header = (props) => {
  return (
    <header>
      <Link to='/'><h1>Spookr</h1></Link>
    </header>
  )
}

export default Header
