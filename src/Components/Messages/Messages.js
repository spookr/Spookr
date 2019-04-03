import React from 'react'
import './Messages.scss'

// Components
import MessageCard from '../MessageCard/MessageCard'

const Messages = (props) => {

  // console.log(props)

  const displayMatches = props.matches &&
    props.matches.map( (match, index) => {
        return <MessageCard key={index} {...match} selectMatch={props.selectMatch}/>
      })

  return (
    <div className="Messages">
      <h1>Messages</h1>
      {displayMatches}
    </div>
  )
}

export default Messages
