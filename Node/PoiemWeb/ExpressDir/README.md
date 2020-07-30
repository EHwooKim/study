# Express

[Express 공식문서](http://expressjs.com/ko/)

아래의 내용은 [Poiemaweb](https://poiemaweb.com/)의 본문을 옮긴 것입니다.

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

[Response method](http://expressjs.com/ko/4x/api.html#res.append)

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

  

