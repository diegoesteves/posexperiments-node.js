/*
ASSYNCRONOUS
var fs = require("fs");
console.log("Starting to write");
fs.writeFile("Readme.txt","Adding to the file", function(error,data) {
console.log("Writing in file completed");
});
console.log('fim escrita assincrona');
*/

/*
SYNCROUNOUS
var fs = require("fs");
console.log("starting");
var data = fs.writeFileSync("Readme.txt","Added a new data");
console.log("Finished");
console.log('fim escrita sincrona');
*/


var fs = require('fs');
var options = { encoding: 'utf8' };
var wstream = fs.createWriteStream('myOutput.txt', options);
// Node.js 0.10+ emits finish when complete
wstream.on('finish', function () {
  console.log('file has been written');
});
wstream.write('Hello world!\n');
wstream.write('Another line');
for (i=0;i<10000;i++) {wstream.write('i=!\n' + i); console.log('teste ' + i);}
wstream.end();

