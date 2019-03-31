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
      this.props.logIn(res.data)
      this.props.history.push(`/profile/${this.props.user.id}`)
    })
  }

  render () {
    console.log(this.state)
    const {username, password} = this.state

    return (
      <div id="RegisterBackground" className="Questionnaire">
        <div className="QuestionnaireSecondary">
          <div className="QuestionnaireMain">
            <h1 id="LoginHeader">Welcome back!</h1>
            <h4>We're so excited to see you again!</h4>
            <h2 id="LoginSub">Username</h2><input name="username" type="text" onChange={(e) => this.handleInput(e)}/>
            <h2 id="LoginSub">Password</h2><input name="password" type="password" onChange={(e) => this.handleInput(e)} />
            <button id="SubmitButton" onClick={() => this.submitLogin(username, password)}>Submit</button>
          </div>
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
  logIn
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
