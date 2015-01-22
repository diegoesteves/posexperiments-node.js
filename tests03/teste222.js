var exec = require('child_process').exec;

step1(5);
 
function step1 (p) {
  console.log('a');
  x=10*p;
  setTimeout(function() { onStep1Ready(x); }, 2000);
  console.log('b');
}
 
function onStep1Ready (x) {
  console.log('c'); 
  console.log(x);
  step2(x+5);
  console.log('d');
}
 
function step2(x) {
  console.log('e');
  exec('echo kkk', onStep2Ready);
  console.log('f');
}
 
function onStep2Ready () {
  console.log('cuf');
  finish();
  console.log('g');
}
 
//... and so on
 
function finish () {
  // display results
   console.log('done');
}

//problema do execSync (nao da pra pegar o retorno) - npm install exec-sync
