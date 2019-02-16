ComponentSheet also supports an optional jsx pragma, which suppresses PropType warnings
for component declarations inside ComponentSheet.create, while enabling them for the
resultant jsx returned during rendering.

You can add it with either:

```javascript
// @jsx ComponentSheet.createElement
```

or with @babel/transform-react-jsx:

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      '@babel/transform-react-jsx',
      {
        pragma: 'ComponentSheet.createElement',
      }
    ],
  ],
};
```

or with [babel-plugin-import-jsx-pragma][babel-plugin-import-jsx-pragma]:

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      '@wordpress/babel-plugin-import-jsx-pragma',
      {
        scopeVariable: 'ComponentSheet_createElement',
        source: '@component-sheet/native', // or @component-sheet/aphrodite, etc.
        isDefault: false,
      }
    ],
    [
      '@babel/transform-react-jsx',
      {
        pragma: 'ComponentSheet_createElement',
      }
    ],
  ],
};
```


