module.exports = {
  _: {
    privateTasks: {
      copyfiles: {
        run: 'cpy src/home.html dist',
      },
    },
  },
  compile: {
    run: 'tsc -b tests',
  },
  clean: {
    run: 'rimraf dist dist_tests',
  },
  dev: {
    run: ['#clean', '#copyfiles', 'tsc -b tests -w'],
    env: {
      NODE_ENV: 'development',
    },
  },
  lint: {
    run: 'eslint --max-warnings 0 --ext .ts src/ tests/',
  },
  test: {
    run: ['#lint', '#clean', '#compile', '#t'],
  },
  t: {
    run: 'mocha --require source-map-support/register dist_tests/**/*.test.js',
  },
  build: {
    run: ['#copyfiles', '#test'],
  },
  env: {
    NODE_ENV: 'production',
  },
};
