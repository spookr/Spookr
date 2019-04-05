import React from 'react'
import './Main.scss'

// Components
import Conversation from '../Conversation/Conversation'
import Swiper from '../Swiper/Swiper'
import UserEdit from '../UserEdit/UserEdit'
import MatchModal from '../MatchModal/MatchModal'

const Main = (props) => {

  const displayAnimation = props.swipes && props.swipes.length === 0 &&

    <div className='anim-container'>
      <i class="fas fa-ghost"></i>
        <div className='lines'>
          <div className='line'></div>
          <div className='middleline'></div>
          <div className='line'></div>
        </div>
      </div>

  const displaySwipes = props.swipes && props.swipes.length !== 0 ? props.swipes.map(swipe => {
    return (
      <Swiper key={swipe.user_id} {...swipe} swipeRight={props.swipeRight} swipeLeft={props.swipeLeft} />
    )
  }) : displayAnimation

  const displayMatchModal = props.matchModal && <MatchModal closeMatchModal={props.closeMatchModal} matchedInfo={props.matchedInfo}/>
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
