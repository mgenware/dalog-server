
export default abstract class ProviderBase {
  abstract log(category: string, level: number, message: string): void;
}
