/* */ 
"use strict";
var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];
var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];
exports.__esModule = true;
exports.findParent = findParent;
exports.find = find;
exports.getFunctionParent = getFunctionParent;
exports.getStatementParent = getStatementParent;
exports.getEarliestCommonAncestorFrom = getEarliestCommonAncestorFrom;
exports.getDeepestCommonAncestorFrom = getDeepestCommonAncestorFrom;
exports.getAncestry = getAncestry;
exports.inType = inType;
exports.inShadow = inShadow;
var _babelTypes = require("babel-types");
var t = _interopRequireWildcard(_babelTypes);
var _index = require("./index");
var _index2 = _interopRequireDefault(_index);
function findParent(callback) {
  var path = this;
  while (path = path.parentPath) {
    if (callback(path))
      return path;
  }
  return null;
}
function find(callback) {
  var path = this;
  do {
    if (callback(path))
      return path;
  } while (path = path.parentPath);
  return null;
}
function getFunctionParent() {
  return this.findParent(function(path) {
    return path.isFunction() || path.isProgram();
  });
}
function getStatementParent() {
  var path = this;
  do {
    if (Array.isArray(path.container)) {
      return path;
    }
  } while (path = path.parentPath);
}
function getEarliestCommonAncestorFrom(paths) {
  return this.getDeepestCommonAncestorFrom(paths, function(deepest, i, ancestries) {
    var earliest = undefined;
    var keys = t.VISITOR_KEYS[deepest.type];
    var _arr = ancestries;
    for (var _i = 0; _i < _arr.length; _i++) {
      var ancestry = _arr[_i];
      var path = ancestry[i + 1];
      if (!earliest) {
        earliest = path;
        continue;
      }
      if (path.listKey && earliest.listKey === path.listKey) {
        if (path.key < earliest.key) {
          earliest = path;
          continue;
        }
      }
      var earliestKeyIndex = keys.indexOf(earliest.parentKey);
      var currentKeyIndex = keys.indexOf(path.parentKey);
      if (earliestKeyIndex > currentKeyIndex) {
        earliest = path;
      }
    }
    return earliest;
  });
}
function getDeepestCommonAncestorFrom(paths, filter) {
  var _this = this;
  if (!paths.length) {
    return this;
  }
  if (paths.length === 1) {
    return paths[0];
  }
  var minDepth = Infinity;
  var lastCommonIndex = undefined,
      lastCommon = undefined;
  var ancestries = paths.map(function(path) {
    var ancestry = [];
    do {
      ancestry.unshift(path);
    } while ((path = path.parentPath) && path !== _this);
    if (ancestry.length < minDepth) {
      minDepth = ancestry.length;
    }
    return ancestry;
  });
  var first = ancestries[0];
  depthLoop: for (var i = 0; i < minDepth; i++) {
    var shouldMatch = first[i];
    var _arr2 = ancestries;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var ancestry = _arr2[_i2];
      if (ancestry[i] !== shouldMatch) {
        break depthLoop;
      }
    }
    lastCommonIndex = i;
    lastCommon = shouldMatch;
  }
  if (lastCommon) {
    if (filter) {
      return filter(lastCommon, lastCommonIndex, ancestries);
    } else {
      return lastCommon;
    }
  } else {
    throw new Error("Couldn't find intersection");
  }
}
function getAncestry() {
  var path = this;
  var paths = [];
  do {
    paths.push(path);
  } while (path = path.parentPath);
  return paths;
}
function inType() {
  var path = this;
  while (path) {
    var _arr3 = arguments;
    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var type = _arr3[_i3];
      if (path.node.type === type)
        return true;
    }
    path = path.parentPath;
  }
  return false;
}
function inShadow(key) {
  var parentFn = this.isFunction() ? this : this.findParent(function(p) {
    return p.isFunction();
  });
  if (!parentFn)
    return ;
  if (parentFn.isFunctionExpression() || parentFn.isFunctionDeclaration()) {
    var shadow = parentFn.node.shadow;
    if (shadow && (!key || shadow[key] !== false)) {
      return parentFn;
    }
  } else if (parentFn.isArrowFunctionExpression()) {
    return parentFn;
  }
  return null;
}
