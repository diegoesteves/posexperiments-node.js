var N3 = require('n3');
var fs = require('fs');

var parser = N3.Parser();


//buffered way to save bloomfilter files.
turtleStream = fs.createReadStream('dewiki-20140114-article-categories-short.ttl'); //
parser.parse(turtleStream, function (error, triple, prefixes) {
               if (triple) {
                 console.log('subject: ' + triple.subject);
		 console.log('predicate: ' + triple.predicate);
		 console.log('object: ' + triple.object);
		 console.log('.');}
               else
                 console.log("# That's all, folks!", prefixes)
             });



//parser.parse(turtleStream, console.log);


function write(sujeito){
  console.log('sujeito: ' + sujeito);
}




/*


parser.parse('dewiki-20140114-article-categories-short.ttl',
             function (error, triple, prefixes) {
               if (triple) {
                 console.log('subject: ' + triple.subject);
		 console.log('predicate: ' + triple.predicate);
		 console.log('object: ' + triple.object);
		 console.log('.');}
               else
                 console.log("# That's all, folks!", prefixes)
             });



*/
