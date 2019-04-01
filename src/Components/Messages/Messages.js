import React, {Component} from 'react'
import './Messages.scss'

// Components
import MessageCard from '../MessageCard/MessageCard'

class Messages extends Component {
  render () {
    return (
      <div className="Messages">
        <h1>Messages</h1>
        <MessageCard toggleConversation={this.props.toggleConversation}/>
        <MessageCard toggleConversation={this.props.toggleConversation}/>
        <MessageCard toggleConversation={this.props.toggleConversation}/>
      </div>
    )
  }
}

export default Messages
