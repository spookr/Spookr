import React, {Component} from 'react'
import './Login.scss'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitLogin = (username, password) => {
    console.log(username, password)
  }

  render () {

    const {username, password} = this.state

    return (
      <div className="Login">
        <h1>Login</h1>
        <h2>Username:</h2><input name="username" type="text" onChange={(e) => this.handleInput(e)}/>
        <h2>Password:</h2><input name="password" type="text" onChange={(e) => this.handleInput(e)} />
        <button onClick={() => this.submitLogin(username, password)}>Submit</button>
      </div>
    )
  }
}

export default Login
