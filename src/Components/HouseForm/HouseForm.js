import React, {Component} from 'react'
import './HouseForm.scss'

class HouseForm extends Component {
  constructor() {
    super()
    this.state = {
      header: '',
      description: '',
      rooms: 0,
      location: '',
      remodeled: false,
      amenities: {
        spiderwebs: false,
        basement: false,
        children: false,
        grandfatherClock: false,
        dolls: false,
        electricity: false,
        pets: false
      },
      livingOccupants: 0,
      toggle1: true,
      toggle2: false,
      toggle3: false
    }
  }

  handleToggle1 = () => {
    this.setState({
      toggle1: true,
      toggle2: false,
      toggle3: false
    })
  }

  handleToggle2 = () => {
    this.setState({
      toggle1: false,
      toggle2: true,
      toggle3: false
    })
  }

  handleToggle3 = () => {
    this.setState({
      toggle1: false,
      toggle2: false,
      toggle3: true
    })
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHouse = () => {

  }

  render () {

    const {header, description, rooms, location, amenities, livingOccupants, toggle1, toggle2} = this.state
    const {handleToggle1, handleToggle2, handleToggle3, handleInput, submitHouse} = this

    const displayToggle1 = toggle1 &&
      <div className="QuestionnaireMain">
        <h1>Now let's get some information on your house!</h1>
        <h2>Header</h2><input name="header" type="text" value={header} onChange={(e) => handleInput(e)}/>
        <h2>Description</h2><input name="description" type="text" value={description} onChange={(e) => handleInput(e)}/>
        <h2>Rooms</h2>
        <button id="NextButton" onClick={handleToggle2}>Next</button>
      </div>

    const displayToggle2 = toggle2 &&
    <h1>Come back to this</h1>



    return (
      <div className="Questionnaire">
        <div className="QuestionnaireSecondary">

        </div>
      </div>
    )
  }
}

export default HouseForm
