import React, {Component} from 'react'
import './Discovery.scss'

// Components
import ProfileTab from '../ProfileTab/ProfileTab'

// Packages
import { Slider } from 'antd';
import axios from 'axios'
import {logOut, getUser} from '../../redux/reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Discovery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slider: this.props.user.radius
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if(prevProps.user.radius !== this.state.slider) {
      this.props.updateUser()
    }
  }

  logout = () => {
    axios.post('/logout').then(res => {
      this.props.logOut();
      this.props.history.push("/");
    }).catch(err => {
        console.log(err);
      });
    };

  onSliderChange = (value) => {
    this.setState({
      slider: value
    })
  }

  submitDistance = (radius) => {
    axios.put('/updateradius', {radius}).then(res => {
      this.props.getUser(res.data)
    })
    this.props.getFilteredSwipes()
  }

  render () {

    console.log(this.props)
    const displaySlider = this.props.user.ghost &&
    <div>
      <div className="DiscoveryHeader">
        <h2>Discovery Settings</h2>
        <h3>{this.state.slider} miles</h3>
      </div>
      <Slider defaultValue={this.state.slider} onChange={this.onSliderChange}/>
    </div>

    return (
      <div className="Discovery">
        <ProfileTab toggleEdit={this.props.toggleEdit}/>
        <div className="DiscoverySettings">
          {displaySlider}
          <div className='NavigationButton'>
            {this.props.user.ghost && <button onClick={() => this.submitDistance(this.state.slider)}>Submit Changes</button>}
            <button id="LogoutButton" onClick={this.logout}>Logout</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logOut,
  getUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Discovery))
