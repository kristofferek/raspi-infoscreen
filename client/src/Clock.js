import React, { Component } from "react";

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString('en-GB').slice(11,17)
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
    let currentTime = new Date().toLocaleString('en-GB').slice(11,17);
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
