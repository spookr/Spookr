import React, {Component} from 'react'
import './Profile.scss'

// Components
import Main from '../Main/Main'
import UserBar from '../UserBar/UserBar'
import Discovery from '../Discovery/Discovery'

// Packages
import {connect} from 'react-redux'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      edit: false,
      conversation: false
    }
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

  render () {

    const {edit, conversation} = this.state
    const {toggleEdit, toggleConversation, closeConversation} = this

    const displayDiscovery = edit ? <Discovery toggleEdit={toggleEdit} /> :
    <UserBar
      toggleEdit={toggleEdit}
      toggleConversation={toggleConversation} />

    return (
      <div className="Profile">
        {displayDiscovery}
        <Main edit={edit} conversation={conversation} closeConversation={closeConversation} />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    house: state.house,
    owner: state.owner
  }
}

export default connect(mapStateToProps)(Profile)
