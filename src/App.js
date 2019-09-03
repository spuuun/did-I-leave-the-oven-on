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

//set an initial state w/ regular ole fetch call to my FB db

// const initialState = {}
// DataManager.getAll()
//   .then(data => {
//     console.log("api data after adam's utility", data);
//     initialState.data = data
//   })

class App extends Component {

  state = {
    data: [],
    chartData: {}
  }

  createChartableDataFromState(degreesArray) {
    console.log(degreesArray);

    const labels = []
    const thirtyEmptyStrings = () => {
      for (let i = 0; i < 30; i++) {
        labels.push("")
      }
    }
    thirtyEmptyStrings()

    const chartableObj = {
      labels: labels,
      datasets: [
        {
          label: 'TEMPERATURES!!!',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: degreesArray
        }
      ]
    }
    this.setState({
      chartData: chartableObj
    })
  }

  componentDidMount() {
    //set initial state
    // this.setState(initialState)

    base.listenTo('appData', {
      context: this,
      asArray: true,
      then(tempsData) {
        console.log("updated");
        const degFarArr = tempsData.slice(tempsData.length - 30).map(temp => {
          return temp.temp.degreesFar
        })
        this.createChartableDataFromState(degFarArr)
      }
    })

    // one way data-syncing from FB to this.state --- when FB db is updated, this.state is as well
    // base.bindToState('appData', {
    //   context: this,
    //   state: 'data.degrees',
    //   asArray: true
    // })
    // console.log("state after componentDidMount:", this.state.data);
  }

  render() {
    console.log("render has run");
    // console.log("DEGREES ARR", this.state.data.degrees);
    return (
      <div className="App" >
        <Line data={this.state.chartData} />
      </div>
    )
  };
}

export default App;
