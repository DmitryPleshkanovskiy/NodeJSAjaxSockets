var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = app.listen(3000);

var staticDir = __dirname + '/public';
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(staticDir + 'index.html')
});