// 게임 초기화, 종료 로직
const canvas = document.querySelector('#board')
const ctx = canvas.getContext('2d')

ctx.canvas.width = COLS * BLOCK_SIZE
ctx.canvas.height = ROWS * BLOCK_SIZE

ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

let board = new Board()

function play() {
  board.reset()
  console.clear()
  console.table(board.grid)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  let piece = new Piece(ctx)
  piece.draw()
  
  board.piece = piece
}

const moves = {
  [KEY.LEFT]: p => ({...p, x: p.x - 1}),
  [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
  [KEY.DOWN]: p => ({...p, y: p.y + 1}),
  [KEY.SPACE]: p => ({...p, y: p.y + 1})
}

document.addEventListener('keydown', event => {
  if (moves[event.key]) {
    event.preventDefault()

    let p = moves[event.key](board.piece)

    if (board.valid(p)) {

      if (event.key === KEY.SPACE) {
        while (board.valid(p)) {
          board.piece.move(p)
          p = moves[KEY.DOWN](board.piece);
        }
      } else {
        board.piece.move(p)
      }
      
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      board.piece.draw()
    } else {
      console.log('%cCantMove', 'color:red;')
    }
  }
})