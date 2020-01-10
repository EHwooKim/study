// seal - 객체 밀본, 속성 추가/삭제 불가
const album = {
    name: 'LOVE YOURSELF'
}


album.song = 'Euphoria'
album.singer = 'RM'

console.log(album)
Object.seal(album)

album.comment = 'Answer'
album.singer = 'JK'
delete album.name

console.log(album)