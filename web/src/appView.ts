import { html, customElement, LitElement } from 'lit-element';
import * as lp from 'lit-props';
import { Entry } from './entry';
import delay from 'delay';
import pForever from 'p-forever';
import InfoResp from './infoResp';

const serverPort = '3333';

@customElement('app-view')
export class AppView extends LitElement {
  @lp.array entries: Entry[] = [];
  @lp.bool initialized = false;
  @lp.string ipv4 = '';
  @lp.string ipv6 = '';

  async firstUpdated() {
    await this.init();
  }

  render() {
    if (!this.initialized) {
      return html`Initializing dalog server...`;
    }
    return html`
      <h1>dalog server</h1>
      <p>
        IPv4 ${this.ipv4}:${serverPort} IPv6 ${this.ipv6}:${serverPort}
      </p>
      <div>
        <ul>
          ${this.entries.map((e) => html` <div>${e.message}</div> `)}
        </ul>
      </div>
    `;
  }

  private async init() {
    const resp = await fetch('http://localhost:3333/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const info = (await resp.json()) as InfoResp;
    this.ipv4 = info.ipv4;
    this.ipv6 = info.ipv6;
    this.initialized = true;
    this.startFetcher();
  }

  private startFetcher() {
    pForever(async () => {
      const resp = await fetch('http://localhost:3333/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const entries = (await resp.json()) as Entry[];
      if (Array.isArray(entries)) {
        for (const e of entries) {
          this.entries.push(e);
        }
      } else {
        throw new Error(`Got malformed log: ${JSON.stringify(entries)}`);
      }
      await delay(1000);
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-view': AppView;
  }
}
