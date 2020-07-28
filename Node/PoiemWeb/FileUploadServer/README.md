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