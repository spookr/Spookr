import React, {Component} from 'react'
import './Register.scss'

// Packages
import axios from 'axios'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      ghost: null
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
    axios.post('/register', {username, password, ghost}).then(res => {
      console.log(res.data)
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
        <button onClick={() => this.submitRegister(username, password, ghost)}>Submit</button>
      </div>
    )
  }
}

export default Register
