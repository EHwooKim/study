const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

const rotate = arr => {
  console.log(arr)
  for (let y = 0; y < arr.length; ++y) {
    for (let x = 0; x < y; ++x) {
      console.log(x, y, arr[x][y], arr[y][x])
      [arr[x][y], arr[y][x]] = [arr[y][x], arr[x][y]]
    }
  }
  return arr
}

const rotatedArr = rotate(arr)
console.log(rotatedArr)

