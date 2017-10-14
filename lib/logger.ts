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

  log(category: string, level: number, data: any) {
    this._provider.log(category, level, JSON.stringify(data));
  }

  error(category: string, data: any) {
    this.log(category, LogLevel.Error, data);
  }

  warning(category: string, data: any) {
    this.log(category, LogLevel.Warning, data);
  }

  info(category: string, data: any) {
    this.log(category, LogLevel.Info, data);
  }

  verbose(category: string, data: any) {
    this.log(category, LogLevel.Verbose, data);
  }
}
