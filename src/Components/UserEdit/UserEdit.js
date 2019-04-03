import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getGhost } from '../../redux/reducer'

// Styling
import './UserEdit.scss'

class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      updateBio: null,
      shown: true
    }
  }

  componentDidMount() {
    this.getuser();
    // console.log(props)
  }

  getuser = () => {
    axios.get(`/api/user`).then(res => {
      this.props.getGhost(res.data);
    })
  }

  toggleShown() {
    this.setState({ shown: !this.state.shown })
  }


  // All this page needs is the update endpoint from there will be able to do further testing to make sure it works.

  // updateBio = () => {
  //   axios.put('/api/user', { updateBio: this.state.updateBio }).then(res => {
  //     this.props.getGhost(res.data);
  //   })
  // }

  handleUpdate(updateText) {
    this.setState({ updateBio: updateText })
  }


  render() {

    var shown = { display: this.state.shown ? "flex" : "none" };
    var hidden = { display: this.state.shown ? "none" : "flex" }

    // console.log(this.props)

    const houseProfile = !this.props.user.ghost &&
      <div>

        <h1>{this.props.user.first_name} {this.props.user.last_name}</h1>
      </div>
    const ghostProfile = this.props.user.ghost &&
      <div>
        <h1> {this.props.user.name} </h1>
        <input
          name="username"
          style={hidden}
        // onChange={(e) => this.handleUpdate(e.target.value)}
        />


        <h3> {this.props.user.bio} </h3>
        <input
          style={hidden}
        // onChange={(e) => this.handleUpdate(e.target.value)}
        />
      </div>

    return (
      <div className="UserEdit">
        <div className='userEdit-picture'>
          <img src={this.props.user.profile_pic} alt='profile pic' />
        </div>
        <div className='userEdit-name'>
          {houseProfile}
          {ghostProfile}

        </div>
        <div className='userEdit-bio'>

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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  getGhost
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
