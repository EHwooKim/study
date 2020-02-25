//Async 이해하기
function doJob(name, person) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (person.stamina > 50) {
                person.stamina -= 30
                resolve({
                    result: `${name} success`
                })
            } else {
                reject(new Error(`${name} failed`))
            }
        }, 1000)
    })
}

const harin = {stamina: 100}

const execute = async function() {          // async 함수를 표현식으로 정의합니다. 표현식 익명함수 function 앞에 async를 추가하여, execute 함수 내부에 비동기 작업을 제어합니다.
    try {                                   // 비동기로 처리되는 doJob 함수를 연달아 호출합니다. 비동기 로직 앞에 await 키워드를 추가하면,
        let v = await doJob('work', harin)  // 비동기 작업이 끝날 때까지 기다렸다가 다음 문장 코드를 처리합니다. 따라서 18 ~ 21 라인이 순서대로 실행될 것으로 보입니다.
        console.log(v.result)
        v = await doJob('study', harin)
        console.log(v.result)
        v = await doJob('work', harin)
        console.log(v.result)
        v = await doJob('study', harin)
    } catch (e) {                           // 에러 발생 시 try-catch 메소드를 통해 전달한 함수가 호출되어 거절된 이유인 에러 객체가 콘솔에 에러로 출력됩니다.
        console.log(e)
    }
}
execute()                                   // execute 함수를 호출합니다.