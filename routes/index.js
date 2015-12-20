var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mariage Coco Roro' });
});

router.get('/logement', function(req, res, next) {
  res.render('logement', { title: 'Logement' });
});

router.get('/horaire', function(req, res, next) {
  res.render('horaire', { title: 'Horaire' });
});

module.exports = router;
