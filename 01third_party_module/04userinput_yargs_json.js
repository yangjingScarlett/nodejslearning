"use strict";
const yargs = require('yargs');
const fse = require('fs-extra');
const path = require('path');

// 1. process.agrv: it saves all arguments as an array, first element is node info, second element is current file path,
// rest elemetns are the arguments user adds, seperated by space
const processArg = process.argv;
console.log("Process.agrv: \n", processArg);

// 2. yargs.argv:saves all arguments as an object, single argument is saved in the '_' key,
// key-value arguments have fixed format: key arguments should start with '--' flag, followed by the value.
const yargsArg = yargs.argv;
console.log("yargs.argv: \n", yargsArg);

const userFile = path.join(__dirname, 'user.txt');
(async () => {
    const isExist = await fse.exists(userFile);
    if (!isExist) {
        await fse.createFile(userFile);
    }
    const user = {
        'username': yargsArg.username ? yargsArg.username : null,
        'pwd': yargsArg.pwd ? yargsArg.pwd : null
    };
    // 3. JSON.stringify: convert a json object to a string, also can convert a array containing json objects into a string
    const userStr = JSON.stringify(user);

    let fileString = (await fse.readFile(userFile)).toString();
    let linesArr = fileString.split("\n");
    const duplicateUser = linesArr.filter(line => {
        let username = "";
        if (line && line.length > 0) {
            username = JSON.parse(line).username;
        }
        return username === yargsArg.username;
    });
    if (duplicateUser.length === 0) {
        await fse.appendFile(userFile, userStr + "\n");
    }

    fileString = (await fse.readFile(userFile)).toString();
    linesArr = fileString.split("\n");
    const userArr = linesArr.map(value => {
        if (value && value.length > 0) {
            // 4. JSON.parse: convert a string into JSON object, also for a array of json string to a array of json object
            return JSON.parse(value);
        }
    });
    userArr.forEach(user => {
        if (user instanceof Object) {
            console.log(user);
        }
    });
})();
