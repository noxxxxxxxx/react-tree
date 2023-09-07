export default class {
  static s() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  static uuid() {
    return this.s() + this.s() + this.s()
  }

  static guid() {
    return this.s() + this.s() + '-' + this.s() + '-' + this.s() + '-' + this.s() + '-' + this.s() + this.s() + this.s()
  }
}
