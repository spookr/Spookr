import React from 'react'
import './Main.scss'

// Components
import Conversation from '../Conversation/Conversation'
import Swiper from '../Swiper/Swiper'
import UserEdit from '../UserEdit/UserEdit'
import MatchModal from '../MatchModal/MatchModal'

const Main = (props) => {

  const displaySwipes = props.swipes && props.swipes.map(swipe => {
    return (
      <Swiper key={swipe.user_id} {...swipe} swipeRight={props.swipeRight} swipeLeft={props.swipeLeft} />
    )
  })

  const displayMatchModal = props.matchModal && <MatchModal />

  const displayEdit = props.edit ? <UserEdit /> : displaySwipes
  const displayConversation = props.conversation &&  <Conversation closeConversation={props.closeConversation} selectedUser={props.selectedUser} />
  const displayToggle = props.conversation ? displayConversation : displayEdit

  return (
    <div className="Main">
      {displayToggle}
      {displayMatchModal}
    </div>
  )
}

export default Main
