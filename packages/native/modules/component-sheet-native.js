function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import { StyleSheet } from 'react-native';
var CS_TYPE_KEY = typeof Symbol === 'function' ? Symbol('component-sheet.react-element') : 'component-sheet.react-element';
var REACT_TYPE_SYMBOL = React.createElement('div')['$$typeof'];
var _ignorePropTypes = false;

var styled = function styled(element) {
  var styles = StyleSheet.create({
    style: element.props.style
  });
  var style = styles.style;
  var styledComponent = React.forwardRef(function (props, ref) {
    return React.createElement(element.type, Object.assign({
      ref: ref
    }, element.props, props, {
      style: StyleSheet.compose(style, props.style)
    }));
  });
  styledComponent[CS_TYPE_KEY] = true;
  return styledComponent;
};

var create = function create(sheetDecl) {
  _ignorePropTypes = true;
  var sheetObj = typeof sheetDecl === 'function' ? sheetDecl() : sheetDecl;
  var sheet = {};

  for (var compName in sheetObject) {
    sheet[compName] = styled(sheetObject[compName]);
  }

  _ignorePropTypes = false;
  return sheet;
};

var createElement = function createElement(type, props, child) {
  if (type[CS_TYPE_KEY]) {
    return type.render(other, props.ref);
  }

  if (_ignorePropTypes) {
    var ref = props.ref,
        key = props.key,
        _other = _objectWithoutProperties(props, ["ref", "key"]);

    return {
      '$$typeof': REACT_TYPE_SYMBOL,
      key: key == null ? null : key,
      ref: ref == null ? null : ref,
      props: _other
    };
  }

  return React.createElement.apply(React, arguments);
};

var ComponentSheet = {
  styled: styled,
  create: create,
  createElement: createElement
};
export { ComponentSheet, create, styled, createElement };
export default ComponentSheet;