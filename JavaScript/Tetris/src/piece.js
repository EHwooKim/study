// 테트리스 조각 로직
class Piece {
  x
  y
  color
  shape
  ctx

  constructor(ctx) {
    this.ctx = ctx
    this.spawn()
  }

  spawn() {
    this.color = 'blue',
    this.shape = [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0]
    ],
    // 시작지점
    this.x = 3
    this.y = 0
  } 

  draw() {
    this.ctx.fillStyle = this.color
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1)
        }
      })
    })
  }
  
  move(p) {
    this.x = p.x
    this.y = p.y
  }
}