import React from 'react'
import './ProfileIcon.scss'

const ProfileIcon = (props) => {

  // console.log(props)

  return (
    <div className="ProfileIcon">
      <img src={props.photo} alt="Chatting User" />
    </div>
  )
}


export default ProfileIcon
