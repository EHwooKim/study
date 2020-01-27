// 로그인 안한 사용자인지 검사하는 미들웨어 
export default function ({ store, redirect }) {
    if (store.state.users.me) {
        redirect('/')
    }
}