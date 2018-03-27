var path = require('path');

module.exports = function(app) {
	app.get('/', function (req, res) {
	  res.sendFile(path.join(__dirname, '/../public/html/login.html'));
	});

	app.get('/update', function (req, res) {
	  res.sendFile(path.join(__dirname, '/../public/html/update.html'));
	});

	app.get('/deduct', function (req, res) {
	  res.sendFile(path.join(__dirname, '/../public/html/deduct.html'));
	});

	app.get('/search', function (req, res) {
	  res.sendFile(path.join(__dirname, '/../public/html/search.html'));
	});	

	app.get('/add', function (req, res) {
	  res.sendFile(path.join(__dirname, '/../public/html/add.html'));
	});

	app.get('/logout', function (req, res) {
  	res.sendFile(path.join(__dirname, '/../public/html/login.html'));
	});		
};
