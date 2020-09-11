import pprint

def decrease_row(location):
  return (location[0] + 1, location[1])
def increase_col(location):
  return (location[0], location[1] + 1)
def increase_diagonal(location):
  return (location[0] - 1, location[1] -1)

def solution(n):
  answer = [[0] * n for _ in range(n)]
  count_arr = list(range(n, 0, -1))
  now_location = (-1, 0)
  now_value = 1
  direction = 0

  for count in count_arr:
    while count:
      if direction == 0:
        now_location = decrease_row(now_location)
      elif direction == 1:
        now_location = increase_col(now_location)
      else:
        now_location = increase_diagonal(now_location)
      answer[now_location[0]][now_location[1]] = now_value
      count -= 1 
      now_value += 1
    direction = (direction + 1) % 3  
  result = []
  for i in range(len(answer)):
    for j in range(len(answer)):
      if answer[i][j]:
        result.append(answer[i][j])
  return result

print(solution(5))