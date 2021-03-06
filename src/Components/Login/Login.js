import React, { Component } from 'react'
import './Login.scss'
import '../Questionnaire/Stars.scss'

// Packages
import axios from 'axios'
import { connect } from 'react-redux'
import { logIn } from '../../redux/reducer'
import { withRouter } from 'react-router-dom'

// TESTS
import { usernameValidated, passwordValidated, ghostValidated } from './LoginTests/LoginLogic'

class Login extends Component {
  constructor() {
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

    // const usernameValidated = usernameValidated();
    // const passwordValidated = passwordValidated();
    // const ghostValidated = ghostValidated();

    // if (usernameValidated && passwordValidated && ghostValidated) {

    axios.post('/login', userInfo).then(res => {
      // console.log(res.data)
      this.props.logIn(res.data)
      this.props.history.push(`/profile/${res.data.user_id}`)
    })
    // }
  }

  render() {
    // console.log(this.props)
    const { username, password } = this.state

    return (
      <div id="RegisterBackground" className="Questionnaire">
        <div className="QuestionnaireSecondary">
          <div id="HeaderPadding" className="QuestionnaireMain">
            <h1 id="LoginHeader">Welcome back!</h1>
            <h4>We're so excited to see you again!</h4>
            <h2 id="LoginSub">Username</h2><input name="username" type="text" onChange={(e) => this.handleInput(e)} />
            <h2 id="LoginSub">Password</h2><input name="password" type="password" onChange={(e) => this.handleInput(e)} />


            <button id="SubmitButton"
              onClick={() => this.submitLogin(username, password)}>Submit</button>

          </div>
        </div>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
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
