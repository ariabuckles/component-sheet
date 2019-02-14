# ComponentSheet

ComponentSheet is a better syntax for styling React elements.

What ComponentSheet offers:

 * Style react elements cleanly, without all the `div`/`View` `className=`
   or `style=` noise

 * Style elements using JSX

 * Organize your styling, and style-related props, in one place

 * Separate the static parts of your `render()` function

 * Supports multiple backends. Works seamlessly with:
    * [Aphrodite][aphrodite]
    * [React Native][react-native]
    * [React Native Web][react-native-web]
    * Emotion and styled-components support coming soon
       * (Interested in using ComponentSheet with another backend?
         [Ping me on Twitter][my-twitter])


## Usage


```jsx
const S = ComponentSheet.create(() => {
  Container: (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
      }}
    />
  ),

  Message: (
    <div style={{ flex: 1 }}>
        Welcome! Please continue...
    </div>
  ),

  ContinueButton: (
    <button
      style={{
        height: 30,
        marginTop: 10,
        backgroundColor: 'green',
        borderRadius: 10,
      }}
    />
  ),
});


function MyNoticePage(props) {
  return (
    <S.Container>
      <S.Message />
      <S.ContinueButton onPress={props.onContinue} />
    </S.Container>
  );
}
```


## Getting Started

Choose one:

 * `npm install --save @component-sheet/aphrodite`
 * `npm install --save @component-sheet/native` (for React Native or react-native-web)
 * (more coming soon)

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

## How It Works

ComponentSheet takes the jsx you write in `ComponentSheet.create` and transforms
any inline style/classname objects into compiled css using the specified backend
library (either Aphrodite, react-native-web, or React Native).

Then, when you render a component declared in your component sheet, it merges in
the props you supply at render time, resuling in the final react element.


## Advanced Usage

Coming soon.

[_]: # "In addition, you can specify other props that should be compiled as styles, if you"
[_]: # "have a custom component that accepts multiple style props. To do this, add a"
[_]: # "parameter to `ComponentSheet.create`'s function to"


[aphrodite]: https://github.com/Khan/aphrodite
[react-native]: https://facebook.github.io/react-native/
[react-native-web]: https://github.com/necolas/react-native-web
[my-twitter]: https://twitter.com/ariabuckles
[babel-plugin-import-jsx-pragma]: https://www.npmjs.com/package/@wordpress/babel-plugin-import-jsx-pragma
