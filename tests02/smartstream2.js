/**
 * New node file
 * https://github.com/thesmart/node-SmartStream
 * 
 */

var exec = require('child_process').exec;
var fs = require('fs');
var ss = require('smart-stream');
var timezero = process.hrtime(); 	
var readStream = fs.createReadStream('./dewiki-20140114-article-categories-short.ttl', { encoding: 'utf8' });
var writeStream = fs.createWriteStream('./outBIG.ttl');
var subjects = new ss.SmartStream('subjects'); // bi-directional stream

exports.run = function(p, callback){
		subjects.setMiddleware(function(data, cb) {
			/*
			
			*/
		cb(null, data.toString());
		//callback();
		
	});
	readStream.pipe(subjects)
	readStream.pipe(writeStream);
	
	subjects.on('end', function(){
		console.log(p);
		console.log('arquivo gerado com sucesso');
		callback();
	})
	
	subjects.on('data', function(object){
		 data = object.split('>');
			var ctr = 2;
			var del = 0;
			var max = data.length;
			for (var z = 0; z < max; z++) {
				 if (ctr==2){
				    	ctr=0;
				    	del++;
				    } else {
						data.splice(del, 1);
				    	ctr++;
				    }
			}
	})
	
	subjects.on('close', function(){
		console.log('close');
	})
	

}





exports.teste = function teste(p1){
	 setTimeout(function(){
		 //console.log('aaaaaaaaaaaa');
		// return 'ssss';
     }, 1000);
	
};
exports.teste2 = function teste2(p, callback){
	 setTimeout(function(){
		 console.log(p);
		 callback();
    }, 3000);
	
};


/*
exec(doIt(), function(err, stdout, stderr){
	console.log("done");
	var diff = process.hrtime(timezero); 
	console.log("Execution time       : %ds %dms", diff[0], diff[1]/1000000); //
});

*/