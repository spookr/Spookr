import React, { Component } from 'react'
import './Swiper.scss'

// Components
import SwipeBar from '../SwipeBar/SwipeBar'

class Swiper extends Component {

  render() {

    // console.log(this.props)

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
          {this.props.ghost ? <h3> Type </h3> : null}
          <h3> {this.props.address} , {this.props.state} </h3>
          <hr />
        </div>
        <div className='SwiperBio'>
          <p> {this.props.body} </p>
        </div>
        <div className='SwipeBar'>
          <SwipeBar swipeRight={this.props.swipeRight} swipedUser={this.props.user_id} swipeLeft={this.props.swipeLeft} swiped={this.props.swiped} />
        </div>
      </div>

      const ghostProfile = this.props.ghost &&
        <div>
          <div className='SwiperHeader'>
            <img src={this.props.profile_pic} alt='ghost' />
          </div>
          <div className='SwiperInfo'>
            <h1>{this.props.name} </h1>
            <h3>{ghostType[this.props.type]}</h3>
            <h3> Distance </h3>
            <hr />
          </div>
          <div className='SwiperBio'>
            <p> {this.props.bio} </p>
          </div>
          <div className='SwipeBar'>
            <SwipeBar swipeRight={this.props.swipeRight} swipedUser={this.props.user_id} swipeLeft={this.props.swipeLeft} swiped={this.props.swiped} />
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
