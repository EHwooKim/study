// 자바스크립트는 렉시컬(정적) 스코프이다!!!!!!!
var a = 'global'

function print1() {
    console.log(a)
}

function print2() {
    var a = 'local'
    print1()  // local일까 global일까~?
}

print1()
print2()