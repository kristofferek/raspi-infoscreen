import React, { Component } from "react";

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString().slice(11,16)
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    let currentTime = new Date().toLocaleString().slice(11,16);
    this.setState({
      time: currentTime
    });
  }

  render() {
    return (
      <h1 id="clock">
        {this.state.time}
      </h1>
    );
  }
}

export default Clock
