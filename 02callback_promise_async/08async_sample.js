"use strict";
// setTimeout is not an async function, so you can't use it with ES7 async-await. 
// But you could implement your sleep function using ES6 Promise:

// async-await is no use in below sample:
// async function sum(a, b) {
//     let res = 0;
//     await setTimeout(() => {
//         if (typeof a === 'number' && typeof b === 'number') {
//             res = a + b;
//             console.log(`Expect result: ${res}`);
//         }
//     }, 2000);
//     console.log(`${a} + ${b} = ${res}`);
// }

// (async () => {
//     await sum(3, 5);
// })();


// use promise in below sample:
async function sleep(fn, par) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fn(par)), 3000)
    })
}
async function add([a, b] = [0, 0]) {
    let sum = 0;
    if (typeof a === 'number' && typeof b === 'number') {
        sum = a + b;
        console.log(`Expect result: ${sum}`);
    }
    console.log(`${a} + ${b} = ${sum}`);
}

(async () => {
    await sleep(add, [3, 5]);
})();
