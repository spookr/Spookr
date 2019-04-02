import React, { Component } from 'react'
import axios from 'axios'
import './UserEdit.scss'

class UserEdit extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      updateBio: null,
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
    this.setState({ updateBio: updateText })
  }


  render() {

    var shown = { display: this.state.shown ? "flex" : "none" };
    var hidden = { display: this.state.shown ? "none" : "flex" }

    console.log(this.state.user)

    const houseProfile = !this.state.ghost && <h1>{this.state.user.first_name}</h1>

    return (
      <div className="UserEdit">
        <div className='userEdit-picture'>
          <img src={this.state.user.profile_pic} alt='profile pic' />
        </div>
        <div className='userEdit-name'>
          {houseProfile}
          <input
            name="username"
            style={hidden}
            // onChange={(e) => this.handleUpdate(e.target.value)}
             />
        </div>
        <div className='userEdit-bio'>
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
