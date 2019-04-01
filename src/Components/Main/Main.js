import React, {Component} from 'react'
import './Main.scss'

// Components
import Conversation from '../Conversation/Conversation'
import Swiper from '../Swiper/Swiper'
import UserEdit from '../UserEdit/UserEdit'

class Main extends Component {
  render () {

    const displayEdit = this.props.edit ? <UserEdit /> : <Swiper />
    const displayConversation = this.props.conversation && <Conversation closeConversation={this.props.closeConversation} />
    const displayToggle = this.props.conversation ? displayConversation : displayEdit

    return (
      <div className="Main">
        {displayToggle}
      </div>
    )
  }
}

export default Main
