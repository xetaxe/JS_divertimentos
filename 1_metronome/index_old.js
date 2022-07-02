var http = require('http');
var dt = require('./myfirstmodule');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
var nodemailer = require('nodemailer');

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

// http.createServer( (req, res) => {
// 	fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
// 		if (err) throw err;
// 		console.log('Saved!');
// 	}); 
// }).listen(8080);


http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
		var oldpath = files.filetoupload.filepath;
		var newpath = 'C:/Users/Nil/Desktop' + files.filetoupload.originalFilename;
		fs.rename(oldpath, newpath, function (err) {
		  if (err) throw err;
		  res.write('File uploaded and moved!');
		  res.end();
		});
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);

