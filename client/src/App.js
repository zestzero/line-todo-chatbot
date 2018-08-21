import React, { Component } from 'react';
import logo from './logo.svg';
import { getTasks } from './services/task'
import './App.css';

class App extends Component {
  state = {
    tasks: []
  }
  componentDidMount() {
    const tasks = getTasks('123412312341231321')
    console.log(tasks)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.tasks.map(task => (<p>task.content</p>))}
      </div>
    );
  }
}

export default App;
