export class Utils {
  static randomItem(array: Array<any>): any {
    return array[Math.floor(Math.random() * array.length)]
  }
}
