/* */ 
"use strict";
var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];
var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];
exports.__esModule = true;
var _plugin = require("../plugin");
var _plugin2 = _interopRequireDefault(_plugin);
var _babelTypes = require("babel-types");
var t = _interopRequireWildcard(_babelTypes);
exports["default"] = new _plugin2["default"]({visitor: {
    ThisExpression: function ThisExpression(path) {
      remap(path, "this", function() {
        return t.thisExpression();
      });
    },
    ReferencedIdentifier: function ReferencedIdentifier(path) {
      if (path.node.name === "arguments") {
        remap(path, "arguments", function() {
          return t.identifier("arguments");
        });
      }
    }
  }});
function shouldShadow(path, shadowPath) {
  if (path.is("_forceShadow")) {
    return true;
  } else {
    return shadowPath;
  }
}
function remap(path, key, create) {
  var shadowPath = path.inShadow(key);
  if (!shouldShadow(path, shadowPath))
    return ;
  var shadowFunction = path.node._shadowedFunctionLiteral;
  var currentFunction = undefined;
  var passedShadowFunction = false;
  var fnPath = path.findParent(function(path) {
    if (path.isProgram() || path.isFunction()) {
      currentFunction = currentFunction || path;
    }
    if (path.isProgram()) {
      passedShadowFunction = true;
      return true;
    } else if (path.isFunction() && !path.isArrowFunctionExpression()) {
      if (shadowFunction) {
        if (path === shadowFunction || path.node === shadowFunction.node)
          return true;
      } else {
        if (!path.is("shadow"))
          return true;
      }
      passedShadowFunction = true;
      return false;
    }
    return false;
  });
  if (shadowFunction && fnPath.isProgram() && !shadowFunction.isProgram()) {
    fnPath = path.findParent(function(p) {
      return p.isProgram() || p.isFunction();
    });
  }
  if (fnPath === currentFunction)
    return ;
  if (!passedShadowFunction)
    return ;
  var cached = fnPath.getData(key);
  if (cached)
    return path.replaceWith(cached);
  var init = create();
  var id = path.scope.generateUidIdentifier(key);
  fnPath.setData(key, id);
  fnPath.scope.push({
    id: id,
    init: init
  });
  return path.replaceWith(id);
}
module.exports = exports["default"];
