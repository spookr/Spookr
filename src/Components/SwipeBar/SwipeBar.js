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
      <img src={Delete} style={{'cursor': 'pointer'}} alt="Delete Button" onClick={() => props.swipeLeft(props.swipedUser)} />
      <img src={Favorite} style={{'cursor': 'pointer'}} alt="Favorite Button" />
      <img src={Heart} style={{'cursor': 'pointer'}} alt="Heart Button" onClick={() => props.swipeRight(props.swipedUser, props.swiped)}/>
    </div>
  )
}


export default SwipeBar
