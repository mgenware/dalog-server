import LogLevel from './logLevel';
import FilterBase from './filterBase';
import ProviderBase from './providerBase';

export default class Logger {
  private _provider: ProviderBase;

  constructor(provider: ProviderBase, public filter: FilterBase|null) {
    if (!provider) {
      throw new Error('The provider argument cannot be null');
    }
    this._provider = provider;
  }

  log(level: number, data: any) {
    this._provider.log(level, JSON.stringify(data));
  }

  error(data: any) {
    this.log(LogLevel.Error, data);
  }

  warning(data: any) {
    this.log(LogLevel.Warning, data);
  }

  info(data: any) {
    this.log(LogLevel.Info, data);
  }

  verbose(data: any) {
    this.log(LogLevel.Verbose, data);
  }
}
