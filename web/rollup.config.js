import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import litcss from 'rollup-plugin-lit-css-ex';

const isProd = process.env.NODE_ENV == 'production';

const plugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
  litcss(),
  typescript(),
];

if (isProd) {
  plugins.push(terser());
}

const tasks = [
  {
    input: 'src/main.ts',
    output: {
      name: 'dalog',
      file: 'dist/main.js',
      format: 'umd',
      exports: 'named',
      sourcemap: true,
    },
    plugins,
  },
];

export default tasks;
