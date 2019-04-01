import React from 'react'
import './UserIcon.scss'

import Kitty from './assets/kitty.jpg'

const UserIcon = (props) => {
  return (
    <div className="UserIcon">
      <img src={Kitty} alt="User Account" />
    </div>
  )
}

export default UserIcon
