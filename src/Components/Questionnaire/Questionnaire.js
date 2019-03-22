import React, {Component} from 'react'
import './Questionnaire.scss'

// Components
import GhostForm from '../../Components/GhostForm/GhostForm'
import OwnerForm from '../../Components/OwnerForm/OwnerForm'

// Packages
import {connect} from 'react-redux'

class Questionnaire extends Component {

  render () {
    console.log("this is question")
    // const {user} = this.props
    const user = {ghost: 'something'}

    const displayGhost = user && user.ghost ? <GhostForm /> :
      user && !user.ghost ? <OwnerForm /> : null

    return (
      <div className="Questionnaire">
        <div className="QuestionnaireSecondary">
          {displayGhost}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // user: state.user
  }
}

export default connect(mapStateToProps)(Questionnaire)
