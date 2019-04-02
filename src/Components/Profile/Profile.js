import React, {Component} from 'react'
import './Profile.scss'

// Components
import Main from '../Main/Main'
import UserBar from '../UserBar/UserBar'
import Discovery from '../Discovery/Discovery'

// Packages
import axios from 'axios'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      edit: false,
      conversation: false,
      swipes: null,
      matches: null
    }
  }

  // componentDidUpdate (prevState, prevProps) {
  //   if (prevProps.swipes !== this.state.swipes) {
  //     this.getFilteredSwipes()
  //   }
  // }

  componentDidMount () {
    this.getFilteredSwipes()
    this.getMatches()
  }

  // getFilteredSwipes = () => {
  //   axios.get('/filterswipes').then(res => {
  //     this.setState({
  //       swipes: res.data
  //     })
  //   })
  // }

  getMatches = () => {
    console.log('hit matches')
    axios.get('/matches').then(res => {
      this.setState({
        matches: res.data
      })
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

  swipeRight = (id) => {

    let swipedUser = {
      swipedUser: id,
      swiped: true
    }

    axios.post('/swipe', swipedUser).then(res => {
      console.log(res.data)
    })
  }

  swipeLeft = (id) => {

    let swipedUser = {
      swipedUser: id,
      swiped: false
    }

    axios.post('/swipe', swipedUser).then(res => {
      console.log(res.data)
    })
  }

  render () {

    const {edit, conversation, swipes, matches} = this.state
    const {toggleEdit, toggleConversation, closeConversation, swipeRight, swipeLeft} = this

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

export default Profile
