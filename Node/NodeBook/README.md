## JS 이벤트 루프

* 함수들을 `호출 스택`에 넣고 들어간 `반대순서로`실행을 시킨다. `setTimeout`과 같은 함수가 이ㄸ마녀 `백그라운드`로 콜백함수를 넣고 해당 시간이 다 지나고 나면 콜백함수를 `태스크 큐`로 보낸다.  이벤트 루프는 `호출 스택`이 비어있다면 `태스큐 큐`에서 함수를 하나씩 가져와 `호출 스택`에 넣고 실행한다.
* **호출 스택이 비어있다면!!!! 태스큐 큐에서 함수를 가져오기 때문에**  정해진 시간 후에 바로 콜백 함수가 실행이 안될 수도 있다. 이러한 이유 때문에 `setTimeout`의 시간이 정확하게 작동하지 않을 때가 있다.

##  프로세스 vs 스레드

> 노드는 싱글 스레드, 논블로킹 모델이다.

* 식당을 예로 들면 한명의 점원이 여러 손님의 주문을 모두 받고 요리가 완료되는 순서대로 서빙한다. (주문순서, 서빙순서가 일치 X)

> 노드는 싱글 스레드 여러 개를 사용해 멀티 스레딩과 비슷한 기능을 할 수 있다.
>
> 엄밀히 말하면 멀티 스레딩이라기보단 멀리 프로세싱에 가깝다.

| 프로세스                                                     | 스레드                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 운영체제에서 할당하는 작업의 단위.<br />노드, 인터넷 브라우저 같은 프로그램이 개별적인 프로세스이다<br />프로세스 간에는 메모리 등의 자원을 공유하지 않는다. | 프로세스 내에서 시행되는 흐름의 단위<br />하나의 프로세슨 느스레드를 여러개 가질 수 있다<br />스레드들은 부모 프로세스의 자원을 공유한다<br />즉, 같은 메모리에 접근할 수 있다. |

* 스레드를 작업을 처리하는 일손으로 표현하기도 하는데, 노드 프로세스는 일손이 하나인 셈이다.
* 내부적으로는 스레드를 여러 개 가지고 있으나 직접 제어 가능한 스레드는 하나뿐이므로 `싱글스레드`라고 부른다

## 서버로서의 노드

> 노드 서버 역시 싱글 스레드, 논블로킹 방식이며 그에 따른 장단점이 있다.

* 싱글 스레드이기 때문에 컴퓨터 자원은 적게 사용하는 `장점`이 있지만, CPU 코어를 하나밖에 사용하지 못하는 `단점`이 있다

* 노드 서버는  `I/O`가 많은 작업에 적합하다.

  >libuv 라이브러리를 이용한 논블로킹 I/O

## 노드의 장/단점

| 장점                                               | 단점                                          |
| -------------------------------------------------- | --------------------------------------------- |
| 멀티 스레드 방식에 비해 컴퓨터 자원을 적게 사용함. | 싱글 스레드라서 CPU 코어를 하나만 사용함      |
| I/O 작업이 많은 서버로 적합                        | CPU 작업이 많은 서버로는 부적합               |
| 멀티 스레드 방식보다 쉬움.                         | 하나뿐인 스레드가 멈추지 않도록 관리를 해야함 |
| 웹 서버가 내장되어 있음                            | 서버 규모가 커졌을 떄 서버를 관리하기 어려움  |
| 자바스크립트를 사용함                              | 어중간한 성능                                 |
| JSON 형식과 호환하기 쉬움.                         |                                               |

> 결국 개수는 많지만 크기가 작은 데이터를 실시간으로 주고 받는 데 적합하다! (채팅, 주식차트 등...)
>
> (이미지 비디오처리, 대구모 데이터 처리에는 부적합)

## ES2015

### const, let

> 함수 스코프가 아닌 블록스코프, const는 재선언, 재할당 불가능

### 템플릿 문자열

