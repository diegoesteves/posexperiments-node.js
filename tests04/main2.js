var execSync = require("exec-sync");

execSync("comm -1 -2  news.objects subjects.dbpedia  | wc -l");
