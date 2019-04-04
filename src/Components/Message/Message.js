import React from 'react'
import './Message.scss'

const Message = (props) => {

  console.log(props)
  // const conversation = this.props.allMessages.map(message => {
  //   if (message.userId === myUserID){
  //     return <div className="from-me"><p>{message.content}</p></div>
  //   } else{
  //     return <div className="from-them"><p>{message.content}</p></div>
  //   }
  // })

  return (
    <div className="Message">
      <div className="from-me">
        <p>Hey there! What's up?</p>
      </div>
      <div className="clear"></div>
      <div className="from-them">
        <p>Just want to say hi!</p>
      </div>
      <div className="clear"></div>
      <div className="from-me">
        <p>Well heyyyyyy</p>
      </div>
      <div className="clear"></div>
      <div className="from-them">
        <p>hahahahah</p>
      </div>
      <div className="clear"></div>
      <div className="from-me">
        <p>Yeah</p>
      </div>
      <div className="clear"></div>
      <div className="from-them">
        <p>Pretty cool</p>
      </div>
    </div>
  )
}

export default Message
