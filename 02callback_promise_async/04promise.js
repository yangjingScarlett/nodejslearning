"use strict";

var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hi, it worked!");
        reject("Oops, it failed!");
    }, 3000);
});

somePromise.then((message) => {
    console.log(`Success: ${message}`);
}, (error) => {
    console.log(`Fail: ${error}`);
})