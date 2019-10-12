"use strict";
// yargs is a third party module help app to get arguments user adds through node command
const yargs = require('yargs');

// suppose we need to add new object, we need two things, one is the command, another is the object
// command: node 06yargs.js add -u:"aa" -p:"aapwd"
const yargsArgv = yargs
    .command('add', 'add a new object', {
        username: {
            describe: "the username of new object",
            demand: true,
            alias: 'u'
        },
        pwd: {
            describe: "the password of new object",
            demand: true,
            alias: 'p'
        }
    })
    .help()
    .argv


console.log(yargsArgv);
