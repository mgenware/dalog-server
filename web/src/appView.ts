import { html, customElement, LitElement } from 'lit-element';
import * as lp from 'lit-props';
import { Entry } from './entry';
import delay from 'delay';
import pForever from 'p-forever';

@customElement('app-view')
export class AppView extends LitElement {
  @lp.array entries: Entry[] = [];

  firstUpdated() {
    this.startFetcher();
  }

  render() {
    return html`
      <h1>dalog server</h1>
      <div>
        <ul>
          ${this.entries.map((e) => html` <div>${e.message}</div> `)}
        </ul>
      </div>
    `;
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
