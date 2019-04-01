import React, {Component} from 'react'
import './OwnerForm.scss'
import '../Questionnaire/Stars.scss'

// Packages
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {getOwner} from '../../redux/reducer'

// Components
import HouseForm from '../../Components/HouseForm/HouseForm'

// Images
import Placeholder from './assets/Placeholder.png'

class OwnerForm extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      bio: '',
      toggleHouse: false,
      toggleOwner: true,
      isUploading: false,
      profilePhoto: '',
      files: []
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
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
      this.props.getOwner(res.data)
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

    const {firstName, lastName, bio, toggleOwner, profilePhoto} = this.state
    const {handleInput, submitOwner} = this
    // console.log(this.state)

    const displayOwner =  toggleOwner ?
      <div className="QuestionnaireSecondary">
        <div className="QuestionnaireMain">
          <h1 id="HeaderPadding">Let's set up your profile!</h1>
          <div className="QuestionnairePhoto">
            {profilePhoto ? <img id="ProfilePhoto" src={profilePhoto} alt="User" /> : <img id="ProfilePhoto" src={Placeholder} alt="User"  />}
          </div>
            <input style={{border: 'none'}} type="file" onChange={(e) => this.getSignedRequest(e, false)} />
            <h2>First Name</h2><input name="firstName" type="text" value={firstName} onChange={(e) => handleInput(e)}/>
            <h2>Last Name</h2><input name="lastName" type="text" value={lastName} onChange={(e) => handleInput(e)}/>
            <h2>Bio</h2><input name="bio" type="text" value={bio} onChange={(e) => handleInput(e)}/>
            <button id="NextButton" onClick={() => submitOwner(firstName, lastName, bio, this.props.match.params.id, profilePhoto)}>Submit</button>
        </div>
      </div>
     : <HouseForm />

    return (
      <div className="Questionnaire" id="OwnerBackground">
        {displayOwner}
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
  getOwner
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnerForm))
