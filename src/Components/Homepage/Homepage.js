import React, {Component} from 'react'
import './Homepage.scss'

// Packages
import {Link} from 'react-router-dom'

class Homepage extends Component {
  render () {
    return (
      <main>
        <Link to='/login'><button>Login</button></Link>
        <Link to='/register'><button>Register</button></Link>
      </main>
    )
  }
}

export default Homepage
