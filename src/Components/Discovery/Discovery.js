import React, {Component} from 'react'
import './Discovery.scss'

// Components
import ProfileTab from '../ProfileTab/ProfileTab'

// Packages
import { Slider } from 'antd';

class Discovery extends Component {
  constructor () {
    super()
    this.state = {
      slider: 50
    }
  }

  onSliderChange = (value) => {
    this.setState({
      slider: value
    })
  }

  render () {

    console.log(this.state.slider)

    return (
      <div className="Discovery">
        <ProfileTab toggleEdit={this.props.toggleEdit}/>
        <div className="DiscoverySettings">
          <h1>Discovery Settings</h1>
          <Slider defaultValue={this.state.slider} onChange={this.onSliderChange}/>
        </div>
      </div>
    )
  }
}

export default Discovery
