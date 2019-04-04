import React from 'react'
import './UserBar.scss'

// Components
import ProfileTab from '../../Components/ProfileTab/ProfileTab'
import Messages from '../../Components/Messages/Messages'

const UserBar = (props) => {
  return (
    <div className="UserBar">
      <ProfileTab toggleEdit={props.toggleEdit} />
      <Messages matches={props.matches} selectMatch={props.selectMatch} />
    </div>
  )
}

export default UserBar
