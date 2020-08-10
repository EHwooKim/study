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

### 02. Client-side

루트 디렉터리에 index.html을 생성한다.

클라이언트 라이브러리는 script tag의 src 어트리뷰트 값으로 "/socket.io/socket.io.js"을 지정하면 된다. socket.io 서버 기동시 socket.io.js 라이브러리를 자동 생성해주기 때문에 실제 path에 socket.io.js 파일을 배치할 필요는 없다. 

```javascript
<script src="/socket.io/socket.io.js"></script>
```

socket.io 서버에 접속하기 위해 io() 메소드를 호출한다.

```javascript
// socket.io 서버에 접속한다
var socket = io();
```

이떄 생성된 `socket`으로 **서버로의 메시지 송신** 또는 **서버로부터의 메시지 수신**을 할 수 있다.

**서버로의 메시지 송신**

현재 접속되어 있는 서버로 메시지를 송신하기 위해서는 `emit` 메소드를 사용한다.

| Parameter  | Description                   |
| ---------- | ----------------------------- |
| event name | 이벤트 명(string)             |
| msg        | 송신 메시지(string or object) |

```javascript
socket.emit("envt_name", msg)
```

**서버로부터의 메시지 수신**

현재 접속되어 있는 서버로부터의 메시지를 수신하기 위해서는 `on`메소드를 사용한다.

| Parameter  | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| event name | 서버가 메시지 송신 시 지정한 이벤트 명(string)               |
| function   | 이벤트 핸들러. 핸들러 함수의 인자에 서버가 송신한 메시지가 전달된다. |

```javascript
socket.on("event_name", function(data) {
    console.log('Message from Server: ' + data)
})
```

완성된 클라이언트 코드 [index.html](./socketio-chat/index.html)

## Namespace

[공식문서](https://socket.io/docs/namespaces/)

<hr>

socket.io는 서로 다른 엔드포인트 또는 경로를 할당하는 의미로 socket에 namespace를 지정할 수 있다.

namespace를 특별히 지정하지 않은 경우 default namespace인 `/`를 사용하게 된다.

사용자 지정 namespace를 사용할 경우의 예제는 아래오 같다.

```javascript
// Server-side
var nsp = io.of('/my-namespace')

nsp.on('connection', function(socket){
    console.log('someone connected')
})
nsp.emit('hi', 'everyone')
```

```javascript
// Client-side
// 지정 namespace로 접속한다.
var socket = io('/my-namespace')
```

## Room

각 namespace 내에서 임의의 채널을 지정할 수 있다. 이를 room이라 하며 이를 통해 room에 join되어 있는 클라이언트 만의 데이터 송수신이 가능하게 된다.

즉 각 클라이언트는 socket을 가지게 되며 이 socket은 namespace를 가지고 각 namespace는 room을 가질 수 있다.

각 socket은 랜덤하고 유일하게 작성된 socket.id로 구별된다. socket.io는 각 socket을 socket.id를 room 시별자로 사용하여 자동으로 room을 생성하고 join시킨다.

특정 클라이언트에게만 메시지를 전송할 때 `io.to(id).emit`을 사용하는데 이것은 사실 디폴트로 생성되어 자동 join된 개별 socket의 room에 소속되어 있는 유일한 클라이언트에 메시지를 전송한 것이다.

room에 join하기 위해서는 `join` 메소드를 사용한다.

완성된 코드 [server](./socketio-chat/app.js), [client](./socketio-chat/index-room.js)

