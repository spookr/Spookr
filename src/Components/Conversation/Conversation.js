import React, { Component } from 'react'
import './Conversation.scss'
import io from 'socket.io-client'

// Components
import ProfileIcon from '../ProfileIcon/ProfileIcon'
import Delete from './assets/delete.svg'
import ProfileSideBar from '../ProfileSideBar/ProfileSideBar'
import Message from '../Message/Message'
import {withRouter} from 'react-router-dom'

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

    const roomName = this.roomNameBuilder(this.props.user_id, this.props.receiver_id)

    this.socket.emit('Join room', {
      roomName,
      senderID: this.props.user_id,
      receiverID: this.props.receiver_id
    })

    this.socket.on('Messages', messages => {
      this.setState({ allMessages: messages })
    })
  }


  roomNameBuilder = (user_id, receiver_id) => {
    const roomName = `${Math.min(user_id, receiver_id)}_${Math.max(user_id, receiver_id)}`
    return roomName;
  }

  sendMessage = () => {
    const roomName = this.roomNameBuilder(this.props.user_id, this.props.receiver_id)
    const body = {
      messenger: this.props.user_id,
      receiver: this.props.receiver_id,
      message: this.state.message,
      roomName
    }
    this.socket.emit('New Message', body)
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

    console.log('user id', this.props.selectedUser.swipping_user)
    console.log('matched user', this.props.selectedUser.matched_user)

    return (
      <div className="Conversation">
        <div className="ConversationMessages">
          <div className="ConversationNavigation">
            <div className="ConversationModule">
              <img src={this.props.selectedUser.profile_pic} />
              <h1>Conversation with {this.props.selectedUser.ghost ? this.props.selectedUser.name : this.props.selectedUser.first_name}</h1>
            </div>
            <img src={Delete} onClick={this.props.closeConversation} id="CloseButton" alt="Close Conversation" />
          </div>
          <div className="ConversationBody">
            <h2>Insert messages here!</h2>
          </div>
          <div className="ConversationFooter">
            <input type="text" placeholder="Type a message..." value={this.state.message} onChange={(e) => this.inputMessage(e)} />
            <button>Send</button>
          </div>
        </div>
        <div className="ConversationProfile">
          <ProfileSideBar selectedUser={this.props.selectedUser}/>
        </div>
      </div>
    )
  }
}

export default withRouter(Conversation)
