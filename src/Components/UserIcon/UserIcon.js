import React, { Component } from 'react'
import axios from 'axios'
import './UserIcon.scss'

import Kitty from './assets/kitty.jpg'

export default class UserIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: ''
    }
  }

  componentDidMount() {
    this.getProfilePic();
  }

  getProfilePic = () => {
    axios.get('/api/user').then(res => {
      this.setState({ user: res.data })
    })
  }


  render() {
    return (
      <div className="UserIcon" >
        <img src={this.state.user.profile_pic} alt="User Account" />
      </div>
    )
  }
}

