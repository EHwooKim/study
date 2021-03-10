# Angular Tutorial

## 00. 목차

|                             목차                             | 내용                                                         |
| :----------------------------------------------------------: | :----------------------------------------------------------- |
|         1. [The hero editor](##01.-The-hero-editor)          | 1. `CLI`  - 프로젝트 생성, 컴포넌트 생성<br />2. 컴포넌트에 프로퍼티 추가 및 화면 보이기<br />3. TS inferface 생성<br />4. Formatting<br />5. Module 추가 - `FormsModule` -> `ngModel` |
|          2. [DIsplay a List](##02.-Display-a-List)           | 1. 반복문 `*ngFor`<br />2. 조건문 `*ngIf`<br />3. `event binding`<br />4. `class binding`<br />5. 스타일 적용 |
| 3. [Create a Feature Component](##03.-Create-a-Feature-Component) | 1. 컴포넌트 분리<br />2. 부모로 부터 값 전달받기 `@Input()`  |
|            4. [Add Services](##04.-Add-Services)             | 1. `service`<br />2. `Observable`                            |

## 01. The hero editor

### 1. Create new Project

`CLI`를 통해 간편하게 새로운 프로젝트를 생성할 수 있다.

```bash
$ng new angular-tour-of-heroes
```

> Angular CLI가 설치 안되어있다면
>
> $npm install -g @angular/cli 를 통해 설치하자

### 2. Create the component

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

#### 2-1. add property and show

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

### 3. Create Hero interface

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

### 4. Format with the UppercasePipe

`Angular`에 내장된 `pipe`를 사용하여 문자열, 날짜 등을 다양한 모양으로 바꿀 수 있다.

`hero.name`을 아래와 같이 수정해보면 영웅의 이름이 모두 대문자로 바뀌는 것을 확인할 수 있다.

```html
<!-- heroes.component.html -->
<h3>{{hero.name | uppercase}}</h3>
```

### 5. Edit the hero

`<input>`을 통해 hero의 이름을 수정할 수 있도록 만들어보자.

`<input>`은 hero의 이름을 보여줄뿐 아니라 유저가 값을 입력할 때 정보가 업데이트 되어야한다. 즉, component class 와 screen 사이에 이름 데이터의 흐름(flow)이 필요하다.

이것을 위해 `<input>` 요소와 `hero.name` 프로퍼티, 양방향 데이터 바인딩을 해주면된다.

#### 5-1. Two-way binding

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

### 6. App Module

우리가 만든 componenet가 서로 잘 맞물리는지, 그리고 어떤 라이브러리를 필요로 하는지 `Angular`가 알 수 있게 해야하는데 그런 정보를 `metadata`라고 부른다.

`@Component` 데코레이터에 사용된 `selector`, `templateUrl`, `styleUrls`들도 `metadata`였다.

그리고 지금 우리가 `FormsModule`을 사용하기 위해 필요한 `metadata` 는 `@NgModule` 데코레이터를 통해 입력할 수 있다.

`@NgModule`은 **AppModule class**의 최상단에 을 선언하여 사용할 수 있고, CLI로 프로젝트를 만들었다면 이미 `app.module.ts`에 몇가지 정보와 함께 선언이 되어있는 것을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/52653793/109908609-eec35380-7ce7-11eb-9782-ce693f13f627.png)

#### 6-1. Import FormsModule

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

#### 6-2. Declare Heroes Component

지금까지 우리가 만든 컴포넌트를 포함하여 모든 컴포넌트들은 반드시 `@NgModule`에 선언해줘야한다.

그런데 이미 `app.module.ts` - `@NgModule.declarations`배열에 우리가 만든 `HeroesComponent`가 선언되어 있다. `CLI`로 컴포넌트를 생성했기 때문에 자동으로 선언까지된 것이다.

## 02. Display a List

지금까지 만든 내용에 영웅을 클릭하면 해당 영웅의 상세정보를 보여주는 기능을 추가해보겠습니다.

### 1. Create mock heroes

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

### 2. Displaying heroes

이제 `HeroesComponent`에서 위의 임시 데이터를 불러옵니다.

```typescript
// src/app/heroes/heroes.component.ts
import { HEROES } from '../mock-heroes'

export class HeroesComponent implements OnInit {
  
  heroes = HEROES;
}
```

#### 2-1. List heroes with `*ngFor`

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

#### 2-2. Style the heroes

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

### 3. Viewing details

이제 유저가 특정 영웅을 클릭하면 해당 영웅의 상세정보가 보이도록 해보겠습니다.

#### 3-1. Add a click event binding

클릭했을때 상세정보가 보여지기 위해 `<li> `태그에 `click` 이벤트를 바인딩해줘야합니다.

```html
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
```

* `(click)="onSelect(hero)"`
  *  `Angular`의[event binding](https://angular.io/guide/event-binding) 문법
  * 유저가 `li`태그를 `click`했을 때 `onSelect`가 실행됩니다.

#### 3-2. Add the click event handler

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

#### 3-3. Add a details section

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

#### 3-4. `*ngIf`

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

#### 3-5. Style the selected hero

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



## 03. Create a Feature Component

현재 `HeroesComponent`에서 영웅 목록과 영웅 상세정보를 모두 보여주고있다.

컴포넌트를 분리하여 `HeroesComponent`에서는 영웅 목록만, `HeroDetailComponent`에서는 영웅 상세정보만 보여주도록 코드를 수정해보겠습니다.

### 1. Make the HeroDetailComponent

우선, `CLI`를 통해 `hero-detail` 컴포너트를 새로 생성합니다.

```bash
$ng generate component hero-detail
```

`HeroesComponent` 때와 마찬가지로 `hero-detail`컴포넌트 파일들을 가진 폴더가 새로 생겼고 `app.module.ts`의 `@NgModule`에 해당 컴포넌트가 등록되었습니다.

#### 1-1. Write the template

기존 `HeroesComponent` 에서 영웅 상세정보 템플릿을 복사하여 `HeroDetailComponent` 으로 옮겨줍니다.

```html
<!-- hero-detail.component.html -->
<div *ngIf="hero">
  <h2>{{hero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{hero.id}}</div>
  <div>
    <label for="hero-name">Hero name: </label>
    <input id="hero-name" [(ngModel)]="hero.name" placeholder="name">
  </div>
</div>
```

이때, 이전까지는 selectedHero를 참조하여 화면에 나타냈던 것을 부모로부터 `hero`로  받아 보여줄 것이기 때문에 `selectedHero`를 모두 `hero`로 바꿔주었습니다.

#### 1-2. Add the `@Input()` hero property

우선 `HeroDetailComponent` 에서 사용할 `hero` 프로퍼티의 `type`을 불러와줍니다.

```typescript
// hero-detail.component.ts
import { Hero } from '../hero';
```

`HeroDetailComponent` 의 `hero` 프로퍼티는 부모요소인 `HeroesComponent` 로부터 전달 받을 것입니다.

`Angular`에서는 `@Input` 데코레이터를 통해 부모요소로부터 전달 받은 값을 나타낼 수 있습니다.

`@angular/core`에서 `Input`을 불러와 `hero` 프로퍼티 앞에 `@Input()`을 붙여주면 됩니다.

```typescript
// hero-detail.component.ts
import { Component, OnInit, Input } from '@angular/core';
...
	@Input() hero?: Hero
...
```

이제 부모요소로부터 값을 전달받을 준비가 끝났습니다

### 2. Show the `HeroDetailComponent`

자식요소로 값을 전달하기 위해 `HeroesComponent`에서 바꿀 것은 많지 않습니다.

`HeroesComponent`의 템플릿만 조금 수정해주면 됩니다.

#### 2-1. Update the `HeroesComponent` template

`HeroDetailComponent`의 selector인 `app-hero-detail`를 사용해 원하는 위치에 요소를 위치하고

`[hero]="selectedHero"` 와 같은 문법을 사용해 `hero`라는 이름으로 `selectedHero`값을 전달해줍니다.

```html
<!-- heroes.component.html -->
...

<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

이렇게 부모-자식 간의 단방향 데이터 바인딩을하는 방식으로 두개의 컴포넌트로 분리를 하였습니다.

## 04. Add Services

지금처럼 컴포넌트에 데이터를 저장하고 데이터 처리 또한 컴포넌트에서 하고 것 보다 `service`를 활용하여 데이터를 관리하는 것이 좋습니다.

### 1. Why services

 컴포넌트는 데이터를 화면에 보여주는 역할만 하도록 하는고  `service`라는 곳에서 데이터를 관리하는 것이 좋습니다. 이 방법은  특히 여러 컴포넌트에서 필요한 데이터를 관리할 때 굉장히 유용합니다.

지금 `HeroesComponent`에서 불러오는 `HEROES` 데이터를 관리하는 `HeroService`를 생성하고 이 `service`를 Angular의 [의존성 주입](https://angular.kr/guide/dependency-injection) 방법에 따라 `HeroesComponent`의 **생성자**로 주입하여 사용할 것입니다.

#### 2. Create the HeroService

`service`또한 `CLI`를 통해 만들 수 있습니다.

```bash
$ ng generate service hero
```

명령어를 입력하면 아래와 같이` src/app/hero.service.ts`경로에  `HeroService` 클래스가 생성됩니다.

```typescript
//src/app/hero.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor() { }

}
```

#### 2-1. `@Injectable()` services

생성된 `service` 클래스를 보면 `Injectable`을 불러와 클래스의 데코레이터로 사용한 것을 확인할 수 있습니다.

이는 해당 클래스가 **의존성 주입 시스템에 포함된 클래스**임을 알려주어 `HeroService` 클래스가 **의존성으로 주입될 수 있으며** 반대로 의존성을 주입받을 수도 있습니다.

그리고 `@Injectable()` 데코레이터도 메타데이터 객체를 인자로 받습니다.

#### 2-2. Get hero data

`HeroService`는 `HeroesComponent`에서 필요한 데이터를 `local storage`, `mock data`, `web service`등 어느 곳에서든 데이터를 불러올 수 있습니다.

`service`를 활용하여 현재 코드를 리팩토링 해보겠습니다.

```typescript
// hero.service.ts
...
import { Hero } from './hero'
import { HEROES } from './mock-heroes'
...
	getHeroes(): Hero[] {
    return HEROES
}
...
```

* `Hero Interface`와 `HEROES mock data`를 불러옵니다.
* `HEROES` 데이터를 반환하는 `getHeroes`메서드를 추가합니다.

이제 이 `service`를 의존성 주입을 통해 `HeroesComponent`에서 사용할 것입니다.

### 3. Provide the HeroService

`HeroService`를 `HeroesComponent`에 의존성을 주입하기 위해서는 이 `service`의 프로바이더(provider) 가 Angular 의존성 주입 시스템에 등록되어야 합니다. 프로바이더는 서비스를 생성하고 전달하는 방식을 정의한 것입니다. 이 예제에서는 **서비스 클래스**가 `HeroService`의 프로바이더입니다.

서비스 프로버이더는 `unjector`에 등록되어 의존성 주입 요청이 있었던 객체를 적절히 선태하고 생성하는 역할을 합니다.

`CLI`로 `service`를 만들었다면 `@Injectable()` 데코레이터에 `providedIn: 'root'`를 지정해서 서비스 프로바이더를 **최상위 인젝터**에 등록합니다.

서비스가 **최상위 인젝터**에 등록되면 Angular는 `HeroService`(클래스)의 **인스턴스**를 **하나**만 생성하며, 이 클래스가 주입되는 모든 곳에서 **같은 인스턴스를 공유**합니다.  그리고 `@Injectable()` 데코레이터는 이 데코레이터가 등록된 클래스가 실제로 사용되지 않으면 이 클래스를 최종 빌드 결과물에서 제거하는 대상으로 등록하는 역할도 합니다.

### 4. Update HeroesComponent

`service`를 활용하기 위해 `HeroesComponent`를 수정해보겠습니다.

데이터를 `HeroService`에서 관리 하기 때문에 더이상 `HeroesComponent` 에서 `HEROES` 데이터를 불러올 필요가 없습니다.

```typescript
// src/app/heroes/heroes.component.ts
// import { HEROES } from './mock-heroes'  <<- delete
import { HeroService } from '../hero.service';
...
	heroes: Hero[];
...
```

#### 4-1. Inject the `HeroService`

`HeroesComponent` 클래스 생성자에 `HeroService` 타입의 `heroservice` 인자를 선언하고 이 인자를 **private**로 지정합니다.

```typescript
// src/app/heroes/heroes.component.ts
...
	constructor(private heroService: HeroService) {}
...
```

이렇게 작성하면 `heroService` 인자를 **클래스 프로퍼티**로 선언하면서 `HeroService` 타입의 **의존성 객체**가 주입되기를 요청한다는 것을 의미합니다.

그러면 Angular가 `HeroesComponent`를 **생성할 때** 의존성 주입 시스템이 `HeroService`의 **인스턴스**를 찾아서 `heroService` 라는 인자로 전달할 것입니다.

#### 4-2. Add `getHeroes()`

`HeroesComponent`에 `service`로부터 영웅 목록을 받아오는 메소드를 정의합니다.

```typescript
// src/app/heroes/heroes.component.ts
...
    getHeroes(): void {
      this.heroes = this.heroService.getHeroes();
    }
...
```

#### 4-3. Call it in `ngOnInit()`

위에서 만든 `getHeroes` 메서드를 생성자 함수에서 호출할 수도 있겠지만 좋은 방법은 아닙니다.

컴포넌트의 생성자 함수는 인자를 클래스 프로퍼티로 연결하는 정도로 간단하게 유지하는 것이 좋고 그 외의 로직은 들어가지 않는 것이 좋습니다.

다른 프레임워크들과 마찬가지로 `lifecycle`을 활용해 데이터를 불러오는 것이 좋습니다.

`ngOnInit()` 함수는 Angular가 `HeroesComponent`의 인스턴스를 생성한 직후에 실행되는 함수로 이 안에서 `getHeroes`메서드를 호출하는 것이 좋습니다.

```typescript
// src/app/heroes/heroes.component.ts
...
ngOnInit() {
  this.getHeroes();
}
...
```

서버를 실행해보면 모든 기능이 정상적으로 작동하는 것을 확인할 수 있습니다.

### 5. Observable data

현재 우리는 `HEROES` 데이터를 `mock-heros`로부터 동기적으로 가져옵니다.

하지만 개발을 하다보면 보통 백엔드 서버로부터 데이터 비동기적으로 가져오는 것이 일반적입니다.

만약 데이터를 가져오는 코드가 비동기 코드라면, 위에서 작성한 방법으로는 정상적인 작동을 하지 않을 것입니다.

비동기 동작의 경우 `callback`, `promise`을 톨해 처리할 수도 있겠지만`Observable`을 활용해 처리할 수도 있습니다. `Angular`가 제공하는 `HttpClient.get` 메소드가 `Observable`을 반환하기 때문에 이번 튜토리얼에서도 `HeroService.getHeroes()` 함수가 `Observable`을 반환하도록 구현해 보겠습니다.

#### 5-1. Observable `HeroService`

`Observable`이라는 개념은 [Rxjs](https://rxjs.dev/)에서 제공하는 클래스 중 가장 중요한 클래스입니다.

```typescript
// src/app/hero.service.ts 
import { Observable, of } from 'rxjs';
...
    getHeroes(): Observable<Hero[]> {
      return of(HEROES);
    }
...
```

> Rxjs의 of() 함수로 Observable 데이터를 즉시 반환했습니다.

`of(HEROES)`는  `hero mock-data`를 `Observable` 타입으로 한번에 반환합니다.

#### 5-2. Subscribe in `HeroesComponent`

여기까지 코드를 수정하면 당연히 에러가 발생할 것입니다.

왜냐하면 이전까지는  `HeroService.getHeroes` 메서드가 `Hero[]` 타입을 반환했지만 지금은`Observable<Hero[]>`를 반환하기 때문입니다.

`Observable` 데이터를 다루는 `Subscribe`를 통해 `HereosComponent`를 수정해보겠습니다.

```typescript
// heroes.component.ts
// getHeroes(): void {  << 기존코드
//   this.heroes = this.heroService.getHeroes(); 동기로 가져온 데이터를 즉시 할당
// }
...
    getHeroes(): void {
      this.heroService.getHeroes()
          .subscribe(heroes => this.heroes = heroes);
    }
...
```

>   this.heroService.getHeroes()로부터 비동기적으로 Observable 데이터가 넘어오면, 그 시점이 언제든 넘어온 순간 subscribe가 서버에서 받은 응답을 콜백 함수로 전달하여 해당 데이터를 heroes 프로퍼티에 할당합니다.

이제 에러없이 정상적으로 코드가 동작할 것입니다.

서버를 통해 데이터를 가져오는 등의 비동기 동작이 있다면 위와같은 방법으로 해야한다는 것을 잊지마세요

### 6. Show messages

`service`를 활용하여 컴포넌트를 하나 더 만들어보겠습니다.

- 애플리케이션에서 발생하는 메시지를 화면 아래쪽에 표시하는 `MessagesComponent`를 추가합니다.
- 앱 전역 범위에 의존성으로 주입할 수 있는 `MessageService`를 만들고, 이 `service`로 메시지를 보내봅니다.
- `MessageService`를 `HeroService`에 주입해 봅니다.
- `HeroService`가 서버에서 가져온 히어로 데이터를 화면에 표시합니다.

#### 6-1. Create `MessagesComponent`

```bash
$ ng generate component messages
```

```html
<!-- src/app/app.component.html
 -->
<h1>{{title}}</h1>
<app-heroes></app-heroes>
<app-messages></app-messages>
```

#### 6-2. Create the `MessageService`

```bash
$ ng generate service message
```

`message service`에 프로퍼티와 메서드를 추가합니다.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
```

#### 6-3. Inject it into the `HeroService`

특정 이벤트가 발생했을 때 `hero` 데이터를 `messages` 배열에 추가할 것이기 때문에 의존성 주입을 해줘야합니다.

```typescript
// /src/app/hero.service.ts
import { MessageService } from './message.service';
...
	constructor(private messageService: MessageService) { }
...
```

`HeroService`에 `MessageService`를 불러옵니다.

`HeroService` 생성자를 수정해서 `messageService` 프로퍼티를 `private`으로 선언하도록 합니다. 그러면 `HeroService`가 생성될 때 Angular가 `MessageService`의 **싱글턴 인스턴스를 의존성으로 주입할 것**입니다.

> `MessageService`는 `HeroService`에 의존성으로 주입되고, `HeroService`는 다시 `HeroesComponent`에 의존성으로 주입되어있는 상태입니다.

#### 6-4. Send a message from `HeroService`

```typescript
// src/app/hero.service.ts
...
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES)
    this.messageService.add('HeroService: fetched heroes')
    return heroes
  }
...
```

#### 6-5. Display the message from `HeroService`

`MessageService`가 받은 메시지를 표시하기 위해 `MessageComponent`를 수정합니다.

```typescript
// src/app/messages/messages.component.ts
import { MessageService } from '../message.service';
...
	constructor(public messageService: MessageService) {}
...
```

이때 `messageService`를 **public**으로 할당해줍니다. 이렇게 작성하면 Angular가 `MessagesComponent`의 인스턴스를 생성할 때 `MessageService`의 싱글턴 인스턴스를 이 프로퍼티로 전달할 것입니다.

:heavy_exclamation_mark:`messageService` 프로퍼티는 템플릿에 바인딩되기 때문에 **반드시 public으로** 선언해야합니다.

> Angular에서는 *public* 으로 선언된 컴포넌트 프로퍼티만 HTML에 바인딩할 수 있습니다.

#### 6-6. Bind to the `MessageService`

```html
<!-- src/app/messages/messages.component.html -->

<div *ngIf="messageService.messages.length">
  <h2>Messages</h2>
  <button class="clear"
          (click)="messageService.clear()">clear</button>
  <div *ngFor='let message of messageService.messages'> {{message}} </div>
</div>
```

이 템플릿은 컴포넌트에 읜존성으로 주입된 `messageService`를 직접 바인딩했습니다.

* 템플릿에 **직접** 바인딩 하기 위해 **public** 으로 선언을 했던 것입니다.
* `*ngIf`와 `*ngFor`를 사용하여 화면을 구성했습니다.
* `button` 에  `click` 이벤트에 `messageService`의 `clear()`메서드를 바인딩 했습니다.

### 7. Add additional messages to hero service

이제 영웅을 클릭했을 때 어떤 영웅을 클릭했는지 `messageService`에 보내줄 것입니다.

```typescript
// src/app/heroes/heroes.component.ts
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { } // ㅇmessageService 의존성 주입

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
      // 영웅을 클릭할 때마다 messageService.add 메서드 실행
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
}

```

서버를 실행하면 기능들이 정상적으로 작동하는 것을 확인할 수 있습니다.

![Animation_2021-03-09-21-25-41](https://user-images.githubusercontent.com/52653793/110470340-0fdbd800-811e-11eb-83ea-db823a1d0c28.gif)

## 05. Add navigation with routing

현재 부모자식 관계인 `HerosComponent`와 `HeroDetailComponent`를  `Route`기능을 활용하여 각각의 `Route`로 분리하고, 영웅을 선택할 수 있는 `DashboardComponent`도 추가해보겠습니다.

### 1. Add the `AppRoutingModule`

Angular에서는 최상위 모듈과 같은 계층에 별개의 모듈을 두고, 이 모듈에 애플리케이션 최상위 라우팅 모듈을 정의하는 방법을 권장합니다. `AppModule`은 이렇게 정의한 라우팅 설정을 로드해서 사용하기만 하면 됩니다.

`CLI`를 통해 라우팅에 사용할 새로운 모듈을 만듭니다.

```bash
$ ng generate module app-routing --flat --module=app
```

> 일반적으로 애플리케이션 최상위 라우팅을 담당하는 모듈의 클래스 이름은 `AppRoutingModule`이라고 정의합니다.
>
> --flat :  새로운 폴더를 만들지 않고 src/app 폴더에 파일을 생성합니다.
>
> --module=app : 새로 만든 모듈을 AppModule의 imports 배열에 자동으로 추가합니다.

명령어를 실행하면 다음과 같은 모듈 파일이 생성됩니다.

```typescript
// src/app/app-routing.module.ts (
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
```

이렇게 만들어진 모듈은 아직 아무 역할을 하지 않습니다. 이 모듈에 `Angular`에서 제공하는 모듈 시스템을 활용하여 라우팅을 담당하는 모듈로 만들어주면 됩니다.

```typescript
// src/app/app-routing.module.ts 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

* 필요없는 `CommonModule` , `declarations` 은 삭제합니다.

* 라우팅 규칙에 따라 이동할 `HeroesComponent`를 로드합니다.

  ```typescript
  const routes: Routes = [
    { path: 'heroes', component: HeroesComponent }
  ];
  ```

  * 라우팅 정보를 정의할 `Routes`타입의  `routes` 배열을 선언합니다.

    > type Routes = Route[]

  * `path`와 해당 경로로 접근했을 때 보여줄 `component`를 정의합니다.

  * 이제  `localhost:4200/heroes`와 같은 URL로 이동하면 `HeroesComponent`를 표시할 수 있습니다.

* `@NgModule`에 메타데이터를 정의해줍니다.

  ```typescript
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  ```

  * `@NgModule`에 메타데이터를 지정하면 모듈이 생성될 때 라우터를 초기화하고 브라우저의 주소가 변화되는 것을 감지합니다.

  *  `AppRoutingModule`에도 라우터를 초기화하기 위해 `imports` 배열에 `RouterModule`을 등록해야 하는데, 이 때 `RouterModule.forRoot()` 메소드에 위에서 만든`routes` 배열을 인자로 넣어서 실행한 결과를 지정합니다.

    > 애플리케이션 최상위 계층에 존재하는 라우터를 설정할 때는 `forRoot()` 메소드를 사용합니다. `forRoot()` 메소드를 사용하면 라우팅과 관련된 서비스 프로바이더(?)와 디렉티브(?)를 애플리케이션에 제공할 수 있으며, 브라우저에서 변경되는 URL을 감지할 수 있습니다.

  * 앱에서도 `RouterModule`을 사용할 수 있도록 `AppRoutingModule`의 `exports` 배열에도 `RouterModule`을 추가해줍니다.

### 2. Add `RouterOutlet`

`[router-outlet]` selector를 통해 라우팅을 통해 변경할 컴포넌트의 위치를 지정해줄 수 있습니다.

>  [router-outlet 공식문서](https://angular.io/api/router/RouterOutlet) 

`AppComponent`에서 `<app-heroes>` 대신에 `<router-outlet>`엘리먼트로 변경합니다.

```html
<!-- src/app/app.component.html -->
<h1>{{title}}</h1>
<router-outlet></router-outlet>
<app-messages></app-messages>
```

>`RouterOutlet` 디렉티브는 `AppComponent`에서도 사용할 수 있습니다. 왜냐하면 `AppModule`이 로드하고 있는 `AppRoutingModule`이 `RouterModule`을 외부로 공개하고 있기 때문인데,  `CLI`로 routing module을 생성하면서 `--module=app` 플래그를 지정했기 때문에 자동으로 추가된 것입니다.
>
> `app-routing.module.ts` 파일을 직접 생성했거나 Angular CLI 외의 툴을 사용했다면 `app.module.ts` 파일에서 `AppRoutingModule`을 로드하고 `NgModule`의 `imports` 배열에 이 라우팅 모듈을 추가하면 됩니다.

서버를 실행하면 더 이상 메인 화면에 `HeroesComponent`가 보이지 않고, URL주소 뒤에 `/heroes`를 추가하면 보이게 될 것입니다.

### 3. Add a navigation link

매번 URL을 직접 수정할 수는 없기 때문에 링크를 클릭하여 라우터 이동을 할 수 있도록 네비게이션을 추가합니다.  `<a>` 요소와 `routerLink`를 통해 라우터 이동을 할 수 있습니다.

```html
<!-- src/app/app.component.html -->
<h1>{{title}}</h1>
<nav>
  <a routerLink="/heroes">Heroes</a>
</nav>
<router-outlet></router-outlet>
<app-messages></app-messages>
```

`routerLink`는 `RouterModule`이 제공하는 `RouterLink` 디렉티브이며, 사용자가 이 디렉티브가 적용된 엘리먼트를 클릭하면 네비게이션을 실행합니다. `routerLink` 어트리뷰트의 값으로 `HeroesComponent`의 경로인 `"/heroes"`를 할당해주면 됩니다.

### 4. Add a dashboard view

새로운 컴포넌트 `DashboardComponent`를 만들어 라우팅 연습을 해보겠습니다.

```bash
$ng generate component dashboard
```

```html
<!-- dashboard.component.html -->
<h3>Top Heroes</h3>
<div class="grid grid-pad">
  <a *ngFor="let hero of heroes" class="col-1-4">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </a>
</div>
```

```typescript
// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
```

>  [스타일은 공식문서 참고..](https://angular.io/tutorial/toh-pt5#add-a-dashboard-view)

#### 4-1. Add the dashboard route

`route`에도 추가하고 네이게이션에 링크를 추가해줍니다.

```typescript
// app-routing.module.ts
import { DashboardComponent } from './dashboard/dashboard.component';
```

```typescript
// app-routing.module.ts
...
	{ path: 'dashboard', component: DashboardComponent },
...
```

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
</nav>
```



#### 4-2. Add a default route

지금은 첫 화면에 접근했을 때의 라우터를 설정하지않아 아무것도 안보입니다.

처음 접근했을 때 `DashboardComponent`가 보여지도록 다음과 같은 `route`를 추가해줍니다.

```typescript
// app-routing.module.ts
...
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
...
```

이제 브라우저의 URL이 빈 문자열일 때 `/dashboard` 주소로 이동하도록 설정하였습니다.

### 5. Navigating to hero details

지금까지는 `HerodetailComponent`는 `HeroesComponenet`의 자식요소로 부모로부터 영웅 정보를 받아 화면에 보여줬지만, 이제 하나의 라우터로 분리하고 그에 맞게 코드를 수정해보겠습니다.

#### 5-1. Add a *hero detail* route

`HeroesComponent`에서 `HeroDetailComponent`를 삭제하고 라우터를 등록해줍니다.

```typescript
// app-routing.module.ts
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
...
	{ path: 'detail/:id', component: HeroDetailComponent },
...
```

>  이제 `localhost:4200/heroe/2`로 접근하면 id가 2인 영웅의 상세정보를 보여주게 됩니다.

#### 5-2. `DashboardComponent` hero links

`DashboardComponent`에서 영웅을 클릭하면 라우터 이동하도록 템플릿을 수정합니다.

```html
<!-- dashboard.component.html -->
<a *ngFor="let hero of heroes"
  routerLink="/detail/{{hero.id}}">
  {{hero.name}}
</a>
```

#### 5-3. `HeroesComponent` hero links

`HeroescComponent` 역시 `onSelect` 함수를 통한 동작이 아닌 라우터 이동 방식으로 코드를 수정합니다.

```html
<!-- heroes.component.html -->
<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <a routerLink="/detail/{{hero.id}}">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </a>
  </li>
</ul>
```

```typescript
// heroes.component.ts

export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
```

### 6. Routable `HeroDetailComponent`

`HeroDetailComponent`와 관련된 라우터 처리는 모두 해주었습니다.

이제 `HeroDetailComponent`코드가 부모로부터 정보를 받는 방식이 아닌 라우터 이동시 URL을 활용하는 방식으로 코드를 수정해보겠습니다.

```typescript
// hero-detail.component.ts
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
...
    constructor(
      private route: ActivatedRoute,
      private heroService: HeroService,
      private location: Location
    ) {}
...
```

> 컴포넌트 생성자로 `ActivatedRoute`, `HeroService`, `Location` 서비스를 의존성으로 주입하고 `private` 프로퍼티로 선언합니다

* `ActivatedRoute`는 `HeroDetailComponent`의 인스턴스를 생성하면서 적용한 라우팅 규칙에 대한 정보를 담고 있어 전달되는 변수를 추출할 수 있습니다.
* 그렇게 가져온 정보를 통해 `heroService`에서 정보를 가져옵니다.
* `location`은 브라우저를 제어할 수 있어 나중에 이전 페이지로 가는 기능을 만들 때 사용합니다.

#### 6-1. Extract the `id` route parameter

```typescript
// hero-detail.component.ts

ngOnInit(): void {
  this.getHero();
}

getHero(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
}
```

`route.snapshot`은 컴포넌트가 생성된 직후에 존재하는 라우팅 규칙에 대한 정보를 담고 있는 객체입니다.

이 객체가 제공하는 `paramMap`을 사용하면 URL에 존재하는 라우팅 변수를 참조할 수 있습니다. 지금 작성하고 있는 예제에서는 서버로부터 받아올 히어로의 `id`에 해당하는 값을 URL에 있는 `"id"` 키로 참조합니다.

라우팅 변수는 언제나 문자열 타입입니다. 그래서 라우팅 변수로 전달된 값이 원래 숫자였다면 문자열로 받아온 라우팅 변수에 JavaScript (+) 연산자를 사용해서 숫자로 변환할 수 있습니다.

#### 6-2. Add `HeroService.getHero()`

`HeroDetailComponent`에서 사용한 `heroService.getHero`메서드도 정의해줍니다.

```typescript
// hero.service.ts
getHero(id: number): Observable<Hero> {
  // TODO: 이 메시지는 서버에서 히어로 정보를 가져온 _후에_ 보내야 합니다.
  this.messageService.add(`HeroService: fetched hero id=${id}`)
  return of(HEROES.find(hero => hero.id === id));
}
```

이제 서버를 실행해보면 모든 기능이 정상적으로 작동할 것입니다.

#### 6-3. Find the way back

마지막으로 `HeroDetailComponent`에서 뒤로가기 버튼을 구현해보겠습니다.

```html
<!-- /hero-detail.component.html -->
<button (click)="goBack()">go back</button>
```

```typescript
// hero-detail.component.ts
goBack(): void {
  this.location.back();
}
```

> 생성자에서 정의한 location (Location)을 통해 브라우저를 제어하여 이전 페이지로 돌아갑니다.