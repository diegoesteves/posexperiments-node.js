/**
 * New node file
 */
//https://github.com/caolan/async#seriestasks-callback
var async = require('async');


var smartrun = require('./smartstream2');

//var r = smartrun.run();
//console.log(r);

console.log('start');

async.series([
              function(callback){smartrun.teste(function(){
            		  callback(null, 'one');  
            	     });
                  
              },
              function(callback){
                  // do some more stuff ...
            	  console.log('bb');
                  callback(null, 'two');
              }
          ],
          // optional callback
          function(err, results){
              // results is now equal to ['one', 'two']
          });

/*

async.series([  
              function(callback) {
            	  smartrun.run('', function(err) {
                    callback(err);
                });
              },
              function(callback) {
            	  smartrun.teste('diego', function(err, value) {
                    callback(err, value);
                });
              },
              function(callback){
            	 console.log('acabou', function(err, value){
            		 callback(err,value);
            	 });
              }
            ],
            function(err, results) {  
                // results = [ undefined, undefined, undefined, 'value1', 'value2', 'value3' ]
                var str = '';

                results.forEach(function(result) {
                    if (result) {
                        str += result + ' - ';
                    }
                });

                console.log(str);
                console.log('fim');
            });


*/