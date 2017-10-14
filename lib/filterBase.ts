export default abstract class FilterBase {
  abstract shouldLog(level: number, message: string): boolean;
}
