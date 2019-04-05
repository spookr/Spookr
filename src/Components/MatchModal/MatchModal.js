import React from 'react'
import './MatchModal.scss'

// Components
import UserIcon from '../UserIcon/UserIcon'

const MatchModal = (props) => {
  return (
    <div className="MatchModal">
      <div className="MatchModalHeader">
        <h1>It's a Match!</h1>
        <h2>You and {props.matchedInfo.name} have liked each other!</h2>
      </div>
      <div className="MatchModalBody">
        <UserIcon />
        <img src={props.matchedInfo.photo} />
      </div>
      <div className="MatchModalFooter">
        <button id="SwipeButton" onClick={props.closeMatchModal}>Keep Swiping</button>
      </div>
    </div>
  )
}

export default MatchModal
