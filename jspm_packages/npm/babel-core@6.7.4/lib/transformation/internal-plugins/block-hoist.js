/* */ 
"use strict";
var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];
exports.__esModule = true;
var _plugin = require("../plugin");
var _plugin2 = _interopRequireDefault(_plugin);
var _lodashCollectionSortBy = require("lodash/collection/sortBy");
var _lodashCollectionSortBy2 = _interopRequireDefault(_lodashCollectionSortBy);
exports["default"] = new _plugin2["default"]({visitor: {Block: {exit: function exit(_ref) {
        var node = _ref.node;
        var hasChange = false;
        for (var i = 0; i < node.body.length; i++) {
          var bodyNode = node.body[i];
          if (bodyNode && bodyNode._blockHoist != null) {
            hasChange = true;
            break;
          }
        }
        if (!hasChange)
          return ;
        node.body = _lodashCollectionSortBy2["default"](node.body, function(bodyNode) {
          var priority = bodyNode && bodyNode._blockHoist;
          if (priority == null)
            priority = 1;
          if (priority === true)
            priority = 2;
          return -1 * priority;
        });
      }}}});
module.exports = exports["default"];
