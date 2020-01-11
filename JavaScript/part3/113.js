// getFullYear, getMonth, getDate
console.log(new Date())
Date.prototype.yyyymmdd = function() {
    const yyyy = this.getFullYear()     // this 는 Date 객체를 가리킨다.
    const mm = this.getMonth() < 9 ? `0${this.getMonth() + 1}` : this.getMonth() + 1  // getMonth는 기본적으로 0부터 시작하기에 +1을 해줬습니다.
    const dd = this.getDate() < 10 ? `0${this.getDate()}` : this.getDate()
    return '' + yyyy + mm + dd
}

const date = new Date()
console.log(date.yyyymmdd())
