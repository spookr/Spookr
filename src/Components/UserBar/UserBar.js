import React, {Component} from 'react'
import './UserBar.scss'

// Components
import ProfileTab from '../../Components/ProfileTab/ProfileTab'
import Messages from '../../Components/Messages/Messages'

class UserBar extends Component {
  render () {
    return (
      <div className="UserBar">
        <ProfileTab toggleEdit={this.props.toggleEdit} />
        <Messages toggleConversation={this.props.toggleConversation} matches={this.props.matches}/>
      </div>
    )
  }
}

export default UserBar
