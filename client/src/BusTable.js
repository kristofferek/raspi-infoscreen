import React, { Component } from "react";
import DepartureList from './DepartureList';


class BusTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      regn: [],
      hjalmar: [],
    };

    this.timer = null;
    this.loadData = this.loadData.bind(this);
  }

  render() {

    return (
      <div id="bus">
        <h3 className="green-header" >REGNBÅGSGATAN</h3>
        <DepartureList depsFromStop={this.state.regn} />
        <h3 id="hjalmar" className="green-header" >HJALMAR BRANTING</h3>
        <DepartureList depsFromStop={this.state.hjalmar} />
      </div>
    );
  }

  componentDidMount() {
    this.loadData("regnbagsgatan");
    this.loadData("hjalmar");
    this.tRegn = setInterval(()=> this.loadData("regnbagsgatan"), 10000);
    this.tHjalmar = setInterval(()=> this.loadData("hjalmar"), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.tRegn);
    clearInterval(this.tHjalmar);
  }

  async loadData(busStopID) {

    fetch('/api/' + busStopID)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Nu gick det käpprätt åt helvete...');
          return [];
        }
      })
      .then(data => {
        if (!(data instanceof Array)) {
          data = [data];
        }
        if (busStopID === "regnbagsgatan") {
          if (data.length > 2)
            this.setState({ regn: data.slice(0,2)})
          else
            this.setState({ regn: data})
        }
        else {
          if (data.length > 4)
            this.setState({ hjalmar: data.slice(0,7)})
          else
            this.setState({ hjalmar: data})
        }

      })
      .catch(error => console.error(error));
  }

}

export default BusTable;
