import fetch from 'node-fetch';

setInterval(async () => {
  await fetch(`http://localhost:3333/log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      level: 1,
      time: new Date().toISOString(),
      message: 'test',
    }),
  });
}, 1200);
