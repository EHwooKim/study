# TypeScript - React Tutorial

* [참고 페이지](https://react.vlpt.us/using-typescript/02-ts-react-basic.html)

* `VScode 안내 메시지`, `Ctrl + space`.  `Ctrl + click` 등을 잘 활용해보자.

## 목차

* [TypeScript 프로젝트 생성](##TypeScript-프로젝트-생성)
* [props](##props)
* [event type](##event-type)
* [useState](##useState)
* [userReducer](##userReducer)

## TypeScript 프로젝트 생성

```bash
$ npx create-react-app __프로젝트 이름__ --typescript
```

## props

> [코드1 - Greetings.tsx](./src/Greetings.tsx) 
>
> [코드2 - MyForm.tsx](./src/MyForm.tsx)

* 부모로부터 받는 `props`들도 타입을 명시해줘야한다.

* props로 넘어오는 `state`들뿐 아니라 **함수**들 역시 명시를 해줘야한다.

  ```typescript
  type GreetingsProps = {
    name: string;
    mark: string;
    optional?: string;
    onClick: (name: string) => void;
  };
  ```

## event type

* `onChange`, `onClick`과 같은 이벤트의 경우 매개변수로 `event`를 넘겨주는데 이런 것처럼 해당 변수의 타입을 잘 모른다면 `any`를 써도 되겠지만!? `onChange` 이벤트에 마우스를 올리면 나오는 안내 메세지를 참고하여 타입을 적어주면 된다.

  ![eventType](https://user-images.githubusercontent.com/52653793/87396153-6162b000-c5ed-11ea-8c5c-a9e8785df8d2.png)

## useState

> [코드 - Counter.tsx](./src/Counter.tsx)

* `useState`를 사용할 때는 `Generics`를 사용해 타입을 정해주면 된다.

  ```typescript
  const [count, setCount] = useState<number>(0)
  ```

* 하지만 굳이 `Generics`를 사용하지 않아도 알아서 타입을 유추하기 때문에 사용하지 않아도 된다.

* 하지만,  상태가 `null`일 수도 있고 아닐 수도 있을 때 `Generics`를 활용하면 좋다

  ```typescript
  type Infomation = { name: string, description: string }
  const [info, setInfo] = useState<infomation | null>(null)
  ```

## userReducer 

> [코드 - ReducerSample.tsx](./src/ReducerSample.tsx)

* `state`는 `타입 앨리어스`나 `인터페이스`로 기존 형식 그대로 타입을 정해주면 된다.

* `action`의 경우에도 타입을 명시해줘야 하는데,  이때 `유니온 타입`을 활용한다. 이때 action.type외의 다른 값들이 있을 경우 그 또한 타입을 명시해줘야 한다.

  ```typescript
  type Action = 
    | { type: 'SET_COUNT', count: number }
    | { type: 'SET_TEXT', text: string }
    | { type: 'SET_COLOR', color: Color}
    | { type: 'TOGGLE_GOOD' }
  ```

## Context API

## 리덕스

## 리덕스 미들웨어

