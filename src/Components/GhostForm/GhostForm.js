import React, { Component } from 'react'
import axios from 'axios';
import './GhostForm.scss'
import Geocode from 'react-geocode'
import '../Questionnaire/Stars.scss'

// Packages
import { DropdownButton, Dropdown } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getGhost} from '../../redux/reducer'

// Images
import Placeholder from './assets/Placeholder.png'

class GhostForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      bio: '',
      type: null,
      location: '',
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
    // console.log(event.target)
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

  submitGhost = (name, bio, type, user_id, profile_pic, location, radius=50) => {
    let googleKey = process.env.REACT_APP_GOOGLE_API
    Geocode.setApiKey(googleKey);
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
          lng,
          radius
        }

        axios.post('/ghost', ghostDetails).then(res => {
          this.props.getGhost(res.data)
          this.props.history.push(`/profile/${res.data.user_id}`)
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

    // console.log(this.state)

    const { name, bio, type, location, profilePhoto } = this.state
    const { handleInput, handleDropdown, submitGhost } = this

    // console.log('type', type)
    // console.log('gender', gender)

    return (
      <div className="Questionnaire" id="GhostBackground">
        <div className="QuestionnaireSecondary">
          <div className="QuestionnaireMain">
            <h1 id="GhostPadding">Let's set up your profile!</h1>
              <div className="QuestionnairePhoto">
                {profilePhoto ? <img id="ProfilePhoto" src={profilePhoto} alt="User" /> : <img id="ProfilePhoto" src={Placeholder} alt="User"  />}
              </div>
            <input style={{border: 'none'}} type="file" onChange={(e) => this.getSignedRequest(e, false)} />
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
              <h2>Zip Code:</h2>
              <input name="location" type="text" value={location} onChange={(e) => handleInput(e)} />
              <button id="SubmitButton" onClick={() => submitGhost(name, bio, type, this.props.match.params.id, profilePhoto, location)}>Submit</button>
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
  getGhost
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GhostForm))
