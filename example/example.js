const bb = require('..');

function funWithLogger(name, logger) {
  console.log(`======== ${name} ========`);
  logger.verbose('user.profile.click', {
    target: 123,
    src: 32,
  });
  logger.info('user.http.get', {
    request: '/user/1',
    platform: 'ios',
  });
  logger.warning('memory.warning', {
    used: '400mb',
  });
  logger.error('user.http.update', {
    status: 404,
    id: 123,
  });
  console.log();
}

const plainLogger = new bb.Logger(new bb.ConsoleProvider());
const colorLogger = new bb.Logger(new bb.ConsoleProvider({ showColor: true }));

funWithLogger('Plain console logger', plainLogger);
funWithLogger('Color console logger', colorLogger);