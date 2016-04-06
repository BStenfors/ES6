/* */ 
"use strict";
var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];
var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];
exports.__esModule = true;
exports.replaceWithMultiple = replaceWithMultiple;
exports.replaceWithSourceString = replaceWithSourceString;
exports.replaceWith = replaceWith;
exports._replaceWith = _replaceWith;
exports.replaceExpressionWithStatements = replaceExpressionWithStatements;
exports.replaceInline = replaceInline;
var _babelCodeFrame = require("babel-code-frame");
var _babelCodeFrame2 = _interopRequireDefault(_babelCodeFrame);
var _index = require("../index");
var _index2 = _interopRequireDefault(_index);
var _index3 = require("./index");
var _index4 = _interopRequireDefault(_index3);
var _babylon = require("babylon");
var _babelTypes = require("babel-types");
var t = _interopRequireWildcard(_babelTypes);
var hoistVariablesVisitor = {
  Function: function Function(path) {
    path.skip();
  },
  VariableDeclaration: function VariableDeclaration(path) {
    if (path.node.kind !== "var")
      return ;
    var bindings = path.getBindingIdentifiers();
    for (var key in bindings) {
      path.scope.push({id: bindings[key]});
    }
    var exprs = [];
    var _arr = path.node.declarations;
    for (var _i = 0; _i < _arr.length; _i++) {
      var declar = _arr[_i];
      if (declar.init) {
        exprs.push(t.expressionStatement(t.assignmentExpression("=", declar.id, declar.init)));
      }
    }
    path.replaceWithMultiple(exprs);
  }
};
function replaceWithMultiple(nodes) {
  this.resync();
  nodes = this._verifyNodeList(nodes);
  t.inheritLeadingComments(nodes[0], this.node);
  t.inheritTrailingComments(nodes[nodes.length - 1], this.node);
  this.node = this.container[this.key] = null;
  this.insertAfter(nodes);
  if (this.node) {
    this.requeue();
  } else {
    this.remove();
  }
}
function replaceWithSourceString(replacement) {
  this.resync();
  try {
    replacement = "(" + replacement + ")";
    replacement = _babylon.parse(replacement);
  } catch (err) {
    var loc = err.loc;
    if (loc) {
      err.message += " - make sure this is an expression.";
      err.message += "\n" + _babelCodeFrame2["default"](replacement, loc.line, loc.column + 1);
    }
    throw err;
  }
  replacement = replacement.program.body[0].expression;
  _index2["default"].removeProperties(replacement);
  return this.replaceWith(replacement);
}
function replaceWith(replacement) {
  this.resync();
  if (this.removed) {
    throw new Error("You can't replace this node, we've already removed it");
  }
  if (replacement instanceof _index4["default"]) {
    replacement = replacement.node;
  }
  if (!replacement) {
    throw new Error("You passed `path.replaceWith()` a falsy node, use `path.remove()` instead");
  }
  if (this.node === replacement) {
    return ;
  }
  if (this.isProgram() && !t.isProgram(replacement)) {
    throw new Error("You can only replace a Program root node with another Program node");
  }
  if (Array.isArray(replacement)) {
    throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");
  }
  if (typeof replacement === "string") {
    throw new Error("Don't use `path.replaceWith()` with a source string, use `path.replaceWithSourceString()`");
  }
  if (this.isNodeType("Statement") && t.isExpression(replacement)) {
    if (!this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement)) {
      replacement = t.expressionStatement(replacement);
    }
  }
  if (this.isNodeType("Expression") && t.isStatement(replacement)) {
    if (!this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement)) {
      return this.replaceExpressionWithStatements([replacement]);
    }
  }
  var oldNode = this.node;
  if (oldNode) {
    t.inheritsComments(replacement, oldNode);
    t.removeComments(oldNode);
  }
  this._replaceWith(replacement);
  this.type = replacement.type;
  this.setScope();
  this.requeue();
}
function _replaceWith(node) {
  if (!this.container) {
    throw new ReferenceError("Container is falsy");
  }
  if (this.inList) {
    t.validate(this.parent, this.key, [node]);
  } else {
    t.validate(this.parent, this.key, node);
  }
  this.debug(function() {
    return "Replace with " + (node && node.type);
  });
  this.node = this.container[this.key] = node;
}
function replaceExpressionWithStatements(nodes) {
  this.resync();
  var toSequenceExpression = t.toSequenceExpression(nodes, this.scope);
  if (t.isSequenceExpression(toSequenceExpression)) {
    var exprs = toSequenceExpression.expressions;
    if (exprs.length >= 2 && this.parentPath.isExpressionStatement()) {
      this._maybePopFromStatements(exprs);
    }
    if (exprs.length === 1) {
      this.replaceWith(exprs[0]);
    } else {
      this.replaceWith(toSequenceExpression);
    }
  } else if (toSequenceExpression) {
    this.replaceWith(toSequenceExpression);
  } else {
    var container = t.functionExpression(null, [], t.blockStatement(nodes));
    container.shadow = true;
    this.replaceWith(t.callExpression(container, []));
    this.traverse(hoistVariablesVisitor);
    var completionRecords = this.get("callee").getCompletionRecords();
    for (var _i2 = 0; _i2 < completionRecords.length; _i2++) {
      var path = completionRecords[_i2];
      if (!path.isExpressionStatement())
        continue;
      var loop = path.findParent(function(path) {
        return path.isLoop();
      });
      if (loop) {
        var callee = this.get("callee");
        var uid = callee.scope.generateDeclaredUidIdentifier("ret");
        callee.get("body").pushContainer("body", t.returnStatement(uid));
        path.get("expression").replaceWith(t.assignmentExpression("=", uid, path.node.expression));
      } else {
        path.replaceWith(t.returnStatement(path.node.expression));
      }
    }
    return this.node;
  }
}
function replaceInline(nodes) {
  this.resync();
  if (Array.isArray(nodes)) {
    if (Array.isArray(this.container)) {
      nodes = this._verifyNodeList(nodes);
      this._containerInsertAfter(nodes);
      return this.remove();
    } else {
      return this.replaceWithMultiple(nodes);
    }
  } else {
    return this.replaceWith(nodes);
  }
}
