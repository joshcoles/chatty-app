import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>")
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="{Your Name (Optional)}"
          value={this.props.currentUser.name}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;


function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
