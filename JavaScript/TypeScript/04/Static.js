class Foo4 {
    constructor() {
        // 생성자가 호출될 때마다 카원터를 1씩 증가시킨다.
        Foo4.instanceCounter++;
    }
}
Foo4.instanceCounter = 0;
var f1 = new Foo4();
var f2 = new Foo4();
var f3 = new Foo4();
console.log(Foo4.instanceCounter);
