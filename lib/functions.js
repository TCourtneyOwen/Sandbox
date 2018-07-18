function add(first, second) {
    return first + second;
}
function addAsync(first, second) {
    return Promise.resolve(add(first, second));
}
function increment(incrementBy, callback) {
    var result = 0;
    var timer = setInterval(function () {
        result += incrementBy;
        callback.setResult(result);
    }, 1000);
    callback.onCanceled = function () {
        clearInterval(timer);
    };
}
CustomFunctionMappings.add = add;
CustomFunctionMappings.addAsync = addAsync;
CustomFunctionMappings.INCREMENT = increment;
//# sourceMappingURL=functions.js.map