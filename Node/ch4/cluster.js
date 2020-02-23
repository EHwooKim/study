const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) { // 클러스터에는 마스터 프로세스와 워커 프로세스가 있습니다.
    // 마스터 프로세스는 CPU 개수만큼 워커 프로세스를 만들고, 8085번 포트에서 대기합니다. 요청이 들어오면 만들어진 워커 프로세스에 요청을 분배합니다. 워커 프로세스가 실질적인 일을 하는 프로세스입니다.
    console.log(`마스터 프로세스 아이디: ${process.pid}`) // CPU 개수만큼 워커를 생산
    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork()
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`)
        cluster.fork() // 워커 프로세스가 종료되었을 때 새로 하나를 생성합니다. 이제 워커가 죽어도 새로 하나 더 생성합니다.
    })                 // 하지만 이러한 방식으로 오류를 막는 것은 좋지 않은 생각입니다. 오류 자체 원인을 찾는게 가장 현명하지만 그래도 예기치 못한 에러로 서버가 종료되는 현상을 방지할 수 있기에 클러스터링을 적용시켜두는 것이 좋습니다.
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.write('<h1>Hello Node!</h1>')
        res.end('<p>Hello Cluster</p>')
        setTimeout(() => { // 요청이 들어오고 1초 후 워커 종료. 8번까지 서버가 응답합니다. 즉 8번까지는 오류가 발생해도 서버가 정상 작동할 수 있다는 뜻입니다.
            process.exit(1)
        }, 1000)
    }).listen(8085)

    console.log(`${process.pid}번 워커 실행`)
}