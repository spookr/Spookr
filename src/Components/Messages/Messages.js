import React, { Component } from 'react'
import './Messages.scss'

// Components
import MessageCard from '../MessageCard/MessageCard'

class Messages extends Component {
  render() {

    // <MessageCard toggleConversation={this.props.toggleConversation} />

    const displayMatches = this.props.matches && this.props.matches.length === 0 ?
      <h2 style={{ color: 'black' }}>You have no matches. Start swiping!</h2> : null

    return (
      <div className="Messages">
        <h1>Messages</h1>
        <MessageCard toggleConversation={this.props.toggleConversation} />

        {displayMatches}
      </div>
    )
  }
}

export default Messages
