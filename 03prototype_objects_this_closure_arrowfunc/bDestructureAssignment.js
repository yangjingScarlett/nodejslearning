"use strict";
/**
 * The [destructuring assignment] syntax is a JavaScript expression that makes it possible to unpack values from arrays,
 * or properties from objects, into distinct variables.
 */

let a, b, c, rest;

[a, b] = [1, 2];
console.log(`a: ${a}`);
console.log(`b: ${b}`);

[a, b, rest] = [1, 2, 3, 4, 5, 6, 7];
console.log(`a: ${a}`);
console.log(`b: ${b}`);
console.log(`rest: ${rest}`);

[a, b, ...rest] = [1, 2, 3, 4, 5, 6, 7];
console.log(`a: ${a}`);
console.log(`b: ${b}`);
console.log(rest); // now rest is an array
console.log(`rest: ${rest}`);

({ a, b } = { a: 10, b: 20 });
console.log(`a: ${a}`);
console.log(`b: ${b}`);

({ a, b, rest, c } = { a: 10, b: 20, c: 30, d: 40 });
console.log(`a: ${a}`);
console.log(`b: ${b}`);
console.log(`c: ${c}`);
console.log(`rest: ${rest}`); // the {} object don'e contain rest, so rest is undefined

({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
console.log(`a: ${a}`);
console.log(`b: ${b}`);
console.log(rest); // now the ...rest is a rest parameter(剩余参数), so it will eauqal the rest key-values in object

/**
 * Array Destructuring
 */
// 1.Basic variable assignment
let foo = ['one', 'two', 'three'];
let [one, two, three] = foo;
console.log(`one: ${one}`);
console.log(`two: ${two}`);
console.log(`three: ${three}`);

// 2.Assignment separate from declaration
let m, n;
[m, n] = [1, 2];
console.log(`m: ${m}`);
console.log(`n: ${n}`);

// 3.Default values
let x1, x2;
[x1 = 5, x2 = 7] = [1];
console.log(`x1: ${x1}`);
console.log(`x2: ${x2}`);

// 4.Swapping variables: Without destructuring assignment, swapping two values requires a temporary variable
a = 1;
b = 3;
[a, b] = [b, a];
console.log(`a: ${a}`);
console.log(`b: ${b}`);

// 5.Parsing an array returned from a function
function f() {
    return [1, 2];
}
[a, b] = f();
console.log(`a: ${a}`);
console.log(`b: ${b}`);

// 6.Unpacking values from a regular expression match: When the regular expression exec() method finds a match, it returns an array containing first the entire matched portion of the string and then the portions of the string that matched each parenthesized group in the regular expression.
function parseProtocol(url) {
    var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
    if (!parsedURL) {
        return false;
    }
    console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]

    var [, protocol, fullhost, fullpath] = parsedURL;
    return protocol;
}

console.log(parseProtocol('https://developer.mozilla.org/en-US/Web/JavaScript')); // "https"


/**
 * Object destructuring
 */
console.log()
console.log()
console.log("*********************Object destructuring**********************")
// 1.Basic assignment
let o = { p: 42, q: true };
let { p, q } = o;

console.log(`p: ${p}`);
console.log(`q: ${q}`);

// 2.Assignment without declaration: The parentheses ( ... ) around the assignment statement are required when using object literal destructuring assignment without a declaration.
// {a, b} = {a: 1, b: 2} is not valid stand-alone syntax, as the {a, b} on the left-hand side is considered a block and not an object literal.
// Your ( ... ) expression needs to be preceded by a semicolon or it may be used to execute a function on the previous line.
({ a, b } = { a: 1, b: 2 });
console.log(`a: ${a}`);
console.log(`b: ${b}`);

// 3.Assigning to new variable names: A property can be unpacked from an object and assigned to a variable with a different name than the object property.
// for example, var {p: foo} = o takes from the object o the property named p and assigns it to a local variable named foo.
o = { p: 42, q: true };
({ p: m, q: n } = o);

console.log(`m: ${m}`);
console.log(`n: ${n}`);

// 4.Default values
({ a= 10, b= 5 } = { a: 3 });
console.log(`a: ${a}`);
console.log(`b: ${b}`);

// 5.Assigning to new variables names and providing default values
let aa, bb;
({ a: aa = 10, b: bb = 5 } = { a: 3 });
console.log(`aa: ${aa}`); // 3
console.log(`bb: ${bb}`); // 5

// 6.Unpacking fields from objects passed as function parameter
var user = {
    id: 42,
    displayName: 'jdoe',
    fullName: {
        firstName: 'John',
        lastName: 'Doe'
    }
};

function userId({ id }) {
    return id;
}

function whois({ displayName, fullName: { firstName: name } }) {
    return `${displayName} is ${name}`;
}

console.log(userId(user));
console.log(whois(user));

// 7.Setting a function parameter's default value
// the right-hand side {} can be deleted. However, if no right-hand side assignment, the function will look for at least one argument to be supplied when invoked.
// whereas in its current form, you can simply call drawChart() without supplying any parameters. 
// The current design is useful if you want to be able to call the function without supplying any parameters, the other can be useful when you want to ensure an object is passed to the function.
function drawChart({ size = 'big', coords = { x: 0, y: 0 }, radius = 25 } = {}) {
    console.log(size, coords, radius);
    // do some chart drawing
}

drawChart({
    coords: { x: 18, y: 30 },
    radius: 30
});

drawChart(); // now we can call the function without any parameter, it will keep the default value

// 8.Nested object and array destructuring
const metadata = {
    title: 'Scratchpad',
    translations: [
        {
            locale: 'de',
            localization_tags: [],
            last_edit: '2014-04-14T08:43:37',
            url: '/de/docs/Tools/Scratchpad',
            title: 'JavaScript-Umgebung'
        }
    ],
    url: '/en-US/docs/Tools/Scratchpad'
};

let {
    title: englishTitle,
    translations: [
        {
            title: localeTitle,
        },
    ],
} = metadata;

console.log(`englishTitle: ${englishTitle}`);
console.log(`localeTitle: ${localeTitle}`);

// a sample to test
let { account: myAccount = "Michael" } = { account: "Tina" }; // myAccount default is "Michael", but reset as "Tina"
let { account: aAccount = [{ id: 10 }, { name: "myName" }] } = { account: [{ id: 1 }, { name: "Jane" }] };
let { account: [id, name] } = { account: ["20190830", "Lily", "PuDong"] }
let { account: [{ id: myId, name: myName, add: myAdd = "PuDong" }] } = { account: [{ id: 1, name: "Jane" }] };
console.log(`myAccount: ${myAccount}`);
console.log(aAccount);
console.log(`id: ${id}, name: ${name}`);
console.log(`myId: ${myId}, myName: ${myName}, myAdd:${myAdd}`);

// 9.For of iteration and destructuring
var people = [
    {
        name: 'Mike Smith',
        family: {
            mother: 'Jane Smith',
            father: 'Harry Smith',
            sister: 'Samantha Smith'
        },
        age: 35
    },
    {
        name: 'Tom Jones',
        family: {
            mother: 'Norah Jones',
            father: 'Richard Jones',
            brother: 'Howard Jones'
        },
        age: 25
    }
];

for (var { name: na, family: { father: f } } of people) {
    console.log('Name: ' + na + ', Father: ' + f);
}

// 10.Computed object property names and destructuring
// Starting with ECMAScript 2015, the object initializer syntax also supports computed property names. 
// That allows you to put an expression in brackets [], that will be computed and used as the property name. 
let key = 'z';
({ [key]: foo } = { z: 'bar' }); // so the [key] will be used as 'z'
console.log(`foo: ${foo}`);

// 11.Rest in Object Destructuring
({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
console.log(`a: ${a}`);
console.log(`b: ${b}`);
console.log(`rest: ${rest}`);
console.log(rest);

// 12.Combined Array and Object Destructuring
const props = [
    { id: 1, name: 'Fizz' },
    { id: 2, name: 'Buzz' },
    { id: 3, name: 'FizzBuzz' }
];

const [, , { name: naming }] = props;
[, , { name }] = props;
console.log(`naming: ${naming}`);
console.log(`name: ${name}`);

// a sample test
let [{ goal, score, aim }] = [{ aim: 100, score: 95 }];
console.log(goal);
console.log(score);
console.log(aim);