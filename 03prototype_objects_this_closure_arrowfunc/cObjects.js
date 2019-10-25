"use strict";
// 1. singleton class, 字面量法
let singletonClass = {
    name: "singletonClass",
    age: 10,
    getInfo: function () {
        return `name: ${this.name}, age: ${this.age}`;
    }
};

// 2. constructor class, 通过new 关键字创建对象，但是所有对象都新建一个 getPeople 方法，占用额外内存
function People(name, age) {
    this.name = name;
    this.age = age;
    this.getPeople = function () {
        return `name: ${this.name}, age: ${this.age}`;
    };
}

// 3. constructor class, 将通用的方法放到外部，作为全局函数，这样所有对象共享全局函数，节省内存。但是封存类就失去了意义，全局函数可能被别的对象访问
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.getPerson = getPerson;
}

function getPerson() {
    return `name: ${this.name}, age: ${this.age}`;
}

// 4. constructor class with prototype, 将通用方法附加在 calss 的prototype属性上，所有对象共享这些方法，且也封装在类内部
function Human(name, age) {
    this.name = name;
    this.age = age;
}

// 任何分配给 Human.prototype 的东西对通过 this 对象构造的实例都是可用的
Human.prototype.getHuman = function () {
    return `name: ${this.name}, age: ${this.age}`;
};

//5. Object.create()创建 Human 的子类. Man is subclass
function Man(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}

// subclass extends superclass
Man.prototype = Object.create(Human.prototype);

module.exports = {
    singletonClass: singletonClass,
    People: People,
    Person: Person,
    Human: Human,
    Man: Man
};