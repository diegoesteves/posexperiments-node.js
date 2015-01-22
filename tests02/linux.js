//var cmd = "rapper -g dewiki-20140114-article-categories.ttl | cut -f1 -d '>' | sort -u | sed 's/<//' > subjects.dbpedia"
var cmd = "rapper -g dewiki-20140114-article-categories.ttl | cut -f1 -d '>' | sed 's/<//' > subjects.dbpedia"
var timezero = process.hrtime();
var execSync = require("execSync");
var _s = execSync.exec(cmd);
console.log(_s.stdout);
var diff = process.hrtime(timezero); 
console.log("Execution time       : %ds %dms", diff[0], diff[1]/1000000); //
