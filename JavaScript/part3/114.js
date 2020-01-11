// Date.UTC - 세계 표준 현재 시간을 나타내는 방법
const date = new Date()
const dateUTC = Date.UTC(
    date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()
)
console.log(date)
console.log(new Date(dateUTC))