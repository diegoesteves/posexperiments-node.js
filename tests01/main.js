//https://www.npmjs.org/package/retext-pos

var Retext = require('retext');
var visit = require('retext-visit');
var inspect = require('retext-inspect');
var pos = require('retext-pos');

//text category domain detection
//OliA

var retext = new Retext()
    .use(visit)
    .use(inspect)
    .use(pos);

retext.parse('I went to the store, to buy 5.2 gallons of milk.',
    function (err, tree) {
        tree.visit(tree.WORD_NODE, function (node) {
            console.log(node);
        });
    }
);
