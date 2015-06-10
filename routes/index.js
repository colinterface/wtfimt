var express = require('express');
var router = express.Router();
var wtfimt = require('../wtfimt');
var colors = require('colors');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'where the fuck is my train?!'});
  wtfimt(function(main, sub, departures) {
    console.log(main, sub, departures);
    res.render('index', {
      // title: 'where the fuck is my train?!',
      main: main,
      sub: sub,
      departures: departures
    });
    console.log('page rendered'.green);
    // console.log(result.main);
    // console.log(result.sub);
  });
});

module.exports = router;
