interface UserInfo {
    username: string;
    password: string;
    age?: number;
    address?: string
}
const userInfo: UserInfo = {
    username: 'ehwoo',
    password: 'ehwoo07'
}
console.log(userInfo)