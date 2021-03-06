/* */ 
"use strict";
var test = require("tape");
var isInteger = require("./index");
var INTEGERS = [5295, -5295, -9007199254740991, 9007199254740991, 0, -0, 4, 4.0, 1801439850948, Math.pow(2, 53), 1000000000000000000000, 1000000000000000000000000000000000000];
var NON_INTEGERS = [4.2, Infinity, -Infinity, NaN, true, false, "", "str", null, undefined, function() {}, /a/g, {}, {valueOf: function() {
    return 3;
  }}, {valueOf: function() {
    return 0 / 0;
  }}, {valueOf: function() {
    throw 17;
  }}, {toString: function() {
    throw 17;
  }}, {
  valueOf: function() {
    throw 17;
  },
  toString: function() {
    throw 42;
  }
}];
test("integers should pass isInteger()", function(t) {
  INTEGERS.forEach(function(val) {
    t.ok(isInteger(val), JSON.stringify(val));
  });
  t.end();
});
test("non-integers should fail isInteger()", function(t) {
  NON_INTEGERS.forEach(function(val) {
    t.notOk(isInteger(val), JSON.stringify(val));
  });
  t.end();
});
