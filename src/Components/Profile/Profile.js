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
      matches: null,
      selectedUser: {},
      matchModal: false,
      matchedInfo: {}
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
      // console.log(res.data)
    })
  }

  getMatches = () => {
    // console.log('hit matches')
    axios.get('/matches').then(res => {
      // console.log(res.data)
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

  closeConversation = () => {
    this.setState({
      selectedUser: {},
      edit: false,
      conversation: false
    })
  }

  swipeRight = (id, swiped, name, photo) => {

    let swipedUser = {
      swipedUser: id,
      swiped: true
    }

    let matchedUser = {
      name,
      photo
    }

    // console.log(matchedUser)

    if (swiped) {
      axios.post('/insertmatch', { matchedUser: id }).then(res => {
        // Dispay Match Card: get
        console.log(res.data)
        this.getFilteredSwipes()
        this.getMatches()
        this.setState({
          matchedInfo: matchedUser,
          matchModal: true
        })
      })
    } else {
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

  selectMatch = (user) => {
    this.setState({
      selectedUser: user,
      conversation: true,
      edit: false
    })
  }

  closeMatchModal = () => {
    this.setState({
      matchModal: false,
      matchedInfo: {}
    })
  }

  render() {

    const { edit, conversation, swipes, matches, selectedUser, matchModal, matchedInfo} = this.state
    const { toggleEdit, closeConversation, swipeRight, swipeLeft, selectMatch, getUser, getFilteredSwipes, closeMatchModal } = this

    const displayDiscovery = edit ? <Discovery toggleEdit={toggleEdit} updateUser={getUser} getFilteredSwipes={getFilteredSwipes}/> :
      <UserBar
        toggleEdit={toggleEdit}
        matches={matches}
        selectMatch={selectMatch}
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
          selectedUser={selectedUser}
          matchModal={matchModal}
          closeMatchModal={closeMatchModal}
          matchedInfo={matchedInfo}
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
