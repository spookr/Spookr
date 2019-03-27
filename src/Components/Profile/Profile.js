import React, {Component} from 'react'
import './Profile.scss'

// Components
import Main from '../../Components/Main/Main'
import UserBar from '../../Components/UserBar/UserBar'

class Profile extends Component {
  render () {
    return (
      <div className="Profile">
        <UserBar />
        <Main />
      </div>
    )
  }
}

export default Profile
