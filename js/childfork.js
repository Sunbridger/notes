//master
var fork = require('child_process').fork

var cpu = require('os').cpus()


for (var i = 0; i < cpu.length; i++) {
    fork(require('path').resolve(__dirname, './forkworker.js'));
}
