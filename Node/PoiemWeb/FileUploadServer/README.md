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

##  Non-blocking 방식 requrest handler

지금까지는 handler가 작성한 content를 여러 layer를 거쳐 server에 전달하였다.

```
content의 이동 : request handler -> router -> server
```

새로운 방법은 `http.createServer`의 callback인 onRequest()에 취득한 `response`객체를 `router`를 통해 `request handler`에게 주입(inject)한다. 이제 handler는 이 객체가 가진 함수들을 이용해서 스스로 요청에 응답할 수 있게 되었다.

![res-callback-server](https://user-images.githubusercontent.com/52653793/88756647-29d43600-d19f-11ea-8d26-c21c7fa08a3c.png)

![res-callback-router](https://user-images.githubusercontent.com/52653793/88756700-440e1400-d19f-11ea-9129-900dbcd38ee5.png)

![res-callback-handler](https://user-images.githubusercontent.com/52653793/88756751-6142e280-d19f-11ea-9914-a3c6d6d3b99a.png)

## Handling POST requests

Post 요청 처리를 구현하기 위해 서버에 접속하면 textaread와 submit  버튼을 가진 html을 클라이언트에 전송한다.

submit 버튼을 클릭하여 textarea에 입력한 내용을 Post 요청으로 서버에 전송하면 서버는 이 요청을 받아 내용을 출력하는 처리를 구현한다.

![post-request-handler](https://user-images.githubusercontent.com/52653793/88758011-68b7bb00-d1a2-11ea-86f9-8bc9a4bb7bcb.png)

사실 `view`와 `controller` 로직을 한 곳에 구현하는 것은 바람직하지 않지만 일단은 그대로 해보자.

textarea의 내용은 상당히 클 수도 있다. 전체 데이터 블록을 하나로 처리하는 것은 blocking 방식일 것이다.

non-blocking 으로 만들려면 POST 데이터를 작은 청크로 나누고 특정 이벤트 때마다 callback을 호출하는 방식으로 만들어야 한다. 이 이벤트가 `data`(POST 데이터의 새 청크가 도착했다)와 `end`(모든 청크를 다 받았다) 이다.

이 이벤트가 발생했을 때 어떤 callback이 호출되어야 할지 Node.js에게 알려줘야 하는데, HTTP 요청이 올 때 `onRequest` callback 함수가 넘겨받은 request 객체에 listner 함수들을 추가하는 방식으로 할 수 있다.

```javascript
request.addListener("data", function(chunk) {
    // called when a new chunk of data was received
})
request.addListener("end", function() {
    // called when adll chunks of data have been received
})
```

:heavy_exclamation_mark: ​참고로 `request.addListener` 대신 `request.on`도 가능하다.

> .on() is exactly the same as .addListener() in the EventEmitter object (by [EventEmitter source code](https://github.com/nodejs/node-v0.x-archive/blob/master/lib/events.js#L188))

위의 처리는 `request` 객체가 필요하다.

`http.createServer`의 callback인 onRequest()에서 취득한 `response` 객체를 `router`를 통해 `request handler`에게 주입(inject)하여 handler가 요청에 직접 응답하도록 하였다.

이번에는 `request` 객체를 `router`를 통해 `request handler`에게 주입(inject)하는 것보다 `server`가 POST data를 받고 최종 data를 `router`를 통해 `request handler`로 보내도록 한다.

![post-server](https://user-images.githubusercontent.com/52653793/88759043-dfee4e80-d1a4-11ea-89a2-1d9d589b8065.png)

`/upload request handler`가 POST data를 화면에 표시하기 위해 `router.js`를 아래와 같이 수정한다.

![post-router](https://user-images.githubusercontent.com/52653793/88759129-0a400c00-d1a5-11ea-9d8f-db6c46947df9.png)

그리고 requestHandlers.js의 upload request handler에서 응답에 이 데이터를 추가한다.

![post-handler](https://user-images.githubusercontent.com/52653793/88759233-470c0300-d1a5-11ea-9d04-4978ecc89c55.png)

## Handling file uploads

우리 계획은 사용자가 이미지 파일을 업로드하면 이미지를 브라우저에 출력하는 것이었다.

파일 데이터를 받아서 처리하는 것은 단지 POST 데이터를 처리하는 것이지만, 그 처리가 단순하지 않고 복잡하기 때문에 여기서는 미리 만들어진 `formidable` 오픈소스 모듈을 사용한다.

```bash
$ npm i formidable@latest
```

`formidable`은 HTTP POST로 submit된 form을 Node.js에서 파싱할 수 있게한다. 사용법은 다음과 같다.

1. 새 IncomingForm을 생성한다. 이것은 submit된 form의 추상화 객체이다.
2. request 객체를 파싱하여 submit된 파일과 필드들을 얻는다.

![formidabl-test](https://user-images.githubusercontent.com/52653793/88761463-25f9e100-d1aa-11ea-9375-16460fe072c9.png)

위 코드를 실행하면 `form.parse` 메소드의 callback에 파라미터로 넘어가는 `files`객체가 어떻게 생겼는지 살펴볼 수 있다.

![formidable-files](https://user-images.githubusercontent.com/52653793/88761607-69ece600-d1aa-11ea-897f-f7afde7a6350.png)

<hr>

이제 `formidable`을 코드에서 사용해 보자.

`formidable`을 사용하여 할 일은 2가지이다.

1. 업로드된 파일을 저장 (/tmp 폴더)
2. 업드드된 파일을 읽어 들여 화면에 출력

우선 2. 부터 구현해 본다. /tmp/test.png에 파일이 존재한다고 가정하고 `/show request handler`에서 이것을 처리한다고 하자.

![file-upload-show](https://user-images.githubusercontent.com/52653793/88762175-a0773080-d1ab-11ea-86e1-426f7fdfe456.png)

> start handler는 아직 그대로

이렇게 만든 `request handler`를 `/show` URL과 매핑한다.

![show-hander-request](https://user-images.githubusercontent.com/52653793/88762274-d0becf00-d1ab-11ea-9799-da0adb76b0bc.png)

다음은 /start의 form에 파일 업로드 element를 추가한다.

![start-handler](https://user-images.githubusercontent.com/52653793/88762431-23988680-d1ac-11ea-988a-bbae4a4379c7.png)

다음은 업로드된 파일을 /tmp/test.png에 저장하기 위해서 `formidable`을 `upload request handler`에 추가한다. 이때 `request` 객체가 필요하므로 `server`에서 `router`를 통해 `request handler`에게 `request` 객체를 전달하여야 한다.

postData 처리와 request.setEncoding 부분을 삭제하고 대신 `request`를 `router`로 전달한다.

![server](https://user-images.githubusercontent.com/52653793/88763761-a589af00-d1ae-11ea-97f1-0c43053b4c09.png)

전달된 `request`를 bypass한다.

![rotuer](https://user-images.githubusercontent.com/52653793/88763828-bfc38d00-d1ae-11ea-9766-92928dc72903.png)

![start-handler](https://user-images.githubusercontent.com/52653793/88764944-bf2bf600-d1b0-11ea-8c7a-797ddffa049f.png)

![upload-handler](https://user-images.githubusercontent.com/52653793/88765033-dd91f180-d1b0-11ea-89ad-fa94a34549ac.png)

서버를 실행하여 이미지를 업로드하면 우리가 제대로 동작하는 것을 확인할 수 있다.

## Express framework

`http`모듈로 웹서버를 생성하면 일반적 웹서버가 수행하여야 할 많은 일들을 직접 처리애햐 하는데 이것이 꽤 번거러운 일이다. 위의 예제와 같이 정적 파일을 제공하기 위해서는 직접 구현하든지 아니면 `node-static`, `server-static` 등의 외부 module을 사용하여야 한다.

그러나 `Express`와 같은 framsework를 사용하면 이러한 문제는 쉽게 해결할 수 있다. 지금까지 살펴본 코드를 이해할 수 있다면 `Express`는 쉽게 사용할 수 있다. `Express`를 사용하면 Routing, Error handling, static file 제공 등 일반적 웹서버가 제공해야 하는 서비스를 쉽게 구현할 수 있다.

아래는 Server, Routing, Request handler가 모두 구현되어 있는 `Express`의 Hello world 예제이다.

![express](https://user-images.githubusercontent.com/52653793/88766704-74f84400-d1b3-11ea-96fa-ad9baf3992dc.png)