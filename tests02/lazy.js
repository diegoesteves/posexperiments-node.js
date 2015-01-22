fs = require('fs');
Lazy = require('lazy');
var N3 = require('n3');

function xIndexOf(Val, Str, x)  
{  
  if (x <= (Str.split(Val).length - 1)) {  
	  
    Ot = Str.indexOf(Val);  
    if (x > 1) { for (var i = 1; i < x; i++) { var Ot = Str.indexOf(Val, Ot + 1) } }  
    return Ot;  
  } else { console.log(Val + " Occurs less than " + x + " times"); return 0 }  
}  

var timezero = process.hrtime(); 	

new Lazy(fs.createReadStream('dewiki-20140114-article-categories.ttl')).lines.forEach(
      function(line){
    	  //console.log(line.toString());

    	 var r = line.toString().substring(xIndexOf('<', line.toString(), 3) + 1,line.toString().length -3);  
//console.log(r);
    	 //Execution time       : 41s 289.720729ms
    	 
      }
      
          

    ).on('pipe', function() {
      console.log("done");
      var diff = process.hrtime(timezero); 
      console.log("Execution time       : %ds %dms", diff[0], diff[1]/1000000); //
    });
//Execution time       : 18s 813.416216ms