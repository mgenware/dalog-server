export default class Entry {
  message: string;
  time: Date;

  constructor(
    public category: string,
    public level: number,
    public data: any) {
      this.time = new Date();
      this.message = JSON.stringify(data);
    }
}
