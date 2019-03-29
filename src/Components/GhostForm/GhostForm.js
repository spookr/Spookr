import React, { Component } from 'react'
import axios from 'axios';
import './GhostForm.scss'
import Geocode from 'react-geocode'

// Packages
import { DropdownButton, Dropdown } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

// Images
import Placeholder from './assets/Placeholder.png'
import Forward from '../assets/Forward.svg'
import Previous from '../assets/Previous.svg'

class GhostForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      bio: '',
      type: null,
      location: '',
      toggle1: true,
      toggle2: false,
      toggle3: false,
      isUploading: false,
      profilePhoto: null,
      files: []
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

  submitGhost = (name, bio, type, user_id, profile_pic, location) => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
    Geocode.enableDebug();
    Geocode.fromAddress(location)
    .then(
      response => {
        const {lat, lng} = response.results[0].geometry.location;

        const ghostDetails = {
          name,
          bio,
          type,
          user_id,
          profile_pic,
          lat,
          lng
        }

        axios.post('/ghost', ghostDetails).then(res => {
          console.log(res.data)
        })
      },
      error => {
        console.error(error);
      }
    )
  }

  //AWS
  getSignedRequest = (e) => {
    let file = e.target.files[0];
    axios.get('/sign-s3', {
      params: {
        'file-name': file.name,
        'file-type': file.type
      }
    }).then((response) => {
      const { signedRequest, url } = response.data
      this.uploadFile(file, signedRequest, url)
    }).catch(err => {
      console.log(err)
    })
  }

  uploadFile = (file, signedRequest, url) => {

    var options = {
      headers: {
        'Content-Type': file.type
      }
    };

    axios.put(signedRequest, file, options)
      .then(response => {
        this.setState({ profilePhoto: url })
      })
      .catch(err => {

        if (err.response.status === 403) {
          alert('Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n' + err.stack)
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`)
        }
      })
  }

  render() {

    // console.log(this.state)

    const { name, bio, type, location, toggle1, toggle2, toggle3, profilePhoto } = this.state
    const { handleInput,
      handleDropdown,
      handleToggle1,
      handleToggle3,
      submitGhost } = this

    // console.log('type', type)
    // console.log('gender', gender)
    console.log(this.props)

    const displayToggle1 = toggle1 &&
      <div className="QuestionnaireMain">
        <h1>Let's set up your profile!</h1>
        {profilePhoto ? <img id="ProfilePhoto" src={profilePhoto} alt="User" /> : <img id="ProfilePhoto" alt="User"  src={Placeholder} />}
        <input style={{border: 'none'}} type="file" onChange={(e) => this.getSignedRequest(e, false)} />
        <div className="ToggleNavigation">
          <img id="Arrow" src={Forward} onClick={handleToggle1} alt="Forward" />
        </div>
      </div>

    const displayToggle2 = toggle2 &&
      <div className="QuestionnaireMain">
        <h1>Now let's get some information.</h1>
        <h2>Name</h2><input name="name" type="text" value={name} onChange={(e) => handleInput(e)} />
        <h2>Bio</h2><input name="bio" type="text" value={bio} onChange={(e) => handleInput(e)} />
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
          <img id="Arrow" src={Previous} onClick={handleToggle3} alt="Forward Icon" />
        </div>
      </div>

    const displayToggle3 = toggle3 &&
      <div className="QuestionnaireMain">
        <h1>Almost finished.</h1>
        <h2>Location:</h2>
        <input name="location" type="text" value={location} onChange={(e) => handleInput(e)} />
        <div className="ToggleNavigation">
          <img id="Arrow" src={Previous} onClick={handleToggle1} alt="Back" />
          <button id="SubmitButton" onClick={() => submitGhost(name, bio, type, this.props.match.params.id, profilePhoto, location)}>Submit</button>
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

export default withRouter(GhostForm)
