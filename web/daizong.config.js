module.exports = {
  compile: {
    run: 'tsc',
  },
  clean: {
    run: 'rimraf dist',
  },
  dev: {
    run: ['#clean', 'rollup -c -w'],
    env: {
      NODE_ENV: 'development',
    },
  },
  lint: {
    run: 'eslint --max-warnings 0 --ext .ts src/',
  },
  build: {
    run: ['#lint', '#clean', 'rollup -c'],
    env: {
      NODE_ENV: 'production',
    },
  },
};
