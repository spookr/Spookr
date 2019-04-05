import React, { Component } from 'react'
import './Swiper.scss'

// Components
import SwipeBar from '../SwipeBar/SwipeBar'

const Swiper = (props) => {

  const ghostType = {
    1: 'Poltergeist',
    2: 'Demon',
    3: 'Ectoplasm',
    4: 'Interactive',
    5: 'Orb',
    6: 'Sheet',
    7: 'Specter',
    8: 'Other'
  }

  const houseProfile = !props.ghost &&
    <div>
      <div className='SwiperHeader'>
        <img src={props.profile_pic} alt='home owner' />
      </div>
      <div className='SwiperInfo'>
        <h1> {props.header} </h1>
        {props.ghost ? <h3> Type </h3> : null}
        <h3> {props.address} , {props.state} </h3>
        <hr />
      </div>
      <div className='SwiperBio'>
        <p> {props.body} </p>
      </div>
      <div className='SwipeBar'>
        <SwipeBar swipeRight={props.swipeRight}
                  swipedUser={props.user_id}
                  swipeLeft={props.swipeLeft}
                  swiped={props.swiped}
                  name={!props.ghost ? props.first_name : props.name}
                  photo={props.profile_pic} />
      </div>
    </div>

    const ghostProfile = props.ghost &&
      <div>
        <div className='SwiperHeader'>
          <img src={props.profile_pic} alt='ghost' />
        </div>
        <div className='SwiperInfo'>
          <h1>{props.name} </h1>
          <h3>{ghostType[props.type]}</h3>
          <h3> {`${props.town}, ${props.state}`} </h3>
          <hr />
        </div>
        <div className='SwiperBio'>
          <p> {props.bio} </p>
        </div>
        <div className='SwipeBar'>
          <SwipeBar swipeRight={props.swipeRight}
                    swipedUser={props.user_id}
                    swipeLeft={props.swipeLeft}
                    swiped={props.swiped}
                    name={!props.ghost ? props.first_name : props.name}
                    photo={props.profile_pic} />
        </div>
      </div>

  return (
    <div className="Swiper">
      {houseProfile}
      {ghostProfile}
    </div>
  )
}


export default Swiper
