import React, {Component} from 'react'
import './Main.scss'

// Components
import Conversation from '../Conversation/Conversation'
import Swiper from '../Swiper/Swiper'
import UserEdit from '../UserEdit/UserEdit'
import MatchModal from '../MatchModal/MatchModal'

class Main extends Component {
  render () {

    const displaySwipes = this.props.swipes && this.props.swipes.map(swipe => {
      return (
        <Swiper key={swipe.user_id} {...swipe} />
      )
    }) 

    const displayEdit = this.props.edit ? <UserEdit /> : displaySwipes
    const displayConversation = this.props.conversation && <Conversation closeConversation={this.props.closeConversation} />
    const displayToggle = this.props.conversation ? displayConversation : displayEdit


    return (
      <div className="Main">
        {displayToggle}
        <MatchModal />
      </div>
    )
  }
}

export default Main
