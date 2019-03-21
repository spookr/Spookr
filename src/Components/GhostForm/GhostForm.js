import React, {Component} from 'react'
import './GhostForm.scss'

// Packages
import {DropdownButton, Dropdown} from 'react-bootstrap'

class GhostForm extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      bio: '',
      type: null,
      location: '',
      toggle1: true,
      toggle2: false,
      toggle3: false,
      profilePhoto: null
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDropdown = (event) => {
    console.log(event.target)
    this.setState({
      [event.target.name]: event.target.type
    })
  }

  handleToggleFemale = () => {
    this.setState({
      gender: {
        female: true,
        male: false
      }
    })
  }

  handleToggleMale = () => {
    this.setState({
      gender: {
        male: true,
        female: false
      }
    })
  }

  handleToggle1 = () => {
    this.setState({
      toggle1: false,
      toggle2: true,
      toggle3: false
    })
  }

  handleToggle2 = () => {
    this.setState({
      toggle1: false,
      toggle2: false,
      toggle3: true
    })
  }

  handleToggle3 = () => {
    this.setState({
      toggle1: true,
      toggle2: false,
      toggle3: false
    })
  }

  submitGhost = () => {
    console.log('submt ghost')
  }

  render () {

    const {name, bio, type, location, toggle1, toggle2, toggle3} = this.state
    const {handleInput,
      handleDropdown,
      handleToggleMale,
      handleToggleFemale,
      handleToggle1,
      handleToggle2,
      handleToggle3,
      submitGhost} = this

    // console.log('type', type)
    // console.log('gender', gender)

    const displayToggle1 = toggle1 &&
        <div className="QuestionnaireMain">
        <h1>Let's set up your profile!</h1>
        <button id="PhotoButton">Upload Profile Photo</button>
        <button id="NextButton" onClick={handleToggle1}>Next</button>
        </div>

    const displayToggle2 = toggle2 &&
      <div className="QuestionnaireMain">
        <h1>Now let's get some information.</h1>
        <h2>Name</h2><input name="name" type="text" value={name} onChange={(e) => handleInput(e)}/>
        <h2>Bio</h2><input name="bio" type="text" value={bio} onChange={(e) => handleInput(e)}/>
        <h2>Type</h2>
          <DropdownButton id="dropdown-basic-button" title={type === "1" ? "Poltergeist" :
                                                            type === "2" ? "Demon" :
                                                            type === "3" ? "Ectoplasm" :
                                                            type === "4" ? "Interactive" :
                                                            type === "5" ? "Orb" :
                                                            type === "6" ? "Sheet" :
                                                            type === "7" ? "Specter" :
                                                            type === "8" ? "Other" : "Type"}>
            <Dropdown.Item name="type" type="1" onClick={(e) => handleDropdown(e)}>Poltergeist</Dropdown.Item>
            <Dropdown.Item name="type" type="2" onClick={(e) => handleDropdown(e)}>Demon</Dropdown.Item>
            <Dropdown.Item name="type" type="3" onClick={(e) => handleDropdown(e)}>Ectoplasm</Dropdown.Item>
            <Dropdown.Item name="type" type="4" onClick={(e) => handleDropdown(e)}>Interactive</Dropdown.Item>
            <Dropdown.Item name="type" type="5" onClick={(e) => handleDropdown(e)}>Orb</Dropdown.Item>
            <Dropdown.Item name="type" type="6" onClick={(e) => handleDropdown(e)}>Sheet</Dropdown.Item>
            <Dropdown.Item name="type" type="7" onClick={(e) => handleDropdown(e)}>Specter</Dropdown.Item>
            <Dropdown.Item name="type" type="8" onClick={(e) => handleDropdown(e)}>Other</Dropdown.Item>
          </DropdownButton>
          <div className="ToggleNavigation">
            <button id="NextButton" onClick={handleToggle3}>Previous</button>
            <button id="NextButton" onClick={handleToggle2}>Next</button>
          </div>
      </div>

    const displayToggle3 = toggle3 &&
      <div className="QuestionnaireMain">
        <h1>Almost finished.</h1>
        <h2>Location:</h2>
        <input name="location" type="text" value={location} onChange={(e) => handleInput(e)}/>
          <div className="ToggleNavigation">
            <button id="NextButton" onClick={handleToggle1}>Previous</button>
            <button id="SubmitButton">Submit</button>
          </div>
      </div>

    return (
      <div className="Questionnaire">
        <div className="QuestionnaireSecondary">
            {displayToggle1}
            {displayToggle2}
            {displayToggle3}
        </div>
      </div>
    )
  }
}

export default GhostForm
