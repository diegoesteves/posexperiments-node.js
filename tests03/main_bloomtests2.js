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

var file1 = "subjects.dbpedia" // "subjects.dbpedia"; //"_ds2" (hint: should be the biggest!)
var file2 = "news.objects" // "news.objects"; //"_ds"

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

timezero = process.hrtime();


/************************************************************************/
console.log('defining bloomfilter parameters...');
/************************************************************************/

m = Math.ceil((n * Math.log(p))/Math.log(1.0/(Math.pow(2.0, Math.log(2.0)))));
k = Math.round(Math.log(2.0) * m/n);


/************************************************************************/
console.log('creating bloomfilter object...');
/************************************************************************/
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

/************************************************************************/
console.log('getting the distinct objects from file2...');
/*************************************************************************/

var objlist = [];

var fs4 = require('fs');
var text22 = fs4.readFileSync(file2, "utf8"); 
text22.split('\n').forEach(function (line4) {
   totfile2 +=1;
   objlist.push(line4);
});

console.log('-----' + totfile2);
console.log('---' + objlist.length);

var objListDistinct = objlist.unique();

console.log('--' + objListDistinct.length);

/************************************************************************/
console.log('checking file2 in file1 using BloomFilter Array (built on file1)...');
/*************************************************************************/
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

