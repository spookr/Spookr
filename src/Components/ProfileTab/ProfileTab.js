import React from 'react'
import './ProfileTab.scss'

// Components
import UserIcon from '../UserIcon/UserIcon'

const ProfileTab = (props) => {
  return (
    <div className="ProfileTab">
      <UserIcon />
      <h1 onClick={props.toggleEdit}>My Profile</h1>
    </div>
  )
}

export default ProfileTab
