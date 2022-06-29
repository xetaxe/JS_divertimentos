const express = require('express');

const app = express();

var http = require('http');
var dt = require('./myfirstmodule');
var url = require('url');
var fs = require('fs');

// http.createServer( (req, res) => {
// 	res.writeHead(200, {'Content-Type': 'text/html'});
// 	res.write("The date and time are: " + dt.myDateTime());
// 	res.end('Hello World!');
// }).listen(8080);

// http.createServer( (req, res) => {
// 	res.writeHead(200, {'Content-Type': 'text/html'});
// 	var q = url.parse(req.url, true).query;
// 	var txt = q.year + " " + q.month;
// 	res.end(txt);
// }).listen(8080);

// http.createServer( (req, res) => {
// 	fs.readFile('test.html', function(err, data) {
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write(data);
// 		return res.end();
// 	});
// }).listen(8080);

http.createServer( (req, res) => {
	fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
		if (err) throw err;
		console.log('Saved!');
	}); 
}).listen(8080);

