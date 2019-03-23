import React, {Component} from 'react'
import './Homepage.scss'

// Packages
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

// Images
import Ghost from './assets/ghost.svg'
import CityScape from './assets/cityscape.svg'
import Haunt from './assets/haunt.svg'
import Moon from './assets/moon.svg'
import Building from './assets/building.svg'
import Graveyard from './assets/graveyard.svg'
import Rip from './assets/rip.svg'
import Star from './assets/star.svg'
import Spooker from './assets/spooker.svg'
import Responsive from './assets/responsive.svg'

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
              <p>All-in-one voice and text chat for gamers that's free, secure, and works on both your desktop and phone. Stop paying for TeamSpeak servers and hassling with Skype. Simplify your life.</p>
            </div>
            <div className="HeaderBody">
              <div className="HeaderContainer">
                <img id="Moon" src={Moon} />
                <img id="Spooker" src={Spooker} />
                <img id="Building" src={Building} />
                <img id="CityScape" src={CityScape} />
                <img id="Responsive" src={Responsive} />
                <img id="Rip" src={Rip} />

              
                <img id="Star3" src={Star} />
                <img id="Star4" src={Star} />
                <img id="Star5" src={Star} />
                <img id="Star6" src={Star} />
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
              <img src={Ghost} alt="Homepage Ghost" />
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