> 백틱(`)을 활용한 변수 넣기

### 객체 리터럴

``` javascript
{name: name, age: age} //ES5
{name, age} //ES2015
```

> 속성명과 변수명이 겹치는 경우 한 번만 써도 된다..
>
> 객체의 속성명을 동적으로 생성이 가능하다 등..

### 화살표 함수

> this 사용에 유의

### 비구조화 할당

> 객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있다.

#### 객체

``` javascript
const candyMachine = {
    status: {
        name: 'node',
        count: 5
    },
    getCandy() {
        this.status.count--
        return this.status.count
    }
}
const { getCandy, status: { count } } = candyMachine
```

> candyMachine 객체 안의 속성을 찾아서 변수와 매칭해준다.

#### 배열

```javascript
const array = ['nodejs', {}, 10, true]
const [node, obj, , bool = array
```

> array의 첫번쨰, 두번쨰, 마지막 요소를 할당.
>
> obj 와 bool 사이의 요소들은 무시한다.

### 프로미스

> 콜백지옥을 해결해준 감사한 친구

*  `new Promise`로   `resolve`와 `reject` 를 매개변수로 하는 프로미스 객체를 만들어 사용하며, 만들어진 promise 변수에 `then`과 `catch` 메서드를 붙일 수 있다. 
  * `resolve` -> `then`
  * `reject` -> `catch`
* resolve, reject에 넣은 인자는 각각 then, catch 의 매개변수에서 받을 수 있다.

## 노드 내장 객체

### global

> 남용금지..

### console

> console 객체는 보통 디버깅을 위해 사용된다.

* `time(레이블) / timeEnd(레이블)`

  ```javascript
  console.time('시간측정')
  ...
  console.timeEnd('시간측정')
  ```

  > `time`과 `timeEnd`사이의 시간을 측정한다.

* `console.dir(객체, 옵션)`

  ```javascript
  console.idr(obj, { colors:true, depth:1 })
  ```

  > 객체를 콘솔에 표시할 떄 사용.
  >
  > 첫번째 인자로 표시할 객체, 두번째 인자로 옵션을 넣는다. (기본 depth: 2)

### 타이머 

* `setTimeout(콜백 함수, 밀리초)` & `clearTimeout(아이디)` : 주어진 밀리초 이후 콜백 실행

* `setInterval(콜백 함수, 밀리초)` & `clearInterval(아이디)`: 주어진 밀리초마다 콜백 반복

* `setImmediate(콜백 함수)` & `clearImmediate(아이디)`: 즉시 실행

  > 타이머 함수들은 모두 아이디를 반환한다.  아이디를 사용하여( 반환되는 아이디를 변수에 담아서 ) 타이머를 취소할 수 있다

* `setImmediate`가  있으니 `setTimeout(콜백, 0)`은 사용하지 않는 것을 권장한다.

### filename, dirname

```javascript
console.log(__filename)
console.log(__dirname)
```

* `path 모듈`과 함께 경로 처리를 할 때 사용한다.

### 마이크로 태스크

```javascript
// nextTick.js
setImmediate(() => {
    console.log('immediate')
})
process.nextTick(() => {
    console.log('nextTick')
})
setTimeout(() => {
    console.log('timeout')
}, 0)
Promise.resolve().then(() => console.log('promise'))
```

```bash
$ node nextTick
nextTick
promise
timeout
immediate
```

* `process.nextTick(콜백)`: 이벤트 루프가 다른 콜백 함수들 보다 nextTick의 콜백 함수를 우선 처리하도록 한다.
* resolve된 promise 역시 다른 콜백들보다 우선시된다.
* 그래서 위의 두개를 마이크로태스크(microtack)라고 따로 구분지어 부른다.

## 노드 내장 모듈

### os

> os 모듈은 컴퓨터 ㅐ부 자원에 빈번하게 접근하는 경우 사용된다.
>
> 일반적인 웹 서비스를 제작할 떄는 사용빈도가 낮지만 운영체제별로 다른 서비스를 제공하고 싶을 때 유용한 모듈이다.

* `os.cpus() `: 컴퓨터의 코어 정보를 보여줍니다.
* `os.cpus().length`: 코어의 개수를 보여준다.
  * 노드는 싱글 스레드라 대부분 하나의 코어만 사용하지만 나중에 `cluster` 모듈을 사용하는 경우 코어의 개수에 맞춰 프로세스를 늘릴 수 있고 이때 `cpus()` 메서드를 사용한다.

### path

> 노드 프로그래밍을 하면서 매우 자주 쓰게 될 모듈

* `path.sep`: 경로 구분자
  * `WIndows: \`
  * `POSIX: /`
  * WIndows에서 POSIX스타일 path를 사용하거나 그 반대의 경우가 있다
    * Windows에서는 `path.posix.sep` , `path.posix.joinn()`  을 사용
    * POSIX에서는 `path.win32.sep`, `path.win32.join()`  을 사용
* `path.delimiter`: 환경 변수 구분자
  * `Windows: ;`
  * `POSIX: :`
* `path.dirname(경로)`: 파일이 위치한 폴더 경로
* `path.extname(경로)`: 파일의 확장자
* `path.basename(경로, 확장자)`: 파일의 이름(확장자 포함)을 보여준다. 파일 이름만 표시하고싶다면 두번째 인자로 확장자를 넣어주면 된다.
* `path.parse(경로)`: 파일 경로를 `root`, `dir`, `base`, `ext`, `name`으로 분리
* `path.format(객체)`: path.parse()한 객체를 파일 경로로 합친다.
* `path.normalize(경로)`: / 나 \ 를 실수로 여러번이나 혼용했을 때 정상적으로 변환
* `path.isAbsolute(경로)`: `true `- 절대경로, `false` - 상대경로
* `path.relative(기준경로, 비교경로)`: 첫번째 경로에서 두번쨰 경로로 가는 방법을 알려준다.

* `path.join(경로, ...)`: 여러 인자를 넣으면 하나의 경로로 합쳐준다.
* `path.resolve(경로, ...)`: path.join과 비슷하지만 약간의 차이가 존재
  * `path.resolve`는 `/`를 만나면 절대 경로로 인식해 앞의 경로를 무시한다.

### url

### crypto

> 암호화를 도와주는 모듈.

#### 단방향

* 암호화는 보통 단방향 암호화 알고르짐을 사용해 암호화한다. (복화할 수 없는 암호화 방식)

  * 단방향 암호화 알고리즘은 보통 해시 기법을 사용한다.

    > 해시기법 - 어떤 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식

    ```javascript
    //hash.js
    const crypto = require('crypto')
    
    console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'))
    ```

    * createHash(알고리즘) : 사용할 해시 알고리즘을 넣는다. `md5`, `sha1`, `sha256`, `sha512`등이 있는데 현재는 `sha512`정도로 충분

    * update(문자열) : 변환할 문자열

    * digest(인코딩) : 인코딩할 알고리즘을 넣는다. `base64`, `hex`, `latin1`등이 있는데 `base64`가 결과 문자열이 가장 짧아 애용된다.

    * update(문자열) : 변환할 문자열

      digest(인코딩) : 인코딩할 알고리즘을 넣는다. base64, hex, latin1등이 있는데 base64가 결과 문자열이 가장 짧아 애용된다.

    * 현재는 주로 `pbkdf2`나 `bcypt`, `scypt` 알고리즘으로 암호화를 한다.

#### 양방향

* 키를 사용한 양방향 암호화 방식 또한 지원한다.

자세한 암호화 방법들은 [공식문서](https://nodejs.org/api/crypto.html) 참고

### util

* `util.deprecate` : 함수가 deprecated 되었음을 알려준다.
* `util.promisify`: 콜백 패턴을 프로미스 패턴으로 바꿔준다.

## 파일 시스템 접근

> fs 모듈을 통해 파일을 생성, 삭제, 읽고 쓰는게 가능하다.

### 읽기, 쓰기

* `fs.readFile(경로, 콜백)` : 파일을 읽습니다. readFIle의 결과물은 `버퍼`라는 형식으로 제공되기에 `data.toString()`을 통해 문자열로 변환해야 한다.

* `fs.writeFile(경로, 내용, 콜백)`

### 동기 메서드, 비동기 메서드

> 다른 fs 모듈을 설명기 전에 필요한 개념들
>
> setTImeout, process.nextTick 외에도 노드는 대부분의 메서드를 비동기 방식으로 처리한다.
>
> 하지만 동기 방식으로 사용할 수 있는 메서드가 있는데 특히 fs 모듈이 그런게 많다.

* `readFile`을 여러번 사용하여 파일을 읽으면 출력 순서가 뒤죽박죽이다.. `비동기`방식이라 그렇다.
* `readFIleSync`를 사용하면 내가 원하는 순서대로 출력은 되나 `동기`방식이라 메인 스레드가 노는 시간이 생겨 비효율적이다. `동기` 메서드 들은  뒤에 `Sync`가 붙어 구분이 쉽다. 하지만 거의 쓰이지 않는다.
* 콜백지옥 혹은 promise, async/await를 이용하면 순서가 바뀌지 않게 비동기 메서드 사용이 가능하다.

### 버퍼와 스트림

> 파일을 읽거나 쓰는 방식에는 크게 두 가지 방식이 있다. 버퍼와 스트림

* 인터넷으로 영상 시청시 많이 들어본 `버퍼링`과 `스트리밍`

  * `버퍼링`은 영상을 재생할 수 있을 떄까지 데이터를 `모으는` 동작이고
  * `스트리밍`은 방송인의 컴퓨터에서 시청자의 컴퓨터로 영상 데이터를 조금씩 `전송`하는 동작이다.

* 노드의 `버퍼`, `스트림`도 비슷한 개념이다.

  * 노드는 파일을 읽을 떄 메러리에 파일 크기만큼 공간을 마련해둠, 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 해준다.

  * 메모리에 저장된 데이터가 바로 `버퍼`이다.

    > 이 버퍼를 직접 다룰 수 있는 클랙스가 바로 Buffer

#### 버퍼

* `Buffer`
  * `.from(문자열)` : 문자열을 버퍼로 바꿉니다.
  * `.toString()` : 버퍼를 다시 문자열로 바꿉니다.
  * `.concat(배열)`: 배열 안에 든 버퍼들을 하나로 합칩니다.
  * `.alloc(바이트)` : 빈 버퍼를 생성합니다. 바이트를 인자로 지정해주면 해당 크기의 버퍼가 생성됩니다.
* `readfile` 방식의 버퍼가 편리하지만 **문제점**이 있다. 만약 용량이 100MB인 파일있으면 읽을 때 메모리에 100MB의 버퍼를 만들어야 한다. 만약 이 작업을 동시에 열개만 해도 1GB에 달하는 메모리가 사용된다.
* 또한 모든 내용을 버퍼에 다 쓴 후에야 다음 동작으로 넘어가기에 파일 읽기, 압축, 파일 쓰기 등의 조작을 연달아 할 때 매번 전체 용량을 버퍼로 처리해야 다음 단계로 넘어갈 수 있다..
* **그래서!!** 버퍼의 크기를 작게 만들어서 여러번에 나눠 보내는 방식이 등장했는데 그게 바로 `스트림`

#### 스트림

* `createReadStream`, `createWriteStream`
  * 이벤트 리스너를 붙여서 사용한다.
* `createReadStream`으로 파일을 읽고 그 스트림을 전달받아 `createWriteStream`으로 파일을 쓸 수도 있다.
* 이렇게 스트림끼리 연결하는 것을 `파이핑한다`고 표현하고 `pipe`메서드를 사용하면 된다.
* 노드8.5 버전 전까지는 이 `스트림`과 `pipe`를 이용해 파일을 복사하곤 했다. (새로운 복사 방법은 아래에)

### 기타 fs 메서드

* `fs.access(경로, 옵션, 콝백)` : 폴더, 파일에 접근할 수 있는지 체크
* `fs.mkdir(경로, 콜백)` : 폴더를 만드는 메서드 ( 이미 있으면 에러 )
* `fs.open(경로, 옵션, 콜백)` : 파일의 아이디를 가져온다.  ( 없으면 생성 후 가져온다 )
* `fs.rename(기존 경로, 새 경로, 콜백)` : 파일의 이름을 바꾼다. 
* `fs.readdir(경로, 콜백)` : 폴더 안의 내용 확인
* `fs.unlink(경로, 콜백)` : 파일을 지운다. ( 없으면 에러 )
* `fs.rmdir(경로, 콜백)` : 폴더를 지운다 ( 폴더 안에 파일이 있다면 에러 )

#### 파일 복사

> 더 이상 스트림을 pipe하지 않아도 된다.

* `fs. copyFile()` : 파일을 복사한다.

## http 모듈로 웝 서버 만들기

### http모듈

* `http.createServer`를 통해 서버를 만들 수 있다.
* `res` 객체에는 `res.write`와 `res.end` 메서드가 있다.
  * res.write : 첫 번쨰 인자는 클라이어튼로 보낼 데이터 (HTML 모양의 문자열, 버퍼 등..)
  * res.end : 응답을 종료하는 메서드, 만약 인자가 있다면 그 데이터도 클라이엍느로 보내고 응답을 종료.

### 포트

* 포트는 서버 내에서 프로세스를 구분하는 번호입니다.
* 서버는 HTTP 요청을 대기하는 것 외에도 다양한 작업을 하기때문에 서버는 프로세스에 포트를 다르게 할당하여 들어오는 `요청`을 구분합니다.
* 유명한 포트
  * 21 - FTP
  * 80 - HTTP  ( 80 포트는 주소에서 생략 가능 )
  * 443 - HTTPS
  * 3306 - MYSQL
* 리눅스와 macOS에서는 1024번 이하의 포트에 연결할 때 `관리자 권한`이 필요합니다. 따라서 명령어 앞에 `sudo`를 붙여주어야 합니다. ( node serve1 대신 **sudo node serve1** )

### 쿠키와 세션

> 지금까지는 서버가 클라이언트를 구분하지 못하고 들어오는 요청에 같은 응답을 보내고있는데 클라이언트를 구분하는 방법을 배워보자. [server3](./ch4/server3.js),[server4](./ch4/server4.js),[server5](./ch4/server5.js)

#### 쿠키

* 누구인지 기억하기 위해서, 서버는 요청에 대한 응답을 할 떄 `쿠키`를 같이 보낸다. 

  > 쿠키는 name=ehwoo 같은 단순한 키-값의 쌍이다.

* 서버로부터 쿠키가 오면 웹 브라우저는 쿠키를 저장해두었다가 요청할 때마다 쿠키를 동봉해서 보내고, 서버는 요청에 들어 있는 쿠키를 읽어 사용자를 파악한다.

* 브라우저는 쿠키가 있다면 자동으로 동봉해서 보내주므로 따로 처리할 필요없고

* 서버에서 브라우저로 쿠키를 보낼 때만 처리를 해주면 된다.

  * 즉, 서버는 미리 클라이언트에 요청자를 추정할 만한 정보를 쿠리로 만들어 보내고, 그 다은부터는 클라이언트로부터 쿠키를 받아 요청자를 파악합니다. 쿠키가 내가 누구인지 추적하고 있는 것이다.

* 요청과 응답은 `헤더`와 `본문`을 가지는데, 쿠키는 `헤더(header)`에 저장된다.

* 쿠키 옵션들 ( 옵션 간에는 세미콜론으로 구분 )

  * `쿠키명=쿠키값` : 기본적인 쿠키의 값입니다. mycookie=ehwoo 같이 설정합니다.
  * `Expires=날짜` : 만료 기한입니다. 기본값은 클라이언트가 종료될 때까지입니다.
  * `Max-age=초` : Expires와 비슷하지만 날짜 대신 초를 입력할 수 있습니다. Expires보다 우선합니다.
  * `Domain=도메인명` : 쿠키가 전솔될 도메인을 특정할 수 있습니다. 기본값은 현재 도메인입니다.
  * `Path=URL` : 쿠기가 전송될 URL을 특정할 수 있습니다. 기본값은 `/`이고 이 경우 모든 URL에서 쿠키를 전송할 수 있습니다.
  * `Secure` : HTTPS일 경우에만 쿠키가 전송됩니다.
  * `HttpOnly` : 설정시 자바스크립트에서 쿠키게 접근할 수 없습니다. **쿠키 조작을 방지하기 위해 설정하는 것이 좋습니다** 

#### 세션

* 쿠키에 직접적으로 이름을 담아서 보내는 대신 randomInt라는 임의의 숫자를 보냅니다 [server5.js](./ch4/server5.js)
* 사용자의 이름과 만료 시간은 session이라는 객체에 대신 저장합니다. 
* 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통합니다. 세션 아이디는 꼭 쿠키를 사용해서 주고 받지 않아도 됩니다.
* 하지만 쿠키를 사용하는 방법이 제일 간단하기 때문에 많은 웹사이트가 쿠키를 사용합니다.

### REST API와 라우팅

* `REST API` - `REpreesentational State Transfer`
* HTTP 요청 메소드
  * `GET` -  서버의 자원을 가져오고자 할 때 사용합니다. 요청의 body에 데이터를 넣지 않습니다, 데이터를 서버로 보내야 한다면 쿼리스트링을 사용합니다.
  * `POST` - 서버에 자원을 새로 등록하고자 할 때 사용합니다. 요청의 body에 새로 등록할 데이터를 넣어 보냅니다. 어떤 메소듣를 사용해야할지 애매할 경우 보통 POST를 씁니다( 자원을 가져오면서, 일부 수정 하고싶을 때와 같이.. )
  * `PUT` - 서버의 자원을 요청에 들어있는 지원으로 치환하고자 할 때 사용합니다. 요청 body에 치환할 데이터를 넣어 보냅니다.
  * `PATCH` - 서버 자원의 일부만 수정하고자 할 때 사용합니다. 요청 body에 수정할 데이터를 넣어 보냅니다
  * `DELETE` - 서버의 자원을 삭제하고자 할 떄 사용합니다.
* 주소와 메서드만으로 요청 내용을 알아볼 수 있다는 장점.
* `GET` 메서드 같은 경우 브라우저에 캐싱할 수도 있어서 같은 주소의 `GET`요청을 할 때 서버에서 가져오는 것이 아니라 `캐시`에서 가져올 수도 있다. => `성능이 좋아진다.`
* `HTTP 프로토콜`을 사용하면 서버와 클라이언트가 분리되어 있어 클라이언트에 구애되지 않는 장점이 있다
  * iOS, 안드로이드, 웹이 모두 같은 주소로 요청을 보낼 수 있다.
  * 즉, 서버와 클라이언트가 분리되어 있고 이렇게 분리하면 추후에 서버를 확장할 떄 클라이언트에 구애되지 않아 좋다.

### https 와 http2

#### https

* https 모듈은 웹 서버에 SSL 암호화를 추가하여 요청이 오고 갈 때 중간에 요청을 가로채도 내용을 확인할 수 없다.
* 그렇기 떄문에 인증받은 기관에서만 받을 수 있다...

#### http2

* 노드의 `http2`모듈은 SSL 암호화와 더불어 최신 HTTP 프로토콜인 `http/2`를 사용할  수 있게 해준다. (  `http/1.1 `보다 훨씬 효율적)

### Cluster

> `cluster`모듈은 `싱글 스레드`인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈이다.[cluster](./ch4/cluster.js)

* 포트를 공유하는 노드 프로세스를 여러 개 두어 요청이 많이 들어왔을 떄 병렬로 실행되어 서버의 개수만큼 요청이 분산되게 할 수 있어 서버에 무리가 덜 가게 된다.
  * 예를 들어 코어가 8개인 서버가 있을 때 노드는 보통 코어를 하나만 활용합니다. 하지만 cluster 모듈을 설정하여 코어 하나당 노드 프로세스 하나가 돌아가게 할 수 있습니다.
* 하지만 세션을 공유하지 못하는 단점도 있다. => `Redis` 등의 서버를 도입하여 해결 가능.

* 실무에서는 `pm2`등의 모듈로 `cluster` 기능을 사용하곤 한다.

## 패키지 매니저

### pacakge.jon 

> 설치한 패키지의 버전을 관리하는 파일인 package.json에 대하여 알아보자.

```bash
# 프로젝트 폴더에서
$ npm init
```

* package name: 패키지의 이름입니다. package.json의 name 속성에 저장됩니다.

* version: 패키지의 버전입니다.

* entry point: 자바스크립트 실행 파일 진입점입니다. 보통 마지막으로 module.exports를 하는 파일을 지정합니다. package.json의 main 속성에 저장됩니다.

* test command: 코드를 테스트할 때 입력할 명령어를 의미합니다. package.json scripts 속성 안의 test 속성에 저장됩니다.
  
* `npm run [스크립트 명령어]` 입력할때 필요했던 그것.
  
* git repository: 코드를 저장해둔 Git 저장소 주소를 의미합니다. 나중에 소스에 문제가 생겼을 때 사용자들이 이 저장소에 방문해 문제를 제기할 수도 있고, 코드 수정본을 올릴 수도 있습니다. package.json의 repository 속성에 저장됩니다.

* keywords: 키워드는 npm 공식 홈페이지([https://npmjs.com](https://npmjs.com/))에서 패키지를 쉽게 찾을 수 있게 해줍니다. package.json의 keywords 속성에 저장됩니다.

* license: 해당 패키지의 라이선스를 넣어주면 됩니다.

  * 오픈 소스라고 해서 모든 패키지가 제약이 없는 것이 아니다.
  * `ISC`, `MIT`, `BSD` - 사용한 패키지와 라이선스만 밝혀주면 자유롭게 사용 가능.
  * `Apache` - 사용은 자유롭지만 특허권에 대한 제한이 포함되어있다.
  * `GPL` - 이 패키지를 사용할 때는 **조심**해야합니다. GPL 계열의 패키지를 사용한 패키지를 배포할 때는 자신의 패키지도 GPL로 배포하고 소스 코드도 공개해야하기 때문이다.
* 결과

  ```javascript
  // package.json
  {
  "name": "npmtest",
  "version": "1.0.0",
  "description": "About npm",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "ehwoo",
  "license": "ISC"
  }
  ```


* scripts 부분은 npm 명령어를 저장해두는 부분으로 콘솔에서 npm run [스크립트 명령어]를 입력하면 해당 스크립트가 실행됩니다.
  * 예들 들어 지금 npm run test를 하면 echo "Error: no test specified" && exit 1가 실행된다.

* scripts 속성에 명령어를 여러 개를 등록해두고 사용할 수 있습니다. 보통 start 명령어에 node [파일명]을 저장해두고 npm start로 실행합니다. (start나 test같은 스크립트는 run을 붙이지 않아도 실행됩니다.)

* 이제 `npm istall [패키지명]` 을 통해 뭔가를 설치해보면!

  *  `dependencies` 라는 속성에 해당 패키지 이름과 버전명이 쓰여진다. 버전명에 `^` 표시가 붙어있는데 

> 내가 npm 사용할 떄마다 뜨던
>
> npm WARN npmtest@1.0.0 No repository field. 오류는
>
> package.json에 repository 속성이 없어서 생기는 오류일 뿐이다.  나중에 해당 속성을 만들고 GIt 주소를 적어주면 오류가 뜨지 않는다.

* `npm install --save-dev [패키지]` 혹은 `-D` 옵션으로 개발용 패키지 설치도 가능하다.

  * 개발 중에만 사용되고 실제 배포시에는 사용되지 않는다.

* `npm i -D nodemon`  : 소스 코드가 바뀔 때마다 자동으로 노드를 재실행시켜주는 패키지.

* `npm -g rimraf` : 리눅스, macOS의 rm -rf 명령어를 윈도우에사도 사용할 수 있게 해주는 패키지, 지정한 파일이나 폴더를 지우는 명령어입니다. 

  * `rimraf node_modules`로 node_modules 폴더를 지울 수 있습니다.

* 전역 설치한 패키지는 package.json에 기록되지 않아 다시 설치 할때 어려움이 있어 **전역 설치를 기피하는 개발자도 있습니다.** 

  * 이러한 경우를 위한 명령어로 `npx`가 있다!

  ```bash
  $ npm install -D rimraf
  $ npx rimraf node_moduels
  ```

  * 와 같이 rimraf 모듈을 package.json의 devDependencies 속성에 기록한 후, 앞에 npx 명령어를 붙여 실행하면 패키지를 전역 설치한 것과 같은 효과를 얻을 수 있다.

* npm에 등록되지 않은 패키지들은 `npm install [Github or nexus등 저장소 주소]` 를 통해 설치할 수 있습니다.

### 패키지 버전

> 노드 패키지 버전이 세 자리인 이유는 SemVer(Semantic Versioning) 방식의 버전 넘버링을 따르기 떄문이다.

* 패키지 버전 2.4.3

  |                첫 번쨰 자리 - 2 : major 버전                 |        두 번째 자리 - 4 : minor 버전        |              세 번째 자리 - 3 : patch 버전              |
  | :----------------------------------------------------------: | :-----------------------------------------: | :-----------------------------------------------------: |
  | 하위 호환이 안 될 정도로 패키지의 내용이 수정되었을 떄 올린다. | 하위 호환이 되는 기능 업데이트 시에 올린다. | 기존 기능에 문제가 있어 수정한 것을 내놓았을 때 올린다. |

* 특수문자

  > ^, ~, <, > 와 같은 문자는 설치 또는 업데이트 시 어떤 버전을 설치해야 하는지 알려줍니다.

  |       문자       |                  의미                   |                             예제                             |
  | :--------------: | :-------------------------------------: | :----------------------------------------------------------: |
  |        ^         | minor 버전까지만 설치, 업데이트 합니다. | npm i express@^1.1.1 : 1.1.1버전 이상, 2.0.0버전 미만까지 설치합니다. 1.x.x 와 같이 표현할 수도 있습니다. |
  |        ~         | patch 버전까지만 설치, 업데이트 합니다. | npm i  express@~1.1.1 : 1.1.1 버전 이상, 1.2.0버전 미만까지 설치합니다. 1.1.x와 같이 표현할 수도 있습니다. |
  | <, >, <=, >= , = |      초과, 미만, 이상, 이하, 동일       | npm i express@>1.1.1 : 반드시 1.1.1 버전보다 높은 버전이 설치됩니다. |
  |      latest      |  항상 최신 버전의 패키지를 설치합니다.  |          npm i express@latest 또는 npm i express@x           |

* 기타 명령어

  * `npm outdated` : 업데이트할 수 있는 패키지가 있는지 확인합니다.
    * `Currnet` 와 `Wanted`가 다르면 업데이트가 필요한 경우로 `npm update [패키지명]` 으로 업데이트할 수 있습니다.
  * `npm sarch [검색어]` : npm의 패키지를 검색할 수 있습니다. 윈도우나 macOS에서는 [npm 공식 사이트](https://npmjs.com)에서 검색하는게 편하지만 GUI가 없는 리눅수에서는 이 명령어를 사용하여 검색할 수 있으며 package.json에 넣어둔 keywords가 이때 사용됩니다.
  * `npm info [패키지명]` : 패키지의 세부 정보를 파악하고자 할 때 사용합니다.
  * `npm adduser` : npm 공식 사이트에서 가입한 계정으로 로그인할 수 잇으며 패키지를 배포할 때 필요합니다.
  * `npm whoami` : 로그인한 사용자가 누구인지 알려줍니다.
  * `npm logout` : npm adduser로 로그인한 계정을 로그아웃할 떄 사용합니다.
  * `npm version [버전]` : package.json의 버전을 올려줍니다.
  * `npm deprecate [패키지명] [버전] [메시지]` : 해당 패키지를 설치할 때 경고 메시지를 띄우게 하는 명령어입니다. 자신의 패키지에만 이 명령어를 적용할 수 있습니다.
  * `npm publich` : 패키지를 배포할 떄 사용합니다.
  * `npm unpublish` : 배포한 패키지를 제거할 떄 사용하며 24시간 이내에 배포한 패키지만 제거할 수 있습니다.

# Express 웹 서버 만들기

## Express-generator

* `Express-generator` : 입문자에게 유용한, 익스프레스 서버를 만들기 위한 초기 설정을 해주는 패키지

  * `express-generator`는 콘솔 명령어이므로 npm 전역설치가 필요하다.

  ```bash
  $npm i -g express-generator
  ```

  * 익스프레스 프로젝트 생성 `express __프로젝트이름__`

  ```bash
  express learn-express --view=pug
  ```

  > --view=pug : 템플릿 엔진 설정. 기본적으로 Jade를 템플릿 엔진으로 설치하는데 Pug로 개명을해서 옛버전 대신 최신 버전 pug를 설치하기 위한 옵션. pug 말고 ejs 템플릿 엔진도 있다.

  * 폴더 이동 및 npm 설치

  ```bash
  cd learn-express && npm i
  ```

  > 두 명령어를 따로 써도 되지만 &&로 같이 써주면 두 명령여를 한번에 실행할 수도 있다.

* 폴더 구조

  * `app.js` : 핵심적인 서버 역할을 합니다.
  * `bin/www` : 서버를 실행시키는 스크립트
  * `public/` : 외부(브라우저, 클라이언트 등)에서 접근 가능한 파일들을 모아둔 곳 - 이미지, js, css
  * `routes/` : 주소별 라우터들을 모아두는 곳
    * 서버의 로직은 모두 `routes` 폴더 안의 파일에서 작성한다.
  * `views/` : 템플릿 파일을 모아둔 곳
    * 화면 부분은 `views` 폴더 안에 작성한다.
  * `modules/` : 데이터 베이스와 관련된 내용을 작성할 때 폴더를 생성하여 작성.

  > 위와 같이 구조가 명확하기에 서버를 관리하기 용이하다
  >
  > 라우터를 컨트롤러라고 본다면,  MVC(모델-뷰-컨트롤러) 패턴과 비슷하다

* 서버 실행

  * `package.json - scripts`에 start 속성과 속성값으로 `./bin/www`가 있다. 따라서 `npm run start` 명령어로 서버를 실핼할 수 있다. 

  ```bash
  $ npm run start
  // start는 특별할게 npm start만으로도 서버를 실행할 수도 있다.
  ```

## 익스프레스 구조 이해하기

* 핵심 파일인 [bin/www](./ch6/learn-express/bin/www) (파일에서 주석으로 설명)
* [app 모듈](./ch6/learn-express/app.js)
* 클라이언트의 요청을 받아서 처리한 후, 다시 클라이언트에게 응답한다는 점은 http 서버와 같습니다
* 하지만 중간에 `미들웨어`를 거친다는 것이 다릅니다. 

## 미들웨어

* 미들웨어는 익스프레스으 핵심으로 요청과 응답 중간에 위치하여 미들웨어라고 부릅니다.
* 라우터와 에러 핸들러 또한 미들웨어의 일종이므로 미들웨어가 익스프레스의 전부라고 해도 과언이 아닙니다.
* 미들웨어는 요청과 응답을 조작하여 기능을 추가하기도 하고, 나쁜 요청을 걸러내기도 합니다
* `미들웨어`는 주로 `app.use`와 함께 사용됩니다. 
  * `app.use` 메서드의  **인자로 들어가있는 함수**가 `미들웨어`입니다.
  * [app.js](./ch6/learn-express/app.js)에서 제일 위에 있는 `logger('dev')`부터 시작하여 미들웨어들을 순차적으로 거친 후 라우터에서 클라이언트로 응답을 보냅니다.
  * 라우터와 에러 헨들러도 `미들웨어`의 일종이기 떄문에서 app.use로 app과 연결해준 것을 볼 수 있습니다.

### 커스텀 미들웨어

* `app.user()`의 인자에 함수를 작성하여 간단하게 새로운 미들웨어를 만들 수 있습니다.

* 그런데 반드시 미들웨어 안에서 `next()`를 작성해줘야 다음 미들웨어로 넘어갑니다.

* `next()` 의 인자에 따라 기능이 구분됩니다.

  * `next()` : 다음 미들웨어로.
  * `next('route')` : 다음 라우터로.
  * `next(error)` : route 외의 다른 값을 넣으면 미들웨어나 라우터를 건너 뛰고 에러 핸들러로 이동합니다. 넣어준 값은 에러에 대한 내용으로 간주됩니다.
    * `app.js`의 404 처리 미들웨어가 이에 해당합니다.

* 하나의 user에 미들웨어를 여러개 장착할 수도 있습니다.

  ```javascript
  app.use('/', function(req, res, next) {
      console.log('첫번쨰 미들웨어')
      next()
  }, function(req, res, next) {
      console.log('두번쨰 미들웨어')
      next()
  }, function(req, res, next) {
      console.log('세번쨰 미들웨아')
      next()
  })
  ```

* next()가 없으면 다음 미들웨어로 넘어가지 않는 성질을 사용하여 다음과 같은 미들웨어도 만들 수 있습니다.

  ```javascript
  app.use(function(req, res, next) {
      if (Date.now() % 2 === 0) {
          return res.status(404).send('50% 실패')
      } else {
          next()
      }
  }, function(req, res, next) {
      console.log('50% 성공')
      next()
  })
  ```

  > 로그인한 사용자인지를 확인할 떄 위와 같은 코드를 사용합니다.

* 익스프레스에서 사용되는 미들웨어들

  * `morgan` 

    ```javascript
    var logger = require('morgan')
    ...
    app.use(logger('dev'))
    ```

    * **GET / 200 51.267 ms - 170**  같이  요청에 대한 정보를 콘솔에 기록해줍니다.
    * 함수의 인자로 `dev`, `short`, `common`, `combined` 등을 줄 수 있습니다.
    * `dev` 의 경우 `HTTP요청 (GET) 주소(/) HTTP상태코드(200) 응답속도(51.267ms) - 응답바이트(170)`을 의미합니다.
    * 보통 개발시 `dev`, `short`을 사용하고 배포시에는 `common`, `combined`를 사용합니다.
    * 콘솔뿐 아니라 **파일이나 데이터베이스에** 로그를 남길 수도 있습니다. 그런데 이러한 작업은 morgan보다 `winston`모듈을 더 많이 사용합니다.

  * `body-parser`

    ```javascript
    var bodyParser = require('body-parser')
    ...
    app.use(bodyParser.json())
    app.user(bodyParser.urlencoded({ extended: false }))
    ```

    * 요청의 본문을 해석해주는 미들웨어입니다. 보통 폼 데이터나 AJAX 요청의 데이터를 처리합니다.
    * **익스프레스  4.16. 0** 부터 body-parser의 일부 기능이 내장되어있기에 body-parser를 설치하지 않고 다음과 같이 사용합니다.

    ```javascript
    app.use(express.json())
    app.use(express.urlencoded({ extended:false }))
    ```

    * 각각 JSON 형식의 데이터 전달 방식과 주소 형식으로 데이터를 보내는 방식입니다.

      * 보통 폼 전송이 URL-encoded 방식을 주로 사용합니다.
      * `{extended: }` 옵션이 **false**일 경우 노드의 querystring 모듈을 사용하여 쿼리스트리을 해석하고,  **true**일 경우 qs 모듈을 사용하여 쿼리스트링을 해석합니다. - qs는 내장 모듈이 아닌 npm 패키지이며 querystring 모듈의 기능을 조금 더 확장한 모듈입니다.

    * body-parser는 JSON과 URL-encoded형식의 본문 외에도 Raw, Text 형식의 본문을 해석할 수 있습니다.

      * Raw는 본문이 버퍼 데이터일 때, Text는 본문이 텍스트 데이터일 때 해석하는 미들웨어입니다.
      * 이 두가지 기능은 익스프레스에 내장되어있지 않기 때문에 필요할 때 body-parser를 설치하고 아래와 같이 사용하면 됩니다.

      ```javascript
      app.use(bodyParser.raw())
      app.use(bodyParser.text())
      ```

    * http 웹서버의 경우 POST, PUT 요청의 본문을 전달 받으려면 `req.on('data')`, `req.on('end')` 로 스트림을 사용해야했지만 body-parser를 사용하면 내부적으로 본문을 해석해 req.body에 추가해줍니다.

      * 예를 들어 JSON 형식의 {name: 'ehwoo', book:'nodejs'}를 본문으로 보낸다면 req.body에 그대로 들어가며, URL-encoded 형식으로 name=ehwoo&book=nodejs를 본문으로 보낸다면 {name: 'ehwoo', book:'nodejs'} 가 들어갑니다.

    * mutipart/form-data 같은 폼을 통해 전송된 데이터는 해석하지 못하여 다른 모듈을 사용해야합니다.

  * `cookie-parser`

    ```javascript
    var cookieParser = require('cookie-parser')
    ...
    app.user(cookieParser())
    ```

    * 요청에 동봉된 쿠키를 해석해줍니다.
    * 해석된 쿠키들은 req.cookies 객체에 들어깁니다.
      * 예를들어 name=ehwoo 쿠키를 보냈다면 req.cookies는 {name: 'ehwoo'}가 됩니다

    ```javascript
    app.use(cookieParser('secret code'))
    ```

    *  위와 같이 첫 번째 인자로 문자열을 넣어줄 수 있습니다.
    * 암호화된 쿠키가 있는 경우, 제공한 문자열을 키로 삼아 복호화할 수 있습니다.

  * `static`

    ```javascript
    app.use(express.static(path.join(__dirname, 'public')))
    ```

    * 익스프레스 내장 모듈로, static 미들웨어는 정적인 파일들을 제공합니다
    * 함수의 인자로 정적 파일들이 담겨 있는 폴더를 지정하면 됩니다.
    * public으로 지정된 지금, public/stylesheets/style.css는 `http://localhost:3000/stylesheets/style.css`로 접근할 수 있습니다.
      * 실제 서버의 폴더 경로에는 `public`이 있지만 요청  주소에는 `public`이 없습니다. 서버의 폴더 경로와 요청 경로가 다르므로 보안에 큰 도움이 됩니다.
    * 정적 파일들을 알아서 제공해주므로 http 웹서버처럼 `fs.readFile`로 파일을 직접 읽어서 전송할 필요가 없습니다.

    ```javascript
    app.use('/img', express.static(path.join(__dirname, 'public')))
    ```

    * 위와 같이 정적 파일을 제공할 주소를 지정할 수도 있습니다.
    * public 폴더 안에 abc.png가 있다고 가정하면 앞에 /img 경로를 붙인 `http://localhost:3000/img/abc.png` 주소로 접근할 수 있습니다.
    * static 미들웨어는 요청에 부합하는 정적 파일을 발견하면 응답으로 해당파일을 전송합니다.
    * 이 경우 응답을 보냈으므로 다음에 나오는 라우터가 실행되지 않으며, 파일을 찾지 못했다면 요청을 라우터로 넘깁니다.
    * 정적 파일 라우터 기능을 수행하므로 **최대한 위쪽에 배치**하는 것이 좋습니다. 그래야 서버가 쓸데없는 미들웨어 작업을 하는 것을 막을 수 있습니다.
    * 하지만 static 미들웨어를 morgan보다도 더 위로 올리면 정적 파일 요청이 기록되지 않기때문에 조심해야합니다
    * **미들웨어들은 서비스에 따라 맞는 위치를 적절히 선정하여 작성해주어야 합니다**

  * `express-session`

    ```bash
    $ npm i express-session
    ```

    ```javascript
    var session = require('express-session')
    ...
    app.use(cookieParser('secret code'))
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: 'secret code',
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }))
    ```

    * 세션 관리용 미들웨어입니다. 로그인 등의 이유로 세션을 구현할 떄 매우 유용합니다.
    * 인자로 세션에 대한 설정을 받습니다.
      * `resave` : 요청이 왔을 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
      * `saveUninitialized` : 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정, **보통 방문자를 추적할 떄 사용됩니다.**
      * `secret` : 필수항목으로 cookie-parser의 비밀 키와 같은 역할을 합니다.
        * `express-session`은 세션 관리 시 클라이언트에 쿠키를 보냅니다. 이를 `세션 쿠키`라고 부릅니다. 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야하고, 쿠키를 서명하는데 secret의 값이 필요한데 이는 cookie-parser의 secret과 같게 설정해야 합니다.
      * `cookie` : 세션 쿠키에 대한 설정으로 `maxAge`, `domain`, `path`, `expires`, `sameSite`, `httpOnly`, `secure`등 일반적인 쿠키 옵션이 모두 제공됩니다.
      * `store` 라는 옵션도 있습니다.
        * 현재는 메모리에 세션을 저장하도록 되어있는데 문제는 서버를 재시작하면 메모리가 초기화되어 세션이 모두 사라진다는 것입니다.
        * 따라서 배포 시에는 store에 데이터베이스를 연결하여 세션을 유지하는 것이 좋고 보통 `Redis`가 자주 쓰입니다.
    * `express-session`은 req 객체 안에 req.session 객체를 만듭니다. 이 객체에 값을 대입하거나 삭제하여 세션을 변경할 수 있습니다.
    * 세션을 한번에 삭제하려면 `req.session.destroy()` 메서드를 호출하면 됩니다.
    * 현재 세션 아이디는 `req.sessionID`로 확인할 수 있습니다.

  * `connect-flash`

    ```bash
    npm i connect-flash
    ```

    ```javascript
    var flash = require('coonnect-flash')
    ...
    app.use(flash())
    ```

    > connect-flash 미들웨어는 cookie-parser와 express-session을 사용하므로 이들보다 뒤에 위치해야 합니다.

    * 일회성 메시지들을 웹 브라우저에 나타낼 때 유용한 미들웨어입니다.
    * flash 미들웨어는 req 객체에 req.flash 메서드를 추가합니다.
    * `req.flash(키, 값)`으로 해당 키에 값을 설정하고, `req.flash(키)`로 해당 키에 대한 값을 불러옵니다.
    * 일회성 메세지이므로 처음에는 보이지만 새로고침시에는 사라집니다. 로그인 에러나 회원가입 에러 같은 일회성 경고 메세지는 flash 미들웨어로 보내는게 좋습니다.

## Router 객체로 라우팅 분리하기

> 익스프레스의 Router 객체를 사용하면 http 웹 서버 떄처럼 if문으로 http 메서드별, 주소별로 분기처리를 하지 않아도 되는 장점이 있다. [index.js](./ch6/learn-express/routes/index.js), [users.js](./ch6/learn-express/routes/users.js)

* 첫 번째 인자로 주소를 받아 특정 주소에 해당하는 요청이 들어왔을 떄만 미들웨어가 작동하게 할 수 있다.

* app.js에서 라우터 연결시 `app.use` 대신 `get`, `post`, `put`, `patch`, `delete` 같은 HTTP 메서드를 사용할 수도 있다.

* router 객체에서도 역시 HTTP 메서드를 사용할 수 있다.

* `next()` 함수에는 라우터에서만 동작하는 특수 기능이 있습니다.

  * `next('route')` : 라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을 떄 사용합니다.

    ```javascript
    router.get('/', function(req, res, next) {
        next('route')
    }, function(req, res, next) {
        console.log('실행되지 않습니다.')
        next()
    }, function(req, res, next) {
        console.log('실행되지 않습니다.')
        next()
    })
    
    router.get('/', function(req, res) {
        console.log('실행됩니다')
        res.render('index', { title: 'Express' })
    })
    ```

    * 위의 두 라우터의 경우 첫 번째 라우터의 첫 번쨰 미들웨어에서 next('route')를 호출하여 두 번쨰, 세 번째 미들웨어는 실행되지 않습니다. 대신 **주소와 일치하는 다음 라우터로** 넘어가 아래의 라우터가 바로 실행되게 합니다.

* 동적 라우팅도 당연히 가능합니다.

  ```javascript
  router.get('/users/:id', function(req, res) {
      console.log(req.params, req.query)
  })
  ```
  
  * `:id`부분은 내가 알고있는 그 동적 라우팅.
  
  * 이때 `:id`에 해당하는 데이터는  `req.params` 객체 안에 들어있습니다.
  
    * `:id`  이면 `req.params.id`로, `:type` 이면 `req.params.type`으로 조회할 수 있습니다.
  
  * 주소에 쿼리스트링을 쓸 때도 있는데 쿼리스트링의 키-값 정보는 `req.query`객체 안에 들어있습니다.
  
    * `/users/123?limit=5&skip=10`이라는 주소의 요청이 들어오면, `req.params`와 `req.query` 객체는 다음과 같습니다.
  
      ```
      { id: '123' } { limit: '5', skip: '10' }
      ```
  
  * 이 동적 라우팅 패턴을 사용할 때의 :lipstick: 주의점으로는 일반 라우터보다 **뒤에 위치해야한다**는 것입니다.
  
* **요청에 대한 응답을 보내는 다양한 메서드들**

  * `res.send(버퍼 또는 문자열 또는 HTML 또는 JSON)` : send는 만능 메서드로 버퍼, 문자열, HTML, JSON 데이터를 전송할 수 있습니다.

  * `res.sendFile(파일 경로)` : 파일을 응답으로 보내주는 메서드입니다.

  * `res.json(JSON데이터)` : JSON 데이터를 보내주는 메서드입니다.

  * `res.redirect(주소)` : 응답을 다른 라우터로 보내버립니다. ( 로그인 후 홈으로 보내기 같은 기능)

  * `res.render('템플릿 파일 경로', { 변수 })` :

  * `res.status` :  `400대 에러 상태코드`나 `redirect 302 상태코드` 외에는 보통 `200 상태코드`로 응답하지만 직접 res.status를 사용하여 직접 바꿔줄 수 있습니다.

    ```javascript
    res.status(404).send('Not Found')
    ```

  * `res.render('템플릿 파일 경로', {변수})` : 템플릿 엔진을 렌더링할 때 사용합니다.

    > views 폴더 안 pug 확장자를 가지고 있는 파일들이 템플릿 엔진입니다. 

## 템플릿 엔진

> HTML로 여러개의 데이터를 표현하고 싶다면 직접 코딩해서 넣어줘야하지만 자바스크립트로 표현하면 반복문으로 간단하게 처리가 가능하다. 
>
> 템플릿 엔진은 자바스크립트를 사용해서 HTML을 렌더링할 수 있게 해줍니다. 
>
> 그렇기에 기본 HTML과 문법이 좀 다르고, 자바스크립트 문법이 섞여있기도 합니다.

* 대표적인 템플릿 엔진인 Pug, EJS

### Pug

> 예전이름인 Jade로 더 유명하다. 문법이 Ruby와 비슷하고 간단하다. 하지만 HTML 문법과 많이 달라 호불호가 있다.

```javascript
// app.js
app.set('views', path.join(__dirname, 'views')) // res.render가 이 경로에서 템플릿 엔진을 찾아 렌더링을 합니다
app.set('view engine', 'pug') // pug를 템플릿 엔진으로 사용합니다.
```

* HTMl 표현

  * HTML과 다르게 열고 닫는 태그가 없습니다. (< > 가 없다.)
    * 그렇기 때문에 태그 속성도 태그명 뒤에 소괄호로 묶어서 적어줍니다.
  * 탭, 스페이스로만 태그의 부모, 자식 관계를 규명합니다.
  * `doctype html` 은 `<!DOCTYPE html>`과 같습니다.

  ```pug
  doctype html
  html
    head
      title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
  ```

  * 속성 중 아이디와 클래스가 있는 경우 다음과 같이 표현하며, div태그의 div문자는 생략 가능합니다.

  ```pug
  #login-button		// <div id="login-button"></div>
  .post-image
  span#highlight
  p.hidden.full		// <p class="hidden full"></p>
  ```

  * HTML 텍스트는 다음과 같이 캐그 또는 속성 뒤에 한 칸을 띄고 입력하면 됩니다.

  ```pug
  p Welcome to Express		// <p>Welcome to Express</p>
  button(type='submit')		// <button type="submit">전송</button>
  ```

  * 에디터에서 텍스트를 여러 줄 입력하고 싶다면 다음과 같이 파이프(|)를 넣어줍니다.HTML코드에서는 한 줄로 나옵니다.

  ```pug
  p							// <p>안녕하세요 여러줄을 입력합니다. <br/> 태그도 중간에 넣을 수 
    | 안녕하세요.				//     있습니다. </p>
    | 여러 줄을 입력합니다.
    br
    | 태그도 중간에 넣을 수 있습니다.
  ```

  * style이나 script 태그로 CSS 또는 자바스크립트 코드를 작성하고 싶다면 다음과 같이 태그 뒤에 `.`을 붙여줍니다.

  ```pug
  style.
    h1 {
    font-size: 30px;
    }
  script.
    var message = 'Pug'
    alert(message)
  ```

* 변수

  * HTML과 다르게 자바스크립트 변수를 템플릿에서 렌더링할 수 있습니다.  `res.render` 호출 시 보내는 변수를 Pug가 처리해줍니다. 

  ```javascript
  router.get('/', function(req,res, next){
      re.render('index', { title: 'Express' })
  })
  ```

  * `res.render(템플릿, 변수 객체)` 는 익스프레스가 re 객체에 추가한 템플릿 렌더링을 위한 메서드입니다. index.pug를 HTML로 렌더링 하면서 { title: 'Express' }라는 객체를 변수로 집어 넣습니다. 그로인해 layout.pug와 index.pug의 title부분이 모두 Express로 치환됩니다. 
  * res.render 메서드에 두 번째 인자로 변수 객체를 넣는 대신, app.js의 에러 처리 미들웨어처럼 `res.locals` 객체를 사용해서 변수를 넣을 수도 있습니다.

  ```javascript
  router.get('/', function(req, res, next) {
      res.locals.title = 'Express'
      res.render('index')
  })
  ```

  * 위와 같이 현 템플릿 엔진이 res.locals 객체를 읽어서 변수에 집어 넣습니다.
  * 이 방법의 장점은 현재 라우터뿐만 아니라 다른 미들웨어에서도 res.locals 객체에 접근할 수 있다는 것입니다.
  * 변수 사용 방법

  ```pug
  h1=title								// <h1>Express</h1>
  p Welcome to #{title}					// <p> Welcome to Express </p>
  button(class=title, type='submit') 전송  
  input(placeholder=title + '연습')		   // <input placeholder="Express 연습" />
  ```

  * 변수를 텍스트로 사용하고 싶다면 태그뒤에 `=` 붙인 후 변수 입력
  * 속성에도 `=` 붙인 후 변수 입력
  * 텍스트 중간에 변수를 넣으려면 `#{변수}`
  * `#{}`의 내부와 `=` 기호 뒷부분은 자바스크립트로 해석하므로 마지막 줄 input처럼 자바스크립트 구문을 써도 됩니다.

  ```pug
  - var node = 'Node.js'
  - var js = 'Javascript'
  p #{node}와 #{js}  		// <p> Node.js와 Javascript</p>
  ```

  * 위와 같이 내부에 직접 변수를 선언할 수도 있습니다. `-`를 먼저 입력하면 뒤에 자바스크립트 구문을 작성할 수 있습니다.

  ```pug
  p='<strong>이스케이프</strong>'  //<p>&lt;strong&gt;이스케이프&lt;/string&gt;
  p!='<strong>이스케이프 안함</strong>' // <p><strong>이스케이프 안함</strong></p>
  ```

  * Pug는 기본적으로 변수의 특수문자를 HTML 엔티티로 이스케이프합니다. 이스케이프를 원치않으면 `=`대신 `!=`를 사용하면 됩니다.!

* 반복문

  * `each`와 `for`를 이용하여 반복 가능한 변수에 대해 반복문을 사용할 수 있습니다.

  ```pug
  ul
    each fruit in ['사과', '배', '오렌지', '바나나', '복숭아'] // each대신 for 사용 가능
      li=fruit 
  ```

  * 반복문 사용시 인덱스도 가져올 수 있습니다.

  ```pug
  ul
    each fruit, index in ['사과', '배', '오렌지', '바나나', '복숭아']
      li= (index + 1) + '번째' + fruit
  ```

* 조건문

  * `if`, `else if`, `else` 를 사용하여 조건문을 사용할 수 있습니다.

  ```pug
  if isLoggedIn			// isLoggedIn 이 true 일 때
    div 로그인 되었습니다.   // <div>로그인 되었습니다.</div>
  else 					// isLoggedIn 이 false 일 때
    div 로그인이 필요합니다. // <div>로그인이 필요합니다.</div>
  ```

  * `case`문도 가능합니다.

  ```pug
  case fruit
    when 'apple'
      p 사과입니다.
    when 'banana'
      p 바나나입니다.
    when 'orange'
      p 오렌지입니다.
    default
      p 사과도 바나나도 오렌지도 아닙니다.
  ```

* 다른 Pug나 HTML 파일을 넣을 수 있습니다.

  * 헤더나 푸터, 네비게이션처럼 웹 제작시 공통되는 부분을 따로 관리할 수 있어 매 페이지마다 동일한 HTMl넣어야하는 번거로움을 없애줍니다. `include` 파일 경로로 사용합니다.

  ```pug
  //header.pug
  header
    a(href='/') Home
    a(href='/about') About
  //footer.pug
  footer
    div 푸터입니다.
  //main.pug
  include header
  main
    h1 메인 파일
    p 다른 파일을 include 할 수 있습니다.
  include footer
  ```

* `extends`, `block` : 레이아웃을 정할 수 있어 공통되는 레이아웃 부분을 따로 관리할 수 있습니다. include와 함께 사용하곤 합니다. (장고에서의 그 block이네)

  ```pug
  //layout.pug
  doctype html
  html
    head
      title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
        block style
      body
        header 헤더입니다.
        block content
        footer 푸터입니다.
        block javascript
  //body.pug
  extends layout
  
  block content
    main
      p 내용입니다.
  block javascript
    script(src='javascripts/main.js')
  ```

  * `block 블록명`으로 block을 선언하고, block이 되는 파일에서 extends키워드로 레이아웃 파일을 지정하고 block부분을 넣어줍니다. 
  * 나중에 익스프레스에서 `res.render('body')`를 사용해 하나의 HTML로 합쳐 렌더링할 수 있습니다.
  * Pug 확장자는 생략 가능합니다.

# mysql

> ch7 폴더

## Sequelize

> 시퀄라이즈는 ORM(Object-relational Mapping)으로 분류된다. ORM은 자바스크립트 /객체와 데이터베이스의 릴레이션을 매핑해주는 도구입니다.

* 프로젝트 생성

  ```bash
  // 프로젝트 생성
  $ express learn-sequelize --view=pug
  
  $ cd learn-sequelize
  $ npm i								// 폴더 이동 후 npm 설치
  ```

* sequelize 설치

  ```bash
  $ npm i sequelize mysql2	// sequelize, mysql2 패키지 설치
  $ npm i -g sequelize-cli	// sequelize 커맨드 사용위한 전역설치
  ```

* 호출

  ```bash
  $ sequelize init // 이 명령어로 호출
  ```

  * `sequelize init` 명령어 호출 시 나오는 경고는 무시해도 된다..(?)

  * `config`, `models`, `migrations`, `seeders` 폴더가 생성된다.

  * `models/index.js` 파일을 수정해줍니다. (오류가 생기기도하고 필요한 것만 쓰기위해)

    ```javascript
    const path = require('path');
    const Sequelize = require('sequelize');
    
    const env = process.env.NODE_ENV || 'development';
    const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
    const db = {};
    
    const sequelize = new Sequelize(config.database, config.username, config.password, config)
    
    db.sequelize = sequelize
    db.Sequelize = Sequelize
    
    module.exports = db
    ```

* 시퀄라이즈를 통해 익스프레스 앱과 MySQL 연결

  ```java
  // app.js
  ...
  var usersRouter = require('./routes/users');
  var sequelize = require('./models').sequelize;
  
  var app = express();
  sequelize.sync()
  ...
  ```

  * `require('./models')`는 `require('./models/index.js')`와 같습니다.
  * `sync` 메서드를 사용하여 서버 실행 시 알아서 MySQL과 연동됩니다.

* 모델 정의하기

  > MySQL에서 정의한 테이블을 시퀄라이즈에서도 정의해줘야 합니다.
  >
  > MySQL의 테이블은 시퀄라이즈의 모델과 대응됩니다.
  >
  > 시퀄라이즈는 모델과 MySQL의 테이블을 연결해주는 역할을 합니다.
  >
  > User와 Comment 모델을 만들어 users 테이블과 comments 테이블을 연결해봅시다.
  >
  > 시퀄라이즈는 기본적으로 모델 이름은 단수형, 테이블 이름은 복수형으로 사용합니다.	
  
  * models 폴더에 `user.js`, `comment.js` 파일 만들어 모델을 정의해줍니다.
  * 시퀄라이즈는 알아서 `id`를 기본 키로 연결하므로 `id` 컬럼은 적어줄 필요가 없습니다.
  * MySQL 테이블과 컬럼 내용이 일치해야 적확하게 대응됩니다.
  * 시퀄라이즈 자료형은 MySQL의 자료형과 조금 다릅니다.
    * VARCHAR => `STRING`
    * INT => `INTEGER`
      * `INTEGER.UNSIGNED`는 UNSIGNED 옵션이 적용된 INT를 의미하며 ZEROFILL 옵션을 사용하고싶다면 `INTEGER.UNSIGNED.ZEROFILL`을 적어줍니다.
    * TINYINT => `BOOLEAN`
    * DATETIME => `DATE`
    * NOT NULL => `aloowNull`
    * UNIQUE => `unique`
    * `defaultValue`로 기본값 정의가 가능하며 `DataTypes.NOW`로 현재 시간을 기본값으로 사용할 수 있습니다. SQL의 now()와 같습니다.
  * `define`메서드의 세 번째 인자는 테이블 옵션입니다.
    * `timestamps` 속성이 true 이면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가하여 로우가 생설될 때와 수정될 떄의 시간이 자동으로 입력됩니다. (예제에서는 직접 created_at 컬럼을 만들었으므로 false로 합니다.)
  
* 모델 정의 후 index.js 에서 db 객체에 모델을 담아준다.

* config.json에서 database와 관련된 내용 수정한다.

  ```json
  // config/config.json
    "development": {
      "username": "root",
      "password": "ehwoo2356",
      "database": "nodejs",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "operatorsAliases": false
    },
  ```

  * `operatorsAliases `는 보안에 취약한 연선자를 사용할지 여부를 설정하는 옵션으로 false를 입력.
  * config/config.json 실행환경에 따라 다르게 환경을 설정할 수 있습니다.  위의 설정은 `process.env.NODE_ENV`가 `devvelopment`일 떄 적용된다.  나중에 배포할 떄는 process.env.NODE_ENV를 production으로 설정합니다. 따라서 배포환경을 위해 데이티베이스를 설정할 때는 config/config.json의 production 속성을 수정하면 되고, 테스트환경일 떄는 test 속성을 수정하면 됩니다.

### 관계 정의하기

> MySQL에서는 JOIN이라는 기능으로 여러 테이블 간의 관계를 파악해 결과를 도출합니다. 시퀄라이즈는 JOIN 기능도 알아서 구현해줍니다. 대신 시퀄라이즈에게 테이블 간에 어떠한 관계가 있는지 알려주어야 합니다.

#### 1:N

* 시퀄라이즈에서는 `1:N` 관게를 `hasMany` 메서드로 표현합니다. users 테이블의 로우 하나를 불러올 떄 연결된 comments 테이블의 로우들도 같이 불러올 수 있습니다. 반대로 `belongsTo` 메서드도 있습니다. comments 테이블의 로우를 불러올 떄 연결된 users 테이블의 로우를 가져옵니다. [index.js](./ch7/learn-sequelize/models/index.js)

#### 1:1

* `1:1` 관계에서는 hasMany 메서드 대신 `hasone` 메서드를 사용합니다.

* 사용자 정보를 담고있는 Info 모델이 있다고 가정하면

  ```js
  db.User.hasOne(db.Info, { foreignKey: 'user_id', sourceKey: 'id' })
  db.Info.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'}) 
  ```

#### N:M

* `N:M` 관계는 `belongsToMany` 메서드를 사용합니다. 게시글 정보를 담고 있는 Post 모델과 해시태그 정보를 담고 있는 Hashtag 모델이 있다고 가정하면

  ```js
  db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
  db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' }) 
  ```

* N:M 관계 특성상 새로운 모델이 생성되며 trough 속성에 그 이름을 적어주면 새로 생성된 PostHashtagㅇ 모델에 게시글과 해시태그의 아이디가 저장됩니다.

* N:M 관계의 데이터를 조회하는 과정을 편하게 하도록 시퀄라이즈는 몇가지 메서드를 지원합니다.

  ```javascript
  async (req, res, next) => {
      const tag = await Hashtag.findOne({ where: { title: '노드' } })
      const posts = await tag.getPosts()
  }
  ```

  * 해시태그를 찾으면 그 해시태그에서 바로 getPosts 메서드를 사용할 수 있습니다 `get +모델이름의 복수형`입니다.

  ```javascript
  HashTag.findOne({ where: 'title' })
  	.then(tag => tag.getPosts())
  	.then(posts => console.log(poasts))
  ```

  > 프로미스 형태

  * `add + 모델 이름의 복수형` 메서드도 있습니다.  두 테이블 간 N:M 관계를 추가해줍니다.

    ```javascript
    async (req, res, next) => {
        const tag = await Hashtag.findOne({ where: { title: '노드' }})
        await tag.addPosts(3)
    }
    ```

    > title이 노드인 해시태그와 게시글 아이디가 3인 게시글을 연결하는 코드

### 쿼리 알아보기

> 자바스크립트로 SQL문을 생성하여 database를 다룹니다. 쿼리는 프로미스를 반환하므로 then을 붙여 결괏값을 받을 수 있고, async/await 문법을 사용할 수도 있습니다.

* 생성

  > SQL

  ```mysql
  INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');
  ```

  > sequelize

  ```javascript
  const { User } = require('../models')
  User.create({
      name: 'zero',
      age:24,
      married: false,
      comment: '자기소개1'
  })
  ```

  * :lipstick: 데이터를 넣을 때 MySQL의 자료형이 아니라 시퀄라이즈 모델에 정의한 자료현대로 넣어야 합니다. 그래서 married가 0이 아닌 false로 작성해야합니다.

* 조회

  * 모든 테이플 조회

  > SQL

  ```mysql
  SELECT * FROM nodejs.users;
  ```

  > sequelize

  ```javascript
  const { User } = require('../models')
  User.findAll({})
  ```

  * 데이터 하나 조회

  > SQL

  ```mysql
  SELECT * FROM nodejs.users LIMIT 1;
  ```

  > sequelize

  ```javascript
  const { User } = require('../models')
  User.findOne({})
  ```

  * 원하는 컬럼만 조회

  > SQL

  ```mysql
  SELECT name, married FROM nodejs.users;
  ```

  > sequelize

  ```javascript
  const { User } = require('../models')
  User.findAll({
      attributes: ['name', 'married']  // attributes 옵션으로 원하는 컬럼 조회
  })
  ```

  * 조건에 따른 컬럼 조회

  > SQL

  ```mysql
  SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
  ```

  > sequelize

  ```javascript
  const { User, Sequelize: { Op } } = require('../models')
  User.findAll({
      attributes: ['name', 'age'],
      where: {
          married: 1,
          age: { [Op.gt: 30]}
      }
  })
  // 시퀄라이즈는 자바스크립트 객체를 사용해서 쿼리를 생성해야 하므로 Op.gt 같은 특수한 연산자들이 사용됩니다. Sequelize 객체 내부의 Op객체를 불러와 사용합니다.
  // Op.gt(초과), Op.gte(이상), Op.li(미만), Op.lte(이하), Op.ne(같지 않음), Op.or(또는), Op.in(배열 요소 중 하나), Op.notIn(배열 요소와 모두 다름)
  ```

  > SQL

  ```mysql
  SELECT id, name FROm users WHERE married = 0 OR age > 30;
  ```

  > sequelize

  ```javascript
  const { User, Sequelize: { Op } } = require('../models')
  User.findAll({
      attributes: ['id', 'name'],
      where: {
          [Op.or]: [{ married: 0 }, { age: { [Op.gt: 30] } }]
      }
  })
  ```

  * 정렬 조건

  > SQL

  ```mysql
  SELECT id, name FROM users ORDER BY age DESC;
  ```

  > sequelize

  ```javascript
  User.findAll({
      attributes: ['id', 'name'],
      order: [['age', 'DESC']]
  })
  ```

  * 개수 제한

  > SQL

  ```mysql
  SELECT id, name FROM users ORDER BY age DESC LIMIT 1;
  ```

  > sequelize

  ```javascript
  User.findAll({
      attributes: ['id', 'name'],
      order: ['age', 'DESC'],
      limit: 1  // fineOne메서드를 사용해도 되지만 이런 방법도 있다.
  })
  ```

  * offset 옵션

  > SQL

  ```mysql
  SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;
  ```

  > sequelize

  ```javascript
  User.findAll({
      attributes: ['id', 'name'],
      order: ['age', 'DESC'],
      limit: 1,
      offset: 1
  })
  ```

  * 로우 수정 쿼리

  > SQL

  ```mysql
  UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
  ```

  > sequelize

  ```javascript
  User.update({
      comment: '바꿀 내용' // 첫 번째 인자는 수정할 내용
  }, {
      where: {id: 2}	    // 두 번째 인자는 수정 대상 로우 찾는 조건
  })
  ```

  * 삭제

  > SQL

  ```mysql
  DELETE FROM nodejs.users WHERE id = 2;
  ```

  > sequelize

  ```javascript
  User.dsetroy({
      where: { id: 2 }
  })
  ```

  

