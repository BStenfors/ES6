/* */ 
(function(process) {
  "use strict";
  var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];
  exports.__esModule = true;
  var _module2 = require("module");
  var _module3 = _interopRequireDefault(_module2);
  var _path = require("path");
  var _path2 = _interopRequireDefault(_path);
  var relativeModules = {};
  exports["default"] = function(loc) {
    var relative = arguments.length <= 1 || arguments[1] === undefined ? process.cwd() : arguments[1];
    if (typeof _module3["default"] === "object")
      return null;
    var relativeMod = relativeModules[relative];
    if (!relativeMod) {
      relativeMod = new _module3["default"]();
      var filename = _path2["default"].join(relative, ".babelrc");
      relativeMod.id = filename;
      relativeMod.filename = filename;
      relativeMod.paths = _module3["default"]._nodeModulePaths(relative);
      relativeModules[relative] = relativeMod;
    }
    try {
      return _module3["default"]._resolveFilename(loc, relativeMod);
    } catch (err) {
      return null;
    }
  };
  module.exports = exports["default"];
})(require("process"));
