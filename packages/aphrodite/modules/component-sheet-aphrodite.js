function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { CS_TYPE_KEY, STRING_CLASSNAMES, RN_SYTLES, REACT_TYPE_SYMBOL, EMPTY_OBJ, squashStyleDescriptor, createCreateFrom, createElement, ComponentSheet_createElement } from '@component-sheet/core';

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
  var _ref = element.props || EMPTY_OBJ,
      style = _ref.style,
      className = _ref.className,
      elementProps = _objectWithoutProperties(_ref, ["style", "className"]);

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
      newProps.className = [stringClassName, (compiledFromClassName || compiledFromStyle) && css(compiledFromClassName, compiledFromStyle), props.className].filter(function (className) {
        return !!className;
      }).join(' ');
    } else if (compiledFromStyle) {
      newProps.style = [compiledFromClassName, compiledFromStyle, props.style];
    }

    return React.createElement(element.type, newProps);
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