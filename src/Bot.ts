import { Game } from './Game'
import { Constants } from './utils'

export function Bot (game: Game, player: any) {
  const check = (cell: number, board: Array<any>, player: any) => {
    const winner = game.check(cell, board)
    return winner === null ? null : winner === Constants.TIE ? 0 : winner === player ? 42 : -42
  }

  const negamax = (board: Array<any>, cell: number, player: any, alpha: number, beta: number): number => {
    const winner = check(cell, board, player)
    if (winner !== null) { return winner }

    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const tempBoard = [...board]
        tempBoard[i] = player

        bestScore = Math.max(bestScore, -negamax(tempBoard, i, game.getNextPlayer(player), -beta, -alpha))
        alpha = Math.max(alpha, bestScore)

        if (alpha >= beta) { break }
      }
    }

    return bestScore
  }

  const onNextPlayer = (currentPlayer: any) => {
    if (player === currentPlayer) {
      let bestMove = 0;
      let bestScore = -Infinity;

      if (game.numOfMoves > 0) {
        for (let i = 0; i < 9; i++) {
          if (game.board[i] === null) {
            const tempBoard = [...game.board];
            tempBoard[i] = player;
  
            const score = -negamax(tempBoard, i, game.getNextPlayer(player), -Infinity, Infinity);
  
            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }
      }

      game.play(player, bestMove)
    }
  }

  const onEnd = () => {
    game.off('nextplayer', onNextPlayer)
    game.off('end', onEnd)

    game.leave(player)
  }

  game.on('nextplayer', onNextPlayer)
  game.on('end', onEnd)

  game.join(player)
}
