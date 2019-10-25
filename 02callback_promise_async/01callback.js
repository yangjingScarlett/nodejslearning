"use strict";
// the running of a script is about four area: Call Stack, Node APIs, Callback Queue, Event Loop
// the call stack execute the code in mail process from top to the end. and the node apis(setTimeout) will move to node apis
// the nodeapis saves the nodeapis(wait 2 seconds, wait 0 second)
// all callback functions will firstly stay at callback queue and wait for the call stack to be empty
// when the mail function is finished, start to move first callback function in callback queue to call stack, then the others...

console.log("Start Running."); //1

setTimeout(() => {
    console.log("First setTimeout.") //4
}, 2000);

setTimeout(() => {
    console.log("Second setTimeouto."); //3 the callback function is't run immediately after 0 second, why?
}, 0)

console.log("Finish Running.") //2