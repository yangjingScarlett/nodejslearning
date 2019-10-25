'use strict';

// Syntax:
// (a, b, c) => { }

// (a, b, c) => a + b + c

// a => { } // (a) => {}

// () => {
//     console.log("");
// }

// a => ({ a: a });

// (a, b, ...rest) => { };

// (a = 1, b = 2, ...rest) => { };

// ([a, b] = [1, 2], { x: c } = { x: a + b }) => a + b + c;

/**
 * shorter function
 */
let materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
];

materials.map(function (v) {
    return v.length;
});

materials.map(v => v.length);

materials.map(({ length }) => length);

/**
 * No separate this:An arrow function does not have its own this.
 */
// 1.Sample of normal function with this
function Person() {
    this.age = 0;

    setInterval(function growUp() {
        this.age++;
    }, 100);
}

let p = new Person();
setTimeout(() => {
    console.log(`p.age: ${p.age}`);
}, 1000);

// 2.Sample of fixing the this value in a bound function
function Person1() {
    var that = this;
    that.age = 0;

    setInterval(function growUp() {
        that.age++;
    }, 100);
}

let p1 = new Person1();
setTimeout(() => {
    console.log(`p1.age: ${p1.age}`);
}, 1000);

// 3.Arrow function don't has this itself, so it looks for outer lexical environment to get the this value
function Person2() {
    this.age = 0;

    setInterval(() => {
        this.age++;
    }, 100);
}

var p2 = new Person2();
setTimeout(() => {
    console.log(`p2.age: ${p2.age}`);
}, 1000);

// 4.Invoked through call or apply: Since arrow functions do not have their own this, the methods call() and apply() can only pass in parameters. Any this argument is ignored.
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
adder.add(1);
adder.addThruCall(1);

// 5.No binding of arguments
var arr = () => {
    return arguments[0]
};
arr(1, 2, 3);

function foo(n) {
    var f = () => arguments[0] + n;
    return f();
}
foo(3);

// In most cases, using rest parameters is a good alternative to using an arguments object.
function foo1(n) {
    var f = (...args) => args[0] + n;
    return f(10);
}
foo1(3);

// 6.Arrow functions used as methods
var obj = {
    i: 10,
    b: () => console.log(this.i, this),
    c: function () {
        console.log(this.i, this);
    }
};
obj.b();
obj.c();

obj = {
    a: 10
};
Object.defineProperty(obj, 'b', {
    get: () => {
        console.log(this.a, typeof this.a, this);
        return this.a + 10;
    }
});
console.log(obj.b);

// 7.Arrow functions cannot be used as constructors
var Foo = () => { };
// arr = new Foo(); // TypeError: Foo is not a constructor

// 8.Use of the yield keyword


// 9.Parsing order
let callback;
callback = callback || function () { };
// callback = callback || () => { }; // SyntaxError: invalid arrow-function arguments
callback = callback || (() => { });

// 10. More Samples
let empty = () => { };
empty();

(() => 'foobar')();

var simple = a => a > 15 ? 15 : a;
simple(16);
simple(10);

// Easy array filtering, mapping, ...
var arr = [5, 6, 13, 0, 1, 18, 23];
let sum = arr.reduce((a, b) => a + b);
let even = arr.filter(v => v % 2 == 0);
let double = arr.map(v => v * 2);

// More concise promise chains
// promise.then(a => {
// }).then(b => {
// });
