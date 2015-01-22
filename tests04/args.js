//get parameters
process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
  if (index==2) {fileName=val;}
});

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
console.log("downloading file 1");
exec("wget https://raw.githubusercontent.com/AKSW/n3-collection/master/News-100.ttl", puts);
console.log("downloading file 2");
exec("wget http://de.dbpedia.org/downloads/20140114/dewiki-20140114-article-categories.ttl.gz", puts);
console.log("extracting file 2");
exec("gzip -d dewiki-20140114-article-categories.ttl.gz");
console.log("loading objects file 1");
exec("rapper -g dewiki-20140114-article-categories.ttl | cut -f1 -d '>' | sort -u | sed 's/<//' > subjects.dbpedia");
console.log("loading objects file 2");
exec("rapper -g News-100.ttl | grep -v '\"'  | cut -f3 -d '>' | sed 's/ <//' | sort -u > news.objects"); 
console.log("counting files between file 1 and file 2");
exec("comm -1 -2  news.objects subjects.dbpedia  | wc -l ");

//used memory
var util = require('util');
console.log(util.inspect(process.memoryUsage()));

//read a file
var fs = require('fs');
var text = fs.readFileSync(fileName, "utf8");
text.split(/\r?\n/).forEach(function (line) {
  console.log(line);
  var EOL = line.indexOf("\r\n") >= 0 ? "\r\n" : "\n"; // Read an existing file into a string, 			search for a line break, assume the line break is "\n" if you can’t find one
  //console.log("EOL?: " + EOL);
});

//plataform
console.log("plataforma: " + process.platform); // var EOL = (process.platform === 'win32' ? '\r\n' : '\n')

//write to a new file
var str="escrever isso no arquivo";
var out="out.txt"
fs.writeFileSync(out, str, 'utf8');

//write incrementally
var str2="escrever isso no arquivo2";
var fileName2="out2.txt"
var out2 = fs.createWriteStream(fileName2, { encoding: "utf8" });
out2.write(str2);
out2.end(); // currently the same as destroy() and destroySoon()

