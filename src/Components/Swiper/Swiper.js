import React, {Component} from 'react'
import './Swiper.scss'

// Components
import SwipeBar from '../SwipeBar/SwipeBar'

class Swiper extends Component {
  render () {
    return (
      <div className="Swiper">
        Swiper
        <SwipeBar />
      </div>
    )
  }
}

export default Swiper
