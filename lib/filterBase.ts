export default abstract class FilterBase {
  abstract shouldLog(category: string, level: number, message: string): boolean;
}
