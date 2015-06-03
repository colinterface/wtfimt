var parseString = require('xml2js').parseString;
var request = require('request');

var timeToStation = 4;

// real time departure estimates northbound from powell st
request('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=powl&' +
  'key=MW9S-E7SL-26DU-VV8V&dir=n', function(error, response, body) {
  if (!error && response.statusCode === 200) {
    parseString(body, function (error, result) {
      var departures = [];
      var lines = result.root.station[0].etd;
      lines.forEach(function(line) {
        line.estimate.forEach(function(train) {
          if (train.minutes[0] !== 'Leaving') {
            departures.push(parseInt(train.minutes[0]));
          }
        });
      });
      departures.sort(function(a, b) {
        return a - b;
      });

      departures = departures.filter(function(item) {
        return item >= timeToStation;
      });

      var soon = departures.filter(function(item) {
        return item <= 15;
      });

      var hella = false;

      if (soon.length >= 3) {
        hella = true;
      }


      if (soon[0] <= 8) {
        console.log('FUCK! the next train leaves in ' + soon[0] + ' minutes!');
        if (hella) {
          console.log("but your shit is fine because there's hella trains in this bitch.");
        } else {
          // console.log('the one after that is in ' + soon[1] + ' minutes.')
        }
      } else {
        console.log('fuck this noise! next train leaves in ' + departures[0] + ' minutes.')
      }
      // console.log(departures);
      departures.forEach(function(departure) {
        console.log(departure + ' minutes');
      });

    });
  } else {
    console.log(error + '...motherfucking ' + response.statusCode + '! bullshit!');
  }
});
