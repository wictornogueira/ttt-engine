import { EventEmitter } from 'events'
import { Constants, Utils } from './utils'

export class Game extends EventEmitter {
  board: Array<any>
  players: Set<any>
  running: boolean
  turn: any
  numOfMoves: number

  constructor () {
    super()
    this.players = new Set()
    this.board = new Array(9)
    this.running = false
    this.turn = null
    this.numOfMoves = 0
  }

  join (player: any): void {
    if (this.players.size < 2 && !this.players.has(player) && player !== null) {
      this.players.add(player)
      this.emit(Constants.Events.JOIN, player)
    }
  }

  leave (player: any): void {
    this.players.delete(player) && this.emit(Constants.Events.LEAVE, player)
    this.running && this.stop()
  }

  start (): void {
    if (!this.running && this.players.size === 2) {
      this.numOfMoves = 0
      this.board.fill(null)
      this.running = true
      this.turn = Utils.randomItem(Array.from(this.players))

      this.emit(Constants.Events.START, Array.from(this.players))
      this.emit(Constants.Events.NEXTPLAYER, this.turn)
    }
  }

  stop (winner?: any): void {
    if (this.running) {
      this.running = false
      this.emit(Constants.Events.END, winner)
    }
  }

  play (player: any, cell: number): void {
    // Needs some optimization 🔥
    if (this.running && player === this.turn && Number.isInteger(cell) && cell >= 0 && cell < 9 && this.board[cell] === null) {
      this.numOfMoves++
      this.board[cell] = player
      this.emit(Constants.Events.PLAY, { player, cell })

      const winner = this.check(cell)
      if (winner) { return this.stop(winner) }

      this.turn = this.getNextPlayer()
      this.emit(Constants.Events.NEXTPLAYER, this.turn)
    }
  }

  getNextPlayer (currentPlayer: any = this.turn): any {
    return Array.from(this.players.values()).find(player => player !== currentPlayer)
  }

  check (cell: number, board: Array<any> = this.board): any {
    const hasWinner = Constants.Possibilities[cell].some(possibility => {
      for (const pos of possibility) {
        if (board[pos] !== board[cell]) { return false }
      }

      return true
    })

    return hasWinner ? board[cell] : board.some(cell => cell === null) ? null : Constants.TIE
  }
}
