# Angular Tutorial





## 1. The hero editor

### Create the component

`CLI`를 통해 새로운 component를 만들 수 있다.

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

## 2. Display a List

지금까지 만든 내용에 영웅을 클릭하면 해당 영웅의 상세정보를 보여주는 기능을 추가해보겠습니다.

### Create mock heroes

보통은 정보를 서버에서 가져오지만 지금은 임시 데이터를 만들어서 사용하겠습니다.

`mock-heroes.ts`에 `HEROES` 배열을 생성합니다.

```typescript
// src/app/app.mock-heroes.ts
import { Hero } from './hero'; // Hero interface 가져오기

export const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```

### Displaying heroes

이제 `HeroesComponent`에서 위의 임시 데이터를 불러옵니다.

```typescript
// src/app/heroes/heroes.component.ts
import { HEROES } from '../mock-heroes'

export class HeroesComponent implements OnInit {
  
  heroes = HEROES;
}
```

#### List heroes with `*ngFor`

```HeroesComponent```의 템플릿 파일을 아래와 같이 변경해줍니다.

```html
<!-- heroes.component.html -->
<h2>My Heroes</h2>
<ul class="heroes">
  <li>
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
```

이제 임시 데이터에 있는 10명의 히어로를 화면에 보여주기 위해 10개의 `li` 태그를 만들어야 합니다.

`Angular`는 [*ngFor](https://angular.io/api/common/NgForOf)를 통해 템플릿 파일에서 반복문을 사용할 수 있습니다.

```html
<li *ngFor="let hero of heroes">
```

반복하고자하는 요소에 `*ngFor`를 입력하고 좌측에 js의 `of` 반복문처럼 값을 입력해주면 됩니다.

> :heavy_exclamation_mark: ngFor 앞에 *를 반드시 붙여줘야합니다!!!!

![image](https://user-images.githubusercontent.com/52653793/110267133-84b9ef80-8002-11eb-9120-64a6db016c99.png)

#### Style the heroes

이제 heroes list에 style을 적용시켜보겠습니다. Angular는 두가지 방법으로 컴포넌트의 style을 적용시킬 수 있습니다.

* `@Component.styles` - 문자열 배열을 통해 원하는 스타일을 inlile 형태로 적용시킬 수 있습니다.
* `Component.styleUrls` - 문자열 배열을 통해 stylesheet 파일의 경로를 입력하여 스타일을 적용시킬 수 있습니다.

>  :notebook_with_decorative_cover: 스타일을 적용하는 두가지 방법 모두 해당 컴포넌트에만 적용됩니다.

우리는 `CLI`를 통해 컴포넌트를 만들었기 때문에 css 파일이 생성되어 `module.ts`에 연결까지 되어있습니다.

```css
/* HeroesComponent's private CSS styles */
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}
.heroes li:hover {
  color: #2c3a41;
  background-color: #e6e6e6;
  left: .1em;
}
.heroes li.selected {
  background-color: black;
  color: white;
}
.heroes li.selected:hover {
  background-color: #505050;
  color: white;
}
.heroes li.selected:active {
  background-color: black;
  color: white;
}
.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color:#405061;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}

input {
  padding: .5rem;
}
```

![image](https://user-images.githubusercontent.com/52653793/110268522-1dea0580-8005-11eb-8f48-3c64d1c85f45.png)

### Viewing details

이제 유저가 특정 영웅을 클릭하면 해당 영웅의 상세정보가 보이도록 해보겠습니다.

#### Add a click event binding

클릭했을때 상세정보가 보여지기 위해 `<li> `태그에 `click` 이벤트를 바인딩해줘야합니다.

```html
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
```

* `(click)="onSelect(hero)"`
  *  `Angular`의[event binding](https://angular.io/guide/event-binding) 문법
  * 유저가 `li`태그를 `click`했을 때 `onSelect`가 실행됩니다.

#### Add the click event handler

이제 `onSelected` 메서드와 선택된 영웅을 담을 `selectedHero`프로퍼티를 만들어주겠습니다.

```typescript
// heroes.component.ts - HeroesComponent 클래스 내부에 작성
...
    selectedHero?: Hero;
    onSelect(hero: Hero): void {
      this.selectedHero = hero;
    }
...
```

#### Add a details section

선택된 영웅의 정보를 보여주는 템플릿을 작성합니다.

```html
<!-- heroes.component.html - 기존 코드 아래쪽에 작성 -->
<h2>{{selectedHero.name | uppercase}} Details</h2>
<div><span>id: </span>{{selectedHero.id}}</div>
<div>
  <label for="hero-name">Hero name: </label>
  <input id="hero-name" [(ngModel)]="selectedHero.name" placeholder="name">
</div>
```

여기까지 모두 입력하고 Angular를 실행시켜보면, 에러와 함께 정상적으로 작동하지 않을 것입니다.

```bash
HeroesComponent.html:3 ERROR TypeError: Cannot read property 'name' of undefined
```

`name` 이 없다는 에러가 발생하는데, 그 이유는 `selectedHero`의 초기값이 없다보니 처음 이 컴포넌트가 랜더링 될 때 에러가 발생하는 것입니다.

초기값을 설정해주어 에러를 해결할 수도 있겠지만, 조건문을 통해 `selectedHero`의 값이 있을 때만 상세정보 요소가 보여지도록하여 에러를 해결해보겠습니다.

#### *ngIf

상세정보 요소들을 하나의 `div` 요소로 감싸고 그 부분에 조건문을 적용시키겠습니다.

* [*ngIf](https://angular.io/api/common/NgIf) 
  *  `Angular` template에서 사용되는 조건문 문법입니다.
  * `[*ngFor]`와 마찬가지로 `*`를 반드시 붙여줘야합니다.

```html
<!-- heroes.component.html -->
<div *ngIf="selectedHero">
  <h2>{{selectedHero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{selectedHero.id}}</div>
  <div>
    <label for="hero-name">Hero name: </label>
    <input id="hero-name" [(ngModel)]="selectedHero.name" placeholder="name">
  </div>
</div>
```

> 이제 selectedHero의 값이 존재할 때만 해당 요소가 랜더링됩니다.

![Animation_2021-03-08-12-15-20](https://user-images.githubusercontent.com/52653793/110269878-fba5b700-8007-11eb-9073-7b095b0204c4.gif)

> 처음에는 상세정보가 없고 특정 영웅을 클릭했을 때 해당 상세정보가 보이는 것을 확인할 수 있습니다.

#### Style the selected hero

이제 기능은 정상적으로 작동합니다. 추가적으로 선택된 영웅에 스타일을 추가하여 구분해보도록 하겠습니다.

영웅을 클릭하면, 해당 `li`요소에 `selected` 클래스를 추가하고 싶습니다.

`Angular`의 [class binding](https://angular.io/guide/attribute-binding#class-binding)을 통해  조건적으로 클래스를 추가하거나 삭제할 수 있습니다.

* `class binding` - `[class.some-css-class]="some-condition"` 

```html
<!-- heroes.component.html (list item hero) -->
<li *ngFor="let hero of heroes"
  [class.selected]="hero === selectedHero"  <!-- << class-binding >> -->
  (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

이제 `hero`와 `selectedHero`를 비교하여 그 둘이 같으면 `selected` 클래스를 추가하고 다르면 삭제되어 선택된 영웅을 구분할 수 있게 되었습니다.

![Animation_2021-03-08-12-25-50](https://user-images.githubusercontent.com/52653793/110270565-715e5280-8009-11eb-9cf8-ef387d631b89.gif)



