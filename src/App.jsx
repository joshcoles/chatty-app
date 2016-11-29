import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';



class App extends Component {
  render() {
  console.log("Rendering <App />");
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList  />
        <ChatBar />
      </div>
    );
  }
}
export default App;
