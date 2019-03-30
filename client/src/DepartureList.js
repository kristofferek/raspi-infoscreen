import React, { Component } from "react";
import moment from 'moment';

class DepartureList extends Component {

  constructor(props) {
    super(props);

    this.state = { }

    this.getShortDir = this.getShortDir.bind(this);
    this.getTimeLeft = this.getTimeLeft.bind(this);
  }

  render() {
    const list = this.props.depsFromStop;

    return (
      <div className="next-trips" style={{marginLeft:4+'%'}}>
        {list.map(hit =>
          <div key={hit.journeyid}>
            <div className="bus-trip" style={{width:100 + '%'}}>
              <div className="bus-info">
                <span className="bus-line" style={{color: hit.fgColor}}>{hit.sname.toUpperCase()}</span>
                <div className="bus-dir">{this.getShortDir(hit.direction)}</div>
              </div>
                {hit.rtTime ? (
                  <div className="bus-time">
                    <div className="bus-dep-time">
                      <span>{hit.rtTime}</span>
                    </div>
                    <div className="bus-time-left">
                      <div>{this.getTimeLeft(hit.rtDate, hit.rtTime)}</div>
                    </div>
                  </div>
                ) :
                (
                  <div className="bus-time">
                    <div className="bus-dep-time">
                      <span>{hit.time}</span>
                    </div>
                    <div className="bus-time-left">
                      <div>{this.getTimeLeft(hit.date, hit.time)}</div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    );
  }

  getTimeLeft(date, time) {
    const now = moment();
    const dep = moment(date + ' ' + time);
    return dep.add(1, 'minutes').diff(now, 'minutes');
  }

  getShortDir(str) {
    if(str.length > 16) str = str.substring(0,16);
    return str
  }

}

export default DepartureList;
