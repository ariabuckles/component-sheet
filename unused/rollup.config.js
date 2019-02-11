module.exports = {
  input: 'src/component-sheet.js',
  output: [
    {
      dir: 'modules',
      file: 'component-sheet.js',
      format: 'esm',
    },
    {
      dir: 'commonjs',
      file: 'component-sheet.js',
      format: 'cjs',
    },
  ]
};
