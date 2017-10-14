const bb = require('..');

const colorLogger = new bb.Logger(new bb.ConsoleProvider({ showColor: true }));
colorLogger.info('user.http.get', {
  request: '/user/1',
  platform: 'ios',
});
colorLogger.error('user.http.update', {
  status: 404,
  id: 123,
});

const plainLogger = new bb.Logger(new bb.ConsoleProvider());