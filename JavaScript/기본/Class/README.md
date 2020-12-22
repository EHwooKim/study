# 프로토타입 체이닝과 클래스

## 프로토타입 체이닝에 의한 상속

* 내장 클래스인 `Array`를 상속하여 Grade 클래스를 만들어 보자.

```javascript
const Grade = function() {
  const args = Array.prototype.slice.call(arguments)
  for (let i = 0; i < args.length; i++) {
    this[i] = args[i]
  }
  this.length = args.length
}

Grade.prototype = [] // Grade의 인스턴스가 Array 프로토타입 메서드 들을 사용하기 위해
// Grade.prototype = [1, 2, 3, 4, 5] 를 연결시키면 아래의 코드가 어떻게 작동할까?

const g = new Grade(1, 2, 3, 4, 5, 6, 6)

g.push(200)
console.log(g) // 정상작동

delete g.length // length 프로퍼티가 configuable(삭제가능)한 상태
g.push(3000)
console.log(g) // g에서 length를 지웠기 떄문에 프로토타입 체이닝에 의해 Array의 length를 읽게 되어 원하는대로 작동하지 않는다.
```

* `인스턴스 g의 __proto__`는 `생성자함수 Grade의 prototype`를 참조하기 때문에 Grade의 prototype에 []를 할당하여 `프로토타입 체이닝`에 의해 다시 한번 `Array의 prototype`을 참조하도록 하여 `g`에서도 Array의 프로토타입 메서드를 사용할 수 있게 하였다.
* 그런데 `length` 프로퍼티가 configurable(삭제 가능)하다는 점과 Grade의 prototype에 빈배열을 참조시켰기 떄문에 문제가 생긴다.

## 사용자가 정의한 클래스간의 상속

```javascript
var Rectangle = function(width, height) {
  this.width = width
  this.height = height
}
Rectangle.prototype.getArea = function() {
  return this.width * this.height
}
var rect = new Rectangle(10, 20)
console.log(rect.getArea()) // 200


var Square = function(width) {
  this.width = width
}
Square.prototype.getArea = function() {
  return this.width * this.width
}
var sq = new Square(10)
console.log(sq.getArea()) // 100
```

> Rectangle, Square 클래스 정의

* `Rectangle`과 `Square`두 클래스간의 공통 요소를 아래와 같이 수정

```javascript
...
var Square = function(width) {
    this.width = width
    this.height = width
}
Square.prototype.getArea = function() {
    return this.width * this.height
}
```

> Square 클래스 변형

* 이제  `Square`를 `Rectangle`의 하위 클래스로 삼을 수 있을 것 같다.

```javascript
...
var Square = function(width) {
    Rectangle.call(this, width, width)
}
Square.prototype = new Rectangle()
```

> Rectangle을 상속하는 Square 클래스

* `Square` 생성자 함수에 Rectangle 생성자 함수를 함수로 호출하고 height 자리에 width를 넘겨주었다.
* `getArea`는 동일한 함수이기 때문에 새로 정의하지않고 `Square`의 prototype객체에 `Rectangle` **인스턴스** 를 부여하여 프로토타입 체이닝에 의해 `getArea`를 사용할 수 있게 하였다.

그런데 이방법 또한 앞선 예제와 마찬가지로 클래스에 있는 값이 인스턴스에 영향을 줄 수 있는 구조이다.

### 프로토타입 체이닝에 의한 상속의 문제점

`console.dir(sq)`를 출력해보면, `sq.__proto__`에도 width, height가 존재하는 것을 확인할 수 있다.

즉, `Square.prototype`에 값이 존재하는 것이 문제이다.

임의로`Square.prototype.width`에 값을 할당하고 `sq.width`를 삭제하면 프로토타입 체이닝에 의해 엉뚱한 결과가 나오게 될 것이다.

또한, `constructor`가 여전히 `Rectangle`을 바라보는 문제도 있다.

`sq.constructor`로 접근하면 프로토타입 체이닝에 의해 `sq.__proto__.__proto__` 즉, `Rectangle.prototype`에서 찾게되며 이는 `Rectangle`을 가리키고 있기 때문이다.

> constructor : 생성자 함수의 prototype 프로퍼티에 들어있는 값으로 생성자 함수 본인을 가리킨다.
>
> prototype에 들어있기 때문에 인스턴스의 `__proto__`에도 같은 값이 있는..

```javascript
var rect2 = new sq.constructor(2, 3)
console.log(rect2) // Rectangle { width: 2, height: 3 }
```

> sq는 Square 생성자 함수의 인스턴스이기 떄문에 sq.constructor의 인스턴스 역시 Square이길 바라는데 Rectangle이 나오는 상황

