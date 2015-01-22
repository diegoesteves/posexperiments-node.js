var N3 = require('n3');
var fs = require('fs');
var fs2 = require('fs');
var options = { encoding: 'utf8' };
var parser = N3.Parser();
var triplas = 0;
var timezero = process.hrtime();

var wstream = fs.createWriteStream('myOutput55.txt', options);

/*
1) read dewiki-20140114-article-categories.ttl by stream with IF clause and logging 2 times triples.subjects.substrings
file has been written! triplas: 6173488
Execution time       : 240s 117.630054ms

2) read dewiki-20140114-article-categories.ttl by stream with IF clause
file has been written! triplas: 6173488
Execution time       : 36s 368.861181ms

3) read dewiki-20140114-article-categories.ttl by stream with IF clause and writting a file
--very time consuming...

4) read dewiki-20140114-article-categories.ttl by stream with IF clause and saving the object in memory (array)
--out of memory

5) read dewiki-20140114-article-categories.ttl and using rapper to create a file on disk with bloomfilter values


*/

var obj=[];

arq = fs.open('myOutput4444.txt','w');
console.log('starting the process');
//this functions takes too much time to run with big files: e.g.:dewiki-20140114-article-categories.ttl
turtleStream = fs.createReadStream('dewiki-20140114-article-categories-medium.ttl'); //
parser.parse(turtleStream, function (error, triple, prefixes) {
               if (triple) {
                 //console.log('1: ' + triple.subject.substring(0,1));
		 //console.log('ult: ' + triple.subject.substring(triple.subject.length - 1,triple.subject.length));
                 if ((triple.subject.substring(0,1)=="<") && (triple.subject.substring(triple.subject.length - 1,triple.subject.length) == ">")){
			//		   

		 }
 		 //obj.push(triple.subject);
		 wstream.write(triple.object + '\n');
		 //arq.writeFile("myOutput444.txt", triple.object + '\n');
                 triplas+=1;}
               else {
                console.log("# That's all, folks!", prefixes);
	 	fim(timezero);
		wstream.end();
		 }
             });

wstream.on('finish', function () {
  console.log('file has been written');
});


/*
//this functions takes too much time to run with big files: e.g.:dewiki-20140114-article-categories.ttl
turtleStream = fs.createReadStream('dewiki-20140114-article-categories.ttl'); //
parser.parse(turtleStream, function (error, triple, prefixes) {
               if (triple) {
                 //console.log('subject: ' + triple.subject);
		 //console.log('predicate: ' + triple.predicate);
		 //console.log('object: ' + triple.object);
		 //console.log('.');
		 wstream.write(triple.object + '\n');
		 triplas+=1;}
               else {
                 console.log("# That's all, folks!", prefixes);
		 wstream.end();}
             });


wstream.on('finish', function () {
 fim();
});


*/

function fim(time){
var diff = process.hrtime(time); 
  console.log('file has been written! triplas: ' + triplas);
console.log("Execution time       : %ds %dms", diff[0], diff[1]/1000000); //
}


