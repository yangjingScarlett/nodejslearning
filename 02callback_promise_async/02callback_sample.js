"use strict";

var getUser = (id, callback) => {
    const user = {
        id: id,
        name: "aa"
    };
    callback(user); // this is where the callback function run
}

getUser(1001, (aUser) => { // this is where the callback function is defined
    console.log(aUser);
})