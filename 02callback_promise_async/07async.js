"use strict";

async function add(a, b) {
    let sum = a + b;
    console.log(`${sum}`);
}

(async () => {
    await add(3, 5);
})();