import React, { Component } from 'react';
import './sass/App.css';
import firebase from './firebase';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Main/>
      </div>
    );
  }
}

export default App;
