import React, {Component} from 'react'
import './HouseForm.scss'
import NumericInput from 'react-numeric-input'
import { Checkbox } from 'antd'
import Geocode from "react-geocode"

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
        grandfatherClock: false,
        dolls: false,
        electricity: false,
        pets: false
      },
      toggle1: true,
      toggle2: false,
      toggle3: false
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHouse = (header, description, rooms, location, remodeled, amenities) => {
    Geocode.setApiKey("AIzaSyCdZuqe3hLZO8Tq1wYHOA4WJ8bmPFK1XT4");
    Geocode.enableDebug();
    Geocode.fromAddress(location)
    .then(
      response => {
        const {lat, lng} = response.results[0].geometry.location;
        console.log(lat, lng);
        console.log(header, description, rooms, lat, lng, remodeled, amenities)
      },
      error => {
        console.error(error);
      }
    )
  }

  inputQuantity = (valueAsNumber) => {
     this.setState({
       rooms: valueAsNumber
     })
   }

   amenitiesChange = (event) => {
     event.persist();
     // console.log(event.target)
     this.setState(prevState => ({
       amenities: {
         ...prevState.amenities,
         [event.target.name]: !this.state.amenities[event.target.name]
       }
     }))
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

   toggleRemodeled = () => {
     this.setState({
       remodeled: !this.state.remodeled
     })
   }

  render () {

    const {header, description, location, amenities, remodeled, livingOccupants, toggle1, toggle2, toggle3, rooms, toggleAmenities} = this.state
    const {handleToggle1, handleToggle2, handleToggle3, handleInput, submitHouse, inputQuantity, toggleRemodeled} = this

    const displayToggle1 = toggle1 &&
    <div className="QuestionnaireMain">
      <h1>Add a Listing</h1>
      <h2>Header</h2><input name="header" type="text" value={header} onChange={(e) => handleInput(e)}/>
      <h2>Description</h2><input name="description" type="text" value={description} onChange={(e) => handleInput(e)}/>
      <h2>Rooms <NumericInput min={1} value={rooms} onChange={inputQuantity}/></h2>
      <h2><Checkbox
            checked={this.state.toggleAmenities}
            onClick={this.toggleRemodeled}>
          </Checkbox>Remodeled</h2>

      <div id="FirstToggle" className="ToggleNavigation">
        <button id="NextButton" onClick={handleToggle2}>Next</button>
      </div>
    </div>

    const displayToggle2 = toggle2 &&
      <div className="QuestionnaireMain">
        <h2>Location</h2><input name="location" type="text" value={location} onChange={(e) => handleInput(e)} />
        <h2>Amenities</h2>
          <form className="ToggleAmenities">
            <h2><Checkbox
                  checked={amenities.spiderwebs}
                  onClick={(e) => this.amenitiesChange(e)}
                  name="spiderwebs"
                  value={amenities.spiderwebs}
                  type="amenities">
              </Checkbox>Spiderwebs</h2>
            <h2><Checkbox
                  checked={amenities.basement}
                  onClick={(e) => this.amenitiesChange(e)}
                  name="basement"
                  value={amenities.basement}
                  type="amenities">
                </Checkbox>Basement</h2>
            <h2><Checkbox
                  checked={amenities.grandfatherClock}
                  onClick={(e) => this.amenitiesChange(e)}
                  name="grandfatherClock"
                  value={amenities.grandfatherClock}
                  type="amenities">
            </Checkbox>Grandfather Clock</h2>
            <h2><Checkbox
                  checked={amenities.dolls}
                  onClick={(e) => this.amenitiesChange(e)}
                  name="dolls"
                  value={amenities.dolls}
                  type="amenities">
                </Checkbox>Dolls</h2>
            <h2><Checkbox
                  checked={amenities.electricity}
                  onClick={(e) => this.amenitiesChange(e)}
                  name="electricity"
                  value={amenities.electricity}
                  type="electricity">
                </Checkbox>Electricity</h2>
            <h2><Checkbox
                  checked={amenities.pets}
                  onClick={(e) => this.amenitiesChange(e)}
                  name="pets"
                  value={amenities.pets}
                  type="amenities">
            </Checkbox>Pets</h2>
          </form>
          <div className="ToggleNavigation">
            <button id="NextButton" onClick={handleToggle1}>Previous</button>
            <button id="NextButton" onClick={handleToggle3}>Next</button>
          </div>
      </div>

      const displayToggle3 = toggle3 &&
      <div className="QuestionnaireMain">
        <h1>Upload photos of your House!</h1>
        <div className="ToggleNavigation">
          <button id="NextButton" onClick={handleToggle2}>Previous</button>
          <button id="NextButton" onClick={() => submitHouse(header, description, rooms, location, remodeled, amenities)}>Submit</button>
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

export default HouseForm
