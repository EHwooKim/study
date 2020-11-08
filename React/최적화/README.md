# 프론트엔드 최적화 (React)

## 1. 블로그 사이트 최적화

### 01. 실습내용

* 이미지 사이즈 최적화 - `로딩 성능 최적화`

  > 웹 서비스에서 다양한 이미지를 사용하는데, 이미지의 사이즈가 크면 서비스가 무거워지고 사이즈가 작으면 사용자가 저화질의 사진을 보게되어 불편할 것이다.
  >
  > 적절한 이미지 사이즈에 대해 학습한다.

* Code Split - `로딩 성능 최적화`

  > React 사용자라면 한번쯤 들어봤을 이야기로 말 그대로 코드를 분할하는 것이다.
  >
  > 어떻게, 언제 코드를 분할해야 효율적인지에 대해 학습한다.

* 텍스트 압축 - `로딩 성능 최적화`

  > 특정 페이지에 접속하면 다양한 리소스를 다운받는데 JS, CSS, HTML 등이 포함된다.
  >
  > 이러한 리소스들은 다운받기 전 서버에서 압축되어 작은사이즈로 다운받아 빠르게 로드할수있게 해준다.
  >
  > 다운로드하는 데이터 양을 줄여 로딩 성능을 최적화하는 방법에 대해 학습한다.

* Bottlenect 코드 최적화 - `랜더링 성능 최적화`

  > 어떤 서비스를 개발했는데, 특정 자바스크립트 코드 때문에 서비스가 느리게 로드, 실행되는 경우가 있다.
  >
  > 이때 어떤 코드가 원인인지 찾기 어려울 때가 있다.
  >
  > 병목 코드를 어떻게 찾고, 어떻게 해결하는지에 대해 학습한다.

### 02. 분석 툴

* 크롬 Network 탭

  > 네트워크 리소스들의 상세정보

* 크롬 Performance 탭

  > 웹 페이지가 동작할 때 실행되는 모든 작업들을 그래프로 보여준다.

* 크롬 Audit 탭 (`Light house`)

  > 우리 서비스의 성능이 어느정도 수준인지 파악이 가능하다.
  >
  > 여러 기준에 따라 점수를 매겨주고, 어느정도의 가이드라인도 제공해준다.

* webpack-bundle-analyzer

  > 웹팩을 통해 번들링된 파일들이 어떤 코드를 담고있는지 한눈에 보여준다.

<hr/>

크롬 개발자 도구 - `Light House (Audit)`을 통해 성능을 측청해보자.

