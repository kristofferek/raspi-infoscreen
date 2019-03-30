import React, { Component } from "react";
import Weather from './utils/Weather';
import Clock from './Clock';


class WeatherView extends Component {

  constructor(props) {
    super(props);

    this.state = { data: [] };

    this.updateWeatherData = this.updateWeatherData.bind(this);
    this.getWeatherIcon = this.getWeatherIcon.bind(this);

    this.w = new Weather();

  }

  render() {
    if (!this.state.data.length) {
      return (<div id="weather"></div>)
    }

    const rainOrWindSpeed = day => day.rain !== 0 ? `${day.rain} mm/h` : `${day.windSpeed} m/s`

    const threeHourForcast = this.state.data.slice(1,3).map(forcast =>
      <div key={forcast.id} className="hourly-forcast">
        <div className="time">{forcast.time}</div>
        <div className="symb-info">
          <img className="symb" src={this.getWeatherIcon(forcast)} alt=""></img>
          <div className="info">
            <div className="temp">
              <h1>{forcast.temp}<span className="celsius">°C</span></h1>
            </div>
            <div className="windspeed">{rainOrWindSpeed(forcast)}</div>
          </div>
        </div>
      </div>
    );

    const dailyForcast = this.state.data.slice(3,8).map(forcast =>
      <div key={forcast.id} className="daily-forcast">
        <div className="day">{forcast.weekday}</div>
        <div className="symb-info">
          <img className="symb" src={this.getWeatherIcon(forcast)} alt=""></img>
          <div className="info">
            <div className="temp">
              <h1>{forcast.temp}<span className="celsius">°C</span></h1>
            </div>
            <div className="windspeed">{rainOrWindSpeed(forcast)}</div>
          </div>
        </div>
      </div>
    );

    return (
      <div id="weather">
        <Clock />
        <div id="currently-forcast">
          <img className="symb" src={this.getWeatherIcon(this.state.data[0])} alt=""></img>
          <div className="info">
            <div className="temp">
              <h1>{this.state.data[0].temp}<span className="celsius">°C</span></h1>
            </div>
            <div className="windspeed">{rainOrWindSpeed(this.state.data[0])}</div>
          </div>
        </div>
        <div id="hourly-forcasts">
          {threeHourForcast}
        </div>
        <div id="daily-forcasts">
          {dailyForcast}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.w.addObserver((data) => this.updateWeatherData(data));
  }

  componentWillUnmount() {
    this.w.clearInterval();
  }

  updateWeatherData(forcasts) {
    this.setState({data: forcasts});
  }

  getWeatherIcon(forcast) {
    switch (forcast.weatherSymbol) {
      case 1:
      case 2:
        return "sun.png";
      case 3:
      case 4:
        return "halfclear.png";
      case 5:
      case 6:
      case 7:
        return "clouds.png";
      case 8:
      case 9:
      case 10:
      case 18:
      case 19:
      case 20:
        return "rain.png";
      case 11:
      case 21:
        return "thunder.png";
      case 12:
      case 13:
      case 14:
      case 22:
      case 23:
      case 24:
        return "hail.png";
      default:
        return "snow.png";

    }
  }

}

export default WeatherView;
