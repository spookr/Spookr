import React, {Component} from 'react'
import './Register.scss'

// Packages
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logIn} from '../../redux/reducer'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      ghost: null
    }
  }

  componentDidMount () {
    if (this.props.user) {
      this.props.history.push('/profile')
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggleGhost = () => {
    this.setState({
      ghost: true
    })
  }

  toggleHome = () => {
    this.setState({
      ghost: false
    })
  }

  submitRegister = (username, password, ghost) => {

    const submitInfo = {
      username,
      password,
      ghost
    }

    // console.log('User submits register', submitInfo)

    axios.post('/register', submitInfo).then(res => {
      this.props.logIn(res.data)
    })
  }

  render () {

    const {username, password, ghost} = this.state

    return (
      <div className="Register">
        <h1>Register</h1>
        <h2>Username:</h2><input name="username" type="text" onChange={(e) => this.handleInput(e)}/>
        <h2>Password:</h2><input name="password" type="text" onChange={(e) => this.handleInput(e)}/>
        <h2>Are you a ghost or home owner?</h2>
        <button onClick={this.toggleGhost}>Ghost</button><button onClick={this.toggleHome}>Home Owner</button><br/>
        <Link to='/questionnaire'><button onClick={() => this.submitRegister(username, password, ghost)}>Submit</button></Link>
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
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
