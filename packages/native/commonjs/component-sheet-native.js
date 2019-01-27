"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styled = exports.create = exports.ComponentSheet = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var styled = function styled(element) {
  var styles = _reactNative.StyleSheet.create({
    style: element.props.style
  });

  var style = styles.style;
  var styledComponent = React.forwardRef(function (props) {
    return React.createElement(element.type, _extends({}, element.props, props, {
      style: _reactNative.StyleSheet.compose(style, props.style)
    }));
  });
};

exports.styled = styled;

var create = function create(sheetObject) {
  var sheet = {};

  for (var compName in sheetObject) {
    sheet[compName] = styled(sheetObject[compName]);
  }
};

exports.create = create;
var ComponentSheet = {
  styled: styled,
  create: create
};
exports.ComponentSheet = ComponentSheet;
var _default = ComponentSheet;
exports.default = _default;