![image](https://user-images.githubusercontent.com/52653793/97550946-ad5b2880-1a15-11eb-8115-b7b50bf4d52c.png)

* `Categories`에서 무엇을 위한 검사를 할 것인지, `Device`에서 어떤 환경에서 검사할 것인지 선택해주면 된다.

  > Performance, Desktop을 선택하고 `Generate report`를 클릭해보자.

* 실행결과

  ![image](https://user-images.githubusercontent.com/52653793/97551426-4f7b1080-1a16-11eb-8b9f-acac5c953711.png)

  * `Metrics` - 검사 지표들, 해당 항목들에 소요된 시간들과 그것들을 통해 점수를 종합해준다.
  * `Opportunities`, `Diagnostics` - 해당 페이지의 문제점과 그것을 해결하기 위한 가이드를 제시해준다.
    * `Opportunities` - resource 관점(**즉, 로딩 성능 최적화**)에서의 가이드라인
    * `Diagnotics` - 페이지의 실행 관점(**즉, 랜더링 선응 최적화**)에서의 가이드라인

### 03. 이미지 사이즈 최적화

![image](https://user-images.githubusercontent.com/52653793/97555674-bcdd7000-1a1b-11eb-8d03-ab2c916ba4d5.png)

> 적절한 이미지 사이즈를 사용하여 최적화를 해보자.

![image](https://user-images.githubusercontent.com/52653793/97555783-e6969700-1a1b-11eb-9fa6-b12ac3daa7c9.png)

> 120 x 120 픽셀 크기로 랜더링되지만 원본 파일은 1200 x 1200 픽셀이다.

* 이런 상황에, 우리는 해당 이미지를 어떤 사이즈로 가져오는 것이 좋을까?

  `=>` 랜더링에 필요한 120x120 사이즈로 가져오면 된다고 생각하기 쉽다. 이 생각이 틀린 것은 아니지만, 현재 많이 사용되는 [Retina display](https://namu.wiki/w/Retina display?from=Retina Display)는 같은 공간에 더 많은 픽셀을 그릴 수 있기 떄문에 **너비 기준으로 2배정도 큰 이미지를 사용하는 것이 적절하다**. 즉, 위의 이미지의 경우 240x240 사이즈로 가져오는 것이 좋다.

* 그렇다면, 이제 이 이미지의 크기를 어떻게 줄여서 가져올 수 있을까?

  `=>` 이미지 사이즈를 줄이기 위해서는 해당 이미지가 어디에서 오는지를 우선 알아야한다. 현재 위의 이미지는 API를 통해 가져오고있다.

  ![image](https://user-images.githubusercontent.com/52653793/97557112-b05a1700-1a1d-11eb-8737-b0e85cd4ab03.png)

  `=>` 만약 이미지를 자체 서버에 저장된 것을 가져오는 static resource였다면 직접 이미지를 줄인 상태로 저장하여 사용하면 되겠지만, API를 통해 받아오는 경우에는 이런 방법이 불가능하다.

  `=>` 이미지 사이즈를 바꿔주는 `CDN`을 사용하자.

  > `CDN` - `Contents Delivery Network`
  >
  > 물리적 거리의 한계를 극복하기 위해 사용자와 가까운 곳에 컨텐츠 서버를 두는 기술.
  >
  > 예를들어, 한국에서 미국 서버의 이미지를 다운받을 때 인터넷이 아무리 빨라져도 물리적인 거리때문에 다운로드 받기까지 시간이 오래 걸린다.
  >
  > 그래서 미국에있는 서버를 한국에 복사해두고 사용자가 사진을 다운받으려할 때 복사된 한국 서버를 통해 다운받게하여 시간을 단축시킬 수 있다.
  >
  > 그런데, 이 CDN과 `Image CDN` (`Image Processing CDN`)은 조금 다르다.
  >
  > Image CDN은 기본적인 CDN 개념과, 사용자에게 이미지를 보내기 전에 이미지를 특정 형태로 가공해서(사이즈를 줄이거나 이미지 포맷을 변경하는 등) ) 사용자에게 이미지를 전달해준다.

* `Image CDN`

  Image CDN의 예시는 다음과 같다.

  ```
  http://cdn.image.com?src=[img src]&width=200&height=100
  ```

  > CDN 도메인, 원본 이미지 주소, 사이즈의 형태

  [Brunch.co.kr](https://brunch.co.kr/)에서 사용되고 있는 썸네일 이미지 주소를 확인해보면 다음과 같다.

  ```
  http://img1.daumcdn.net/thumb/C240x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/1520/image/AO0mg1FCqIGjrRtYSvN0GSUJVdk.png
  ```

  > daumcdn 주소, 그리고 fname뒤에 이미지 주소가 있는 것을 확인할 수 있다.

  ![image](https://user-images.githubusercontent.com/52653793/97559129-61fa4780-1a20-11eb-84cd-fd8c59f6eaee.png)

  > 전체 주소를 통해 확인한 사이즈가 조정된 이미지, 이미지 주소를 통해 확인한 원본 이미지

  위 예시에서는 CDN을 직접 구축하여 사용했지만, [imgix](https://www.imgix.com/)와 같은 솔루션을 사용해도 된다.

  (실습 코드에서는 unsplash cdn을 사용하여 처리했다.)

```
실습 프로젝트에서 사용한 unsplash의 방식은 unsplash에서 이미지를 서비스하기 위해 만든 자체의 기술이고, 우리에게 그런 이미지 CDN 없다면 최적화가 힘듦니다. 

조금 상세하게 답변을 드리면, 우리는 이미지를 세 가지로 구분하여 생각해볼 수 있습니다. 

정적 이미지: 서비스에 고정적으로 필요한, 거의 변하지 않는 이미지 (ex: 버튼 이미지, 아이콘 이미지 등)
업로드된 이미지: 사용자에 의해 s3와 같은 버킷에 업로드된 이미지 (ex: 블로그 글 작성시 올린 사진, 썸네일 등)
외부 서버의 이미지: 자신의 서비스의 이미지가 아닌 다른 서버의 이미지 (ex: 실습 프로젝트의 unsplash 이미지 등)
먼저, 1번, 정적 이미지의 경우 사실상 이미지 CDN이 거의 필요없습니다. 직접 처음부터 가공된 이미지를 넣고 그대로 사용하면 되니까요. 물론, 어떤 경우에는 이런 이미지들 또한 이미지 CDN에 캐시해두고 서비스를 하기도 하지만, 추가적인 가공이 필요없는 이미지이기 때문에 캐시나 이미지 사용방식의 통일성 등의 목적으로 이미지 CDN을 사용합니다.

2번, 업로드된 이미지의 경우는 이미지 CDN 없이는 최적화가 힘듦니다. 별도의 이미지 CDN 없이 이미지를 서비스해주는 서버에서 직접 이미지를 가공하여 전달해준다면 가능하지만, 어찌됐든 이런식의 이미지를 가공해줄 서버가 필요합니다. 직접 이미지 CDN을 구축하기 힘들다면, 이미지 CDN 솔루션을 사용할 수도 있습니다. 대부분의 회사에서는 이런 이미지 CDN 서버를 직접 구축하여 이미지를 서비스합니다.
*다른 방법으로는 이미지를 업로드하는 시점에 미리 이미지를 가공하여 저장하는 방법도 있습니다.

3번의 경우 또한 이미지 CDN이 있다면 이미지 CDN을 통해 가공하여 가져올 수 있습니다.

한 가지 짚고 넘어갈 것은, 이미지 CDN을 사용하는 목적은,
사용자와 이미지의 물리적 거리를 좁히고, 더 작은 이미지를 제공함으로써 이미지가 빠르게 다운로드 될 수 있도록 함에 있습니다. 
즉, 위의 목적만 달성 한다면 그게 이미지 CDN이 아니여도 상관없습니다.
(이미지 업로드 시점에 미리 가공하여 저장하도록 하거나, 브라우저 캐시를 사용하거나 등등)
```

### 04. BottleNext 코드 최적화 

![image](https://user-images.githubusercontent.com/52653793/97713764-998df000-1b03-11eb-864e-e2663e14f924.png)

오래 걸리는 자바스크립트 코드를 최적화 하라. 는 문구

그런데 어떤 코드가 오래걸리는건지는 알수가 없다. 이럴때 필요한 것이 `Performance`탭.

* bottleneck 코드 탐색

![image](https://user-images.githubusercontent.com/52653793/98463764-148c9000-2201-11eb-8784-8e129c068e2a.png)

html 파일을 불러오고 다 불러온 시점에 Parse HTML(HTML파일 분석)이 되고있다.

![image](https://user-images.githubusercontent.com/52653793/98463801-7816bd80-2201-11eb-80f8-b473bc433c3d.png)

현재 페이지에서는 세개의 JS 파일을 불러오고, 각 컴포넌트들이 실행되고 있는 것을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/52653793/98463901-23c00d80-2202-11eb-88ef-4213abf0963e.png)

여러 색깔의 점선으로 분석 가이드를 제공해준다. 마우스를 올려보면 각 항목이 뜻하는 것을 확인할 수 있다.

첫 가이드라인이 제공된 시점에 어떤 Network 통신이 이루어진 것을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/52653793/98463916-5964f680-2202-11eb-8830-f9484829e856.png)

해당 Network를 클릭해보면 API 호출인 것을 확인할 수 있다.

즉, **페이지 로드가 완료**되고, **API를 호출하는 시점**이다.

![image](https://user-images.githubusercontent.com/52653793/98464007-3ab32f80-2203-11eb-9a40-31db07bcc2e9.png)

그런데 API 호출이 1200ms 부분을 조금 지나 끝났는데(빨간선 부분) 회색선이 길게 이어져있다. (주황선 부분)

이것은 해당 API의 callback을 의미하고 굉장히 오래 걸린 것을 확인할 수 있고  하단 Frame Chart를 보니 병목현상을 일으키는 모습이 보인다.

병목현상을 일으키는 부분을 보면, `Article` 컴포넌트가 굉장히 길게 실행되고있는 것으로 보아 해당 부분에 문제가 있는 것을 유추할 수 있다.

![image](https://user-images.githubusercontent.com/52653793/98464084-b7dea480-2203-11eb-97fc-c3c552fead23.png)

>  리액트의 경우 상단 `Timings`영역에 컴포넌트에 대한 Frame Chart가 같이 나오고 이곳에서도 Article 컴포넌트가 오랫동안 실행되는 것을 확인할 수 있다. 

![image](https://user-images.githubusercontent.com/52653793/98464141-1dcb2c00-2204-11eb-9b23-9c656ca5bab9.png)

`Article` 부분을 확대해보면 `removeSpecialCharacter`가 길게 실행되고 있으며 중간중간 `Minor GC`가 실행되고있는데 `Minor GC`는 메모리가 부족하여 `garbage collector`에의해 메모리가 정리되는 작업이다.

* bottleneck 코드 최적화

  ![image](https://user-images.githubusercontent.com/52653793/98464274-11939e80-2205-11eb-967c-9d7abf34957a.png)

  > 문제의 코드

* 해결방안

  1. 특수 문자를 효율적으로 제거하기
     1. replace함수와 정규식 사용
     2. 마크다운 특수문자를 지워주는 라이브러리 사용 (remove-markdown)
  
  2. 작업하는 양 줄이기
  
     1. API 통신을 통해 가져오는 문자열 전체를 처리하는 것이 아닌 미리보기에 필요한 양만 처리하기
  
        >  (최장 9만자 - 대략 200자)

![image](https://user-images.githubusercontent.com/52653793/98464547-03468200-2207-11eb-8bf5-c60faa70750d.png)

최적화 이후 performance를 다시 측정해보면, `Article - removeSpecialCharacter`의 시간이 눈에 띄게 줄어든 것을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/52653793/98464588-4bfe3b00-2207-11eb-8314-1a4d1bc68413.png)

`Lighthouse` 수치 또한 증가한 것을 확인할 수 있다.