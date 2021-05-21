'use strict';

class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    };
  
  info() {
    console.log(`名前は${this.name}です`);
    console.log(`${this.age}歳です`);
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name, age);
  }
  info() {
    super.info;
    console.log('hello');
  }
}
const animal = new Animal("レオ", 3);
const dog = new Dog('dog', 5);

animal.info();
dog.info();

class Study {
  constructor() {
    this.paramA
    this.paramB
  }
  output() {
    console.log(this.paramA);
    console.log(this.paramB);
  }
}
const study = new Study();

const paramArray = {
  paramA: 'AAA',
  paramB: 'BBB'
};
study.paramA = paramArray.paramA;
study.paramB = paramArray.paramB;

study.output();
