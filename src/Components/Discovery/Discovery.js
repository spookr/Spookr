import React, {Component} from 'react'
import './Discovery.scss'

// Components
import ProfileTab from '../ProfileTab/ProfileTab'

class Discovery extends Component {
  render () {
    return (
      <div className="Discovery">
        <ProfileTab toggleEdit={this.props.toggleEdit}/>
        <div className="DiscoverySettings">
          <h1>Discovery Settings</h1>

        </div>
      </div>
    )
  }
}

export default Discovery
