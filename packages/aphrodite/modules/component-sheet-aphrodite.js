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

import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
var CS_TYPE_KEY = typeof Symbol === 'function' ? Symbol('component-sheet.react-element') : 'component-sheet.react-element';
var STRING_CLASSNAMES = typeof Symbol === 'function' ? Symbol('component-sheet.string-classnames') : '_component-sheet.string-classnames';
var RN_SYTLES = typeof Symbol === 'function' ? Symbol('component-sheet.react-native-styles') : '_component-sheet.react-native-styles';
var REACT_TYPE_SYMBOL = React.createElement('div')['$$typeof'];
var EMPTY_OBJ = {};
var _ignorePropTypes = false;

var squashStyleDescriptor = function squashStyleDescriptor(styleDescriptor) {
  var typeOfStyleDescriptor = _typeof(styleDescriptor);

  if (styleDescriptor == null) {
    return {};
  } else if (Array.isArray(styleDescriptor)) {
    var _styleDescriptor$redu;

    var strings = '';
    return styleDescriptor.reduce(function (result, subDescriptor) {
      subDescriptor = squashStyleDescriptor(subDescriptor);
      var stringClassNames = result[STRING_CLASSNAMES];

      if (subDescriptor[STRING_CLASSNAMES]) {
        stringClassNames.push.apply(stringClassNames, _toConsumableArray(subDescriptor[STRING_CLASSNAMES]));
      }

      var rnStyles = result[RN_SYTLES];

      if (subDescriptor[RN_SYTLES]) {
        rnStyles.push.apply(rnStyles, _toConsumableArray(subDescriptor[RN_SYTLES]));
      } // TODO(aria): Handle receiving an aphrodite style obj in here


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
      className: stringClassNames && stringClassNames.join(' '),
      rnStyle: rnStyles
    };
  }

  var styles = StyleSheet.create({
    style: styleObj
  });
  return {
    compiled: styles.style,
    className: stringClassNames && stringClassNames.join(' '),
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

  var shouldOutputToClassName = typeof element.type === 'string' || element.type.PropTypes && element.type.PropTypes.className || compiledFromClassName !== null || !!stringClassName;

  var _compileStyle2 = compileStyle(style),
      compiledFromStyle = _compileStyle2.compiled;

  var styledComponent = React.forwardRef(function (props, ref) {
    var newProps = Object.assign({
      ref: ref
    }, elementProps, props);

    if (shouldOutputToClassName) {
      console.log(shouldOutputToClassName, ' making a classname!');
      newProps.className = [stringClassName, (compiledFromClassName || compiledFromStyle) && css(compiledFromClassName, compiledFromStyle), props.className].filter(function (className) {
        return !!className;
      }).join(' ');
    } else if (compiledFromStyle) {
      console.log(shouldOutputToClassName, ' making a style obj!');
      newProps.style = [compiledFromClassName, compiledFromStyle, props.style];
    }

    return React.createElement(element.type, newProps);
  });
  styledComponent[CS_TYPE_KEY] = true;
  return styledComponent;
};

var create = function create(sheetDecl) {
  _ignorePropTypes = true;
  var sheetObject = typeof sheetDecl === 'function' ? sheetDecl(compileStyle) : sheetDecl;
  var sheet = {};

  for (var compName in sheetObject) {
    sheet[compName] = styled(sheetObject[compName]);
  }

  _ignorePropTypes = false;
  return sheet;
};

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

var ComponentSheet = {
  styled: styled,
  create: create,
  createElement: createElement
};
var ComponentSheet_createElement = createElement;
export { ComponentSheet, create, styled, createElement, ComponentSheet_createElement };
export default ComponentSheet;