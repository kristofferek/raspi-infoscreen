
let instance = null;

class Weather {

  observers = [];

  constructor() {
    if(!instance){
          instance = this;
    }
    return instance;
  }

  addObserver(funcToCall) {
    this.observers.push(funcToCall);
    this.getWeatherForcast();
    this.timer = setInterval(()=> this.getWeatherForcast(), 1800000);
  }

  notifyObeservers(data) {
    for(var func of this.observers) {
      func(data);
    }
  }

  stopUpdate(){
    clearInterval(this.timer);
  }

  async getWeatherForcast(){
    fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/11.974560/lat/57.708870/data.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.notifyObeservers(this.stripDownData(data));
      })
      .catch(error => console.log(error));
  }

  stripDownData(d) {
    let forcasts = [];
    let apiForcasts = d.timeSeries;

    // Add the 3 closest forcasts (3 hour interval)
    for(var i = 0; i < 9; i=i+4) {
      forcasts.push(this.stripDownForcast(apiForcasts[i]));
    }
    var today = new Date().getDate().toString();
    // Add the 4 comming days at 12:00
    apiForcasts.some((forcast) => {
      var fDate = forcast.validTime.slice(8,10);
      var fHour = forcast.validTime.slice(11,13);
      if (fDate !== today && fHour === "12") {
        forcasts.push(this.stripDownForcast(forcast));
      }
      return forcasts.length === 7;
    })

    return forcasts;
  }

  stripDownForcast(object) {
    var obj = {
      weekday: this.getWeekday(object.validTime),
      time: object.validTime.slice(11,16),
      id: object.validTime
    }
    object.parameters.forEach((p) => {
      if (p.name === 't') {
        obj.temp = this.getRoundedTemp(p.values[0]);
      }
      if (p.name === 'ws') {
        obj.windSpeed = p.values[0];
      }
      if (p.name === 'Wsymb2') {
        obj.weatherSymbol = p.values[0];
      }
    });
    return obj;
  }

  getRoundedTemp(value){
    return Math.round(value);
  }

  getWeekday(date) {
    var year = date.slice(0,4);
    var month = parseInt(date.slice(5,7),10)-1;
    var day = date.slice(8,10);
    var d = new Date(year, month, day);
    var weekday = new Array(7);
    weekday[0] = "Sön";
    weekday[1] = "Mån";
    weekday[2] = "Tis";
    weekday[3] = "Ons";
    weekday[4] = "Tors";
    weekday[5] = "Fre";
    weekday[6] = "Lör";
    return weekday[d.getDay()];
  }
}

export default Weather;
