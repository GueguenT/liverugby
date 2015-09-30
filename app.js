var express = require('express');
var app = express();

var http = require('http').Server(app);

var fs = require('fs');
var io = require('socket.io')(http);

var history = [];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res){
	res.sendFile(__dirname + '/admin.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  //send to front office

  socket.emit('history',  history);
 

  //listen to back office
  socket.on('message', function(body){
  	console.log(body);
    history.push(body);
  	socket.broadcast.emit('news', body);
  });
  socket.on('position', function(pos){
  	console.log(pos);
  	socket.broadcast.emit('position', pos);
  });
});



http.listen(3000);


