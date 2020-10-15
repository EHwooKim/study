// console.log("------------------------------------------------------------------");

// foo(
//   reallyLongArg(),
//   reallyLongArg(),
//   reallyLongArg(),
//   reallyLongArg(),
//   reallyLongArg(),
//   reallyLongArg()
// );

/**
  ESLint - Prettier 통합
*/

// 선언 후 사용안하는 변수 - ESLint에서 처리 (에러 발생)
var foo = "";

// 중복 세미콜론 - 설정에 의해 ESLint에서는 처리 안하고 Prettier에서 처리
console.log();
