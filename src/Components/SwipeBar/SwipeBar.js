import React, { Component } from 'react'
import './SwipeBar.scss'

// Images
import Favorite from './assets/star.svg'
import Delete from './assets/delete.svg'
import Heart from './assets/heart.svg'

class SwipeBar extends Component {
  render() {
    return (
      <div className="SwipeBar">
        <img className='swipeBar-X' src={Delete} alt="Delete Button" />
        <img className='swipeBar-star' src={Favorite} alt="Favorite Button" />
        <img className='swipeBar-heart' src={Heart} alt="Heart Button" />
      </div>
    )
  }
}

export default SwipeBar
