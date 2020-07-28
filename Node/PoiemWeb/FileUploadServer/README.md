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