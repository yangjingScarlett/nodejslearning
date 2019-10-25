"use strict";

let aArr = new Array();
aArr[0] = "A";
aArr[1] = "B";
aArr[2] = "C";
console.log(`aArr: ${aArr}`);
// toString()	返回一个包含数组中所有元素的字符串，每个元素通过逗号分隔。
console.log(`aArr toString: ${aArr.toString()}`);
// toLocaleString()	根据宿主环境的区域设置，返回一个包含数组中所有元素的字符串，每个元素通过逗号分隔。
console.log(`aArr toLocaleString: ${aArr.toLocaleString()}`);

let bArr = ["cat", "dog", "hen"];
console.log(`bArr: ${bArr}`);
console.log(`bArr toString: ${bArr.toString()}`);
console.log(`bArr toLocaleString: ${bArr.toLocaleString()}`);

let cArr = ["square", "rectangle", "cycle"];
console.log(`cArr: ${cArr}`);
// a.concat(item1, item2....itemN) 返回一个新数组，这个数组包含原先 a 和 item1、item2、……、itemN 中的所有元素。
let concatArr = aArr.concat(bArr, cArr);
console.log(`concatArr: ${concatArr}`);
console.log(`aArr: ${aArr}`);

// a.join(sep) 回一个包含数组中所有元素的字符串，每个元素通过指定的 sep 分隔。
let str = aArr.join("--");
console.log(`aArr.join("--"): ${str}`);
console.log(`aArr: ${aArr}`);

// a.pop() 删除并返回数组中的最后一个元素
let lastElement = aArr.pop();
console.log(`aArr.pop(): ${lastElement}`);
console.log(`aArr: ${aArr}`);

// a.shift()	删除并返回数组中第一个元素。
let firstElement = aArr.shift();
console.log(`aArr.shift(): ${firstElement}`);
console.log(`aArr: ${aArr}`);


// a.push(item1, ..., itemN) 将 item1、item2、……、itemN 追加至数组 a，返回新数组的长度。
let newLen = aArr.push("newC");
console.log(`length of aArr: ${newLen}`);
console.log(`aArr: ${aArr}`);

// a.reverse() 数组逆序（会更改原数组 a）。
let reverseArr = aArr.reverse();
console.log(`aArr: ${aArr}`);
console.log(`reverseArr: ${reverseArr}`);

// a.slice(start, end)	返回子数组，以 a[start] 开头，以 a[end] 前一个元素结尾。
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sliceA = a.slice(2, 5);
console.log(`a.slice(2, 5): ${sliceA}`);

// a.sort([cmpfn]) 依据可选的比较函数 cmpfn 进行排序，如果未指定比较函数，则按字符顺序比较（即使被比较元素是数字）。
let aSort = a.sort(function (x, y) {
    if (x > y) {
        return -1;
    }
    if (x < y) {
        return 1;
    }
    return 0;
});
console.log(`a sort desc returned value: ${aSort}`);
console.log(`a sort desc: ${a}`);

// a.splice(start, delcount[, item1[, ...[, itemN]]]) 从 start 开始，删除 delcount 个元素，然后插入所有的 item。返回删除的数据组成的数组
let spliceA = a.splice(5, 3, [1, 2, 3, 4, 5]);
console.log(`after a splice returned value: ${spliceA}`);
console.log(`after a splice: ${a}`);

// a.unshift(item1[, item2[, ...[, itemN]]]) 将 item 插入数组头部，返回数组新长度（考虑 undefined）。
console.log(`aArr: ${aArr}`);
newLen = aArr.unshift("A");
console.log(`After aArr unshift new length: ${newLen}`);
console.log(`After aArr unshift: ${aArr}`);