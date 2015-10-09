var DONT_ENUM = "propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor".split(","),
    hasOwn = ({}).hasOwnProperty;
for (var i in {
    toString: 1
}) {
    DONT_ENUM = false;
}


Object.keys = Object.keys || function(obj) { //ecma262v5 15.2.3.14
    var result = [];
    for (var key in obj)
        if (hasOwn.call(obj, key)) {
            result.push(key);
        }
    if (DONT_ENUM && obj) {
        for (var i = 0; key = DONT_ENUM[i++];) {
            if (hasOwn.call(obj, key)) {
                result.push(key);
            }
        }
    }
    return result;
};

if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
