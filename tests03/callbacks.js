// prints text and waits one second
function doSomethingAsync(callback, arg) {
console.log('funcao doSomethingAsync recebendo: ' + arg);   
    //setTimeout(function() { callback(); }, 1000);
	callback(19);
}
 
// prints text and waits half a second
function doSomethingElseAsync(callback, arg) {
console.log('funcao doSomethingElseAsync recebendo: ' + arg);   
    //setTimeout(function() { callback(); }, 500);
callback(21); 
}
 
// prints text and waits two seconds
function moreAsync(callback, arg) {
console.log('funcao moreAsync recebendo: ' + arg); 
    setTimeout(function() { callback(); }, 3000);
console.log('terminei!: ' + arg);
callback(44);
}
 
// prints text and waits a second and a half
function evenMoreAsync(callback, arg) {
console.log('funcao evenMoreAsync recebendo: ' + arg); 
    //setTimeout(function() { callback(); }, 1500);
callback(56);
}
 
// prints text
function finish(callback, arg) { console.log('funcao finish recebendo: ' + arg); }

function series() {
    var callbackSeries = [doSomethingAsync, doSomethingElseAsync, moreAsync, evenMoreAsync];
 
    function next(arg) {
        var callback = callbackSeries.shift();
        if (callback) {
            callback(next, arg);
        }
        else {
            finish(null,100);
        }
    }
    next(1);
};

// execute callbacks in parallel
function parallel() {
    var callbacksParallel = [doSomethingAsync, doSomethingElseAsync,
                             moreAsync, evenMoreAsync];
    var executionCounter = 0;
    callbacksParallel.forEach(function(callback, index) {
        callback(function() {
            executionCounter++;
            if(executionCounter == callbacksParallel.length) {
                finish();
            }
        });
    });
}


function parallel2(callbacks, last) {
    var results = [];
    function next() {
        var callback = callbacks.shift();
        if(callback) {
            callback(function() {
                results.push(Array.prototype.slice.call(arguments));
                next();
            });
        } else {
            last(results);
        }
    }
    finish();
}

function series2(callbacks, last) {
    var results = [];
    var result_count = 0;
    callbacks.forEach(function(callback, index) {
        callback(function() {
            results[index] = Array.prototype.slice.call(arguments);
		console.log('::::' + arguments);
		console.log('*****' + results[index]);
            result_count++;
            if(result_count == callbacks.length) {
                last(results);
            }
        });
    });
}


// run the example
//parallel();
// run the example
series();

//series2([doSomethingAsync, doSomethingElseAsync, moreAsync, evenMoreAsync], finish);


