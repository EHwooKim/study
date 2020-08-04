# Express

[Express 공식문서](http://expressjs.com/ko/)

아래의 내용은 [Poiemaweb](https://poiemaweb.com/)의 본문을 옮긴 것입니다.

## 목차

* [Install](#Install)
* [Routing](#Routing)
  * [Route method](#Route-method),  [Route path](#Route-path),  [Route handler](#Route-handler),  [Response method](#Response-method)
* [Middleware](#Middleware)
* [Static File](#Static-File)
* [Error Handler](#Error-Handler)
* [Session]($Session)

## Install & usage

```bash
$ npm i express
```

```javascript
// 주로 아래와 같은 형태로 시작을 한다.
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World'))
```

## Routing

클라이언트는 서버에 URI 및 특정한 HTTP 요청 메소드(GET, POST 등)로 요청을 전달하고, 이러한 요청에 응답하는 방법을 결정하는 것을 라우팅이라 한다.

라우트 정의에는 다음과 같은 구조가 필요하다.

* **`app.method(path, handler)`**
  * `app` : express instance
  * `method` : HTTP request method
  * `path` : route
  * `handler` : Client-side request url과 route가 일치할 경우 실행될 함수

`username`과 `password`를 담아 요청을 보내면 해당 내용을 그대로 보내는 라우트틀 만들어보자.

먼저 **request body parsing** 미들웨어인 `body-parser`를 설치한다. `body-parser`민들웨어는 페이로드(POST 요청 데이터와 같이 Request message의 body에 담겨 보내진 데이터)를 request 객체의 body 프로퍼티에 바인딩한다.

```bash
$ npm i body-parser
```

![express-routing](https://user-images.githubusercontent.com/52653793/88921356-583e3800-d2a9-11ea-8f7b-356069d12f8c.png)

### Route method

Express는 HTTP메소드에 해당하는 다음과 같은 라우팅 메소드를 지원한다.

```
get, post, put, head, delete, options, trace, copy,
lock, mkcol, move, purge, propfind, proppatch, unlock,
report, mkactivity, checkout, merge, m-search, notify,
subscribe, unsubscribe, patch, search, connect.
```

`app.all()` 메소드는 모든 HTTP method에 대응한다.

`handler`안에서 `next()`를 사용하여 후속 `router handler`로 제어를 전달할 수 있다.

![get-post-next](https://user-images.githubusercontent.com/52653793/88922643-5b3a2800-d2ab-11ea-8a81-265d46c7a603.png)

### Route path

Route path에는 문자열 또는 정규표현식을 사용할 수 있다.

![route-path](https://user-images.githubusercontent.com/52653793/88923033-01862d80-d2ac-11ea-9330-759f81191f56.png)

* 두번째 예시의 console.log(req.params)의 결과는 아래와 같다.

  ```
  { userId: '7', itemId: '7' }
  ```

### Route handler

`Router handler`는 요청을 처리하는 콜백함수이며 `next()`를 사용하면 **후속** `router handler`로 제어를 전달할 수 있다.

`함수`나 :heavy_exclamation_mark:**`함수 배열`** 또는 둘을 조합한 형태로 사용한다.

![handler-function](https://user-images.githubusercontent.com/52653793/88924045-a3f2e080-d2ad-11ea-96e3-0ded9ef7f012.png)

### Response method

| 메소드           | 설명                                                         |
| ---------------- | ------------------------------------------------------------ |
| res.end()        | 응답 프로세스를 종료한다.                                    |
| res.send()       | 다양한 유형의 응답을 전송한다.                               |
| res.status()     | HTTP 응답을 보낸다. 다른 메소드와 함께 사용 가능하다 <br />ex) res.status(404).send('404 error') |
| res.redirect()   | 요청 경로를 재지정한다.                                      |
| res.render()     | view template을 렌더링한다.                                  |
| res.sendStatus() | 응답 상태 코드를 설정한 후 해당 코드를 문자열로 표현한 내용을 응답 본문으로 전송한다. |

* `res.sendStatus()`

  ```
  res.sendStatus(200); // equivalent to res.status(200).send('OK') 
  res.sendStatus(403); // equivalent to res.status(403).send('Forbidden') 
  res.sendStatus(404); // equivalent to res.status(404).send('Not Found') 
  res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
  ```

더 많은 `method`들은 [공식문서 - Response method](http://expressjs.com/ko/4x/api.html#res.append)에서 확인해봅시다.

## Middleware

미들웨어 함수는 요청 오브젝트(req), 응답 오브젝트(res) 그리고 애플리케이션의 request - response cycle 내에서 다음 미들웨어 함수에 대한 엑세스 권한을 갖는 함수이다.

미들웨어에는 유용한 동작을 하거나 요청이 실행되는데 도움이 되는 무언가를 추가하는 `패스스루(pass-through)` 함수가 있다.

예를 들면 bodyParser()와 cookieParser()는 각각 HTTP 요청 페이로드(req.body)와 파싱된 쿠키 데이터(req.cookie)를 추가한다.

```javascript
const express = require('express')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()


// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
```

커스텀 미들웨어를 만들어 사용할 경우, 해당 미들웨어 함수가 `요청 - 응답 주기`를 종료하지 않는 경우에는 `next()`를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 한다. 그렇지 않으면 해당 요청은 정지된 채로 방치된다.

![second](https://user-images.githubusercontent.com/52653793/88945291-c5ad9100-d2c8-11ea-8b2d-e19f99153f78.png)

## Static File

HTML, CSS, Javascript, 이미지 파일과 같은 정적 파일을 제공하기 위해 Express의 기본 제공 미들웨어 함수인 `express.static`을 사용한다. 정적 파일들이 저장되어 있는 디렉터리명을 express.static 함수에 전달하면 정적 파일 서비스를 사용할 수 있다.

아래는 public 디렉터리에 있는 정적 파일을 제공하는 예이다.

```javascript
app.use(express.static('public'))
```

기존의 웹서버 상의 파일을 요청하는 것과 동일하게 정적 파일 서비스를 사용할 수 있다.

```
http://localhost:3000/index.html
http://localhost:3000/images/bg.png
```

## Error Handler

Express에서 에러 처리는 **매개변수가 4개(err, req, res, next)인 미들웨어 함수**를 사용한다.

```javascript
app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send({ status:500, message: 'internal error', type: 'internal'})
})
```

> 전달하고자 하는 텍스만 클라이언트로 전송하여도 무방하다

```javascript
...
	res.status(500).send('internal server error')
...
```

또는 view template나 html을 render할 수도 있다.

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.render('500') // 500.jade or 500.ejs
})
```

`next()`를 사용하여 `Error handler middleware`로 에러 처리를 위임할 수 있다.

`next()`를 인수없이 호출하면 이후에 일치하는 route로 이동하지만,  next()를 인수를 전달하여 호출하면 Error handler middleware로 처리를 이동시킨다.

![errorhandler](https://user-images.githubusercontent.com/52653793/88993394-ca9e2f00-d320-11ea-9e10-bb77d1ca370e.png)

* `Error Handler`는 **반드시** 4개의 인자가 필요하며, 4개의 인자가 있는 handler는 자동으로 `Erorr handler`로 인식합니다.
  * `logHandler`의 err 인자를 지우고 실행해보니 에러 상황 때 실행되지 않았습니다.
* `next() `안에 인수를 전달해야 다음 `Error Handler`로 처리가 이동됩니다.
  * `logHandler`의 next() 인자를 없애니 errorHandler가 실행되지 않았습니다.
* `middleware`는 위에서부터 순서대로 실행됩니다.
  * `logHandler`와 `erorrHandler`의 미들웨어 사용(app.use) 순서를 바꾸니 errorHandler에서 req-res-cycle이 종료되어 logHandler가 실행되지 않았습니다.
* **오류 처리 미들웨어는 다른 `app.use()` 및 라우트 호출을 정의한 후에 마지막으로 정의해야 합니다.**
  * 위 예제에서도 지금까지와는 다르게 라우트 호출 밑에 error handler를 정의한 것을 볼 수 있으며 라우터 위쪽으로 순서를 바꾸니 실행되지 않았습니다.

# Session

Web applicaion은 로그인 인증 등의 용도로 Session을 사용한다. Express는 메모리 상(MemoryStore)에 Session data를 저장할 수 있다.

개발을 위한 MemoryStore의 사용은 문제될 것이 없지만 production 환경에서 Memory Store의 사용은 적절하지 않으며 복수 서버 상에서의 Session data 공유도 Memorry Store 에서는 불가능하다.

따라서 production 환경에서는 Redis, MongoDB를 사용하여 영속적 Session data 관리하는 것이 일반적이다.

## 01. Sesion & Cookie

http 프로토콜의 stateless 문제를 보완하여 클라이언트와 서버 간의 논리적 연결을 위한 방법에는 `Session`과 `Cookie`가 있다.

* `Cookie` 

  쿠키는 웹서버가 브라우저를 통해 클라이언트에 일시적으로 데이터를 저장하는 방식을 의미한다. 

  웹서버에 접속한 클라이언트의 정보를 쿠키에 기입한 후 클라이언트에 저장하면 이후 웹서버에 전송되는 요청에 쿠키내의 정보가 같이 전송되는 방식이다.

  쿠키는 **클라이언트에 저장**된 작은 조각의 텍스트 파일로서 **세션에 비해 보안에 취약하다. ** 따라서 아이디와 비밀번호를 쿠키에 저장하는 방식은 피해야 한다.

* `Session`

   세션의 사전적 의미는 '개회 중임', '개정 중임'으로 웹서버에 접속되어 있는 상태를 의미한다. 즉, **브라우저를 통해 서버에 접속한뒤 접속을 종료하는 시점까지를 세션이라고 한다.**

   세션은 최초 접속 시점에 생성되어 일정 기간 유지되며 접속이종료되면(브라우저 종료) 삭제된다.

   쿠키와 달리 세션은 **서버에 저장된다.** 따라서 클라이언트에 저장되는 쿠키보다 안전하다 할 수 있다.

* `Cookie - based Session`

   쿠키에 `Session ID`만을 저장하고 전송된 Session ID를 사용하여 Session에 저장된 정보를 사용하는 방법이다. 쿠키에 보안에 관련된 정보를 저장하는 것은 바람직하지 않다.

## 02. Memorry Store를 사용한 세션 관리

Express 4.x 에서는 [express-session middleware](https://www.npmjs.com/package/express-session)가 express에서 분리되었으므로 별도의 npm install이 필요하다. express-session 1.5.0 이후 버전부터는 cookie-parser middleware가 필요하지 않다.

```bash
$ npm i express-session
```

![express-session](https://user-images.githubusercontent.com/52653793/89246179-7effc400-d645-11ea-9b7d-9e365f87b95f.png)

session secret는 쿠키에 저장될 Session ID 서명에 사용된다. session secret는 랜덤한 일정 길이 이상의 문자열을 사용하는 것이 좋다.

세션 데이터는 쿠키에 저장되지 않고 server-side에 저장된다. 쿠키에는 session ID만이 저장된다.

MemoryStore는 개발에만 사용하는 것이 좋다.
