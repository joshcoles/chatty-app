import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);

// Original state being set
    this.state = {
      currentUser: {username: ""},
      messages: []
    }
  }

// ==========================================================
// Re-assigning state to reflect a new user
// Also sending new username (with old username and type) to
// server to be handled.
// ==========================================================
  changeCurrentUser(currentUser) {
    let oldUsername = this.state.currentUser.username;
    console.log("What I hope is the old username", currentUser.username)
    this.setState({currentUser: {username: currentUser.username}});

    let newUserName = {
      currentUser: currentUser.username,
      oldUsername: oldUsername,
      type: "nameUpdate"
    }
    this.socket.send(JSON.stringify(newUserName))
  }

// ==========================================================
// for adding new messages to messageList
//
// ==========================================================
  addMessage(username, content) {
    let newMessage = {
      username: username,
      content: content,
      id: Date.now(),
      type: "postMessage",
    };

    let listWithNewMessage = this.state.messages.concat(newMessage);

// Sending new message to server as a string
    this.socket.send(JSON.stringify(newMessage));
  }


// ==========================================================
// Where new messages will be handled
//
// ==========================================================
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000/');
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      const type = data.type;
      const content = data.content;

      if (type === "incomingMessage") {
        let oldMessages = this.state.messages;
        let combinedMessages = oldMessages.concat(data);
        this.setState({messages: combinedMessages});


      } else if (type === "nameUpdate") {

        console.log("I made it: ", data);

        if (data.oldUsername) {
          data.content = `${data.oldUsername} has changed their name to ${data.currentUser}`;
          let oldMessages = this.state.messages;
          let combinedMessages = oldMessages.concat(data);
          this.setState({messages: combinedMessages})
        } else {
          return;
        }

        // TODO: these lines make it so that name changes
        // only work if one user is on the site.

        this.setState({currentUser: {username: data.currentUser}});
      }
    }
    this.socket.onopen = (event) => {
    }
  }

// ==========================================================
  render() {
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser} />
        <ChatBar currentUser={this.state.currentUser} newMessage={this.addMessage.bind(this)} changeCurrentUser={this.changeCurrentUser.bind(this)} />
      </div>
    );
  }
}
export default App;
