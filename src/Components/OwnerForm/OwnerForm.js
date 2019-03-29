import React, {Component} from 'react'
import './OwnerForm.scss'

// Packages
import {withRouter} from 'react-router-dom'
import axios from 'axios'

// Components
import HouseForm from '../../Components/HouseForm/HouseForm'

// Images
import Placeholder from './assets/Placeholder.png'
import Forward from '../assets/Forward.svg'
import Previous from '../assets/Previous.svg'

class OwnerForm extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      bio: '',
      toggle1: true,
      toggle2: false,
      toggleHouse: false,
      toggleOwner: true,
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

  handleToggle1 = () => {
    this.setState({
      toggle1: false,
      toggle2: true
    })
  }

  handleToggle2 = () => {
    this.setState({
      toggle1: true,
      toggle2: false
    })
  }

  submitOwner = (firstName, lastName, bio, user_id, profilePhoto) => {

    const ownerDetails = {
      firstName,
      lastName,
      bio,
      user_id,
      profilePhoto
    }

    axios.post('/owner', ownerDetails).then(res => {
      console.log(res.data)
    })

    this.setState({
      toggleHouse: true,
      toggleOwner: false
    })
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

  render () {

    const {firstName, lastName, bio, toggle1, toggle2, toggleOwner, profilePhoto} = this.state
    const {handleInput, handleToggle1, handleToggle2, submitOwner} = this
    // console.log(this.state)

    const displayToggle1 = toggle1 &&
      <div className="QuestionnaireMain">
        <h1>Let's set up your profile!</h1>
          {profilePhoto ? <img id="ProfilePhoto" src={profilePhoto} alt="User" /> : <img id="ProfilePhoto" src={Placeholder} alt="User"  />}
          <input style={{border: 'none'}} type="file" onChange={(e) => this.getSignedRequest(e, false)} />
          <img id="Arrow" src={Forward} onClick={handleToggle1} alt="Forward"  />
      </div>

    const displayToggle2 = toggle2 &&
      <div className="QuestionnaireMain">
        <h1>Now let's get some information.</h1>
        <h2>First Name</h2><input name="firstName" type="text" value={firstName} onChange={(e) => handleInput(e)}/>
        <h2>Last Name</h2><input name="lastName" type="text" value={lastName} onChange={(e) => handleInput(e)}/>
        <h2>Bio</h2><input name="bio" type="text" value={bio} onChange={(e) => handleInput(e)}/>
        <div className="ToggleNavigation">
          <img id="Arrow" src={Previous} onClick={handleToggle2} alt="Previous" />
          <button id="NextButton" onClick={() => submitOwner(firstName, lastName, bio, this.props.match.params.id, profilePhoto)}>Submit</button>
        </div>
      </div>

    const displayOwner =  toggleOwner ?
      <div className="QuestionnaireSecondary">
        {displayToggle1}
        {displayToggle2}
      </div>
     : <HouseForm />

    return (
      <div className="Questionnaire">
        {displayOwner}
      </div>
    )
  }
}

export default withRouter(OwnerForm)
