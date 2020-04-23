import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Entry, newEntry } from './entry';
import * as internalIP from 'internal-ip';
import * as fs from 'fs';
import * as nodepath from 'path';
const app = express();
const port = 3333;

let entries: Entry[] = [];
const homeHTML = fs.readFileSync(nodepath.join(__dirname, 'home.html'), 'utf8');

app.use(bodyParser.json());
app.use('/static', express.static('../web/dist'));

app.post('/log', (req, res) => {
  if (req.body) {
    const entry = newEntry(req.body);
    entries.push(entry);
  }
  res.status(200);
});

app.post('/fetch', (_, res) => {
  res.status(200).json(entries);
  entries = [];
});

app.post('/info', async (_, res) => {
  const ipv4 = (await internalIP.v4()) || '';
  const ipv6 = (await internalIP.v6()) || '';
  res.status(200).json({ ipv4, ipv6 });
});

app.get('/', (_, res) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from(homeHTML));
});

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`dalog-server listening at http://localhost:${port}`),
);
