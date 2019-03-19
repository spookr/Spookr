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
      gender: {
        male: false,
        gender: false
      },
      type: null,
      location: ''
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

  render () {

    const {name, bio, gender, type, location} = this.state
    const {handleInput, handleDropdown, handleToggleMale, handleToggleFemale} = this

    // console.log('type', type)
    // console.log('gender', gender)

    return (
      <form>
        <h2>Name</h2><input name="name" type="text" value={name} onChange={(e) => handleInput(e)}/>
        <h2>Bio</h2><input name="bio" type="text" value={bio} onChange={(e) => handleInput(e)}/>
        <h2>Gender</h2>

        <DropdownButton id="dropdown-basic-button" title={gender.male ? "Male" : gender.female ? "Female" : "Gender"}>
          <Dropdown.Item name="gender" type="true" onClick={handleToggleMale}>Male</Dropdown.Item>
          <Dropdown.Item name="gender" type="false" onClick={handleToggleFemale}>Female</Dropdown.Item>
        </DropdownButton>

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

        <h2>Location:</h2>
        <input name="location" type="text" value={location} onChange={(e) => handleInput(e)}/>

      </form>
    )
  }
}

export default GhostForm
