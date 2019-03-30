import React, {Component} from 'react'
import './Homepage.scss'

// Packages
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

// Images
import CityScape from './assets/cityscape.svg'
import Moon from './assets/moon.svg'
import Building from './assets/building.svg'
import Rip from './assets/rip.svg'
import Star from './assets/star.svg'
import Spooker from './assets/spooker.svg'
import Responsive from './assets/responsive.svg'
import Factory from './assets/factory.svg'
import Ghost from './assets/ghost.svg'

class Homepage extends Component {

  render () {

    const displayRegister = !this.props.user.id &&
      <div className="HomepageRegister">
        <Link to={{
            pathname: '/register'
            }} ><button>Register</button></Link>
      </div>

    return (
      <main>
        <div className="HomepageSecondary">
          <div className="HomepageHeader">
            <div className="HeaderText">
              <h1>Swipe. Match. Haunt</h1>
              <p>All-in-one voice and text chat for ghosts and homeowners that's free, secure, and works on both your desktop and phone. Stop watching Ghost Adventures and experience a haunting all your own.</p>
            </div>
            <div className="HeaderBody">
              <div className="HeaderContainer">
                <img id="Moon" src={Moon} alt="Moon Icon" />
                <img id="Building" src={Building} alt=" Building Icon" />
                <img id="CityScape" src={CityScape} alt="City Icon" />
                <img id="Factory" src={Factory} alt="Factory Icon" />
                <img id="Star3" src={Star} alt="Star Icon" />
                <img id="Star4" src={Star} alt="Star Icon" />
                <img id="Star5" src={Star} alt="Star Icon" />
                <img id="Star6" src={Star} alt="Star Icon" />
                <img id="Star7" src={Star} alt="Star Icon" />
                <img id="Ghost" src={Ghost} alt="Spooky Ghost" />
              </div>
            </div>
          </div>
          <div className="HomepageBody">
            <div className="HomepageSubBody">
              <h2>Find your perfect haunting.</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                {displayRegister}
            </div>
            <div className="HomepageGraphic">
              <img id="Responsive" src={Responsive} alt="Responsive Icon" />
                <img id="Spooker" src={Spooker} alt="Spooker Main" />
              <img id="Rip" src={Rip} alt="Tombstone" />
            </div>
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
