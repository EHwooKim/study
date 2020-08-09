# Socket.io

[Socket.io](http://socket.io/)

## 1. Install

```bash
$ mkdir soketio-chat cd socketio-chat
$ npm i -y
$ npm i --save --save-exact socket.id express
```

## 2. Real-time Chat App

Socket.io를 사용하여 클라이언트 간 Real-time Chat app을 구현해 본다.

### 01. Server-side

서버 측 코드를 작성한다. 루트 디렉터리에 app.js를 생성한다.

Express를 사용하여 http 서버를 생성한다. 그리고 생성된 http 서버를 socket.io server로 upgrade한다.

```javascript
var app = require('express')()
var server = require('http').createServer(app)
// http server를 socket.io server로 upgrade한다.
var io = require('socket.io')(server)

server.listen(3000, function() {
  console.log('Socket IO server listening in port 3000')
})
```

root url에 대한 라우트를 정의한다. localhost:3000으로 서버에 접속하면 클라이언트에 index.html을 전송한다.

```javascript
var app = require('express')()
var server = require('http').createServer(app)
// http server를 socket.io server로 upgrade한다.
var io = require('socket.io')(server)

// localhost:3000으로 서버에 접속하면 클라이엍느로 index.html을 전송한다.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

server.listen(3000, function() {
  console.log('Socket IO server listening in port 3000')
})
```

클라이언트가 socket.io 서버에 접속했을 떄 connection 이벤트가 발생한다. connection event handler를 정의한다.

```javascript
// connection event handler
// connection이 수립되면 event handler function의 인자로 socket이 들어온다.
io.on('connection', function(socket) {
    
})
```

connection event handler function의 인자로 `socket 객체`가 전달된다. `socket 객체`는 개별 클라이언트와의 interacting을 위한 기본적인 객체이다. io 객체는 연결된 전체 클라이언트와의 interacting을 위한 객체이다.

connection event가 발생하면(즉 클라이어튼가 접속하면) 클라이언트가 전송한 메시지를 수신하거나 클라이어튼에게 메시지를 송신한다.

**클라이언트가 전송한 메시지 수신**

현재 접속되어 있는 클라이언트로부터의 메시지를 수신하기 위해서는 `on 메소드`를 사용한다.

| Parameter  | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| event name | 클라이언트가 메시지 송신 시 지정한 이벤트 명 (string)        |
| function   | 이벤트 핸들러. 핸들러 함수의 인자로 클라이언트가 송신한 메시지가 전달된다. |

```javascript
socket.on('event name', function(data) {
    console.log('Messgae from Client:', + data')
})
```

**클라이언트에게 메시지 송신**

| Method                | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| io.emit               | 접속된 모든 클라이언트에게 메시지를 전송한다.                |
| socket.emit           | 메시지를 전송한 클라이언트에게만 메시지를 전송한다.          |
| socket.broadcast.emit | 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다. |
| io.to(id).emit        | 특정 클라이언트에게만 메시지를 전송한다. id는 socket 객체의 id 속성값이다. |

| Parameter  | Description                    |
| ---------- | ------------------------------ |
| evnet name | 이벤트 명 (string)             |
| msg        | 송신 메시지 (string or object) |

```javascript
// 접속된 모든 클라이언트에게 메시지를 전송한다.
io.emit('evnet_name', msg)
// 메시지를 전송한 클라이언트에게만 메시지를 전송한다.
socket.emit('event_name', msg)
// 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다.
socket.broadcast.emit('event_name', msg)
// 특정 클라이언트에게만 메시지를 전송한다.
io.to(id).emit('evnet_name', data)
```

완성된 서버 측 코드 [app.js](./socketio-chat/app.js)