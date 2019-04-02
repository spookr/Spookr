import React, { Component } from 'react'
import './Swiper.scss'
import Cat03 from '../ProfileIcon/assets/Cat03.jpg'

// Components
import SwipeBar from '../SwipeBar/SwipeBar'

class Swiper extends Component {

  render() {

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

    const houseProfile = !this.props.ghost &&
      <div>
        <div className='SwiperHeader'>
          <img src={this.props.profile_pic} alt='home owner' />
        </div>
        <div className='SwiperInfo'>
          <h1> {this.props.header} </h1>
          <h3> Type </h3>
          <h3> Distance </h3>
          <hr />
        </div>
        <div className='SwiperBio'>
          <p> {this.props.body} </p>
        </div>
        <div className='SwipeBar'>
          <SwipeBar />
        </div>
      </div>

      const ghostProfile = this.props.ghost &&
        <div>
          <div className='SwiperHeader'>
            <img src={this.props.profile_pic} alt='ghost' />
          </div>
          <div className='SwiperInfo'>
            <h1> {this.props.name} </h1>
            <h3> {ghostType[this.props.type]}</h3>
            <h3> Distance </h3>
            <hr />
          </div>
          <div className='SwiperBio'>
            <p> {this.props.bio} </p>
          </div>
          <div className='SwipeBar'>
            <SwipeBar />
          </div>
        </div>

    return (
      <div className="Swiper">
        {houseProfile}
        {ghostProfile}
      </div>
    )
  }
}

export default Swiper
