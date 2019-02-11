"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ComponentSheet_createElement = exports.createElement = exports.styled = exports.create = exports.ComponentSheet = void 0;

var React = _interopRequireWildcard(require("react"));

var _aphrodite = require("aphrodite");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var CS_TYPE_KEY = typeof Symbol === 'function' ? Symbol('component-sheet.react-element') : 'component-sheet.react-element';
var STRING_CLASSNAMES = typeof Symbol === 'function' ? Symbol('component-sheet.string-classnames') : '_component-sheet.string-classnames';
var RN_SYTLES = typeof Symbol === 'function' ? Symbol('component-sheet.react-native-styles') : '_component-sheet.react-native-styles';
var REACT_TYPE_SYMBOL = React.createElement('div')['$$typeof'];
var EMPTY_OBJ = {};
var _ignorePropTypes = false;

var squashStyleDescriptor = function squashStyleDescriptor(styleDescriptor) {
  var typeOfStyleDescriptor = _typeof(styleDescriptor);

  if (styleDescriptor == null) {
    return null;
  } else if (Array.isArray(styleDescriptor)) {
    var _styleDescriptor$redu;

    var strings = '';
    return styleDescriptor.reduce(function (result, subDescriptor) {
      var stringClassNames = result[STRING_CLASSNAMES];

      if (subDescriptor[STRING_CLASSNAMES]) {
        stringClassNames.push.apply(stringClassNames, _toConsumableArray(subDescriptor[STRING_CLASSNAMES]));
      }

      var rnStyles = result[RN_SYTLES];

      if (subDescriptor[RN_SYTLES]) {
        rnStyles.push.apply(rnStyles, _toConsumableArray(subDescriptor[RN_SYTLES]));
      }

      Object.assign(result, subDescriptor);
      result[STRING_CLASSNAMES] = stringClassNames;
      result[RN_SYTLES] = rnStyles;
      return result;
    }, (_styleDescriptor$redu = {}, _defineProperty(_styleDescriptor$redu, STRING_CLASSNAMES, []), _defineProperty(_styleDescriptor$redu, RN_SYTLES, []), _styleDescriptor$redu));
  } else if (typeOfStyleDescriptor === 'object') {
    return styleDescriptor;
  } else if (typeOfStyleDescriptor === 'string') {
    return _defineProperty({}, STRING_CLASSNAMES, [styleDescriptor]);
  } else if (typeOfStyleDescriptor === 'number') {
    return _defineProperty({}, RN_SYTLES, [styleDescriptor]);
  } else {
    throw new Error("ComponentSheet: Unsupported style: " + typeOfStyleDescriptor + ': ' + String(styleDescriptor));
  }
};

var compileStyle = function compileStyle(styleDescriptor) {
  var _squashStyleDescripto = squashStyleDescriptor(styleDescriptor),
      stringClassNames = _squashStyleDescripto[STRING_CLASSNAMES],
      rnStyles = _squashStyleDescripto[RN_SYTLES],
      styleObj = _objectWithoutProperties(_squashStyleDescripto, [STRING_CLASSNAMES, RN_SYTLES].map(_toPropertyKey));

  if (Object.keys(styleObj).length === 0) {
    return {
      compiled: null,
      className: stringClassNames.join(' '),
      rnStyle: rnStyles
    };
  }

  var styles = _aphrodite.StyleSheet.create({
    style: styleObj
  });

  return {
    compiled: styles.style,
    className: stringClassNames.join(' '),
    rnStyle: rnStyles
  };
};

var styled = function styled(element) {
  var _ref3 = element.props || EMPTY_OBJ,
      style = _ref3.style,
      className = _ref3.className,
      elementProps = _ref3.elementProps;

  var _compileStyle = compileStyle(className),
      compiledFromClassName = _compileStyle.compiled,
      stringClassName = _compileStyle.className;

  var compiledClassName = compiledFromClassName ? stringClassName + ' ' + (0, _aphrodite.css)(compiledFromClassName) : stringClassName;
  var shouldOutputToClassName = element.type === 'string' || element.type.PropTypes && element.type.PropTypes.className || !!compiledClassName;

  var _compileStyle2 = compileStyle(style),
      compiledFromStyle = _compileStyle2.compiled;

  if (shouldOutputToClassName && Object.keys(compiledFromStyle).length !== 0) {
    compiledClassName = compiledClassName + ' ' + (0, _aphrodite.css)(compiledFromStyle);
  }

  var styledComponent = React.forwardRef(function (props, ref) {
    var newProps = Object.assign({
      ref: ref
    }, elementProps, props);

    if (shouldOutputToClassName) {
      newProps.className = props.className ? compiledClassName + ' ' + props.className : compiledClassName;
    } else if (Object.keys(compiledFromStyle).length !== 0) {
      newProps.style = Object.assign({}, compiledFromStyle, props.style);
    }

    return React.createElement(element.type, newProps);
  });
  styledComponent[CS_TYPE_KEY] = true;
  return styledComponent;
};

exports.styled = styled;

var create = function create(sheetDecl) {
  _ignorePropTypes = true;
  var sheetObject = typeof sheetDecl === 'function' ? sheetDecl(compileStyle) : compiledClassName;
  sheetDecl;
  var sheet = {};

  for (var compName in sheetObject) {
    sheet[compName] = styled(sheetObject[compName]);
  }

  _ignorePropTypes = false;
  return sheet;
};

exports.create = create;

var createElement = function createElement(type, props, child) {
  if (_ignorePropTypes || type[CS_TYPE_KEY]) {
    var _ref4 = props || EMPTY_OBJ,
        ref = _ref4.ref,
        key = _ref4.key,
        other = _objectWithoutProperties(_ref4, ["ref", "key"]);

    if (arguments.length > 3) {
      other.children = Array.prototype.slice.call(arguments, 2);
    } else if (arguments.length === 3) {
      other.children = child;
    }

    if (type[CS_TYPE_KEY]) {
      return Object.assign({}, type.render(other, ref), {
        key: key
      });
    } // if (_ignorePropTypes):


    return {
      '$$typeof': REACT_TYPE_SYMBOL,
      type: type,
      key: key == null ? null : key,
      ref: ref == null ? null : ref,
      props: other,
      _owner: null
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
var ComponentSheet_createElement = createElement;
exports.ComponentSheet_createElement = ComponentSheet_createElement;
var _default = ComponentSheet;
exports.default = _default;