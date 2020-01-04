// let으로 변수 선언하기
if (true) {
    var functionScopeValue = 'global'
    let blockScopeValue = 'local'
}
console.log(functionScopeValue) // var는 함수단위의 유효 범위를 가지게 되어 if문의 블록에서 정의하여도 블록 밖에서 접근이 가능핟.
console.log(blockScopeValue) // let은 블록 단위의 유효 범위를 가지게 되어 if문의 블록 밖에서 접근할 경우 ReferenceError가 발생한다.
