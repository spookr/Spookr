import React, { Component } from 'react'
import './Swiper.scss'
import Cat03 from '../ProfileIcon/assets/Cat03.jpg'

// Components
import SwipeBar from '../SwipeBar/SwipeBar'

class Swiper extends Component {
  render() {
    return (
      <div className="Swiper">
        <div className='swiper-picture'>
          <img src={Cat03} alt='kitty' />
        </div>
        <div className='swiper-info'>
          <h1> Name </h1>
          <h3> Type </h3>
          <h3> Distance </h3>
          <hr />
        </div>
        <div className='swiper-bio'>
          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
        </div>
        <div className='swiper-swipeBar'>
          <SwipeBar />
        </div>
      </div>
    )
  }
}

export default Swiper
