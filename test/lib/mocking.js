function mocking(func, method) {
  var start = func.indexOf('function '+method);
  var closure = 1;
  var chk_private;
  var res = '';
  start = func.indexOf('{',start);
  for(var i=start+1; i<func.length; i++){
    if (func[i] === '{') {
      ++closure;
    } else if (func[i] === '}') {
      --closure;
      if (!closure) {
        return res;
      }
    } else if (func[i] === '_') {
      if (func[i] === func[i+1]) {
        chk_private = true;
      }
    }
    
    if(!chk_private) {
      res += func[i];
    }

    if (func[i] === ';') {
      if (chk_private) {
        chk_private = false;
      }
    }
  }
}