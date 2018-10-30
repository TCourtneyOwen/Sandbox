export function add(first, second){
    return first + second + 1000;
  }
  
export function increment(incrementBy, callback) {
    var result = 1000;
    var timer = setInterval(function() {
      result += incrementBy;
      callback.setResult(result);
    }, 1000);
  
    callback.onCanceled = function() {
      clearInterval(timer);
    };
  }
  