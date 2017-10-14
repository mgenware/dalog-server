const bb = require('..');

const colorLogger = new bb.Logger(new bb.ConsoleProvider(true));
colorLogger.error({
  user: 'mgen',
  id: 123,
});
colorLogger.warning({
  user: 'zhang',
  id: 3,
});

const plainLogger = new bb.Logger(new bb.ConsoleProvider(false));