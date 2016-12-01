import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 0,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 1,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  addMessage(username, content) {
    console.log('app component received username', username, 'and content', content);
    let newMessage = {username: username, content: content, id: Date.now()};
    let listWithNewMessage = this.state.messages.concat(newMessage);
    this.setState({messages: listWithNewMessage});
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);

    this.socket = new WebSocket('ws://localhost:4000/');

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
