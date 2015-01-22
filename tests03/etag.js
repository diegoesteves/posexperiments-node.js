//var Etag = require('/node_modules/ETag/Etag.js');
//myetag = Etag.Calcul({'resource':'http://de.dbpedia.org/downloads/20140114/dewiki-20140114-article-categories.ttl.gz'});

var http = require('http');
var options = {method: 'HEAD', host: 'stackoverflow.com', port: 80, path: '/'};
var req = http.request(options, function(res) {
    console.log(JSON.stringify(res.headers));
  }
);
req.end();
