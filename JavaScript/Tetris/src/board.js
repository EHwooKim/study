// 보드 로직

class Board {
  grid

  reset() {
    this.grid = this.getEmptyBorad()
  }

  getEmptyBorad() {
    return Array.from(
      { length: ROWS },
      () => Array(COLS).fill(0)
    )
  }

  isEmpty(x, y) {
    return (this.grid[y][x] === 0)
  }
  insideWalls(x) {
    return (x >= 0 && x < COLS)
  }
  aboveFloor(y) {
    return y < ROWS
  }

  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        if (value) {
          let x = p.x + dx
          let y = p.y + dy
          return (
            (this.insideWalls(x) && this.aboveFloor(y)) && 
            this.isEmpty(x, y)
          )
        }
        return true
      })
    })
  }
}