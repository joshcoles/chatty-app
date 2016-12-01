import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
  }

  addMessage(username, content) {
    console.log('app component received username', username, 'and content', content);
    let newMessage = {
      username: username,
      content: content,
      id: Date.now()
    };

    let listWithNewMessage = this.state.messages.concat(newMessage);
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:4000/');
    this.socket.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      let oldMessages = this.state.messages;
      let combinedMessages = oldMessages.concat(newMessage);
      this.setState({messages: combinedMessages});
    }
    this.socket.onopen = (event) => {
      console.log("Client connected to server via socket, event:", event);
    }
  }

  render() {
    console.log("Rendering <App />");
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} newMessage={this.addMessage.bind(this)}/>
      </div>
    );
  }
}
export default App;
