import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom'
import Login from './components/Login/Login';

class App extends Component {

  render() {
    return (

      <div>
      BLUETOOTH

      <Login />
      </div>
    );
  }
}

export default App;
