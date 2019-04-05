import React from 'react'
import './Message.scss'
import {withRouter} from 'react-router-dom'

const Message = (props) => {

  // console.log(props)

  return (
    <div className="Message">
      <div className={props.messenger.toString() === props.match.params.id ? "SendorMessage" : "ReceiverMessage"}><p>{props.message}</p></div>
    </div>
  )
}

export default withRouter(Message)
