import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
      return (
        <div id="message-list">
          {this.props.messages.map((msg) => {
            return (<Message key={msg.id} content={msg.content} username={msg.username} type={msg.type} />)
          })}

          <div className="message system">

          </div>
        </div>
    )
  }
}
export default MessageList;

