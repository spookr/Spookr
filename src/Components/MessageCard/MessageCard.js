import React, {Component} from 'react'
import './MessageCard.scss'

// Components
import ProfileIcon from '../ProfileIcon/ProfileIcon'

class Conversation extends Component {
  render () {
    return (
      <div className="MessageCard" onClick={this.props.toggleConversation}>
        <ProfileIcon />
        <div className="RecentMessage">
          <h2>Name</h2>
          <p>Most recent message.</p>
        </div>
      </div>
    )
  }
}

export default Conversation