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
      }
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
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
    console.log(this.state)
    const {header, description, location, amenities, livingOccupants, toggle1, toggle2, rooms, toggleAmenities} = this.state
    const {handleToggle1, handleToggle2, handleToggle3, handleInput, submitHouse, inputQuantity} = this

    return (
      <div className="Questionnaire">
        <div className="QuestionnaireSecondary">
          <div className="QuestionnaireMain">
            <h1>Now let's get some information on your house!</h1>
            <h2>Header</h2><input name="header" type="text" value={header} onChange={(e) => handleInput(e)}/>
            <h2>Description</h2><input name="description" type="text" value={description} onChange={(e) => handleInput(e)}/>
            <h2>Rooms <NumericInput min={1} value={rooms} onChange={inputQuantity}/></h2>
            <h2>Location</h2><input name="location" type="text" value={location} onChange={(e) => handleInput(e)} />
            <h2>Amenities</h2>
              <form className="toggleAmenities">
                <h2><Checkbox
                      checked={amenities.spiderwebs}
                      onClick={(e) => this.amenitiesChange(e)}
                      label="Normal"
                      value={amenities.spiderwebs}
                      type="amenities">
                  </Checkbox>Spiderwebs</h2>
              </form>
          </div>
        </div>
      </div>
    )
  }
}

export default HouseForm
