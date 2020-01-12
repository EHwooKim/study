Date.daysDiff = (date1, date2) => {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) return ''

    const d1 = date1.getTime() // 표준시를 기준으로 경과한 시간을 밀리 단위로 환산하여 반환한다.
    const d2 = date2.getTime()

    let diff = d2 - d1         // 두 밀리초를 뺼셈 연산하여 두 시점 사이 경과한 시간을 구한다. (밀리초)
    console.log(diff)

    const seconds = Math.floor((diff = diff / 1000) % 60)  // 밀리초를 초 단위로 환산
    const minutes = Math.floor((diff = diff / 60) % 60)
    const hours = Math.floor((diff = diff / 60) % 24)
    const days = Math.floor(diff / 24)
    return `${days} dats, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`
}

var from = new Date(2000, 0, 1)
var to = new Date(from.getFullYear() + 1, from.getMonth() + 3,
    from.getDate() + 5, from.getHours() + 4, from.getMinutes() + 30,
    from.getSeconds() + 50)

console.log(`From   > ${from}`)
console.log(`To     > ${to}`)
console.log(Date.daysDiff(from, to))