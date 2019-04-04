import React, { Component } from 'react'
import Geocode from "react-geocode";
import './Profile.scss'

// Components
import Main from '../Main/Main'
import UserBar from '../UserBar/UserBar'
import Discovery from '../Discovery/Discovery'
import { connect } from 'react-redux'
import { logIn } from '../../redux/reducer'

// Packages
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      conversation: false,
      swipes: null,
      matches: null
    }
  }

  componentDidMount() {
    this.getFilteredSwipes()
    this.getMatches();
    this.getUser()
  }

  getFilteredSwipes = () => {
    axios.get('/filterswipes').then(res => {

      this.setState({
        swipes: res.data
      })
      console.log(res.data)
    })
  }

  getMatches = () => {
    // console.log('hit matches')
    axios.get('/matches').then(res => {
      console.log(res.data)
      this.setState({
        matches: res.data
      })
    })
  }

  getUser = () => {
    axios.get('/api/user').then(res => {
      this.props.logIn(res.data)
    })
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit,
      conversation: false
    })
  }

  toggleConversation = () => {
    this.setState({
      conversation: true,
      edit: false
    })
  }

  closeConversation = () => {
    this.setState({
      edit: false,
      conversation: false
    })
  }

  swipeRight = (id, swiped) => {

    let swipedUser = {
      swipedUser: id,
      swiped: true
    }

    // console.log(swiped)

    if (swiped) {
      axios.post('/insertmatch', {matchedUser: id}).then(res => {
        // Dispay Match Card: get
        console.log(res.data)
        this.getFilteredSwipes()
      })} else {
        axios.post('/swipe', swipedUser).then(res => {
          this.getFilteredSwipes()
        })
      }
  }

  swipeLeft = (id) => {

    let swipedUser = {
      swipedUser: id,
      swiped: false
    }

    axios.post('/swipe', swipedUser).then(res => {
      this.getFilteredSwipes()
    })
  }

  render() {

    const { edit, conversation, swipes, matches } = this.state
    const { toggleEdit, toggleConversation, closeConversation, swipeRight, swipeLeft } = this

    const displayDiscovery = edit ? <Discovery toggleEdit={toggleEdit} /> :
      <UserBar
        toggleEdit={toggleEdit}
        toggleConversation={toggleConversation}
        matches={matches}
      />

    return (
      <div className="Profile">
        {displayDiscovery}
        <Main edit={edit}
          conversation={conversation}
          closeConversation={closeConversation}
          swipes={swipes}
          swipeRight={swipeRight}
          swipeLeft={swipeLeft}
        />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
const mapDispatchToProps = {
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
