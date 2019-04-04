import React, { Component } from 'react'
import './HouseForm.scss'
import '../Questionnaire/Stars.scss'
import NumericInput from 'react-numeric-input'
import { Checkbox } from 'antd'
import Geocode from 'react-geocode'

// Packages
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getHouse} from '../../redux/reducer'

// Images
import Placeholder from './assets/Placeholder.jpg'
import Add from './assets/add.svg'

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
      files: []
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHouse = (header, description, rooms, location, remodeled, amenities) => {
    let googleKey = process.env.REACT_APP_GOOGLE_API
    Geocode.setApiKey(googleKey);
    console.log(googleKey)
    Geocode.enableDebug();
    console.log(location)
    Geocode.fromAddress(location)
      .then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          let town = '';
          let foundState = '';
          Geocode.setApiKey(googleKey);
          Geocode.enableDebug();
          Geocode.fromLatLng(`${lat}`, `${lng}`).then(
            response => {
              const locationObj = response.results[0];
              for(let i = 0; i < locationObj.address_components.length; i ++){
                if(locationObj.address_components[i].types.includes('locality')){
                  console.log(locationObj.address_components[i].long_name)
                  town = locationObj.address_components[i].long_name
                  console.log(town)
                }
                if(locationObj.address_components[i].types.includes('administrative_area_level_1')){
                  console.log(locationObj.address_components[i].long_name)
                  foundState = locationObj.address_components[i].long_name
                }
              }
              console.log(locationObj)
              const houseDetails = {
                header,
                description,
                rooms,
                lat,
                lng,
                remodeled,
                amenities,
                town,
                foundState
              }
              axios.post('/house', houseDetails).then(res => {
                this.props.history.push(`/profile/${res.data.user_id}`)
              })
            },
            error => {
              console.error(error);
            }
          );
       
        },
      ).catch(
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

  render() {

    const { header, description, location, amenities, remodeled, rooms } = this.state
    const { handleInput, submitHouse, inputQuantity, toggleRemodeled } = this

    // console.log(this.props)

    return (
      <div className="Questionnaire" id="HouseBackground">
        <div className="QuestionnaireSecondary">
          <div className="QuestionnaireMain">
            <h1 id="HousePadding">Add a Listing</h1>
            <h2>Header</h2><input name="header" type="text" value={header} onChange={(e) => handleInput(e)} />
            <h2>Description</h2><input name="description" type="text" value={description} onChange={(e) => handleInput(e)} />
            <h2>Rooms</h2>
            <span><NumericInput style={{ marginLeft: '.5rem' }} min={1} value={rooms} onChange={inputQuantity} /></span>
            <h2 style={{marginBottom: '-.6rem'}}><Checkbox
              checked={remodeled}
              onClick={toggleRemodeled}>
            </Checkbox>Remodeled</h2><br/>
          <h2>Zip Code</h2><input name="location" type="text" value={location} onChange={(e) => handleInput(e)} />
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
        
              <button id="NextButton" onClick={() => submitHouse(header, description, rooms, location, remodeled, amenities)}>Submit</button>
          </div>
        </div>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
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
  getHouse
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HouseForm))
