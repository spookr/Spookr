import React, { Component } from 'react';
import dabbing_ghost from './Pictures/dabbing_ghost.png'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='stuffs'>
          <img src={dabbing_ghost}></img>
        </div>
        <h1>Mark's h1</h1>
        <h2>Jordan's h2</h2>
        <h3>Seth's h3</h3>
      </div>
    );
  }
}

export default App;
