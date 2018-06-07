var amqp = require('amqplib/callback_api');
var fs = require('fs');
var express = require("express"),
	app = express();
var http = require('http');
var nano = require('nano')('http://adminUtente:password@localhost:5984'); //ingresso al proprio couch-db
var count = 0;    
var formidable = require('formidable'); //per parsare i file scaricati
var path = require('path'); //per i path

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    //Exchange
    var ex = 'exchange_rc';
    ch.assertExchange(ex, 'direct', {durable: true});

    //CODA
    ch.assertQueue('codareti', {durable: true}, function(err, q) {
      ch.bindQueue(q.queue, ex, 'bindkey');
      console.log(" Attesa messaggi. CTRL+C per terminare");
      
      ch.consume(q.queue, function(msg) {
        var j = JSON.parse(msg.content.toString());
        fs.writeFile('./lista_'+count+'.json', JSON.stringify(j, null, 2), function (err) {
          if (err) return console.log(err);
          console.log('Lista_'+count+' scritto correttamente');
          count++;
        });
      }, {noAck: true});
    });

  });
});

var db = nano.use('nome-database'); //scelgo un database da couchdb
console.log("Connessione sulla porta 8080");	

http.createServer(function (req, res) {
	if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('<h1>File uploaded and moved! Open http://localhost:5984/_utils/ </h1>'); 
        res.end();
        });
        
       //attachment
	  fs.readFile(newpath, function(err, data) {
		if (!err) {
			db.attachment.insert('id-database', newpath, data, 'application/json',
		{ rev: '42-01f16c7b0d57d8819462db49a72717c1' }, function(err, body) {  //NB: cambiare oqni volta il rev dopo ogni modifica
			if (!err)
				console.log(body);
			});
		}
	});
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h3>Select a JSON file to upload:</h3>');
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload" size="50"><br><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 


