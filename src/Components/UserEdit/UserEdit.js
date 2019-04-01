import React, { Component } from 'react'
import axios from 'axios'
import './UserEdit.scss'

class UserEdit extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      updateBio: '',
      shown: true
    }
  }

  componentDidMount() {
    this.getuser();
  }

  getuser = () => {
    axios.get(`/api/user`).then(res => {
      this.setState({ user: res.data })
      console.log(this.state.user, 'The Logged In User.')
      console.log(this.state.user.name)
    })
  }

  toggleShown() {
    this.setState({ shown: !this.state.shown })
  }


  // All this page needs is the update endpoint from there will be able to do further testing to make sure it works.

  // updateBio = () => {
  //   axios.put('/api/user', { updateBio: this.state.updateBio }).then(res => {
  //     this.setState({ updateBio: res.data })
  //   })
  // }

  handleUpdate(updateText) {
    this.state({ updateBio: updateText })
  }



  render() {

    var shown = { display: this.state.shown ? "flex" : "none" };
    var hidden = { display: this.state.shown ? "none" : "flex" }

    return (
      <div className="UserEdit">
        <div className='userEdit-picture'>
          <img src={this.state.user.profile_pic} alt='profile pic' />
        </div>
        <div className='userEdit-name'>
          {this.state.user.name}
          <input
            name="username"
            style={hidden}
            // onChange={(e) => this.handleUpdate(e.target.value)}
             />
        </div>
        <div className='userEdit-bio'>
          {this.state.user.bio}
          <input
            style={hidden}
            // onChange={(e) => this.handleUpdate(e.target.value)}
             />
        </div>
        <div className='userEdit-editButton'>
          <button
            style={shown}
            onClick={() => this.toggleShown()}
          > Edit Info </button>


          <button
            style={hidden}
            onClick={() => this.toggleShown()}
          > Save Info </button>
        </div>
      </div>
    )
  }
}

export default UserEdit
