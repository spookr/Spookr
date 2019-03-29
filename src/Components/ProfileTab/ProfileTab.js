import React from 'react'
import './ProfileTab.scss'

const ProfileTab = (props) => {
  return (
    <div className="ProfileTab">
      <h1 onClick={props.toggleEdit}>My Profile</h1>
    </div>
  )
}

export default ProfileTab
