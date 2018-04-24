const express = require("express");
const bodyParser = require('body-parser');
const superagent = require('superagent');
const vasttrafik = require('vasttrafik-api');
const moment = require('moment');

const app = express();

const key = 'FkCw46xAuKo5fgGXeTUnBVdgqkEa';
const secret = 'ZksAVtJtFPq7ePHQ0ftD9mzaLI4a';

app.use(bodyParser.json());

app.set("port", 3001);

// Express serves static assets. Comment out in dev
app.use(express.static("client/build"));


var regnbågsgatan = 9021014005465000;
var chalmers = 9021014001960000;
var brunnsparken = 9021014001760000;
var hjalmar = 9021014003180000;
var frihamnen = 9021014002470000;

let api;

async function authorize() {
  console.log("running authorize");
  vasttrafik.authorize(key, secret, 0)
    .then(token => {
      vasttrafik.setAccessToken(token);
      api = new vasttrafik.DepartureBoardApi();
    });
}

authorize();
setInterval(authorize, 1000000);

async function fetch_departures(id, stopsAt) {

  var _date = moment();
  var time = _date.format('HH:mm');
  var opts = {'timeSpan': 300, 'needJourneyDetail': 0, 'maxDeparturesPerLine': 2, 'direction': stopsAt}

  let res = await api.getDepartureBoard(id, _date.format(), time , opts).set({ciphers: 'DES-CBC3-SHA'});
  //console.log(res);
  return res.text;
}

app.get('/api/regnbagsgatan', (req, res) => {
  fetch_departures(regnbågsgatan, brunnsparken).then(function(data) {
    var my_json = JSON.parse(data).DepartureBoard.Departure
    res.json(my_json);
  })
});

app.get('/api/hjalmar', (req, res) => {
  fetch_departures(hjalmar, frihamnen).then(function(data) {
    var my_json = JSON.parse(data).DepartureBoard.Departure
    res.json(my_json);
  })
});

// function find_in_object(my_object, criteria1, criteria2){
//   return my_object.filter(function(obj) {
//     return Object.keys(criteria1).every(function(c) {
//       return obj[c] == criteria1[c];
//     }) || Object.keys(criteria2).every(function(c) {
//       return obj[c] == criteria2[c];
//     });
//   }).splice(0,4);
// }

// Improved error messages
process.on('unhandledRejection', r => { console.log(r); });

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
