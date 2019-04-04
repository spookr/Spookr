import React from 'react'
import './Message.scss'
import {withRouter} from 'react-router-dom'

const Message = (props) => {

  console.log(props)

  const conversation = props.messenger.toString() === props.match.params.id ?
    <div className="SendorMessage"><p>{props.message}</p></div>
    : <div className="ReceiverMessage"><p>{props.message}</p></div>

  return (
    <div className="Message">
      {conversation}
    </div>
  )
}

export default withRouter(Message)
