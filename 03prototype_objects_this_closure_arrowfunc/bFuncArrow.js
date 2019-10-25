'use strict';
/**
 * @description An [arrow function expression] is a syntactically(语法上) compact(约定)
 * alternative to a regular function expression, although without its own bindings to the
 * this, arguments, super, or new.target keywords. Arrow function expressions are
 * ill suited as methods, and they cannot be used as constructors.
 */

const materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
];

// a demo
let len = materials.map(value => value.length);
console.log(len);

/**
 * Basic Syntax:
 * (param1, param2, …, paramN) => { statements }
 * (param1, param2, …, paramN) => expression, equivalent to: => { return expression; }
 *
 * // Parentheses are optional when there's only one parameter name:
 * (singleParam) => { statements }, equivalent to: singleParam => { statements }
 *
 * // The parameter list for a function with no parameters should be written with a pair of parentheses.
 * () => { statements }
 *
 *
 * Advanced Syntax:
 * // Parenthesize the body of a function to return an object literal expression:
 * params => ({foo: bar})
 *
 * // Rest parameters(...args) and default parameters are supported
 * (param1, param2, ...rest) => { statements }
 * (param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }
 *
 * // Destructuring(解构：把数组拆分成单独的值) within the parameter list is also supported
 * var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
 * f(); // 6
 */

/**
 * Two factors influenced the introduction of arrow functions:
 * the need for shorter functions and the behavior of the this keyword.
 */
len = materials.map(({ length: lengthFooBArX }) => lengthFooBArX);
console.log(len);

len = materials.map(({ length }) => length);
console.log(len);

/**
 * No separate this:An arrow function does not have its own this.
 */

// 1.Sample of normal function with this
function Person() {
    // The Person() constructor defines `this` as an instance of itself.
    this.age = 0;

    setInterval(function growUp() {
        // In non-strict mode, the growUp() function defines `this` as the global object (because it's where growUp() is executed.), 
        // which is different from the `this` defined by the Person() constructor.
        this.age++;
    }, 100);
}

/* let p = new Person();
setTimeout(() => {
    console.log(`p.age: ${p.age}`);
}, 1000); */

// 2.Sample of fixing the this value in a bound function
function Person1() {
    var that = this;
    that.age = 0;

    setInterval(function growUp() {
        // The callback refers to the `that` variable of which
        // the value is the expected object.
        that.age++;
    }, 100);
}

/* let p1 = new Person1();
setTimeout(() => {
    console.log(`p1.age: ${p1.age}`);
}, 1000); */

// 3.Arrow function don't has this itself, so it looks for outer lexical environment to get the this value
function Person2() {
    this.age = 0;

    setInterval(() => {
        this.age++; // |this| properly refers to the Person object
    }, 100);
}

/* var p2 = new Person2();
setTimeout(() => {
    console.log(`p2.age: ${p2.age}`);
}, 1000); */

// 4.Relation with strict mode
var f = () => { 'use strict'; return this; };
var t = f();
console.log(t === global); // why not true?

// 5.Invoked through call or apply: Since arrow functions do not have their own this, the methods call() and apply() can only pass in parameters. Any this argument is ignored.
var adder = {
    base: 1,

    add: function (a) {
        let f = v => v + this.base;
        return f(a);
    },

    addThruCall: function (a) {
        let f = v => v + this.base;
        var b = {
            base: 2
        };

        return f.call(b, a);
    }
};

console.log(adder.add(1));         // This would log 2
console.log(adder.addThruCall(1)); // This would log 2 still

// 6.No binding of arguments: Arrow functions do not have their own arguments object. Thus, in this example, arguments is simply a reference to the arguments of the enclosing scope:
var arr = () => arguments[0];
console.log(`arr(): ${arr(1, 2, 3)}`); // not 1, because the arguments in arrow function is linked to the outer lexical scope

function foo(n) {
    var f = () => arguments[0] + n; // foo's implicit arguments binding. arguments[0] is n
    return f();
}
console.log(`foo(3): ${foo(3)}`);

// In most cases, using rest parameters is a good alternative to using an arguments object.
function foo1(n) {
    var f = (...args) => args[0] + n;
    return f(10);
}

console.log(`foo1(3): ${foo1(3)}`);

// 7.Arrow functions used as methods:arrow function expressions are best suited for non-method functions. Let's see what happens when we try to use them as methods
var obj = {
    i: 10,
    b: () => console.log(this.i, this),
    c: function () {
        console.log(this.i, this);
    }
};

obj.b(); // prints undefined, Window {...} (or the global object)
obj.c(); // prints 10, Object {...}

obj = {
    a: 10
};

Object.defineProperty(obj, 'b', {
    get: () => {
        console.log(this.a, typeof this.a, this); // undefined 'undefined' Window {...} (or the global object)
        return this.a + 10; // represents global object 'Window', therefore 'this.a' returns 'undefined'
    }
});
console.log(obj.b);

// 8.Arrow functions cannot be used as constructors and will throw an error when used with new.
var Foo = () => { };
// foo = new Foo(); // TypeError: Foo is not a constructor

// 9.Use of the yield keyword


// 10.Parsing order: Although the arrow in an arrow function is not an operator, 
// arrow functions have special parsing rules that interact differently with operator precedence compared to regular functions.
let callback;
callback = callback || function () { };
console.log(`callback: ${callback}`);
// callback = callback || () => { }; // SyntaxError: invalid arrow-function arguments
callback = callback || (() => { });
console.log(`callback: ${callback}`);


// 11. More Samples
// An empty arrow function returns undefined
let empty = () => { };
console.log(`empty(): ${empty()}`);

// Returns "foobar" : (this is an Immediately Invoked Function Expression)
console.log((() => 'foobar')());

var simple = a => a > 15 ? 15 : a;
console.log(`simple(16): ${simple(16)}`);
console.log(`simple(10): ${simple(10)}`);


// Easy array filtering, mapping, ...
var arr = [5, 6, 13, 0, 1, 18, 23];
var sum = arr.reduce((a, b) => a + b);
console.log(`sum: ${sum}`); // 66

var even = arr.filter(v => v % 2 == 0);
console.log(`even: ${even}`); // [6, 0, 18]

var double = arr.map(v => v * 2);
console.log(`double: ${double}`); // [10, 12, 26, 0, 2, 36, 46]

// More concise promise chains
// promise.then(a => {
// }).then(b => {
// });

// Parameterless arrow functions that are visually easier to parse
setTimeout(() => {
    console.log('I happen sooner');
    setTimeout(() => {
        // deeper code
        console.log('I happen later');
    }, 1);
}, 1);

