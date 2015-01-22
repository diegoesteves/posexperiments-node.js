/* get headers */
var http = require('http');
var options = {method: 'HEAD', host: 'google.com', port: 80, path: '/'};
var req = http.request(options, function(res) {
    console.log(JSON.stringify(res.headers));
  }
);
req.end();


var http = require("http");
var server = http.createServer(function (request, resposta){
	   resposta.writeHead(200,{'Content-Type': 'text/plain'});
	   resposta.end("hello world");
	});

server.listen(3000, function(){
	   console.log("seu servidor está pronto em " + this.address().port);
	});


