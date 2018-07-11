import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = { messages: [], input: {} };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(({ input }) => ({
      input: { ...input, [name]: value }
    }));
  };

  handleSubmit = async event => {
    event.preventDefault();

    const result = await fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.input)
    });

    this.setState({ input: {} });
    this.fetchMessages();
  };

  fetchMessages = async () => {
    const result = await fetch("http://localhost:3001/messages");
    const messages = await result.json();
    this.setState({ messages });
  };

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lovable Stack: MERN</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            name="text"
            value={this.state.input.text || ""}
            placeholder="Your message"
            onChange={this.handleChange}
          />
          <button>Save Message</button>
        </form>
        {this.state.messages.map(message => (
          <div key={message._id}>
            <p>
              {message.text}
              (<small>
                {new Date(parseInt(message.createdAt, 10)).toLocaleString()}
              </small>)
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
