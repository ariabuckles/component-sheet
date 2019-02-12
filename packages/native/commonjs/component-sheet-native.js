"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function get() {
    return _core.createElement;
  }
});
Object.defineProperty(exports, "ComponentSheet_createElement", {
  enumerable: true,
  get: function get() {
    return _core.ComponentSheet_createElement;
  }
});
exports.default = exports.create = exports.ComponentSheet = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _core = require("@component-sheet/core");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var compileStyle = function compileStyle(styleObj) {
  var styles = _reactNative.StyleSheet.create({
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
      style: _reactNative.StyleSheet.compose(style, props.style)
    }));
  });
  styledComponent[_core.CS_TYPE_KEY] = true;
  return styledComponent;
};

var create = (0, _core.createCreateFrom)(styled);
exports.create = create;
var ComponentSheet = {
  create: create,
  createElement: _core.createElement
};
exports.ComponentSheet = ComponentSheet;
var _default = ComponentSheet;
exports.default = _default;