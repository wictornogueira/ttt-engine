export const Events = {
  END: 'end',
  JOIN: 'join',
  PLAY: 'play',
  LEAVE: 'leave',
  START: 'start',
  NEXTPLAYER: 'nextplayer'
}

export const Possibilities = [
  [[0, 1, 2], [0, 3, 6], [0, 4, 8]],
  [[0, 1, 2], [1, 4, 7]],
  [[0, 1, 2], [2, 5, 8], [2, 4, 6]],
  [[3, 4, 5], [0, 3, 6]],
  [[3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6]],
  [[3, 4, 5], [2, 5, 8]],
  [[6, 7, 8], [0, 3, 6], [2, 4, 6]],
  [[6, 7, 8], [1, 4, 7]],
  [[6, 7, 8], [2, 5, 8], [0, 4, 8]]
]

export const TIE = '__TIE__'
