
//nice BUT i can not read and update line per line

var fs = require('fs');
var ss = require('smart-stream');


var timezero = process.hrtime(); 	

function xIndexOf(Val, Str, x)  
{  
	if (x <= (Str.split(Val).length - 1)) {  

		Ot = Str.indexOf(Val);  
		if (x > 1) { for (var i = 1; i < x; i++) { var Ot = Str.indexOf(Val, Ot + 1) } }  
		return Ot;  
	} else { console.log(Val + " Occurs less than " + x + " times"); return 0 }  
}  

//open some file streams
var readStream = fs.createReadStream('./dewiki-20140114-article-categories.ttl', { encoding: 'utf8' });
var writeStream = fs.createWriteStream('./out.ttl');

var start = 0;
var end = 0;

//create your own stream middleware
var subjects = new ss.SmartStream('subjects'); // bi-directional stream
subjects.setMiddleware(function(data, cb) {

	//start = data.Str.indexOf('>');
	//end = data.xIndexOf('<', data, 3);
	/*
	var ar = ['diego','joao','maria','bianca'];
	console.log(ar.toString());
	var ii = ar.indexOf(2);
	ar.splice(ii-1,1);
	console.log(ar.toString());
	console.log(ar.length);





	data = data.split('>');
	console.log(data.toString());
	for (var z = 0; z < data.length; z++) {
		console.log(z + ': ' + data[z].toString());
	}
	data.splice(1,1);
	console.log(data.length);
	for (var z = 0; z < data.length; z++) {
		console.log(z + ': ' + data[z].toString());
	}

	 */

	//console.log(data.toString());
	//console.log(data.length);

	data = data.split('>');

	//for (var z = 0; z < data.length; z++) {
	//	console.log(z + ': ' + data[z].toString());
	//}


	//console.log('------ ' + data[3].toString());

	//console.log('total de itens: ' + data.length);
	//console.log('*************************************************************');

	var ctr = 2;
	var del = 0;
	var max = data.length;
	for (var z = 0; z < max; z++) {
		//console.log('****************************************************************');
		//console.log('iteracao ' + z);
		//console.log('   ctr     ' + ctr);
		//console.log('   del     ' + del);


		//console.log('ANTES: ');
		//console.log('z = ' + z);
		//console.log('x = ' + x);
		//console.log('c = ' + c);
		//for (var z = 0; z < data.length; z++) {
		//	console.log(z + ': ' + data[z].toString());
		//}

		if (ctr==2){
			ctr=0;
			del++;
		} else {
			//console.log('excluindo item ' + del + ' = ' + data[del].toString());
			data.splice(del, 1);
			ctr++;
		}
		//console.log('DEPOIS: ');
		//for (var z = 0; z < data.length; z++) {
		//	console.log(z + ': ' + data[z].toString());
		//}




	}



	//console.log('************************* FIM ***************************');


	//console.log(data.length);
	//for (var z = 0; z < data.length; z++) {
	//	console.log(z + ': ' + data[z].toString());
	//}
	//console.log('*************************************************************');






	//console.log(data);

	//for (var z = 0; z < data.length; z++) {


	//data.substring(start, end) = '';

	//icontrol = data.Str.indexOf('<', icurrent);
	//icurrent = icontrol;
	//}	
	//console.log(typeof(data));
	var out = '';//data.split('> .');
	//out.forEach(function(entry) {

	//if (entry.trim()!='') {console.log('a' + entry + 'a');}

	//console.log(entry.substring(xIndexOf('<', entry, 3) + 1,entry.length));
	//var x = entry.substring(xIndexOf('<', entry, 3) + 1,entry.length);

	//entry = x;
	//console.log(entry);
	//});

	//console.log(xIndexOf('<', data, 3) + 1);
	//console.log(data.length);

	//var result = data.substring(xIndexOf('<', data, 3) + 1,data.length); 
	//console.log(result);
	cb(null, data.toString());

	// NOTE: set result to undefined to prevent it from moving downstream



});

//lay some pipe, Tex!
readStream
.pipe(subjects)
.pipe(writeStream);

console.log("done");
var diff = process.hrtime(timezero); 
console.log("Execution time       : %ds %dms", diff[0], diff[1]/1000000); //


