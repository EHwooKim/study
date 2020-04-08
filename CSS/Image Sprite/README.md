* [DBCUT](https://www.dbcut.com/bbs/index.php)
  * 최신 디자인, 기술을 볼 수 있는 곳

* 확장프로그램
  * 화면 전체 캡쳐
  * [해당 페이지 이미지 모두 다운로드](https://chrome.google.com/webstore/detail/image-downloader/cnpniohnfphhjihaiiggeabnkjhpaldj?hl=ko)
* 보이지 않아야할 요수 중 시각장애인에게 정보를 주는 요소는 `display:none`을 해버릴 경우 프로그램이 인식을 못하기 때문에 `display:absolute; top:-5000px`과 같이 화면 저멀리 날리는 형태로 없애준다.
  * 이런 속성을 가진 `.hide`클래스를 만들어놓고 계속 사용하면 되겠지.
* `text-align:center`를 적용시키고 `block`속성을 제거하기 위해 `inline-block` 요소를 `li`태그에 적용시켰는데 `inline`의 경우 코드상의 줄바꿈이 있으면 여백이 생기게되는 `단점`이 있다.

* `background` 로 이미지 설정시 `alt` 속성이 없어서 시각장애인들이 못 본다.
  * 태그 안에 글씨를 써주고 `color: transparent`로 안보이게 해준다.