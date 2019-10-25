"use strict";

var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                console.log(a);
                console.log(b);
                resolve(a + b);
            } else {
                reject('Argument must be number!');
            }
        }, 2000);
    })
}

asyncAdd(5, '7').then((res) => {
    return asyncAdd(res, 33); // must have return here. otherwise the order of the executing will be wrong
}).then((res) => {
    console.log(`Expect 45, Get ${res}`);
}).catch((errorMessage) => {
    console.log(errorMessage);
})