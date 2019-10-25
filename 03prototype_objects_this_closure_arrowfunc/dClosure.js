"use strict";
/* A closure is an inner function that has access to the outer (enclosing) function’s variables—scope chain
The closure has three scope chains:
1.it has access to its own scope (variables defined between its curly brackets),
2.it has access to the outer function’s variables and parameters(but cannot call arguments object),
3.and it has access to the global variables.
 */

// some questions:
// 1.A function may be scheduled to execute later than it is created, does it pick up the latest changes?
let nameing = "John";
function sayHi() {
    console.log("Hi, " + nameing);
}
nameing = "Pete";
sayHi(); // what will it show: "John" or "Pete"?

// 2.A function makes another function and returns it. That new function can be called from somewhere else. Will it have access to the outer variables from its creation place, or the invocation place, or both?
function makeWorker() {
    let nameing2 = "Pete";
    return function () {
        console.log(nameing2);
    };
}

let nameing2 = "John";
let work = makeWorker();
// call it
work(); // what will it show? "Pete" (name where created) or "John" (name where called)?



/* In JavaScript, every running function, code block {...}, and the script as a whole have an internal (hidden) associated object known as the Lexical Environment.
The Lexical Environment object consists of two parts:
1.Environment Record – an object that stores all local variables as its properties (and some other information like the value of this).
2.A reference to the outer lexical environment, the one associated with the outer code.
 */


// closure function sample
function showName(firstName, lastName) {
    let nameIntro = "Your name is: ";
    // this inner function has access to outer function's variables including parameters
    function makeFullName() {
        return `${nameIntro}${firstName} ${lastName}`;
    }
    return makeFullName(); // return executing result;
}

let name = showName("Michael", "Jackson");
console.log(name);

// Closures'Rules and Side Effects
// 1.Closures have access to the outer function’s variable even after the outer function returns. Because when function execute, they use the same scope chain that was when they were created
function celebrityName(firstName) {
    let nameIntro = "This celebrity is: ";
    function lastName(lastName) {
        return `${nameIntro}${firstName} ${lastName}`;
    }
    return lastName; // return a function
}

var myName = celebrityName("Michael"); // At this moment, the outer funtioin has returned
var res = myName("Jackson"); // The closure (lastName) is called here after the outer function has returned above. but it still has access to outer function's variables.
console.log(res);

// 2.Closures store references to the outer function’s variables; they do not store the actual value.
function celebrityID() {
    var celebrityID = 999;
    // We are returning an object with some inner functions
    // All the inner functions have access to the outer function's variables
    return {
        getID: function () {
            // This inner function will return the UPDATED celebrityID variable
            // It will return the current value of celebrityID, even after the changeTheID function changes it
            return celebrityID;
        },
        setID: function (theNewID) {
            // This inner function will change the outer function's variable anytime
            celebrityID = theNewID;
        }
    };

}

var mjID = celebrityID(); // At this juncture, the celebrityID outer function has returned.
mjID.getID(); // 999
mjID.setID(567); // Changes the outer function's variable
mjID.getID(); // 567: It returns the updated celebrityId variables

// 3.Closures Gone Awry when there is for loop before executing inner function, because inner function saves the reference but not value
function celebrityIDCreator1(celebrities) {
    let i;
    let uniqueID = 100;
    for (i = 0; i < celebrities.length; i++) {
        celebrities[i].id = function () {
            return uniqueID + i;
        }; // at this moment, id becomes a function
    }
    return celebrities;
}
let actionCelebs = [{ id: 0, name: "Michael" }, { id: 0, name: "Jane" }, { id: 0, name: "Tina" }];
let celebrities = celebrityIDCreator1(actionCelebs);
let firstCele = celebrities[0];
console.log(firstCele.id()); // the value is 103 instead of 101, because after outer function return, i becomes 3, when executiong id(), it's 100 + 3

// To fix above problem, need to use Immediately Invoked Function Expression(IIFE)
function celebrityIDCreator2(celebrites) {
    let i;
    let uniqueID = 100;
    for (i = 0; i < celebrites.length; i++) {
        // the j parametric variable is the i passed in on invocation of this IIFE
        celebrites[i].id = function (j) {
            return function () {
                return uniqueID + j;
            }(); // BY adding () at the end of this function, we are executing it immediately and returning just the value of uniqueID + j, instead of returning a function.
        }(i);
    }
    return celebrites;
}
let actionCelebs2 = [{ id: 0, name: "Michael" }, { id: 0, name: "Jane" }, { id: 0, name: "Tina" }];
celebrities = celebrityIDCreator2(actionCelebs2);
firstCele = celebrities[0];
console.log(firstCele.id);

// Another way to fic the problem is to make i as local variable of for loop
function celebrityIDCreator3(celebrities) {
    let uniqueID = 100;
    for (let i = 0; i < celebrities.length; i++) {
        celebrities[i].id = function () {
            return uniqueID + i;
        }; // at this moment, id becomes a function
    }
    return celebrities;
}
let actionCelebs3 = [{ id: 0, name: "Michael" }, { id: 0, name: "Jane" }, { id: 0, name: "Tina" }];
celebrities = celebrityIDCreator3(actionCelebs3);
firstCele = celebrities[0];
console.log(firstCele.id());