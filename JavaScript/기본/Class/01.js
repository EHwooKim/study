// ES5 에서의 객체지향 프로그래밍
var Person = (function () {
  // Constructor
  function Person(name) {
    this._name = name
  }

  // public method
  Person.prototype.sayHi = function() {
    console.log('hi, ' + this._name)
  }

  // return constructor
  return Person
}())

var me = new Person('Kim')
me.sayHi()

console.log(me instanceof Person)