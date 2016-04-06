/* */ 
(function(process) {
  'use strict';
  var pkg = require("./package.json!systemjs-json");
  var userHome = require("./index");
  function help() {
    console.log([pkg.description, '', 'Example', '  $ user-home', '  /Users/sindresorhus'].join('\n'));
  }
  if (process.argv.indexOf('--help') !== -1) {
    help();
    return ;
  }
  if (process.argv.indexOf('--version') !== -1) {
    console.log(pkg.version);
    return ;
  }
  process.stdout.write(userHome);
})(require("process"));
