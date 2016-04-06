/* */ 
var conversions = require("./conversions");
var route = require("./route");
var convert = {};
var models = Object.keys(conversions);
function wrapRaw(fn) {
  var wrappedFn = function(args) {
    if (args === undefined || args === null) {
      return args;
    }
    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments);
    }
    return fn(args);
  };
  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
function wrapRounded(fn) {
  var wrappedFn = function(args) {
    if (args === undefined || args === null) {
      return args;
    }
    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments);
    }
    var result = fn(args);
    if (typeof result === 'object') {
      for (var len = result.length,
          i = 0; i < len; i++) {
        result[i] = Math.round(result[i]);
      }
    }
    return result;
  };
  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
models.forEach(function(fromModel) {
  convert[fromModel] = {};
  var routes = route(fromModel);
  var routeModels = Object.keys(routes);
  routeModels.forEach(function(toModel) {
    var fn = routes[toModel];
    convert[fromModel][toModel] = wrapRounded(fn);
    convert[fromModel][toModel].raw = wrapRaw(fn);
  });
});
module.exports = convert;
