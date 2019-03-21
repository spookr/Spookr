import React, {Component} from 'react'
import './OwnerForm.scss'

// Components
import HouseForm from '../../Components/HouseForm/HouseForm'

class OwnerForm extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      bio: '',
      toggle1: true,
      toggle2: false,
      toggleHouse: false,
      toggleOwner: true,
      profilePhoto: null
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleToggle1 = () => {
    this.setState({
      toggle1: false,
      toggle2: true
    })
  }

  handleToggle2 = () => {
    this.setState({
      toggle1: true,
      toggle2: false
    })
  }

  submitOwner = () => {
    this.setState({
      toggleHouse: true,
      toggleOwner: false
    })
  }

  render () {

    const {firstName, lastName, bio, toggle1, toggle2, toggleHouse, toggleOwner} = this.state
    const {handleInput, handleToggle1, handleToggle2, submitOwner} = this

    const displayToggle1 = toggle1 &&
      <div className="QuestionnaireMain">
        <h1>Let's set up your profile!</h1>
        <button id="PhotoButton">Upload Profile Photo</button>
        <button id="NextButton" onClick={handleToggle1}>Next</button>
      </div>

    const displayToggle2 = toggle2 &&
      <div className="QuestionnaireMain">
        <h1>Now let's get some information.</h1>
        <h2>First Name</h2><input name="firstName" type="text" value={firstName} onChange={(e) => handleInput(e)}/>
        <h2>Last Name</h2><input name="lastName" type="text" value={lastName} onChange={(e) => handleInput(e)}/>
        <h2>Bio</h2><input name="bio" type="text" value={bio} onChange={(e) => handleInput(e)}/>
        <div className="ToggleNavigation">
          <button id="NextButton" onClick={handleToggle2}>Previous</button>
          <button id="NextButton" onClick={submitOwner}>Submit</button>
        </div>
      </div>

    const displayOwner =  toggleOwner ?
      <div className="QuestionnaireSecondary">
        {displayToggle1}
        {displayToggle2}
      </div>
     : <HouseForm />

    return (
      <div className="Questionnaire">
        {displayOwner}
      </div>
    )
  }
}

export default OwnerForm
