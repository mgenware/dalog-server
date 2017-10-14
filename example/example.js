const bb = require('..');

const colorLogger = new bb.Logger(new bb.ConsoleProvider({ showColor: true }));
colorLogger.error({
  user: 'mgen',
  id: 123,
});
colorLogger.warning({
  user: 'zhang',
  id: 3,
});

const plainLogger = new bb.Logger(new bb.ConsoleProvider());