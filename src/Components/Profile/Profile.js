import React, {Component} from 'react'
import './Profile.scss'

// Components
import Main from '../Main/Main'
import UserBar from '../UserBar/UserBar'
import Discovery from '../Discovery/Discovery'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      edit: false
    }
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  render () {

    const {edit} = this.state
    const {toggleEdit} = this

    const displayDiscovery = edit ? <Discovery toggleEdit={toggleEdit} /> : <UserBar toggleEdit={toggleEdit} />

    return (
      <div className="Profile">
        {displayDiscovery}
        <Main edit={edit}/>
      </div>
    )
  }
}

export default Profile
