import React, {Component} from 'react'
import './Login.scss'

// Packages
import axios from 'axios'
import {connect} from 'react-redux'
import {logIn} from '../../redux/reducer'
import {withRouter} from 'react-router-dom'

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

    const userInfo = {
      username,
      password
    }

    axios.post('/login', userInfo).then(res => {
      console.log(res.data)
      this.props.logIn(res.data)
      this.props.history.push('/profile')
    })
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logIn
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
