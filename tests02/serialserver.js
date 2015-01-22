var http = require('http');
var async = require("async");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  
  async.series([
                function(callback) { 
                	res.write("1st line<br />"); 
                	callback(null, null); 
                },
                function(callback) { 
                	res.write("2nd line<br />"); 
                	callback(null, null); 
                },
                function(callback) { 
                	res.write("3rd line<br />"); 
                	callback(null, null); 
                },
                function(callback) { 
                	res.write("4th line<br />"); 
                	callback(null, null); 
                },
                function(callback) { 
                	res.write("5th line<br />"); 
                	callback(null, null); 
                }
               ],
               function(err, results) { 
	  				res.end() 
	  			}
  			);
}).listen(8555);
