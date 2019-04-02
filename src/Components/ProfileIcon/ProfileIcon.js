import React from 'react'
import './ProfileIcon.scss'

import Cat from './assets/Cat03.jpg'

const ProfileIcon = (props) => {

  console.log(props)

  return (
    <div className="ProfileIcon">
      <img src={Cat} alt="Chatting User" />
    </div>
  )
}


export default ProfileIcon
