import React, {Component} from 'react'
import './Discovery.scss'

// Components
import ProfileTab from '../ProfileTab/ProfileTab'

// Packages
import { Slider } from 'antd';
import axios from 'axios'
import {logOut} from '../../redux/reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Discovery extends Component {
  constructor () {
    super()
    this.state = {
      slider: 50
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

  render () {

    // console.log(this.state.slider)

    return (
      <div className="Discovery">
        <ProfileTab toggleEdit={this.props.toggleEdit}/>
        <div className="DiscoverySettings">
          <h1>Discovery Settings</h1>
          <Slider defaultValue={this.state.slider} onChange={this.onSliderChange}/>

          <div className='NavigationButton'>
            <button id="NextButton" onClick={this.logout}>Logout</button>
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
  logOut
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Discovery))
