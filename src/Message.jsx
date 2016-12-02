import React, {Component} from 'react';

class Message extends Component {
  render() {
    return  (
      <div>
        <span className="username">
          {this.props.username}
        </span>
        <span className="content">
          {this.props.content}
        </span>
      </div>
    )
  }
}
export default Message;
//className="message system"