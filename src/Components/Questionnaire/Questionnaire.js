import React, {Component} from 'react'
import './Questionnaire.scss'

// Components
import GhostForm from '../../Components/GhostForm/GhostForm'
import HomeForm from '../../Components/HomeForm/HomeForm'

// Packages
import {connect} from 'react-redux'

class Questionnaire extends Component {

  render () {

    const {user} = this.props

    const displayGhost = user && user.ghost ? <GhostForm /> :
      user && !user.ghost ? <HomeForm /> : null

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
    user: state.user
  }
}

export default connect(mapStateToProps)(Questionnaire)
