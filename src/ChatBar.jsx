import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: ''
    }
  }

  onUsernameChangeHandler(event) {
    this.setState({username: event.target.value});
  }

  updateNameOnBlur(event) {
    this.props.changeCurrentUser({username: event.target.value})
  }

  onContentChangeHandler(event) {
    this.setState({content: event.target.value});
  }

  manageKeyDown(event) {
    if (event.key === "Enter") {
      this.props.newMessage(this.state.username, this.state.content);
    }
  }

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={this.onUsernameChangeHandler.bind(this)}
          onBlur={ this.updateNameOnBlur.bind(this)}
        />
        <input
          id="new-message"
          type="text"
          value={this.state.content}
          onChange={this.onContentChangeHandler.bind(this)}
          onKeyDown={this.manageKeyDown.bind(this)}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;



