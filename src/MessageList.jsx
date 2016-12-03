import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
      return (
        <div className="message system">
          <div id="message-list">
            {this.props.messages.map((msg) => {
              return (<Message key={msg.id} content={msg.content} username={msg.username} type={msg.type} />)
            })}
          </div>
        </div>
    )
  }
}
export default MessageList;
