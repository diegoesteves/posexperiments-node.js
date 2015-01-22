/*******************************************************************************************
date: 14-11-2014
author: dnes
version: 0.1
note: compute the number of links between 2 files (node.js)
http://de.dbpedia.org/downloads/20140114/dewiki-20140114-article-categories.ttl.gz 
https://raw.githubusercontent.com/AKSW/n3-collection/master/News-100.ttl

to do's
1 - implement ETag check control (https://www.npmjs.org/package/st) by HEAD request
	var http = require('http');
	var options = {method: 'HEAD', host: 'stackoverflow.com', port: 80, path: '/'};
	var req = http.request(options, function(res) {
    		console.log(JSON.stringify(res.headers));
  	}
       );
req.end();

curl -I http://de.dbpedia.org/downloads/20140114/dewiki-20140114-article-categories.ttl.gz 
HTTP/1.1 200 OK
Date: Sun, 16 Nov 2014 21:45:34 GMT
Server: Apache
Last-Modified: Sun, 26 Jan 2014 19:19:16 GMT
			ETag: "22c4031-4c64292-4f0e477905500"
Accept-Ranges: bytes
Content-Length: 80102034
Content-Type: application/x-gzip


2 - take a look into https://www.npmjs.org/package/shelljs
3 - optimize the code (open smaller file to add into bloomfilter vector)
	url.resolve('http://example.com/', '/one') 
4 - take a look on bloofilter's threshold 
********************************************************************************************/
// get dependencies and defining variables
var execSync = require("exec-sync");
var zlib = require('zlib');
var debugMode = true;
var time;

// defining js functions
function checkDownload(fileurl){
  return false;
 //todo: check file properties
};

//get parameters
var f1, f2;
process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
  if (index==2) {f1=val; /*caegories*/} else if (index==3) {f2=val;/*news*/}
});

//**************** main
f1a = f1.replace(/^.*[\\\/]/, '');
f1anonzip = f1a.substring(0, f1a.length - 3);
f2a = f2.replace(/^.*[\\\/]/, '');

console.log('starting process');

if (checkDownload(f1)){execSync('wget ' + f1, debugMode); console.log('download ok!');} else {console.log('OK! file ' + f1 + ' is up-to-date');}
if (checkDownload(f2)){execSync('wget ' + f2, debugMode); console.log('download ok!');} else {console.log('OK! file ' + f2 + ' is up-to-date');}

if (f1.substring(f1.length - 3, f1.length) == '.gz'){
  //console.log('unziping the file: ' + f1a); 
  //execSync('gunzip -c ' + f1a + ' > ' + f1a.substring(0, f1a.length - 3)); 
  //execSync('gzip -d ' + f1a);
}


console.log('/*************************************************** UNIX COMMANDLINE COUNT ****************************************************/');


timezero = process.hrtime();
var exec = require('child_process').exec;
exec("echo start", function(err1, stdout1, stderr1){
  //console.log('creating new file: subjects.dbpedia');
  //  exec("rapper -g " + f1anonzip + " | cut -f1 -d '>' | sort -u | sed 's/<//' > subjects.dbpedia", function(err4, stdout4, stderr4) {
  //  console.log('creating new file: news.objects');
  //    exec("rapper -g " + f2a + " | grep -v '\"'  | cut -f3 -d '>' | sed 's/ <//' | sort -u > news.objects", function(err5, stdout5, stderr5) {
      console.log('starting links count...');
      time = process.hrtime();
        exec("comm -1 -2  news.objects subjects.dbpedia  | wc -l", function(err6, stdout6, stderr6) {  
        var diff = process.hrtime(time);
        console.log("tot links: " + stdout6);  //263
        console.log("Linking Execution time (hr): %ds %dms", diff[0], diff[1]/1000000); //3s 868.856551ms
     

	console.log('/*************************************************** BLOMMFILTER COUNT *********************************************************/');

	var bf = require("./node_modules/bloomfilter/bloomfilter.js");
	var BloomFilter = bf.BloomFilter;

	var n = 6; //number of itens 575
	var p = 0.01; //max expected fp rate
	var b = 0; //number of bits
	var h = 0; //number of hash functions

	b = -n*Math.log(p) / (Math.log(2)^2) //the number of bits
	b = b.toFixed(2);
	h = Math.ceil(b/n * Math.log(2)) //the number of has functions

	console.log('number of bits: ' + b);
	console.log('number of hash functions: ' + h);
	console.log('max expected FP rate: ' + p);

	timezero = process.hrtime();
	var bloom = new BloomFilter(b,h);

	//read a file and create the Bloomfilter array
	console.log('creating bloomfilter array');
	var fs = require('fs');
	var text = fs.readFileSync("ds", "utf8"); //"news.objects"
	text.split(/\r?\n/).forEach(function (line) {
	  bloom.add(line);
	});
	var array = [].slice.call(bloom.buckets),
    	json = JSON.stringify(array);
	var out="_bloomarray" + f1anonzip;
	fs.writeFileSync(out, json, 'utf8');
	
	var out2="_bloom_pos_" + f1anonzip.split(".")[1] ;


	time = process.hrtime();
	console.log('checking existence by bloomfilter implementation');
	var totbloom = 0;
	var fs2 = require('fs');
	var fs3 = require('fs');
	var text2 = fs2.readFileSync("ds2", "utf8"); //subjects.dbpedia
	var line2aux = '';
	text2.split(/\r?\n/).forEach(function (line2) {
	   if (bloom.test(line2) == true) {
		totbloom+=1; line2aux += line2 + '\r'
	   }
	});
	fs3.writeFileSync(out2, line2aux.substring(0,line2aux.length -1), 'utf8');
	
	var diff = process.hrtime(time); 
	console.log("tot links: " + totbloom); //  
	console.log("Linking Execution time (hr): %ds %dms", diff[0], diff[1]/1000000); //
	diff = process.hrtime(timezero);
	console.log("Total   Execution time (hr): %ds %dms", diff[0], diff[1]/1000000); //

	console.log(/*************************************************** END *******************************************************************/);
	
//    });
//  });
  diff = process.hrtime(timezero);
  console.log("Total   Execution time (hr): %ds %dms", diff[0], diff[1]/1000000); //
});
});

process.exit(code=0);

//execSync("rapper -g " + f1anonzip + " | cut -f1 -d '>' | sort -u | sed 's/<//' > subjects.dbpedia");
//execSync("rapper -g " + f2a + " | grep -v '\"'  | cut -f3 -d '>' | sed 's/ <//' | sort -u > news.objects");

//console.log('tot links: ' + execSync("comm -1 -2  news.objects subjects.dbpedia  | wc -l"));

//end of process
//var diff = process.hrtime(time);
//console.log("Execution time (hr): %ds %dms", diff[0], diff[1]/1000000);

