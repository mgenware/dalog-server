import ProviderBase from '../providerBase';
import LogLevel from '../logLevel';
import Entry from '../entry';
import * as chalk from 'chalk';

const levelStrMap: {[key: number]: string|null} = {};
levelStrMap[LogLevel.Info] = 'INFO';
levelStrMap[LogLevel.Error] = 'ERR!';
levelStrMap[LogLevel.Verbose] = 'VERB';
levelStrMap[LogLevel.Warning] = 'WARN';

const levelFuncMap: {[key: number]: any} = {};
levelFuncMap[LogLevel.Info] = chalk.green;
levelFuncMap[LogLevel.Error] = chalk.red;
levelFuncMap[LogLevel.Verbose] = chalk.dim;
levelFuncMap[LogLevel.Warning] = chalk.yellow;

export default class DefaultProvider extends ProviderBase {
  showColor: boolean;

  constructor({showColor}: {showColor?: boolean} = {}) {
    super();
    this.showColor = showColor || false;
  }

  log(entry: Entry): void {
    const {level, category, message} = entry;

    const head = `[${this.levelToStr(level)}] ${category}`;
    const time = this.formatTime(entry.time);

    if (this.showColor) {
      process.stdout.write((this.levelToFunc(level, true))(head));
      // tslint:disable-next-line: no-console
      console.log('  ' + time);
      // tslint:disable-next-line: no-console
      console.log((this.levelToFunc(level, false))(message));
    } else {
      // tslint:disable-next-line: no-console
      console.log(`${head}  ${time}\n${message}`);
    }
  }

  private levelToStr(level: number): string {
    const predefined = levelStrMap[level];
    if (predefined) {
      return predefined;
    }
    return `${level}`;
  }

  private levelToFunc(level: number, bold: boolean): any {
    const predefined = levelFuncMap[level];
    if (predefined) {
      return bold ? predefined.bold : predefined;
    }
    return (str: string) => str;
  }

  private formatTime(d: Date): string {
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
  }
}
