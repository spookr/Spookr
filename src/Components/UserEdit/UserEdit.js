import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { logIn } from '../../redux/reducer'

// Styling
import './UserEdit.scss'

class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},

      // firstName / lastName references the owners first/last name
      firstName: this.props.user.first_name,
      lastName: this.props.user.last_name,

      // name references the ghosts name
      name: this.props.user.name,

      // header and body references the info for the house
      header: this.props.user.header,
      body: this.props.user.body,

      bio: this.props.user.bio,
      imageUrl: this.props.user.profile_pic,
      shown: true
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get(`/api/user`).then(res => {
      this.props.logIn(res.data);
    })
  }

  toggleShown() {
    this.setState({ shown: !this.state.shown })
  }

  updateInfo = () => {
    axios.post('/editprofile', {
      name: this.state.name,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      header: this.state.header,
      body: this.state.body,
      bio: this.state.bio,
      imageUrl: this.state.imageUrl
    }).then(res => {
      this.getUser()
    })
  }

  handleUpdate(input, val) {
    this.setState({ [input]: val })
  }

  render() {

    var shown = { display: this.state.shown ? "flex" : "none" };
    var hidden = { display: this.state.shown ? "none" : "flex" }


    const houseProfile = !this.props.user.ghost &&
      <div>

        <h1>{this.state.firstName} {this.state.lastName}</h1>
        <input
          style={hidden}
          value={this.state.firstName}
          onChange={(e) => this.handleUpdate('firstName', e.target.value)}
        />
        <input
          style={hidden}
          value={this.state.lastName}
          onChange={(e) => this.handleUpdate('lastName', e.target.value)}
        />


        <h3> {this.state.bio} </h3>
        <input
          style={hidden}
          value={this.state.bio}
          onChange={(e) => this.handleUpdate('bio', e.target.value)}
        />


        <h3> {this.state.header} </h3>
        <input
          style={hidden}
          value={this.state.header}
          onChange={(e) => this.handleUpdate('header', e.target.value)}
        />


        <h3> {this.state.body} </h3>
        <input
          style={hidden}
          value={this.state.body}
          onChange={(e) => this.handleUpdate('body', e.target.value)}
        />
      </div>


    // Ghost profile edit stuff.
    const ghostProfile = this.props.user.ghost &&
      <div>
        <h1> {this.state.name} </h1>
        <input
          name="username"
          style={hidden}
          value={this.state.name}
          onChange={(e) => this.handleUpdate('name', e.target.value)}
        />
        <h3> {this.state.bio} </h3>
        <input
          style={hidden}
          value={this.state.bio}
          onChange={(e) => this.handleUpdate('bio', e.target.value)}
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
            onClick={() => {
              this.toggleShown()
              this.updateInfo()
            }}

          > Save Info </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
const mapDispatchToProps = {
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
