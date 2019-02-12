function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { CS_TYPE_KEY, REACT_TYPE_SYMBOL, EMPTY_OBJ, createCreateFrom, createElement, ComponentSheet_createElement } from '@component-sheet/core';

var compileStyle = function compileStyle(styleObj) {
  var styles = StyleSheet.create({
    style: styleObj
  });
  return styles.style;
};

var styled = function styled(element) {
  var style = element.props && element.props.style;

  if (_typeof(style) === 'object' && style !== null && style.length === undefined) {
    style = compileStyle(style);
  }

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

var create = createCreateFrom(styled);
var ComponentSheet = {
  create: create,
  createElement: createElement
};
export { ComponentSheet, create, createElement, ComponentSheet_createElement };
export default ComponentSheet;