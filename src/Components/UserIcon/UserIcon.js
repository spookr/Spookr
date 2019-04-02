import React from 'react'
import './UserIcon.scss'
import {connect} from 'react-redux'

const UserIcon = (props) => {

  // console.log(props)

  return (
    <div className="UserIcon">
      <img src={props.user.profile_pic} alt="Chatting User" />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserIcon)
