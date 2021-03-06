import React, { Component } from "react";
import LIFFProvider from './LIFFProvider.react';
import { TaskContainer } from "./components/Task";
import { ErrorMessage } from './components/common';
import './App.css';

const EXAMPLE_USER_ID = '123412312341231321';

class App extends Component {
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
          />
          : <TaskContainer userId={EXAMPLE_USER_ID} />
        }
      </div>
    );
  }
}

export default App;
