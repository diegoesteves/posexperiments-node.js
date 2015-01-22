/* Implementation Issues 
1 - OR the second file have to have distinct values, So apply an algorithm for 'disctinct function'. (OK)
2 - OR try to produce 2 BloomFilters arrays (a,b) and apply the 3rd BloomFilter to check (a) to (b). (try later)

LOADING: time needed  for parsing the RDF file, triple size, uris loaded, time required, size of bloomfilter, when stored on disk or in memory
QUERYING: avg. time per request

*/
Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};
var bf = require("./node_modules/bloomfilter/bloomfilter.js");
var N3 = require('./node_modules/n3/N3.js');
var execSync = require("exec-sync");

var file1 = "subjects.dbpedia" // "subjects.dbpedia"; //"_ds2" (hint: should be the biggest!)
var file2 = "news.objects" // "news.objects"; //"_ds" 

var files = [];
var sizefiles = [];

var file_out_bloom_array = "_out_bloom_array";
var file_out_bloom = "_out_bloom"; 
var file_out_bloom_pos = "_out_bloom_pos";
 
var totfile1 =-1; //n
var totfile2 = -1; //n
var totfile2_dist = -1;
var totbloompos = 0;

var BloomFilter = bf.BloomFilter;
var n = 1521738; //number of itens - 1521738
var p = 0.00012; //max expected fp rate

var m = 0; //number of bits to allocate
var k = 0; //number of hash functions

var timezero = process.hrtime();
var exec = require('child_process').exec;
var sh = require('execSync');
/*
exec("echo starting process", function(err, stdout, stderr){
  //************************************************************************
  console.log('reading the parameters and looking for compressed files...');
  //************************************************************************
  process.argv.forEach(function(val, index, array) {
    if ((index==2) || (index==3)) {files.push(val);} //check here whether another command line to extract is more effcient.
	if (val.indexOf(".zip") > -1) {
  		execSync('gunzip -c ' + val + ' > ' + val.substring(0, val.indexOf(".zip")));
	} else if (val.indexOf(".tar") > -1) {
  		execSync('tar -xf ' + val); 
	} else if (val.indexOf(".gz") > -1) {		
		execSync('gzip -d -f ' + val + ' > ' + val.substring(0, val.indexOf(".gz"))); 
	} 
  });

console.log('aaaa');

setTimeout(function() {
    console.log('bbbbb');
}, 1000);

console.log('ccccc');


var x;
  //************************************************************************
  console.log('checking files, converting to ntriples and extracting the information...');
  //************************************************************************
  files.forEach(function(f) {
     exec("rapper -g -o ntriples " + files[0] + " | cut -f1 -d '>' | sort -u | sed 's/<//' > " + files[0] + ".ntriples", function(err, stdout, stderr) {
       x = stderr.substring(stderr.indexOf("returned") + 9,stderr.indexOf(" triples"));
       sizefiles.push(x);
      console.log('r: ' + x);
       //stderr4.substring(stderr4.indexOf("returned") + 9,stderr4.indexOf(" triples"))
       f+= ".ntriples";
       //console.log("out:" + stderr4.substring(stderr4.indexOf("returned") + 9,stderr4.indexOf(" triples")));
     });  
  });
console.log('tanmah: ' + sizefiles.length);
  exec("echo size files", function(err, stdout, stderr){
    sizefiles.forEach(function(f) {
      console.log(f);
    });
  });


var user = execSync('echo $USER');
console.log(user); 

console.log('teste');
});	
*/
//************************************************************************
console.log('loading N3 parser...');
//************************************************************************
var fs = require('fs');
var parser = N3.Parser();
var turtleStream = fs.createReadStream('datateste.ttl');
	parser.parse(turtleStream,  
		function (error, triple, prefixes) {
			if (triple) {
				console.log('triple.subject: ' + triple.subject);
				console.log('triple.predicate: ' + triple.predicate);
				console.log('triple.object: ' + triple.object + '\n');
			 }
			if (prefixes) {
				console.log('prefixo:' + prefixes);
			}
	});	


//************************************************************************
console.log('defining bloomfilter parameters...');
//************************************************************************

m = Math.ceil((n * Math.log(p))/Math.log(1.0/(Math.pow(2.0, Math.log(2.0)))));
k = Math.round(Math.log(2.0) * m/n);

//************************************************************************
console.log('creating bloomfilter object...');
//************************************************************************
var bloom = new BloomFilter(m,k);

//read a file and create the Bloomfilter array
var fs = require('fs');
var text = fs.readFileSync(file1, "utf8");
var line2aux2 = '';
text.split('\n').forEach(function (line) { ///\r?\n/
  bloom.add(line);
   line2aux2 += line + '\n';
  totfile1+=1;
});
var array = [].slice.call(bloom.buckets),
json = JSON.stringify(array);
fs.writeFileSync(file_out_bloom_array, json, 'utf8');
fs.writeFileSync(file_out_bloom, line2aux2, 'utf8');

time = process.hrtime();

//********************************************************************************
console.log('getting the distinct objects from file2...');
//********************************************************************************

var objlist = [];

var fs4 = require('fs');
var text22 = fs4.readFileSync(file2, "utf8"); 
text22.split('\n').forEach(function (line4) {
   totfile2 +=1;
   objlist.push(line4);
});

var objListDistinct = objlist.unique();

//*********************************************************************************
console.log('checking file2 in file1 using BloomFilter Array (built on file1)...');
//*********************************************************************************
var line2aux = '';
var fs3 = require('fs');

objListDistinct.forEach(function (obj) {
   totfile2_dist+=1;
   if ((bloom.test(obj) == true) && (obj!="")) {
	totbloompos+=1; 
	line2aux += obj + '\n'
   }
});
fs3.writeFileSync(file_out_bloom_pos, line2aux.substring(0,line2aux.length -1), 'utf8');
var diff = process.hrtime(time); 
console.log("*******************************************************************************");
console.log('max expected fp rate		        : ' + p * 100 + '%');
console.log('total of bits to allocate               : ' + m);
console.log('total of hash functions                 : ' + k);
console.log('~number of itens to store in BlommFilter: ' + n);
console.log("tot records file 01              	: " + totfile1 + " [" + file1 + "]");
console.log("tot records file 02              	: " + totfile2 + " [" + file2 + "]");
console.log("tot records file 02 (distinct)   	: " + totfile2_dist + " [" + file2 + "]");
console.log("~tot links between 1 and 2        	: " + totbloompos); //  
console.log("BloomFilter's Link Execution time       : %ds %dms", diff[0], diff[1]/1000000); //
diff = process.hrtime(timezero);
console.log("Total Execution time (hr)               : %ds %dms", diff[0], diff[1]/1000000); //
console.log("*******************************************************************************");
process.exit(code=0);



