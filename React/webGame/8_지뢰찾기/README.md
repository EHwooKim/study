# context API

* `createContext`를 통해 context를 생성하고
* context로 데이터를 주고받을 자식 컴포넌트를 `provider`로 감싸줘야한다.
* 사용할 때는 `useContext`를 통해 사용하며 위에서 생성한 context를 `export - import`하여 자식 컴포넌트에서 불러온다.

* `context API`는 성능 최적화가 굉장히 어렵다.

  * 현재 코드

    ![contextAPI](https://user-images.githubusercontent.com/52653793/88005035-4d660380-cb43-11ea-9580-6240210219c6.png)

  * 위 코드는 MineSerch가 리랜더링 될 때마다 빨간줄의 객체도 새로 생긴다.

  * 객체가 새로 생긴다는 것은 해당 `context API`를 쓰는 자식들도 매번 새로 리랜더링 된다는 것이기 때문에 성능적으로 문제가 생긴다.

  * 그것을 방지하기 위해 캐싱을 해줘야한다. ( `useMemo` )

    ![contextMemo](https://user-images.githubusercontent.com/52653793/88005228-dda44880-cb43-11ea-9a16-c221cdbd9e5b.png)

# onContextMenu

* 마우스 우클릭 이벤트
* [공식문서 - 마우스 이벤트](https://ko.reactjs.org/docs/events.html#mouse-events)