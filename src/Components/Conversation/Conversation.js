import React, { Component } from 'react'
import './Conversation.scss'
import io from 'socket.io-client'

// Components
import Delete from './assets/delete.svg'
import ProfileSideBar from '../ProfileSideBar/ProfileSideBar'
import Message from '../Message/Message'
import { withRouter } from 'react-router-dom'

class Conversation extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
      allMessages: []
    }
  }

  componentDidMount() {
    this.socket = io("http://localhost:4000/");
    // console.log(this.props.selectedUser.swipping_user, this.props.selectedUser.matched_user)

    const roomName = this.roomNameBuilder(this.props.selectedUser.swipping_user, this.props.selectedUser.matched_user)

    this.socket.emit('Join room', {
      roomName,
      senderID: this.props.selectedUser.swipping_user,
      receiverID: this.props.selectedUser.matched_user
    })

    this.socket.on('Messages', messages => {
      // console.log('messages are received succesfully')
      // console.log(messages)
      this.setState({ allMessages: messages })
      this.scrollToBottom();
    })
  }

  roomNameBuilder = (user_id, receiver_id) => {
    const roomName = `${Math.min(user_id, receiver_id)}_${Math.max(user_id, receiver_id)}`
    return roomName;
  }

  sendMessage = () => {
    const roomName = this.roomNameBuilder(this.props.selectedUser.swipping_user, this.props.selectedUser.matched_user)
    const body = {
      messenger: this.props.selectedUser.swipping_user,
      receiver: this.props.selectedUser.matched_user,
      message: this.state.message,
      roomName
    }
    this.socket.emit('New Message', body)
    this.setState({
      message: ''
    })
    // this.scrollToBottom();
  }

  scrollToBottom = () => {
    let objDiv = document.getElementsByClassName("ConversationBody")[0];
    console.log(objDiv)
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  inputMessage = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  render() {

    // console.log('user id', this.props.selectedUser.swipping_user)
    // console.log('matched user', this.props.selectedUser.matched_user)
    // console.log(this.state.allMessages)

    const displayMessages = this.state.allMessages.map(message => {
      return <Message key={message.id} {...message} />
    })

    return (
      <div className="Conversation">
        <div className="ConversationMessages">
          <div className="ConversationNavigation">
            <div className="ConversationModule">
              <img src={this.props.selectedUser.profile_pic} alt="Matched User" />
              <h1>Conversation with {this.props.selectedUser.ghost ? this.props.selectedUser.name : this.props.selectedUser.first_name}</h1>
            </div>
            <img src={Delete} style={{ 'cursor': 'pointer' }} onClick={this.props.closeConversation} id="CloseButton" alt="Close Conversation" />
          </div>
          <div className="ConversationBody">
            {displayMessages}
          </div>
          <div className="ConversationFooter">
            <input type="text" placeholder="Type a message..." value={this.state.message} onChange={(e) => this.inputMessage(e)} />
            <button onClick={this.sendMessage}>Send</button>
          </div>
        </div>
        <div className="ConversationProfile">
          <ProfileSideBar selectedUser={this.props.selectedUser} />
        </div>
      </div>
    )
  }
}

export default withRouter(Conversation)
