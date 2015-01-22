
// downloading
var exec = require('child_process').exec;

var f1IsOutdated = checkDownload(f1);
var f2IsOutdated = checkDownload(f2);



//if (f2IsOutdated) {
//  exec('wget ' + f2, function(err, stdout, stderr) {}); 
//  if (err !== null) {console.log('exec error: ' + error);} else {console.log('download finished: ' + f2);};
//};

var auxf1zip = f1.substring(f1.length - 41,f1.length);
var auxf1 = f1.substring(f1.length - 41,f1.length -3);
var auxf2 = f2.substring(f2.length - 12,f2.length);


console.log('auxiliar1 zip: ' + auxf1zip);
console.log('auxiliar1: ' + auxf1);
console.log('auxiliar2: ' + auxf2);


if (f1IsOutdated) {
  exec('wget ' + f1, function(err, stdout, stderr) {
   if (err !== null) {
     console.log('exec error: ' + error);
   } 
   else {
     console.log('download finished: ' + f1);
   }
  });
};
  
exec('gzip -d  ' + auxf1zip, function(err3, stdout3, stderr3) {
  //exec("rapper -g " + auxf1 + " | cut -f1 -d '>' | sort -u | sed 's/<//' > subjects.dbpedia", function(err4, stdout4, stderr4) {
    //exec("rapper -g " + auxf2 + " | grep -v '\"'  | cut -f3 -d '>' | sed 's/ <//' | sort -u > news.objects", function(err5, stdout5, stderr5) {
      exec("comm -1 -2  news.objects subjects.dbpedia  | wc -l", function(err6, stdout6, stderr6) {  
         var diff = process.hrtime(time);
	 console.log("tot links: " + stdout6);
         console.log("Execution time (hr): %ds %dms", diff[0], diff[1]/1000000);
      });
    //});
  //});
});