결국 하위 클래스로 삼을 생성자 함수의 prototype에 상위 클래스의 인스턴스를 부여하는 것만으로도 기본적인 메서드 상속은 가능하지만, 다양한 문제가 발생할 여지가 있어 구조적으로 안정성이 떨어진다.

## 상속 문제 해결

### 클래스가 데이터를 지니지 않게 하는 방법

#### 방법1

* 클래스(prototype)가 구체적인 데이터를 지니지 않게 하는 방법은 여러가지가 있는데, 그 중 가장 쉬운 방법은 일단 만들고 나서 프로퍼티들을 일일이 지우고 더는 새로운 프로퍼티를 추가할 수 없게 하는 것이다.

```javascript
delete Square.prototype.width
delete Square.prototype.height
Object.freeze(Sqaure.prototype)
```

* 이 정도로도 원하는 바를 충분히 이뤄낼 수 있게 된다.
* 위 동작을 함수화 하면 아래와 같다.

```javascript
var extendClass1 = function(SuperClass, SubClass, subMethods) {
    SubClass.prototype = new SuperClass()
    for (var prop in SubClass	.prototype) {
        if (SubClass.prototype.hasOwnProperty(prop)) {
            delete SubClass.prototype[prop]
        }
    }
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method]
        }
    }
    Object.freeze(SubClass.prototype)
    return SubClass
}

// 사용
var Square = extendClass1(Rectangle, function(width) {
    Rectangle.call(this, width, width)
})
```

> 인스턴스 생성 후 프로퍼티 제거

#### 방법2

* 다른 방법으로는 더글라스 크락포드가 제시하여 대중적으로 널리 알려진 방법으로,

  SubClass의 prototype에 직접 SuperClass의 인스턴스를 할당하는 대신 아무런 프로퍼티를 생성하지 않은 빈 생성자 함수(Bridge)를 하나 더 만들어서 그 prototype이 SuperClass의 prototype을 바라보게끔 한 다음, SubClass의 prototype에는 Bridge의 인스턴스를 할당하게 하는 방법이다.

```javascript
var Rectangle = function(width, height) {
    this.width = width
    this.height = height
}
Rectangle.prototype.getArea = function() {
    return this.width * this.height
}
var Square = function(width) {
    Rectangle.call(this, width, width)
}
var Bridge = function() {}
Bridge.prototype = Rectangle.prototype
Square.prototype = new Bridge()
Object.freeze(Squre.prototype)
```

* 이로써 인스턴스를 제외한 프로토타입 체인 경로상에는 더는 구체적인 데이터가 남아있지않게 된다.
* 범용성을 고려한 코드는 아래와 같다.

```javascript
var extendClass2 = (function() {
    var Bridge = function() {}
    return function(SuperClass, SubClass, subMethods) {
        Bridge.prototype = SuperClass.prototype
        SubClass.prototype = new Bridge()
        if (submethods) {
            for (var method in subMethods) {
                SubClass.prototype[method] = subMethods[method]
            }
        }
        Object.freeze(SubClass.prototype)
        return SubClass
    }
})()
```

> 빈 함수를 활용

* 즉시싱핼 함수 내부에서 Bridge를 선언하여 클로저로 활용함으로써 메모리에 불필요한 함수 선언을 줄였다.

#### 방법3

* ES5에서 도입된 `Object.create`를 이용한 방법도 있다.
* 이 방법은 SubClass의 prototype의 `__proto__`가 SuperClass의 prototype을 바라보되, SuperClass의 인스턴스가 되지는 않으므로 앞선 두 방법보다 간단하면서 안전하다.

```javascript
...
Square.prototype = Object.create(Rectangle.prototype)
Object.freeze(Square.freeze)
...
```

> Object.create 활용 

> `**Object.create()**` 메서드는 지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 만듭니다.

클래스 상속 및 추상화를 흉내내기 위한 라이브러리들은 결국 위 아이디어에서 크게 벗어나지않은 방법으로 만들어졌다.

결국 SubClass.prototype의 `__proto__`가 SuperClass.prototype을 참조하면서 SubcClass.prototype에는 불필요한 인스턴스 프로퍼티가 남아있지 않으면 되는 방법이다.

### constructor 복구하기

아직 SubClass 인스턴스의 constructor가 SuperClass를 가리키는 문제가 남아있다.

엄밀히 말하면 SubClass의 인스턴스에도 constructor가 없고, SubClass.prototype에도 constructor가 없는 상태이다. 프로토타입 체인상 가장 먼저 만나는 SuperClass.prototype의 constructor에거 가리키는 대상인 SuperClass가 출력되고 있는 상황이다.

