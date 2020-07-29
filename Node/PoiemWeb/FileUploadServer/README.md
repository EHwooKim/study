# Node.js - File Upload

>  :pencil: [poiemaweb](https://poiemaweb.com/nodejs-file-upload-example)의 본문을 옮긴 것입니다.

## Use cases

앞으로 구현해볼 예제의 use case는 아래와 같다.

* 사용자는 `웹 브라우저`로 이 애플리케이션을 이용할 수 있다.
* 사용자가 `http://domain/start`를 요청하면 파일 업로드 폼이 들어있는 울컴 페이지를 볼 수 있어야 한다.
* 업도르할 이미지 파일을 선택해서 폼으로 전송하면, 해당 이미지는 `http://domain/upload`로 업로드 되어야 하며, 업로드가 끝나면 해당 페이지에 표시된다.

## Application Stack

use case를 만족시키기 위해 구현되어야 할 기술적 사항은 아래와 같다.

* 웹 페이지를 제공해야 한다. 따라서 HTTP 서버가 필요하다.
* 서버는 URL 요청(request)별로 다르게 응답해야 한다. 따라서, 요청과 요청을 처리할 핸들러들을 연결짓기 위한 `라우터(router)`같은 것이 필요하다.
* 서버로 도착한 요청들, 그리고 라우터를 이용해서 라우팅된 요청들을 만족시키기 위해서 실제적인 `요청 핸들러(request handler)`가 필요하다.
* 라우터는 들어오는 어떠한 `POST` 데이터들도 다룰 수 있어야 한다. 그리고 해당 데이터를 다루기 편한 형태로 만들어 `요청 핸들러(request handler)`들에게 넘겨야 한다. 따라서 `요청 데이터 핸들링(request data handling)`이 필요하다.
* URL에 대한 요청을 다루는 것뿐 아니라 URL이 요청되었을 떄 **내용을 표시할 필요도 있다.** 즉, 요청 핸들러는 사용자 브라우저로 컨텐트를 보내기 위한 `뷰 로직`이 필요하다.
* 사용자가 이미지들을 업로드 할 수 있어야 하므로 세부 사항을 다루는 `업도르 핸들링(upload handling)`이 필요하다.

## Basic HTTP Server

요청을 보내면 'Hello World' 응답을 보내는 서버를 만들어보았다.

![basic-server](https://user-images.githubusercontent.com/52653793/88630868-3ba8d100-d0ec-11ea-91ed-417864672116.png)

Javascript 함수는 일급 객체이다.

![server](https://user-images.githubusercontent.com/52653793/88632735-f76b0000-d0ee-11ea-955f-f5e353314459.png)

Javascript 함수는 일급 객체임을 이용하여 아래와 같이 코드를 작성하였다. 

![제목 없음](https://user-images.githubusercontent.com/52653793/88632813-18335580-d0ef-11ea-84a1-8a9d57cd5e11.png)

* 한번의 브라우저 요청에 "Request received" 메시지가 두번 찍히는 것은 대부분의 브라우저가 `http://localhost:8888 `요청을할 때 `http://localhost:8888/favicon.ico` 를 로드하려 하기 때문이다.

## 모듈화

지금까지 작성한 HTTP 서버 생성 로직을 모듈화 한다.

![제목 없음](https://user-images.githubusercontent.com/52653793/88633760-6563f700-d0f0-11ea-9800-678671f4ec7a.png)

![제목 없음](https://user-images.githubusercontent.com/52653793/88633838-7dd41180-d0f0-11ea-8227-0679ac34aef5.png)

```bash
// 실행
$ node index.js
```

## Routing

요청 `URL`과  `GET/POST 파라미터`를 router로 전달하면 router는 어떤 코드를 실행할지 결정할 수 있어야 한다.

즉, 전달된 요청 URL과 파라미터에 따라 서버의 할 일이 정해지는데 서버의 할 일을 수행하는 함수를 `request handler`라 한다. 우선 요청 URL과 파라미터를 취득할 수 있어야 한다.

<hr>

우리에게 필요한 모든 정보는 `request 객체`를 통해 접근할 수 있다. 하지만 이 정보를 얻어내기 위해 `url`과 `querystring` 모듈이 추가로 필요하다.

`url 모듈`은 URL의 각각의 부분 (예를 들면 URL path와 query sring)을 추출할 수 있는 메소드를 제공한다.

`quertstring 모듈`은 query string을 requset 파라미터로 파싱하는데 사용한다. 또한, `POST` 요청의 body를 파싱하는 데도 사용된다.

![url-quert-module](https://user-images.githubusercontent.com/52653793/88638937-1d949e00-d0f7-11ea-8d2b-02b7a40eabe1.png)

```
localhost:8888/user?name=kim
Path name is /user
Request parameter is [Object: null prototype] { name: 'Kim' }
```

요청 URL과 파라미터 취득 처리를 어디에 구현해야 하는지 논의가 필요하지만 일단은 HTTP server의 일부로 만들어 본다.

![url-module](https://user-images.githubusercontent.com/52653793/88637168-c42b6f80-d0f4-11ea-8ec4-0aa4f95b5e93.png)

![urlpath](https://user-images.githubusercontent.com/52653793/88637393-11a7dc80-d0f5-11ea-85d0-9b2c2c40ef99.png)

`url 모듈`을 사용하여 URL path 기분으로 요청을 구분할 수 있게 되었다.

이것을 이용하면 URL path를 기반으로 요청을 request handler로 매핑하는 `router`를 만들 수 있다.

`router`의 역할은 **클라이언트의 요청**과 **request handler**를 매핑하는 것이다.

예를 들어, /start 요청과 /upload 요청에 각각 달리 반응하는 request handler를 매핑할 수 있다.

우선은 URL path를 전달받는 `router`를 구현한다.

![route](https://user-images.githubusercontent.com/52653793/88640036-70bb2080-d0f8-11ea-89c3-07b87abdac6e.png)



## 의존성 주입

router를 server와 어떻게 엮을지 고려해야 한다.

HTTP server가 router를 사용한다는 것을 알게 해야 한다. dependency injection을 통해 server와 router를 느슨하게 결합한다.

먼저 router 함수를 파라미터로 넘길 수 있도록 server의 start() 함수를 확장한다.

![route-server](https://user-images.githubusercontent.com/52653793/88673227-534f7c00-d123-11ea-9efb-569d79409f76.png)	

그리고 index.js를 확장한다. 여기서 router 함수를 server로 주입(inject)한다.

![router-index](https://user-images.githubusercontent.com/52653793/88673459-99a4db00-d123-11ea-8258-5ace136f70d2.png)

server는 router 객체의 route 메소도를 주입(inject)받아 route 메소드를 호출할 수 있게 되었다.

## Request handler

`server`는 `router.route`를 주입받아 사용할 수 있게 되었다. `router.route`는 `server`로 부터 `pathname`을 전달 받는데 이 `pathname`에 따라 각각의 `Requset handler`를 호출하면 요청에 따라 행동하는 서버를 만들 수 있다.

![request-handler](https://user-images.githubusercontent.com/52653793/88681364-7599c780-d12c-11ea-9141-91c59403f5d4.png)

`router`에 `Request handler`를 하드코딩할 수도 있으나 이 방법을 사용하면 handler의 수가 늘어날 때마다 `router`에서 request와 handler를 매핑하는 일을 해야만 한다.

`server`와 `router` 이외에 request와 handler의 관계를 알고 있는 무언가를 만들어 `router`에 주입하면 깔끔한 연결이 될 것이다.

request와 handler의 관계를 아고 있는 무언가는 키와 값의 쌍인 Javascropt object의 성질과 잘 맞아 떨어진다.

![handler-index](https://user-images.githubusercontent.com/52653793/88682265-71ba7500-d12d-11ea-88d3-97477444ff61.png)

![handler-server](https://user-images.githubusercontent.com/52653793/88682360-8d258000-d12d-11ea-9a59-b3ee400ea325.png)

![handler-router](https://user-images.githubusercontent.com/52653793/88682474-aa5a4e80-d12d-11ea-8f01-82f190b5ca26.png)

브라우저에 표시된 "Hello world"는 `server.js`의 `onRequest` 함수 내에서 처리하고 있다. 사실 이 처리는 `request handler`가 처리하여야 한다.

먼저 떠오르는 아이디어는 `request handler`가 화면에 표시할 콘텐츠를 반환해 주면 콘텐츠를 server가 `response.write`로 처리하는 것일 것이다.

![handler](https://user-images.githubusercontent.com/52653793/88683488-d2967d00-d12e-11ea-963d-44105b59d79b.png)

![handler-router](https://user-images.githubusercontent.com/52653793/88683559-e93cd400-d12e-11ea-81c5-55322710570a.png)

![router-server](https://user-images.githubusercontent.com/52653793/88683630-fce83a80-d12e-11ea-90d2-cd42f82291e2.png)

이제 각 요청에 맞는 문구가 출력되며, 존재하지 않는 요청에 대해서는 "404 Not found"가 출력된다.

## Blocking *vs* Non-Blocking

위의 코드는 문제없이 잘 동작하는 것처럼 보이지만 치명적 결함을 가지고 있다. `request handler`에 비동기 방식의 코드를 포함시키면 문제가 발생한다.

기존의 웹 서버는 대부분 **쓰레드를 기반**으로 하는 동기 방식으로 I/O를 처리한다. 반면에 Node.js는 **이벤트를 기반**으로 하는 비동기 방식으로 I/O를 처리한다.

Node.js의 방식을 **`이벤트 기반 비동기 방식`**이라 한다. 동시작업을 event loop을 실행해서 처리하며 단일 쓰레드이기 때문에 접속 수에 관계없이 메모리 사용량과 같은 시스템 리소스 사용량에 변화가 거의 없어 대규모 네트워크 프로그램을 개발하기 적합한 형태이다. 다만, 단일 쓰레드이기 때문에 서버에 문제가 발생하는 순간 서버는 정지하게 된다.

Node.js가 비동기 방식으로 동작하므로 우리도 blocking 방식을 피하고 non-block 방식을 사용해야만 한다.

<hr>	

동기방식의 코드를 비동기로 전환하는 **첫번째 방법**은 동기방식 API에 대응하는 코드를 비동기 API로 교체하는 것이다. **두번째**는 동기방식에서 동기 API 호출이후에 처리하여야 하는 (순서가 있는) 로직을 그대로 Callback 함수로 옮기는 것이다.

지금까지의 코드는 `request handler`에 비동기 방식의 코드를 포함시키면 문제가 발생한다고 했다. 정말 그런지 확인해보자.

![wrong-async-handler](https://user-images.githubusercontent.com/52653793/88755594-7702d880-d19c-11ea-8c87-86aaeca622e9.png)

shell 커맨드를 Node.js 안에서 실행하는 `exec`은 non-blocking 방식으로 동작한다.

서버에 접속하면 현재 디렉토리에 있는 모든 파일 리스트를 출력하지 않고 empty가 출력된다.

위의 코드는 동기적으로 동작한다. 즉, `exec`를 호출한 후 결과를 기다리지 않고 바로 `return content`를 실행하고 이 시점에서 content는 여전히 empty이기 떄문에 화면에 empty가 출력된다.