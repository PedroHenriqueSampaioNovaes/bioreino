export default class Countdown {
  constructor(private futureDate: Date) {}

  private get _actualDate() {
    return new Date();
  }

  private get _futureDate() {
    return new Date(this.futureDate);
  }

  private get _timestampDiff() {
    return this._futureDate.getTime() - this._actualDate.getTime();
  }

  public get days() {
    return Math.floor(this._timestampDiff / (1000 * 60 * 60 * 24));
  }

  public get hours() {
    return Math.floor(this._timestampDiff / (1000 * 60 * 60));
  }

  public get minutes() {
    return Math.floor(this._timestampDiff / (1000 * 60));
  }

  public get seconds() {
    return Math.floor(this._timestampDiff / 1000);
  }

  public get total() {
    const days = this.days;
    const hours = this.hours % 24;
    const minutes = this.minutes % 60;
    const seconds = this.seconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
}
