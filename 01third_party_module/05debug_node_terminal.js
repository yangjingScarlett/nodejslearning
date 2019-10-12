"use strict";
// 1. in node terminal type: node debug 05debug_node_terminal.js
// 2. in debug mode type: n (the n means next)
// 3. in debug mode type: c (the c means continue)
// 4. in debug mode type: repl (the repl means Read-Eval-Print-Loop). at this mode, you can print any property you interest. use quit or ctrl+C to quit this mode
// 5. type: quit or ctrl+C twice to quit debug mode

// optional: in your code, at your interested line, add code 'debugger', then the debug mode will stop at that line, then use repl to debug your code

let person = {
    name: "Jing Yang"
};

person.age = 24;

debugger;
person.name = "aa";

console.log(person);