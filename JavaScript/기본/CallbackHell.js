// 실행부

// anonymousFunc()
// namedFunc()
// firstPromiseFunc()
// secondPromiseFunc()
// generatorFunc()
promiseAsyncFunc()


// 익명 함수
function anonymousFunc() {
  setTimeout((name) => {
    let coffeeList = name
    console.log(coffeeList)
  
    setTimeout((name) =>  {
      coffeeList += `, ${name}`
      console.log(coffeeList)
  
      setTimeout((name) =>  {
        coffeeList += `, ${name}`
        console.log(coffeeList)
  
        setTimeout((name) =>  {
          coffeeList += `, ${name}`
          console.log(coffeeList)
  
        }, 500, '카페라떼')
      }, 500, '카페모카')
    }, 500, '아메리카노')
  }, 500, '에스프레소')
}

// 기명함수
function namedFunc() {
  let coffeeList = ''

  const addEspresso = (name) => {
    coffeeList = name
    console.log(coffeeList)
    setTimeout(addAmericano, 500, '아메리카노')
  }
  const addAmericano = (name) => {
    coffeeList += `, ${name}`
    console.log(coffeeList)
    setTimeout(addMocha, 500, '카페모카')
  }
  const addMocha = (name) => {
    coffeeList += `, ${name}`
    console.log(coffeeList)
    setTimeout(addLatte, 500, '카페라떼')
  }
  const addLatte = (name) => {
    coffeeList += `, ${name}`
    console.log(coffeeList)
  }
  
  setTimeout(addEspresso, 500, '에스프레소')
}

// Promise - 1
function firstPromiseFunc() {
  new Promise(resolve => {
    setTimeout(() => {
      let name = '에스프레소'
      console.log(name)
      resolve(name)
    }, 500)
  }).then(prevName => {
    return new Promise(resolve => {
      setTimeout(() => {
        let name = prevName + ', 아메리카노'
        console.log(name)
        resolve(name)
      }, 500)
    })
  }).then(prevName => {
    return new Promise(resolve => {
      setTimeout(() => {
        let name = prevName + ', 카페모카'
        console.log(name)
        resolve(name)
      }, 500)
    })
  }).then(prevName => {
    return new Promise(resolve => {
      setTimeout(() => {
        let name = prevName + ', 카페라떼'
        console.log(name)
        resolve(name)
      }, 500)
    })
  })
}

// Promise - 2
function secondPromiseFunc() {
  const addCoffee = (name) => {
    return (prevName) => {
      return new Promise(resolve => {
        setTimeout(() => {
          let newName = prevName ? prevName + `, ${name}` : name
          console.log(newName)
          resolve(newName)
        }, 500)
      })
    }
  }

  addCoffee('에스프레소')()
    .then(addCoffee('아메리카노'))
    .then(addCoffee('카페모카'))
    .then(addCoffee('카페라떼'))
}

// Generator
function generatorFunc() {
  function addCoffee(prevName, name) {
    setTimeout(() => {
      coffeeMaker.next(prevName ? prevName + `, ${name}` : name)
    }, 500)
  }
  function * coffeeGenerator() {
    const espresso = yield addCoffee('', '에스프레소')
    console.log(espresso)
    const americano = yield addCoffee(espresso, '아메리카노')
    console.log(americano)
    const mocha = yield addCoffee(americano, '카페모카')
    console.log(mocha)
    const latte = yield addCoffee(mocha, '카페라떼')
    console.log(latte)
  }
  
  const coffeeMaker = coffeeGenerator()
  coffeeMaker.next()
}

// Promise + Async/await
function promiseAsyncFunc() {
  const addCoffee = (name) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(name)
      }, 500)
    })
  }
  const coffeeMaker = async () => {
    let coffeeList = ''
    const _addCoffee = async (name) => {
      coffeeList += (coffeeList ? ', ': '') + await addCoffee(name)
    }
    await _addCoffee('에스프레소')
    console.log(coffeeList)
    await _addCoffee('아메리카노')
    console.log(coffeeList)
    await _addCoffee('카페모카')
    console.log(coffeeList)
    await _addCoffee('카페라떼')
    console.log(coffeeList)
  }

  coffeeMaker()
}