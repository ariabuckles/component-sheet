# ComponentSheet

ComponentSheet is a better syntax for styling react elements.

What ComponentSheet offers:

 * Style react elements cleanly, without all the `div`/`View` `className=`
   or `style=` noise

 * Style elements using JSX

 * Separate the static parts of your `render()` function

 * Supports multiple backends. Works seamlessly with:
    * [Aphrodite][aphrodite]
    * [React Native][react-native]
    * [React Native Web][react-native-web]
    * Emotion and styled-components support coming soon
       * (Interested in using ComponentSheet with another backend?
         [Ping me on twitter][my-twitter]


## Usage


```jsx
const S = ComponentSheet.create({

  Container: (

  ),

  ButtonRow: (

  ),

  AcceptButton: (
    <button
      style={{
        backgroundColor: 'green',
        borderRadius: 10,
      }}
    />
  ),

  CancelButton: (
    <button
      style={{
        backgroundColor: 'gray',
        borderRadius: 10,
      }}
    />
  ),

});

function MyComponent(props) {
  return (
    <S.Container>
      Would you like to continue?

      <S.ButtonRow>
        <S.AcceptButton onPress={props.onContinue} />
        <S.CancelButton onPress={props.onCancel} />
      </S.ButtonRow>
    </S.Container>
  );
}
```


## Getting Started

Choose one:

 * `npm install --save @component-sheet/aphrodite`
 * `npm install --save @component-sheet/native` (for React Native or react-native-web)
 * (more coming soon)

Optionally add the jsx pragma, with either:

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

## Advanced Usage

Coming soon.


[my-twitter]: https://twitter.com/ariabuckles
[babel-plugin-import-jsx-pragma]: https://www.npmjs.com/package/@wordpress/babel-plugin-import-jsx-pragma
