Array.prototype.unique = function()
{
    var tmp = {}, out = [];
    for(var i = 0, n = this.length; i < n; ++i)
    {
        if(!tmp[this[i]]) { tmp[this[i]] = true; out.push(this[i]); }
    }
    return out;
}

var a = [1,2,2,7,4,1,'a',0,6,9,'a'];
var b = a.unique();
console.log(a);
console.log(b);
