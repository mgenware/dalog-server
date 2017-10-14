import ProviderBase from '../providerBase';
import LogLevel from '../logLevel';
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

  log(category: string, level: number, message: string): void {
    const formatted = this.formatContent(category, level, message);
    if (this.showColor) {
      console.log((this.levelToFunc(level))(formatted));
    } else {
      console.log(formatted);
    }
  }

  private levelToStr(level: number): string {
    const predefined = levelStrMap[level];
    if (predefined) {
      return predefined;
    }
    return `${level}`;
  }

  private levelToFunc(level: number): any {
    const predefined = levelFuncMap[level];
    if (predefined) {
      return predefined;
    }
    return (str: string) => str;
  }

  private formatContent(category: string, level: number, message: string): string {
    const typeStr = `[${this.levelToStr(level)}]`;
    return `${typeStr} ${category}\n${message}`;
  }
}
