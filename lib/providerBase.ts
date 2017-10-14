import Entry from './entry';

export default abstract class ProviderBase {
  abstract log(entry: Entry): void;
}
