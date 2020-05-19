# 설치 및 기본 설정

* 설치 

  ```bash
  $npm i -g typescript
  ```

* 버전 확인

  ```bash
  $tsc -v
  ```

  > 앞으로 typescript 실행 명렁어는 tsc.

* 실행

  ```bash
  # person.ts 파일 작성 후.
  $tsc person
  ```

  * tsc 명렁어 뒤에 트랜스파일링 대상 파일명을 지정하면 같은 디렉터리에 js 파일이 생성된다.

  * 컴파일 옵션에  `--target` 혹은 `-t`를 사용하면  해당 버전의 js 파일로 트랜스파일링된다.

    ```bash
    $tsc person -t ES2015
    ```

* tsc 옵션 설정

  ```bash
  $tsc --init
  ```

  > 옵션 설정을 위한 파일인 tsconfig.json이 생성된다.

  * `tsconfig.json` 파일 생성 후, **tsc 명령어 뒤에 파일명을 지정하면 tsconfig.json이 무시되기에 **tsc 명령어만 사용한다.

    ```bash
    $tsc person
    ```

    > tsconfig.json이 무시된다.

    ```bash
    $tsc
    ```

    > 폴더 내의 모든 TypeScript 파일이 tsconfig.json에 맞게 모두 트랜스파일링된다.

  