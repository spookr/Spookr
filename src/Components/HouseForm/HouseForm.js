import React, {Component} from 'react'
import './HouseForm.scss'
import NumericInput from 'react-numeric-input'
import { Checkbox } from 'antd'
import Geocode from 'react-geocode'

// Packages
import axios from 'axios'

// Images
import Placeholder from './assets/Placeholder.jpg'
import Add from './assets/add.svg'
import Forward from '../assets/Forward.svg'
import Previous from '../assets/Previous.svg'

class HouseForm extends Component {
  constructor() {
    super()
    this.state = {
      header: '',
      body: '',
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
      livingOccupants: 1,
      toggle1: true,
      toggle2: false,
      toggle3: false,
      files: []
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHouse = (header, body, rooms, remodeled, amenities, livingOccupants, location) => {
    // console.log(header, body, rooms, remodeled, amenities, location)
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
    Geocode.enableDebug();
    Geocode.fromAddress(location)
    .then(
      response => {
        const {lat, lng} = response.results[0].geometry.location;
        console.log(header, body, rooms, remodeled, amenities, livingOccupants, lat, lng)

        const houseDetails = {
          header,
          body,
          rooms,
          remodeled,
          amenities,
          livingOccupants,
          lat,
          lng
        }

        axios.post('/house', houseDetails).then(res => {
          console.log(res.data)
        })
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

   inputLiving = (valueAsNumber) => {
     this.setState({
       livingOccupants: valueAsNumber
     })
   }

  render () {

    const {header, body, location, amenities, remodeled, livingOccupants, toggle1, toggle2, toggle3, rooms} = this.state
    const {handleToggle1, handleToggle2, handleToggle3, handleInput, submitHouse, inputQuantity, toggleRemodeled, inputLiving} = this

    const displayToggle1 = toggle1 &&
    <div className="QuestionnaireMain">
      <h1>Add a Listing</h1>
      <h2>Header</h2><input name="header" type="text" value={header} onChange={(e) => handleInput(e)}/>
      <h2>Description</h2><input name="body" type="text" value={body} onChange={(e) => handleInput(e)}/>
      <h2>Rooms</h2>
      <span><NumericInput style={{marginLeft: '.5rem'}} min={1} value={rooms} onChange={inputQuantity}/></span>
      <h2><Checkbox
            checked={remodeled}
            onClick={toggleRemodeled}>
          </Checkbox>Remodeled</h2>
        <h2>Living Occupants</h2>
        <span><NumericInput style={{marginLeft: '.5rem'}} min={1} value={livingOccupants} onChange={inputLiving}/></span>


      <div id="FirstToggle" className="ToggleNavigation">
        <img id="Arrow" src={Forward} onClick={handleToggle2} alt="Next" />
      </div>
    </div>

    const displayToggle2 = toggle2 &&
      <div className="QuestionnaireMain">
        <h2 id="Margin">Location</h2><input name="location" type="text" value={location} onChange={(e) => handleInput(e)} />
        <h2 id="Margin">Amenities</h2>
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
            <img id="Arrow"  src={Previous} onClick={handleToggle1} alt="Previous" />
            <img id="Arrow"  src={Forward} onClick={handleToggle3} alt="Next" />
          </div>
      </div>

      const displayToggle3 = toggle3 &&
      <div className="QuestionnaireMain">
        <h1>Upload photos of your House!</h1>
        <div className="UploadGrid">

          <div className="UploadPhoto">
            <img id="HousePhoto" src={Placeholder} alt="House Default" />
            <img id="AddPhoto" src={Add} alt="Add Toggle" />
          </div>
          <div className="UploadPhoto">
            <img id="HousePhoto" src={Placeholder} alt="House Default" />
            <img id="AddPhoto" src={Add} alt="Add Toggle" />
          </div>
          <div className="UploadPhoto">
            <img id="HousePhoto" src={Placeholder} alt="House Default"  />
            <img id="AddPhoto" src={Add} alt="Add Toggle" />
          </div>
          <div className="UploadPhoto">
            <img id="HousePhoto" src={Placeholder} alt="House Default"  />
            <img id="AddPhoto" src={Add} alt="Add Toggle" />
          </div>
          <div className="UploadPhoto">
            <img id="HousePhoto" src={Placeholder} alt="House Default"  />
            <img id="AddPhoto" src={Add} alt="Add Toggle" />
          </div>
          <div className="UploadPhoto">
            <img id="HousePhoto" src={Placeholder} alt="House Default"  />
            <img id="AddPhoto" src={Add} alt="Add Toggle" />
          </div>
        </div>
        <div className="ToggleNavigation">
          <img id="Arrow" src={Previous} onClick={handleToggle2} alt="Forward"/>
          <button id="NextButton" onClick={() => submitHouse(header, body, rooms, remodeled, amenities, livingOccupants, location)}>Submit</button>
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
