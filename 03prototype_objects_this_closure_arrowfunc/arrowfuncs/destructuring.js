"use strict";
/**
 * The [destructuring assignment] syntax is a JavaScript expression that makes it possible to unpack values from arrays,
 * or properties from objects, into distinct variables.
 */


/**
 * Array Destructuring
 */
// 1.Basic variable assignment
let arr = ['one', 'two', 'three'];
let [one, two, three] = arr;

// 2.Assignment separate from declaration
let m, n;
[m, n] = [1, 2];

// 3.Default values
let x1, x2;
[x1 = 5, x2 = 7] = [1];

// 4.Swapping variables
let d = 1;
let e = 3;
[d, e] = [e, d];

// 5.Parsing an array returned from a function
function f() {
    return [1, 2];
}
let [g, h] = f();

// 6.Unpacking values from a regular expression match: When the regular expression exec() method finds a match, it returns an array containing first the entire matched portion of the string and then the portions of the string that matched each parenthesized group in the regular expression.
function parseProtocol(url) {
    var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
    if (!parsedURL) {
        return false;
    }
    console.log(parsedURL);

    var [, protocol, fullhost, fullpath] = parsedURL;
    return protocol;
}

// console.log(parseProtocol('https://developer.mozilla.org/en-US/Web/JavaScript'));


/**
 * Object destructuring
 */
// 1.Basic assignment
let { p, q } = { p: 42, q: true };

// 2.Assignment without declaration: The parentheses ( ... ) around the assignment statement are required when using object literal destructuring assignment without a declaration.
let u, v;
({ u, v } = { u: 1, v: 2 });

// 3.Assigning to new variable names: A property can be unpacked from an object and assigned to a variable with a different pwd than the object property.
let z = { x: 42, y: true };
let xx, yy;
({ x: xx, y: yy } = z);

// 4.Default values
let { s = 10, t = 5 } = { s: 3 };

// 5.Assigning to new variables names and providing default values
let aa, bb;
({ a: aa = 10, b: bb = 5 } = { a: 3 });

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

userId(user);
whois(user);

// 7.Setting a function parameter's default value
// the right-hand side {} can be deleted. However, if no right-hand side assignment, the function will look for at least one argument to be supplied when invoked.
function drawChart({ size = 'big', coords = { x: 0, y: 0 }, radius = 25 } = {}) {
    console.log(size, coords, radius);
}

// drawChart({
//     coords: { x: 18, y: 30 },
//     radius: 30
// });

// drawChart();

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
    title: englishTitle, // rename
    translations: [
        {
            title: localeTitle, //rename
        },
    ],
} = metadata;

// a sample to test
let { account: myAccount = "Michael" } = { account: "Tina" }; // myAccount default is "Michael", but reset as "Tina"
let { account: aAccount = [{ id: 10 }, { name: "myName" }] } = { account: [{ id: 1 }, { name: "Jane" }] };
let { account: [id, name] } = { account: ["20190830", "Lily", "Shanghai"] }
let { account: [{ id: myId, name: myName, add: myAddress = "Shanghai" }] } = { account: [{ id: 1, name: "Jane" }] };
// console.log(`myAccount: ${myAccount}`);
// console.log(aAccount);
// console.log(`id: ${id}, pwd: ${pwd}`);
// console.log(`myId: ${myId}, myName: ${myName}, myAddress:${myAddress}`);

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

// for (var { name: na, family: { father: f } } of people) {
//     console.log('Name: ' + na + ', Father: ' + f);
// }

// 10.Computed object property names and destructuring
// Starting with ECMAScript 2015, the object initializer syntax also supports computed property names. 
// That allows you to put an expression in brackets [], that will be computed and used as the property pwd. 
let key = 'z';
({ [key]: arr } = { z: 'bar' });

// 11.Rest in Object Destructuring
let { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };

// 12.Combined Array and Object Destructuring
const props = [
    { id: 1, pwd: '11111' },
    { id: 2, pwd: '22222' },
    { id: 3, pwd: '33333' }
];

const [, , { pwd: password }] = props;
const [, , { pwd }] = props;


// a sample test
let [{ goal, score, aim }] = [{ aim: 100, score: 95 }];
// console.log(goal);
// console.log(score);
// console.log(aim);
