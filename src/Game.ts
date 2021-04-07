import { EventEmitter } from 'events'
import { Constants, Utils } from './utils'

export class Game extends EventEmitter {
  board: Array<any>
  players: Set<any>
  running: boolean
  turn: any

  constructor () {
    super()
    this.players = new Set()
    this.board = new Array(9)
    this.running = false
    this.turn = null
  }

  join (player: any): void {
    if (this.players.size < 2 && !this.players.has(player)) {
      this.emit(Constants.Events.JOIN, player)
      this.players.add(player)
    }
  }

  leave (player: any): void {
    this.players.delete(player) && this.emit(Constants.Events.LEAVE, player)
    this.running && this.stop()
  }

  start (): void {
    if (!this.running && this.players.size === 2) {
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
    if (player === this.turn && this.running && Number.isInteger(cell) && cell >= 0 && cell < 9 && this.board[cell] === null) {
      this.board[cell] = player
      this.emit(Constants.Events.PLAY, { player, cell })

      const winner = this.check(cell)
      if (winner) { return this.stop(winner) }

      this.turn = this.getNextPlayer()
      this.emit(Constants.Events.NEXTPLAYER, this.turn)
    }
  }

  getNextPlayer (currentPlayer: any = this.turn): any {
    return Array.from(this.players).find(player => player !== currentPlayer)
  }

  check (cell: number, board: Array<any> = this.board): any {
    const hasWinner = Constants.Possibilities[cell].some(possibility => {
      for (const pos of possibility) {
        if (this.board[pos] !== this.board[cell]) { return false }
      }

      return true
    })

    return hasWinner ? this.board[cell] : !this.board.some(cell => cell === null) ? Constants.TIE : undefined
  }
}
