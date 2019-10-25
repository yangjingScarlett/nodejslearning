"use strict";
// 1.implicit binding
var person = {
    name: "Jane",
    getName: function () {
        console.log(`name:${this.name}`);
    },
    mother: {
        name: "Susan",
        getName: function () {
            console.log(`name:${this.name}`);
        }
    }
};

person.getName();
person.mother.getName();

// 2.explicit binding: call(), apply(), bind()
function getName(age, gender) {
    console.log(`name: ${this.name}, age:${age}, gender:${gender}`);
}

var person = {
    name: "Jane"
};

getName.call(person, 17, "female");
getName.apply(person, [17, "female"]);
var bound = getName.bind(person);
bound(17, "female");

// 3.new binding
function Person(name, age) {
    this.name = name;
    this.age = age;
    // this.getInfo = function () {
    //     return `class:${this.class}, age:${this.age}`;
    // };
}

Person.prototype.getInfo = function () {
    this.test = "test message";
    console.log(this);
    return `name:${this.name}, age:${this.age}`;
};

var p = new Person("Jane", 17);
p.getInfo();

// 4.default binding: this is binding to global
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.getInfo = function () {

    };
}

Person("Jane", 17);