var execSync = require("exec-sync");
var deb = false;

console.log(execSync("echoA", deb));
console.log(execSync("comm -1 -2  news.objects subjects.dbpedia  | wc -l", deb));
console.log(execSync("echo B", deb));
if (1==2) {
  console.log(execSync("echo C", deb));
} else 
{
  console.log(execSync("comm -1 -2  news.objects subjects.dbpedia  | wc -l", deb));
  console.log(execSync("echo D", deb));
  if (1==1) {
    console.log(execSync("echo E", deb));
  }
}

if (1==1) {
  console.log(execSync("comm -1 -2  news.objects subjects.dbpedia  | wc -l", deb));
  console.log(execSync("echo F", deb));
}
