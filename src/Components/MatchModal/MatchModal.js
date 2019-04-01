import React from 'react'
import './MatchModal.scss'

// Components
import UserIcon from '../UserIcon/UserIcon'
import ProfileIcon from '../ProfileIcon/ProfileIcon'

const MatchModal = (props) => {
  return (
    <div className="MatchModal">
      <div className="MatchModalHeader">
        <h1>It's a Match!</h1>
        <h2>You and Placeholder have liked each other!</h2>
      </div>
      <div className="MatchModalBody">
        <UserIcon />
        <ProfileIcon />
      </div>
      <div className="MatchModalFooter">
        <button id="SendMessage">Send Message</button>
        <button id="SwipeButton">Keep Swiping</button>
      </div>
    </div>
  )
}

export default MatchModal
