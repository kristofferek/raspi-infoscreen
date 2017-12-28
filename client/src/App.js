import React, { Component } from "react";
import BusTable from './BusTable.js';
import WeatherView from './WeatherView';
import News from './News';

class App extends Component {

  render() {
    return (
      <div id="grid">
        <BusTable />
        <WeatherView />
        <News />
      </div>
    );
  }
}

export default App;
