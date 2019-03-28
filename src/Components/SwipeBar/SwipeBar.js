import React, {Component} from 'react'
import './SwipeBar.scss'

// Images
import Favorite from './assets/star.svg'
import Delete from './assets/delete.svg'
import Heart from './assets/heart.svg'

class SwipeBar extends Component {
  render () {
    return (
      <div className="SwipeBar">
        <img src={Delete} />
        <img src={Favorite} />
        <img src={Heart} />
      </div>
    )
  }
}

export default SwipeBar
