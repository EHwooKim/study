## 1. The hero editor

### Create the component

CLI를 통해 새로운 component를 만들 수 있다.

  ```bash
$ng generate component heroes
  ```

커맨드 입력시 새로운 컴포넌트가 생성되고, `app.module.ts`에 자동으로 연결된다.

  ```javascript
// heroes.component.ts
    
import { Component, OnInit } from '@angular/core';
    
// `@Component` 데코레이터와 함께 클래스형태로 컴포넌트를 선언
@Component({
  selector: 'app-heroes', // CSS element selector
  templateUrl: './heroes.component.html', // template(html) 위치
  styleUrls: ['./heroes.component.css'] // style(css) 위치
})
export class HeroesComponent implements OnInit {
      
  constructor() { }
    
  ngOnInit(): void { // lifecycle hook
  }   
}    
  ```

  > 당연히 해당 클래스를 export해줘야 다른 곳에서 사용할 수 있다.

#### add property and show

`Heroes Component`에 `hero` 프로퍼티를 추가

  ```javascript
  // heroes.component.ts
  hero = 'Windstorm'
  ```

  ```html
  <!-- heroes.component.html -->
  <h2>{{hero}}</h2>
  ```

이렇게 만든 `Heroes Component` 를 `App Component` template에 추가하면 되는데,

  `Heroes Component`에서 선언했던 `element selector`를 사용하여 부모 요소에 추가하면 된다

  ```html
  <!-- app.component.html -->
  <h1>{{title}}</h1>
  <app-heroes></app-heroes>
  ```

![image](https://user-images.githubusercontent.com/52653793/109899303-fe876b80-7cd8-11eb-8f51-c1a19a7c8664.png)

### Create Hero interface

`Angular`는 `typescript`를 정식으로 지원하는 만큼,  hero의 `interface`를 만들어 사용할 수 있다

```typescript
// src/app/hero.ts
export interface Hero {
  id: number;
  name: string;
}
```

`Heroes Component`에서 `hero interface`를 사용하여 코드를 리팩토링

```typescript
// heroes.component.ts
import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  }

  constructor() { }

  ngOnInit(): void {
  }
    
}
```

```html
<!-- heroes.component.html -->
<h3>{{hero.name}}</h3>
<div><span>id: </span>{{hero.id}}</div>
<div><span>name: </span>{{hero.name}}</div>
```

![image](https://user-images.githubusercontent.com/52653793/109905926-e9173f00-7ce2-11eb-8a6a-f6810ce35a9f.png)

### Format with the UppercasePipe

`Angular`에 내장된 `pipe`를 사용하여 문자열, 날짜 등을 다양한 모양으로 바꿀 수 있다.

`hero.name`을 아래와 같이 수정해보면 영웅의 이름이 모두 대문자로 바뀌는 것을 확인할 수 있다.

```html
<!-- heroes.component.html -->
<h3>{{hero.name | uppercase}}</h3>
```

### Edit the hero

`<input>`을 통해 hero의 이름을 수정할 수 있도록 만들어보자.

`<input>`은 hero의 이름을 보여줄뿐 아니라 유저가 값을 입력할 때 정보가 업데이트 되어야한다. 즉, component class 와 screen 사이에 이름 데이터의 흐름(flow)이 필요하다.

이것을 위해 `<input>` 요소와 `hero.name` 프로퍼티, 양방향 데이터 바인딩을 해주면된다.

#### Two-way binding

`Heroes Component`를 아래와 같이 리팩토링.

```html
<!-- heroes.component.html -->
<div>
  <label for="name">Hero name: {{hero.name}}</label> <br/>
  <input id="name" [(ngModel)]="hero.name" placeholder="name">
</div>
```

* `[(ngModel)]` - `Angular`에서 사용하는 two-way binding 문법.

이제 `hero.name`과 `input`사이에 양방향 데이터 바인딩이 이루어졌다.

그런데, 아직 `ngModel`을 불러오지 않았기떄문에 에러가 발생하게 되는데 `ngModel`은 `FormsModule`에 들어있고, 우리는 `Angular`에게 이 모듈을 사용할 것을 알려야 한다.

### App Module

우리가 만든 componenet가 서로 잘 맞물리는지, 그리고 어떤 라이브러리를 필요로 하는지 `Angular`가 알 수 있게 해야하는데 그런 정보를 `metadata`라고 부른다.

`@Component` 데코레이터에 사용된 `selector`, `templateUrl`, `styleUrls`들도 `metadata`였다.

그리고 지금 우리가 `FormsModule`을 사용하기 위해 필요한 `metadata` 는 `@NgModule` 데코레이터를 통해 입력할 수 있다.

`@NgModule`은 **AppModule class**의 최상단에 을 선언하여 사용할 수 있고, CLI로 프로젝트를 만들었다면 이미 `app.module.ts`에 몇가지 정보와 함께 선언이 되어있는 것을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/52653793/109908609-eec35380-7ce7-11eb-9782-ce693f13f627.png)

#### Import FormsModule

이제 `FormsModule`을 불러와 `@NgModule`의 `imports`배열에 추가하면 우리가 `ngModel`이  정상작동할 것이다.

```typescript
// app.module.ts
import { FormsModule } from '@angular/forms'; // NgModel이 들어있는 모듈

...
    imports: [
      BrowserModule,
      FormsModule // <-- !!
    ],
...
```

![Animation_2021-03-04-12-56-01](https://user-images.githubusercontent.com/52653793/109909185-018a5800-7ce9-11eb-807c-35d7e5c66f20.gif)

#### Declare Heroes Component

지금까지 우리가 만든 컴포넌트를 포함하여 모든 컴포넌트들은 반드시 `@NgModule`에 선언해줘야한다.

그런데 이미 `app.module.ts` - `@NgModule.declarations`배열에 우리가 만든 `HeroesComponent`가 선언되어 있다. `CLI`로 컴포넌트를 생성했기 때문에 자동으로 선언까지된 것이다.
