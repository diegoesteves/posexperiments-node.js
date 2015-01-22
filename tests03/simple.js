console.log('*******************************************************************************************');
console.log('data:    2014-11-20');
console.log('author:  d.esteves');
console.log('version: 0.0.1');
console.log('notes: the script receives 2 datasets (A and B) checks the number of links between A from B');
console.log('     : the files has to be *.);
console.log('*******************************************************************************************');


Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};

var exec = require('child_process').exec;
var execSync = require("execSync"); //nao esta rodando alguns comando linux, como extrair. extrai com arquivo vazio! 
var bf = require("./node_modules/bloomfilter/bloomfilter.js");

var args = process.argv.slice(2);
var file1 = args[0];
var file2 = args[1];
var timezero = process.hrtime();

var f1, f2, s1, s2;
var sufx = ".ntriples";

var totfile1 =-1; //n
var totfile2 = -1; //n
var totfile2_dist = -1;
var totbloompos = 0;

var BloomFilter = bf.BloomFilter;
var n = 0; //number of itens - 1521738
var p = 0.00012; //max expected fp rate
var m = 0; //number of bits to allocate
var k = 0; //number of hash functions
var file_out_bloom_array = "_out_bloom_array";
var file_out_bloom = "_out_bloom"; 
var file_out_bloom_pos = "_out_bloom_pos";

function checkCompressed(val){
var _x = '';
  if (val.indexOf(".zip") > -1) {
    _x = val.substring(0, val.indexOf(".zip"));
    execSync.run('gunzip -c ' + val + ' > ' + _x);
  } else if (val.indexOf(".tar") > -1) {
    _x = val.indexOf(".tar");
    execSync.run('tar -xf ' + val);
  } else if (val.indexOf(".gz") > -1) {
    _x = val.substring(0, val.indexOf(".gz"));
    execSync.run('gzip -d -f ' + val + ' > ' + _x);
  }
return _x;
}

function transform(file){
  var _s = execSync.exec("rapper -g -o ntriples " + file + " | cut -f1 -d '>' | sort -u | sed 's/<//' > " + file + sufx);
  return(_s.stdout.substring(_s.stdout.indexOf("returned") + 9,_s.stdout.indexOf(" triples")));
}
 
exec(console.log("starting the process"), function(err, stdout, stderr){
  exec(x1=checkCompressed(file1),x2=checkCompressed(file2), function(err, stdout, stderr){
    (x2 === ''?'':file2=x2);(x1 === ''?'':file1=x1);
    exec(s1=transform(file1),s2=transform(file2), function(err, stdout, stderr){
        (s1>s2?(n=s1):(n=s2));
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
	var text = fs.readFileSync((s1>s2?(file1 + sufx):(file2 + sufx)), "utf8");
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
	console.log('file 1: ' + file1);
	console.log('    time do process       : ' );
	console.log('    number of triples     : ' + s1);
	console.log('file2 -> number of triples: ' + file2 + ' -> ' + s1 + ' triples.');
	console.log("*******************************************************************************");
	console.log('max expected fp rate		        : ' + p * 100 + '%');
	console.log('total of bits to allocate               : ' + m);
	console.log('total of hash functions                 : ' + k);
	console.log('~number of itens to store in BlommFilter: ' + n);
	console.log("number of triples file 01           : " + totfile1 + " [" + file1 + "]");
	console.log("number of triples file 02           : " + totfile2 + " [" + file2 + "]");
	console.log("tot records file 02 (distinct)   	: " + totfile2_dist + " [" + file2 + "]");
	console.log("~tot links between 1 and 2        	: " + totbloompos); //  
	console.log("BloomFilter's Link Execution time       : %ds %dms", diff[0], diff[1]/1000000); //
	diff = process.hrtime(timezero);
	console.log("Total Execution time (hr)               : %ds %dms", diff[0], diff[1]/1000000); //
	console.log("*******************************************************************************");


       console.log('end');
    });
  });
});




