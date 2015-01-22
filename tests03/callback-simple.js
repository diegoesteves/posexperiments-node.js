function funcao1(a,b, callback) {	
console.log('f1');
  var x = a+b;
  if (typeof(callback) === "function") {
    callback(x);
  } 
}


function funcao2(a){
console.log('f2');
	var y = (a+17);
   setTimeout(function() { funcao3(y); }, 3000);
};


function funcao3(r){
console.log('f3');
  console.log("resultadegdgfdgfdgdgdgfdo: " + r);
}


funcao1(5,5, funcao2);





function doSomethingElse(p, callback) {
  console.log('doSomethingElse');
  var z = p * 2;
  callback(z);
};


