// Promise 객체
function promiseForHomework(mustDo) {  // 숙제에 대한 Promise 객체를 생성하는 함수를 정의. 매개변수로 mustDo를 정의하고, mustDo에 의해 Promise에 대한 성공, 실패를 결정합니다.
    return new Promise((resolve, reject) => { // new 키워드를 통해 Promise 객체를 생성합니다. 이때 계산될 코드를 담은 함수를 인자로 전달하는데, 이 함수에는 resolve와 reject 매개변수를 가집니다.
        // resolve는 약속을 성공시킬 수 있는 함수로 호출 시 결과를 인자로 전달합니다. 반면 reject는 실패 처리를 위한 함수로 호출 시 실패 이유를 함께 전달할 수 있습니다.
        // 즉, Promise 생성자 함수에 전달되는 함수의 본문에는 나중에 계산이 완료되는 일을 작성하게 됩니다.
        setTimeout(() => { // setTimeout 함수를 통해 3초 후에 실행될 코드를 정의합니다. 콘솔에 doing homework를 출력하는 코드는 3초 후에 실행되고, 
            console.log('doing homework')
            // promiseForHomework 전달받은 인자 값의 유무에 따라 resolve 함수 또는 reject함수가 호출됩니다. 
            if(mustDo) {
                resolve({           // resolve 함수가 호출되면 이후에 then 메소드에 전달된 첫 번째 인자의 함수가 호출되고,
                                    // 이떄 resolve에 전달한 전달 인자가 then 메소드의 전달된 함수의 매개변수로 전달됩니다.
                    result: 'homework-result'
                })
            } else {
                reject(new Error('Too lazy!'))
            }
        }, 3000)
    })
}

const promiseA = promiseForHomework(true) // 새로운 숙제 Promise 객체를 생성합니다. 이떄 true를 인자로 전달하여 3초 후에 약속이 꼭 이행되게 합니다.
console.log('promiseA created') // 그리고 콘솔에 promiseA created를 출력합니다. 7라인의 코드보다 나중에 작성하였어도 7라인은 3초후에 실행되는 비동기 코드이기 때문에 
                                // 콘솔에 promiseA created가 먼저 출력됩니다.

const promiseB = promiseForHomework() // 새로운 숙제 Promise 객체를 생성합니다. 마찬가지로 콘솔에 promiseB created가 doing homework 보다 먼저 출력되고
console.log('promiseB created')       // 이전의 숙제 Promise와 다르게 전달 인자가 없이 생성하여 3초후에 reject가 호출됩니다.

// 각 Promise 객체에 resolve와 reject가 되었을 경우 호출될 함수들을 정의합니다.
promiseA.then(v => console.log(v))  // promiseA 객체는 resolve가 되어 {result: "homework-result"}가 콘솔에 출력되고, 
promiseB                            // promiseB 객체는 reject가 돼서
    .then(v => console.log(v))      // 31라인에 전달함 함수는 호출이 안되고
    .catch(e => console.error(e))   // catch 메소드에 전달한 함수가 호출되어 거절된 이유인 에러 객체가 콘솔에 출력됩니다.