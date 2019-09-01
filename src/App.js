import React, { Component } from 'react';
import Rebase from 're-base'
import * as firebase from 'firebase/app'
import 'firebase/database'
import { Line } from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'
import DataManager from "./modules/DataManager"
import './App.css';


// Firebase configuration --- to be obfuscated and .gitignore(d) in real application
const firebaseConfig = {
  apiKey: "AIzaSyC6s8l7CKgiYUNTQo7osioOqJ-HIUQesZI",
  authDomain: "front-end-capstone-6c028.firebaseapp.com",
  databaseURL: "https://front-end-capstone-6c028.firebaseio.com",
  projectId: "front-end-capstone-6c028",
  storageBucket: "",
  messagingSenderId: "241869701305",
  appId: "1:241869701305:web:d6b84a3a5d6160a9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(app.database());


//disable animation of line chart between updates
defaults.global.animation = false

class App extends Component {
  state = {
    data: {}
  }

  componentDidMount() {
    // one way data-syncing from FB to this.state --- when FB db is updated, this.state is as well
    base.bindToState('appData', {
      context: this,
      state: 'data.degrees',
      asArray: true
    })
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="App" >
        <Line data={this.state.data} />
      </div>
    )
  };
}

export default App;
