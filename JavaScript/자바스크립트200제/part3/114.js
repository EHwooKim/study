// Date.UTC - 세계 표준 현재 시간을 나타내는 방법
const date = new Date()
const dateUTC = Date.UTC(  // Date객체의 메소드 UTC는 매개변수로 지정된 날짜, 시간 보를 UTC 기준의 밀리초 시간으로 반환합니다.
    date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), // getUTC~ 메소드는 UTC로 계산된 연도,시간... 전보를 가져옵니다.
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()// 따라서 변수 date 날짜/시간 값의 UTC 기준 연도 정보가 반환됩니다.
)
console.log(new Date())
console.log(new Date(dateUTC)) // 변환된 UTC 기준 시간전보를 새로운 Date객체로 담습니다.
                               // 콘솔 출력하면 Date.prototype.toStirng 메소드가 실행되어, Date 객체 인스턴스 값이 문자형으로 자동 변환됩니다.
