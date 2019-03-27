import React, {Component} from 'react'
import './UserBar.scss'

// Components
import ProfileTab from '../../Components/ProfileTab/ProfileTab'
import Matches from '../../Components/Matches/Matches'
import Messages from '../../Components/Messages/Messages'

class UserBar extends Component {
  render () {
    return (
      <div className="UserBar">
        <ProfileTab />
        <Matches />
        <Messages /> 
      </div>
    )
  }
}

export default UserBar
