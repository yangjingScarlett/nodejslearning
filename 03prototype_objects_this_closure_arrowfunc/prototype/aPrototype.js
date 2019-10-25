"use strict";

// 一.[[Prototype]]
// 1.[[Prototype]]:  objects have a special hidden property [[Prototype]], that is either null or references another object. That object is called “a prototype”, like bellow pic:
// 2.                    [[Prototype]]
// [prototype Object] ----------------> [object]
// 3.Although [[Prototype]] is hidden, there are many ways to set it: __proto__
let animal = { eats: true };
let rabbit = { jumps: true };
rabbit.__proto__ = animal; // this means set rabbit's [[Prototype]] reference to animal, remember [[Prototype]] can either be a object or null

// 4.__proto__ is not the same as [[Prototype]], its the getter/setter of it. now it has been replaced by Object.getPrototypeOf()/Object.setPrototypeOf()
// Accessor properties(访问器属性， 指get和set) are an exception, as assignment is handled by a setter function. So writing to such a property is actually the same as calling a function.
let user = {
    name: "John",
    surname: "Smith",

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name}, ${this.surname}`;
    }
};

let admin = {
    __proto__: user,
    isAdmin: true
};

console.log(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // as calling a set function
console.log(admin.fullName);


// 二.Fuction.prototype: Every function has the "prototype" property even if we don’t supply it.
// 1. F.prototype means a regular property named "prototype" on F. the new key word uses it to set [[Prototype]] for the new object.
// F.prototype property is only used when new F is called, it assigns [[Prototype]] of the new object. 
// After that, there’s no connection between F.prototype and the new object.
// If F.prototype property changes (F.prototype = <another object>), then new objects created by new F will 
// have another object as [[Prototype]], but already existing objects keep the old one.
let people = {
    eats: true
};

let woman = {
    gender: "woman"
}

function Bride(name) {
    this.name = name;
}

Bride.prototype = people; // means when a new Bride is created, assign its [[Prototype]] to people.

let meimei = new Bride("Meimei"); // equals to meimei.__proto__ == people
console.log(meimei.eats); // true

Bride.prototype = woman;
console.log(meimei.eats);
console.log(meimei.gender);

let pingping = new Bride("Pingping");
console.log(pingping.eats);
console.log(pingping.gender);

// 2.default constructor property of F.prototype: The default "prototype" is an object with the only property constructor that points back to the function itself.
function Rabbit() { }
// by default:
// Rabbit.prototype = { constructor: Rabbit }
console.log(Rabbit.prototype.constructor == Rabbit);
let aRabbit = new Rabbit(); // means aRabbit.__proto__ = Rabbit.prototype
console.log(aRabbit.constructor == Rabbit)

// 3.if you set F.prototype to another object, you will lose the default constructor property, so the best way to add functions to default prototype, not replace it
Rabbit.prototype.jumps = true

// 三.Native prototype
// 1.all build-in object has native prototypes, all of the built-in prototypes have Object.prototype on the top. That’s why some people say that “everything inherits from objects”.
let obj = {}; // this is because call the new Object() function, so the obj's [[Prototype]] is set to Object.prototype
console.log(obj);
let arr = [1, 2, 3];
// it inherits from Array.prototype?
console.log(arr.__proto__ === Array.prototype);
// then from Object.prototype?
console.log(arr.__proto__.__proto__ === Object.prototype);
// and null on the top?
console.log(arr.__proto__.__proto__.__proto__);

// 2.Changing native prototypes: not a good idea, but polyfilling can do it.comment.
// Polyfilling is a term for making a substitute for a method that exists in JavaScript specification, but is not yet supported by current JavaScript engine.
if (!String.prototype.repeat) { // if there's no such method
    // add it to the prototype
    String.prototype.repeat = function (n) {
        // repeat the string n times
        // actually, the code should be a little bit more complex than that
        // (the full algorithm is in the specification)
        // but even an imperfect polyfill is often considered good enough for use
        return new Array(n + 1).join(this);
    };
}
console.log("La".repeat(3));

// 3.Borrowing from prototypes: borrow functions from native prototypes
let obj2 = {
    0: "Hello",
    1: "world!",
    length: 2,
};
obj2.join = Array.prototype.join; // borrow the join function from Array.prototype
console.log(obj2.join(','));
// Of cause we can just make obj2 inherit from Array by obj2.__proto__ = Array.prototype
// but if the obj2 already inherits another object, we cannot do this, one object can only inherit one object at a time.


// 4.tasks
// Function.prototype.defer = function (ms) {
//     setTimeout(this, ms);
// };

// function f() {
//     console.log("Hello!");
// }

// f.defer(1000); // shows "Hello!" after 1 sec

Function.prototype.defer = function (ms) {
    let f = this;
    return (...args) => {
        setTimeout(() => f.apply(this, args), ms)
    }
}

function f(a, b) {
    console.log(a + b);
}

f.defer(1000)(1, 2); // shows 3 after 1 second


// 四.Prototype methods, objects without __proto__
// 1.__proto__ has outdate and modern methods to replace it are: 
// Object.create(proto[, descriptors]) – creates an empty object with given proto as [[Prototype]] and optional property descriptors.
// Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj.
// Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto.

// We can use Object.create to perform an object cloning more powerful than copying properties in for..in:
obj = { name: "obj", desc: ["this is obj", ["one obj"], ["obj object"]] }
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
console.log(clone);
// This call makes a truly exact copy of obj, including all properties: enumerable and non - enumerable, data properties and setters / getters – everything, and with the right[[Prototype]].


// 2.The __proto__ is not a property of an object, but an accessor property of Object.prototype:

// 3.tasks:
let dictionary = Object.create(null, {
    toString: {
        value() {
            return Object.keys(this).join(",")
        }
    }
});

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// only apple and __proto__ are in the loop
for (let key in dictionary) {
    console.log(key);
}
// your toString in action
console.log(dictionary); // "apple,__proto__"

// second task:
function Rabbit(name) {
    this.name = name;
}
Rabbit.prototype.sayHi = function () {
    console.log(this.name);
}

let rabbit2 = new Rabbit("Rabbit");

rabbit2.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit2).sayHi();
rabbit2.__proto__.sayHi();



// Other about prototype
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.getName = getName;
}

Person.prototype.getInfo = function () {
    console.log(`name: ${this.name}, age: ${this.age}`);
};

obj = new Person("Jane", 28);
obj.getInfo();

console.log(obj.prototype);// undefined, new出来的对象是没有prototype的
console.log(Person.prototype);// Person { getInfo: [Function] }
console.log(typeof Person.prototype);// objct, Functiond的原型就是一个object
console.log(Person.prototype.constructor);// [Function: Person]

// 二，给方法用prototype添加重名属性或方法
Person.prototype.name = "Ala";
Person.prototype.gender = "female";
obj.getInfo();
console.log(obj.gender);

//以上可知当函数对象本身的属性或方法与原型的属性或方法同名的时候：
//    1、默认调用的是函数对象本身的属性或方法.
//    2、通过原型增加的属性或方法的确是存在的.
//    3、函数对象本身的属性或方法的优先级要高于原型的属性或方法.

// 三，使用prototype添加构造函数的方法的好处
// 将方法定义到构造方法的prototype上，这样的好处是，通过该构造函数生成的实例所拥有的方法都是指向一个函数的索引，这样可以节省内存。
// 也可以通过另一种方式实现，在外部定义一个方法，然后在构造函数中将方法指向外部方法。如下：
function getName() {
    console.log(`name: ${this.name}`);
}
obj.getName();