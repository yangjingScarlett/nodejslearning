"use strict";
/**
 *  一个 JavaScript 函数可以包含 0 个或多个已命名的变量。函数体中的表达式数量也没有限制。你可以声明函数自己的局部变量。
 * return 语句会返回一个值并结束函数。如果没有使用 return 语句，或者一个没有值的 return 语句，JavaScript 会返回 undefined。
 */

// 已命名的参数更像是一个指示而没有其他作用。如果调用函数时没有提供足够的参数，缺少的参数会被 undefined 替代。
function add1(x, y) {
    return x + y;
}

// args 是一个内部对象，即使函数没有形参，但在调用时传进来的参数会默认保存在 args 中
function add2() {
    let sum = 0;
    for (let value of arguments) {
        sum += value;
    }
    return sum;
}

// function(firstValue, ...args)： ...args 是剩余参数。这个函数会把传入的第一个值存入 firstValue，其他的参数存入 args。
function addMore(...args) {
    let sum = 0;
    for (let value of args) {
        sum += value;
    }
    return sum;
}

function avarge(...args) {
    let sum = 0;
    for (let value of args) {
        sum += value;
    }
    return sum / args.length;
}

// 匿名函数
function anonymous(x, y) {
    // 立即执行的匿名函数
    (function () {
        var y = 3;
        x = x + y;
    })();
    return ({ x: x, y: y });
}

function anonymousWithArg(x, y, a) {
    // 带参数的匿名函数
    (function () {
        x = x + a;
        y = y + a;
    })(a);
    return ({ x: x, y: y });
}

// 内部函数：一个函数依赖于其他的一两个函数，而这一两个函数对你其余的代码没有用处，你可以将它们嵌套在会被调用的那个函数内部，这样做可以减少全局作用域下的函数的数量，有利于编写易于维护的代码。
function parentFunc() {
    let a = 1;
    function nestedFunc() {
        let b = 5; // parentFunc cannot use b
        return a + b;
    }
    return nestedFunc();
}


module.exports = {
    add1: add1,
    add2: add2,
    addMore: addMore,
    avarge: avarge,
    anonymous: anonymous,
    anonymousWithArg: anonymousWithArg,
    parentFunc: parentFunc
};