function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { StyleSheet } from 'react-native';

var styled = function styled(element) {
  var styles = StyleSheet.create({
    style: element.props.style
  });
  var style = styles.style;
  var styledComponent = React.forwardRef(function (props) {
    return React.createElement(element.type, _extends({}, element.props, props, {
      style: StyleSheet.compose(style, props.style)
    }));
  });
};

var create = function create(sheetObject) {
  var sheet = {};

  for (var compName in sheetObject) {
    sheet[compName] = styled(sheetObject[compName]);
  }
};

var ComponentSheet = {
  styled: styled,
  create: create
};
export { ComponentSheet, create, styled };
export default ComponentSheet;