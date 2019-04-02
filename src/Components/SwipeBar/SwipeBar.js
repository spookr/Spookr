import React from 'react'
import './SwipeBar.scss'

// Images
import Favorite from './assets/star.svg'
import Delete from './assets/delete.svg'
import Heart from './assets/heart.svg'

const SwipeBar = (props) => {

  // console.log(props)

  return (
    <div className="SwipeBar">
      <img src={Delete} alt="Delete Button" onClick={() => props.swipeLeft(props.swipedUser)} />
      <img src={Favorite} alt="Favorite Button" />
      <img src={Heart} alt="Heart Button" onClick={() => props.swipeRight(props.swipedUser)}/>
    </div>
  )
}


export default SwipeBar
