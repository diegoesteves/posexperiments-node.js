var http = require('http');
var options = {method: 'HEAD', host: 'de.dbpedia.org', port: 80, path: '/'};
var req = http.request(options, function(res) {
    console.log(JSON.stringify(res.headers));
  }
);
req.end();
