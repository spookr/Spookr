import React, {Component} from 'react'
import './HouseForm.scss'
import NumericInput from 'react-numeric-input';
import { Checkbox } from 'antd';

class HouseForm extends Component {
  constructor() {
    super()
    this.state = {
      header: '',
      description: '',
      rooms: 1,
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
      toggleAmenities: false
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

  toggleAmenities = () => {
    this.setState({
      toggleAmenities: !this.state.toggleAmenities
    })
  }

  submitHouse = () => {
    console.log('submit house')
  }

  inputQuantity = (valueAsNumber) => {
     this.setState({
       rooms: valueAsNumber
     })
   }

  render () {
// console.log(this.state)
    const {header, description, location, amenities, livingOccupants, toggle1, toggle2, rooms, toggleAmenities} = this.state
    const {handleToggle1, handleToggle2, handleToggle3, handleInput, submitHouse, inputQuantity} = this

    //
    // <div className="QuestionnaireMain">
    //   <h1>Now let's get some information on your house!</h1>
    //   <h2>Header</h2><input name="header" type="text" value={header} onChange={(e) => handleInput(e)}/>
    //   <h2>Description</h2><input name="description" type="text" value={description} onChange={(e) => handleInput(e)}/>
    //   <h2>Rooms <NumericInput min={1} value={rooms} onChange={inputQuantity}/></h2>
    //   <button id="NextButton" onClick={handleToggle2}>Next</button>
    // </div>
    //
    // const displayToggle2 = toggle2 &&
    // <div className="QuestionnaireMain">
    //   <h1>Now let's get some information on your house!</h1>
    //   <h2>Location</h2><input name="location" type="text" value={location} onChange={(e) => handleInput(e)} />
    //   <h2>Amenities</h2>
    //   // <form  className="toggleAmenities">
    //   //   <h2><Checkbox
    //   //             checked={amenities.spiderwebs}
    //   //             onClick={(e) => this.amenitiesChange(e)}
    //   //             label="Normal"
    //   //             value={amenities.spiderwebs}
    //   //             type="amenities">
    //   //     </Checkbox>Spiderwebs</h2>
    //   // </form>
    //   <button id="NextButton" onClick={handleToggle2}>Next</button>
    // </div>

    return (
      <div className="Questionnaire">
        <div className="QuestionnaireSecondary">
            <h1>Now let's get some information on your house!</h1>
            <h2>Header</h2><input name="header" type="text" value={header} onChange={(e) => handleInput(e)}/>
            <h2>Description</h2><input name="description" type="text" value={description} onChange={(e) => handleInput(e)}/>
            <h2>Rooms <NumericInput min={1} value={rooms} onChange={inputQuantity}/></h2>
        </div>
      </div>
    )
  }
}

export default HouseForm
