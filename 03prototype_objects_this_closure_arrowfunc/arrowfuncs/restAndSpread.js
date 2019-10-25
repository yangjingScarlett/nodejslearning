"use strict";
// When we see "..." in the code, it is either rest parameters or the spread operator.
// rest parameter almost at the end of function parameters, to create functions that accept any number of arguments.
// spread operator almost in a function call or alike, expands an array into a list.

// 1.rest parameter: turn a list of parameters to an array.
function restFunc(a, b, c, ...rest) { } // must at the end of parameter list, but can after single parameters

// 2.arguments variable: is both array-like and iterable, but not array. gather all parameters, not rest parameters. arrow function don't have it
function argFunc() { console.log(arguments); }

// 3.spread operator: turns iterable object(array or string) into a list of distinct variables
let arr = [1, 2, 3];
console.log(...arr);

let string = "Hello";
console.log([...string]); // [...string] createa an array from a string, operates on just iterables.
console.log(Array.from(string)); // Array.from() can do the same thing, operates on both array-likes and iterables.

// use new with array parameter
function myConstructor() {
    console.log("arguments.length: " + arguments.length);
    console.log(arguments);
    this.prop1 = "val1";
    this.prop2 = "val2";
};

var myArguments = ["hi", "how", "are", "you", "mr", null];
let m = new myConstructor(myArguments);
console.log(m);

m = new myConstructor(...myArguments);
console.log(m);

myConstructor.apply(this, myArguments);

function applyAndNew(constructor, args) {
    function partial() {
        return constructor.apply(this, args);
    };
    if (typeof constructor.prototype === "object") {
        partial.prototype = Object.create(constructor.prototype);
    }
    return partial;
}

m = applyAndNew(myConstructor, myArguments);
console.log(new m);

// create new array from old array
let arr1 = [1, 2, 3];
let arr2 = [...arr1]; // like arr.slice(), get a new array
arr2.push(4);
console.log(arr1);
console.log(arr2);

arr1 = [[1], [2], [3]];
arr2 = [...arr1];
arr2.push([4]);
console.log(arr1);
console.log(arr2);

let a = [1, 2, 3];
let b = [4, 5];
Object.assign(b, a); // do same thing as b = [...a]
console.log(a);
console.log(b);

// concat arrays
let aa = [1, 2, 3];
let bb = [4, 5, 6];
let cc = aa.concat(bb); // not update aa
console.log(cc);
let dd = [...aa, ...bb];
console.log(dd);

// spread with object literal
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };
// console.log(...obj1); // cannot do this, can be applied only to iterable objects, obj is not iterable
var mergedObj1 = { ...obj1, ...obj2 };
var mergedObj2 = Object.assign(obj1, obj2); //Object.assign() triggers setters whereas spread syntax doesn't. pay attention to deep clone
console.log(mergedObj1);
console.log(mergedObj2);