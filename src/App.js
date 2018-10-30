import React, { Component } from 'react';
import './App.css';
import Map from './Map/Map.js';
import Sidebar from './Sidebar/Sidebar.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStation: null,
    };
  }

  selectStation = (id) => {
    this.setState({ selectedStation: id })
  }

  render() {
    return (
      <div className="App">
        <div id="brand" onClick={()=>this.selectStation(null)}>
            <h1 id="logo">L.A. Bikes</h1>
        </div>
        <div id="container">
          <Map
            selectedStation={this.state.selectedStation}
            selectStation={this.selectStation}
          />
          <Sidebar
            selectedStation={this.state.selectedStation}
            selectStation={this.selectStation}
          />
        </div>
      </div>
    );
  }
}

export default App;
