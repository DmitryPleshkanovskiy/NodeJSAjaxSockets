var express = require('express');
var bodyParser = require('body-parser');
var socketIo = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socketIo.listen(server);

var staticDir = __dirname + '/public/';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var messages = [];

app.get('/', function(req, res) {
	res.sendFile(staticDir + 'index_ajax.html');
});

app.get('/messages', function(req, res) {
	res.json(messages);
});

app.post('/messages', function(req, res) {
	var message = req.body;
	messages.push(message);
	res.json(message)
});

app.get('/jquery', function(req, res) {
	res.sendFile(staticDir + 'index_jquery.html');
});

app.get('/sockets', function(req, res) {
	res.sendFile(staticDir + 'index_sockets.html');
});

io.on('connection', function(socket) {

	console.log('Client connected');
	socket.on('disconnected', function() {
		console.log('Client disconnected');
	});

	socket.on('chat message', function(msg) {
		messages.push(msg);
		io.emit('chat message', msg);
	});

	socket.emit('chat history', messages);


});


app.use(express.static(staticDir));