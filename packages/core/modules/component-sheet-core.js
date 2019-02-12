function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import * as React from 'react';
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
    throw new Error('ComponentSheet: Unsupported style: ' + typeOfStyleDescriptor + ': ' + String(styleDescriptor));
  }
};

var createCreateFrom = function createCreateFrom(styled) {
  return function (sheetDecl) {
    _ignorePropTypes = true;
    var sheetObject = typeof sheetDecl === 'function' ? sheetDecl(compileStyle) : sheetDecl;
    var sheet = {};

    for (var compName in sheetObject) {
      sheet[compName] = styled(sheetObject[compName]);
    }

    _ignorePropTypes = false;
    return sheet;
  };
};

var createElement = function createElement(type, props, child) {
  if (_ignorePropTypes || type[CS_TYPE_KEY]) {
    var _ref3 = props || EMPTY_OBJ,
        ref = _ref3.ref,
        key = _ref3.key,
        other = _objectWithoutProperties(_ref3, ["ref", "key"]);

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
      $$typeof: REACT_TYPE_SYMBOL,
      type: type,
      key: key == null ? null : key,
      ref: ref == null ? null : ref,
      props: other,
      _owner: null
    };
  }

  return React.createElement.apply(React, arguments);
};

var ComponentSheet_createElement = createElement;
export { CS_TYPE_KEY, STRING_CLASSNAMES, RN_SYTLES, REACT_TYPE_SYMBOL, EMPTY_OBJ, squashStyleDescriptor, createCreateFrom, createElement, ComponentSheet_createElement };