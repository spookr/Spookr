import React, {Component} from 'react'
import './Homepage.scss'

// Packages
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {logIn} from '../../redux/reducer'

// Images
import Ghost from './assets/ghost.svg'

class Homepage extends Component {

  componentDidMount () {
    if (this.props.user) {
      this.props.history.push('/profile')
    }
  }

  render () {
    console.log(this.props)
    return (
      <main>
        <div className="HomepageSecondary">
          <div className="HomepageBody">
            <h1>Find your perfect haunting.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div className="HomepageRegister">
              <Link to={{
                  pathname: '/register'
                  }} ><button>Register</button></Link>
            </div>
          </div>
          <div className="HomepageGraphic">
            <img src={Ghost} alt="Homepage Ghost" />
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(Homepage)
