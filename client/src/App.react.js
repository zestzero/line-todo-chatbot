import React, { Component } from "react";
import LIFFProvider from './LIFFProvider.react';
import { TaskContainer } from "./components/Task";
import { ErrorMessage } from './components/common';
import './App.css';

class App extends Component {
  state = {
    DEBUG_LOG: ''
  }
  getLog = (text) => {
    this.setState(prevState => ({ DEBUG_LOG: prevState.DEBUG_LOG.concat(text) }))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Todoist</h1>
        </header>
        {
          // For localhost testing
          process.env.NODE_ENV === 'production' ?
          <LIFFProvider
            render={(userId) => <TaskContainer userId={userId} />}
            error={(error) => <ErrorMessage header={error.message} />}
            debug={(text) => this.getLog(text)}
          />
          : <TaskContainer userId={'123412312341231321'} />
        }
        <div className="Debugger">{this.state.DEBUG_LOG}</div>
      </div>
    );
  }
}

export default App;
