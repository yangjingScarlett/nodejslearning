"use strict";

// basic syntax
let a = 'foo', b = 42, c = {};
let o = {
    a: a,
    b: b,
    c: c,
    get: function () {
        return `a: ${a}, b: ${b}, c:${c}`;
    }
};
console.log(o.get());

// shorthand, after es6
o = { a, b, c, get() { return `a: ${a}, b: ${b}, c:${c}`; } };
console.log(o.get());

// compute property name
let key = 'xx';
let object = { [key]: 1, ['y' + 'y']: 2 };
console.log(object);

// spread properties
let obj1 = { foo: 'foo', x: 42 };
let obj2 = { foo: 'baz', y: 13 };

let clonedObj = { ...obj1 };
console.log(clonedObj);
let mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj);

// Object.assign(): copy properties from source objects to target object, return target object
let assignedObj = Object.assign(obj2, obj1);
console.log(obj2);
console.log(assignedObj);