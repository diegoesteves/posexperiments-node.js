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

console.log("done!");

