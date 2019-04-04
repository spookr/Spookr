import React from 'react'
import './MessageCard.scss'

// Components
import ProfileIcon from '../ProfileIcon/ProfileIcon'

const MessageCard = (props) => {

  // console.log(props)

  const match = !props.ghost ?
    <div className='RecentMessage'>
      <h2>{props.first_name} {props.last_name}</h2>
      <p>Recent Message Here</p>
    </div> :
    <div className='RecentMessage'>
      <h2>{props.name}</h2>
      <p>Recent Message Here</p>
    </div>


  return (
    <div className="MessageCard" onClick={() => props.selectMatch(props)}>
      <ProfileIcon photo={props.profile_pic}/>
      {match}
    </div>
  )
}

export default MessageCard