따라서 SubClass.prototype.constructor가 원래의 SubClass를 바라보게 만들어주면 된다.

```javascript
var extendClass1 = function(SuperClass, SubClass, subMethods) {
    SubClass.prototype = new SuperClass()
    for (var prop in SubClass	.prototype) {
        if (SubClass.prototype.hasOwnProperty(prop)) {
            delete SubClass.prototype[prop]
        }
    }
    SubClass.prototype.constructor = SubClass
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method]
        }
    }
    Object.freeze(SubClass.prototype)
    return SubClass
}
```

> 인스턴스 생성 후 프로퍼티 제거 + constructor 복구

* 방법2의 경우 SubClass.prototype이 SuperClass 대신 Bridge의 인스턴스를 바라보는 상태이므로 SuperClass와의 관계를 복구하기 위해 Bridge.prototype.constructor가 SuperClass를 바라보게 하는 작업을 추가해주면된다.



```javascript
var extendClass2 = (function() {
    var Bridge = function() {}
    return function(SuperClass, SubClass, subMethods) {
        Bridge.prototype = SuperClass.prototype
        SubClass.prototype = new Bridge()
        SubClass.prototype.constructor = SubClass
        Bridge.prototype.constructor = SuperClass
        if (submethods) {
            for (var method in subMethods) {
                SubClass.prototype[method] = subMethods[method]
            }
        }
        Object.freeze(SubClass.prototype)
        return SubClass
    }
})()
```

> 빈 함수 활용 + constructor 복구

```javascript
var extendClass3 = function(SuperClass, SubClass, subMethods) {
    SubClass.prototype = Object.create(SuperClass.prototype)
    SubClass.prototype.constructor = SubClass
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method]
        }
    }
    Object.freeze(SubClass.prototype)
    return SubClass
}
```

> Object.create 활용 + constructor 복구

## Super 구현

하위 클래스의 메서드에서 상위 클래스의 메서드 실행 결과를 바탕으로 추가적인 작업을 수행하고 싶을 때가 있다 이럴 때 매번 `SuperClass.prototype.method.apply(this, arguments)`로 해결하기에는 가독성이 떨어지기에 다른 언어들의 `super`문법을 구현해보자.

```javascript
var extendClass = function(SuperClass, SubClass, subMethods) {
    SubClass.prototype = Object.create(SuperClass.prototype)
    SubClass.prototype.constructor = SubClass
    
    SubClass.prototype.super = function(propName) {
        var self = this
        if (!propName) return function() {
            SuperClass.apply(self, arguments)
        }
        var prop = SuperClass.prototype[propName]
        if (typeof prop !== 'function') return prop
        return function() {
            return prop.apply(self, arguments)
        }
    }
    
    if (subMethods) {
        for (var method in subMethods) {
            SubClass.prototype[method] = subMethods[method]
        }
    }
    Object.freeze(SubClass.prototype)
    return SubClass
}

var Rectangle = function(width, height) {
    this.width = width
    this.height = height
}
Rectangle.prototype.getArea = function() {
    return this.width * this.height
}
var Square = extendClass(
	Rectangle,
    function(width) {
        this.super()(width, width)
    }, {
        getArea: function() {
            console.log('size is: ', this.super('getArea')())
        }
    }
)

var sq = new Sqaure(10)
sq.getArea() // size is: 100
console.log(sq.super('getArea')()) // 100
```



## ES5와 ES6의 클래스 문법 비교

* `ES5`

```javascript
var ES5 = function(name) {
    this.name = name
}
ES5.staticMethod = function() {
    return this.name + ' staticMethod'
}
ES5.prototype.method = function() {
    return this.name + ' method'
}

var es5Instance = new ES5('es5')
console.log(ES5.staticMethod()) // es5 staticMethod
console.log(es5Instance.method()) // es5 method
```

* `ES6`

```javascript
var ES6 = class {
    constructor (name) {
        this.name = name
    }
    static staticMethod() {
        return this.name + ' staticMethod'
    }
    method() {
        return this.name + ' method'
    }
}
var es6Instance = new ES6('es6')
console.log(ES6.staticMethod()) // es6 staticMethod
console.log(es6Instance.method()) // es6 method
```

* 클래스 상속

```javascript
var Rectangle = class {
    constructor(width, height) {
        this.width = width
        this.height = height
    }
    getArea() {
        return this.width * this.height
    }
}
var Square = class extends Rectangle {
    constructor (width) {
        super(width, width)
    }
    getArea() {
        console.log('size is', super.getArea())
    }
}
```

