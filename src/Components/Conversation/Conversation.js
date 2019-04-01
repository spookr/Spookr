import React, { Component } from 'react'
import './Conversation.scss'

// Components
import ProfileIcon from '../ProfileIcon/ProfileIcon'
import Delete from './assets/delete.svg'
import ProfileSideBar from '../ProfileSideBar/ProfileSideBar'

class Conversation extends Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
  }

  inputMessage = (event) => {
    this.setState({
      message: event.target.value
    })
  }


  render() {
    return (
      <div className="Conversation">
        <div className="ConversationMessages">
          <div className="ConversationNavigation">
            <div className="ConversationModule">
              <ProfileIcon />
              <h1>Conversation with Name</h1>
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
          <ProfileSideBar user={{
            name: 'Savannah',
            profile_pic: 'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/10/ghost-796x498.jpg',
            entity: 'demon',
            bio: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }} />
        </div>
      </div>
    )
  }
}

export default Conversation
