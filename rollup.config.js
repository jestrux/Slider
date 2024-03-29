import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';

import postcss from 'rollup-plugin-postcss';

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.js',
    output: {
      name: 'Slider',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      })
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/main.js',
    external: [],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },

  // Library CSS
  {
    input: 'src/Slider.css',
    output: {
      file: 'dist/Slider.css',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true
      })
    ]
  },
];
