/**
 * New node file
 * http://www.sebastianseilund.com/nodejs-async-in-practice
 */

var smartrun = require('./smartstream2');
var async = require('async');

var p1;

async.series([
        //Load user to get userId first
        function(callback) {
        	smartrun.teste({p1: p1}, function(err, users) {
        		console.log('done 0!');
              
                //callback();
            });
        },
        //Load posts (won't be called before task 1's "task callback" has been called)
        function(callback) {
        	smartrun.teste2({p1: p1}, function(err, posts) {
              
                console.log('done 2!');
                callback();
            });
        }
    ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        //Here locals will be populated with 'user' and 'posts'
        console.log('xxxx');
    });