import React, {Component} from 'react'
import './Conversation.scss'

// Components
import ProfileIcon from '../ProfileIcon/ProfileIcon'
import Delete from './assets/delete.svg'

class Conversation extends Component {
  constructor () {
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


  render () {
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
            <input type="text" placeholder="Type a message..." value={this.state.message} onChange={(e) => this.inputMessage(e)}/>
            <button>Send</button>
          </div>

        </div>
        <div className="ConversationProfile">
          <p>Profile of who are you communicating with!</p>
        </div>
      </div>
    )
  }
}

export default Conversation
