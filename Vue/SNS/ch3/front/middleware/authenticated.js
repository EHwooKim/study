// 로그인한 사용자인지 검사하는 미들웨어
export default function ({ store, redirect }) {  // 매개변수는 원래 context 자리인데 구조분해해서 store에 접근, redirect로 보낼 페이지
    if (!store.state.users.me) {
        redirect('/')
    }
}