import React, {Component} from 'react'
import './Main.scss'

// Components
// import Conversation from '../Conversation/Conversation'
import Swiper from '../Swiper/Swiper'
import UserEdit from '../UserEdit/UserEdit'

class Main extends Component {
  render () {

    const displayEdit = this.props.edit ? <UserEdit /> : <Swiper />

    return (
      <div className="Main">
        {displayEdit}
      </div>
    )
  }
}

export default Main
