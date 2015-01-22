var exec = require('child_process').exec;
var files = [];
var triples = 0;

function fullParallel(callbacks, last) {
  var results = [];
  var result_count = 0;
  callbacks.forEach(function(callback, index) {
    callback( function() {
      results[index] = Array.prototype.slice.call(arguments);
      result_count++;
      if(result_count == callbacks.length) {
        last(results);
      }
    });
  });
}

//paralelel execution
function extractFiles(out){
console.log('a');
  var args = process.argv.slice(2);
  args.forEach(function(val, index, array) {
  files.push(val); 
    if (out<args.length+1){
      exec(extract(val), function(err, stdout, stderr){extractFiles(out=+1)});
    } else {
      callback();
    }
  });
}
  
    
    
  }); 
console.log('w');
}

function extract(val){
  if (val.indexOf(".zip") > -1) {exec('gunzip -c ' + val + ' > ' + val.substring(0, val.indexOf(".zip")));} 
  else if (val.indexOf(".tar") > -1) {exec('tar -xf ' + val);} 
  else if (val.indexOf(".gz") > -1) {exec('gzip -d -f ' + val + ' > ' + val.substring(0, val.indexOf(".gz")));}
}


function processingFiles(callback){
console.log('b'); 
  exec(extractFiles(), function(){callback();});
  
}


function printLog(callback){
  console.log('fim');
}

function final(results) { console.log('Done', results); console.log('tam:' + triples) }


fullParallel([
  function(next) { processingFiles(next); },
  function(next) { printLog(next); }
], final);

/*

*/


