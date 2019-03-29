import React, {Component} from 'react'
import './Register.scss'

// Packages
import axios from 'axios'
import {connect} from 'react-redux'
import {logIn} from '../../redux/reducer'
import { Radio } from 'antd';

// Images
import Ghost from './assets/ghost.svg'
import House from './assets/house.svg'

const RadioGroup = Radio.Group;

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

  onChange = (e) => {
   this.setState({
     ghost: e.target.value,
   });
 }

  submitRegister = (username, password, ghost) => {

    const submitInfo = {
      username,
      password,
      ghost
    }

    // console.log('User submits register', submitInfo)

    axios.post('/register', submitInfo).then(res => {
      console.log(res.data)
      this.props.logIn(res.data)
      this.props.history.push(`/questionnaire/${res.data.id}`)
    })
  }

  render () {

    const {username, password, ghost} = this.state

    return (
      <div id="RegisterBackground" className="Questionnaire">
        <div className="QuestionnaireSecondary">
          <div className="QuestionnaireMain">
            <h1>Create an account</h1>
            <h2>Username</h2><input name="username" type="text" onChange={(e) => this.handleInput(e)}/>
            <h2>Password</h2><input name="password" type="password" onChange={(e) => this.handleInput(e)}/>
            <h2 style={{paddingBottom: '1rem'}}>Are you a ghost or home owner?</h2>
            <div className="QuestionnaireSelection">
              <RadioGroup onChange={this.onChange} value={this.state.ghost}>
                <Radio value={true}><img id="GhostIcon" src={Ghost} alt="Ghost" /></Radio>
                <Radio value={false}><img src={House} alt="House" /></Radio>
              </RadioGroup>
            </div>
          <button id="SubmitButton" onClick={() => this.submitRegister(username, password, ghost)}>Submit</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
