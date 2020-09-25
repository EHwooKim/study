[참고 영상](https://www.youtube.com/watch?v=QB5qc0smeS0&ab_channel=1분코딩)

## 목차

* [sticky](##sticky)
* [position, z-index](##position,-z-index)
* [margin-collapsing (마진병합)](##margin-collapsing)
* [Intersection Observer](##Intersection-Observer)



## sticky

* 전체 스크롤에 대해 Stiky가 적용되는 것이 아닌 다른 부모 블록을 만나면 Sticky가 해제된다.

## position, z-index

* `position`의 기본 값은 `static`

* `static`외의 `position`들은 `z-index`를 가지고 그에 맞게 작동하는데, 따로 `z-index`주지 않으면 **코드상 밑에 있는 요소가 위로** 올라오게 된다. 

   (이 코드에서는  `scroll-graphic`보다 밑에 있는 `scroll-text`에 따로 `z-index`를 주지 않고 `position:relative`만 줘서 위로 올라오게 되었다.)

## margin collapsing

### 마진 병합 현상

```css
.container {
    ...
    margin: 0 auto;
}
.box {
    ...
    margin: 50px;
}
```

![error](https://user-images.githubusercontent.com/52653793/94234021-d0d91200-ff43-11ea-8110-b1324b6d5af3.png)

`box`요소에 `margin: 50px`을 주었는데 

`container`의 margin과 병합되어 상하단 마진이 사라졌고

`box`간 마진은 100px이 아닌 50px만큼만 생겼다.

### 마진 병합이 일어나는 조건

1. 인접한 **Block 요소 끼리** 일어난다.
2. 상하단 마진에만 일어난다. ( 좌우 마진은 해당 x )

### 해결법

* 인접한 Block끼리 일어난다는 점을 활용

  | 방법                                                         | 결과                                                         |
  | :----------------------------------------------------------- | :----------------------------------------------------------- |
  | 1. `container`를 `inline-block` 요소로 바꾼다.<br />         | ![want](https://user-images.githubusercontent.com/52653793/94234057-e0585b00-ff43-11ea-9f68-7a60bdcf7de9.png) |
  | 2. `box`를 `inline-block` 요소로 바꾼다.<br />- container와의 margin은 원하는대로 되었지만, <br />- box간 margin이 병합되지 않았다. | ![solution](https://user-images.githubusercontent.com/52653793/94234075-e9492c80-ff43-11ea-9c4c-924a966b7033.png) |

* 인접하지 않고 특정 요소가 있으면 병합되지않는 점을 활용

  ```css
  # 1.
  .container {
      ...
      padding: 1px;
  }
  
  # 2. 
  .container {
      border: 1px solid transparent
  }
  ```

  > 그런데 위와 같은 방법은 내가 원하는 디자인을 방해할 수 있다.

  ```css
  #3. 
  .container {
      overflow: hidden
  }
  ```

  > 위와같이 overflow의 원리를 통해서도 해결 가능 :point_left:
  

(이 코드에서는 추가적인 디자인이 없어 padding을 주는 방법으로 해결)

## Intersection Observer

[참고](https://heropy.blog/2019/10/27/intersection-observer/)