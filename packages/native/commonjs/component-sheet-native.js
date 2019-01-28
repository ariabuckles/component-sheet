"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createElement = exports.styled = exports.create = exports.ComponentSheet = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CS_TYPE_KEY = typeof Symbol === 'function' ? Symbol('component-sheet.react-element') : 'component-sheet.react-element';
var REACT_TYPE_SYMBOL = React.createElement('div')['$$typeof'];
var _ignorePropTypes = false;

var styled = function styled(element) {
  var styles = _reactNative.StyleSheet.create({
    style: element.props.style
  });

  var style = styles.style;
  var styledComponent = React.forwardRef(function (props, ref) {
    return React.createElement(element.type, Object.assign({
      ref: ref
    }, element.props, props, {
      style: _reactNative.StyleSheet.compose(style, props.style)
    }));
  });
  styledComponent[CS_TYPE_KEY] = true;
  return styledComponent;
};

exports.styled = styled;

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

exports.create = create;

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

exports.createElement = createElement;
var ComponentSheet = {
  styled: styled,
  create: create,
  createElement: createElement
};
exports.ComponentSheet = ComponentSheet;
var _default = ComponentSheet;
exports.default = _default;