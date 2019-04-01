import React, { Component } from 'react'
import axios from 'axios'
import './UserEdit.scss'

class UserEdit extends Component {
  constructor() {
    super()
    this.state = {
      user: '',
      profile_pic: []
    }
  }

  componentDidMount() {
    this.getuser();
    this.getProfilePic();
  }

  getuser = () => {
    axios.get(`/api/user`).then(res => {
      this.setState({ user: res.data })
      console.log(this.state.user, 'The Logged In User.')
      console.log(this.state.user.name)
    })
  }

  getProfilePic = () => {
    axios.get('/api/user').then(res => {
      this.setState({ profile_pic: res.data.profile_pic })
      console.log(this.state.profile_pic)
    })
  }





  render() {
    return (
      <div className="UserEdit">
        <div className='userEdit-picture'>
          {/* {this.state.profile_pic} */}
        </div>
        <div className='userEdit-name'>
          {this.state.user.name}
        </div>
        <div className='userEdit-bio'>
          {this.state.user.bio}
        </div>
        <div className='userEdit-editButton'>
          <button> UserEdit </button>
        </div>
      </div>
    )
  }
}

export default UserEdit
