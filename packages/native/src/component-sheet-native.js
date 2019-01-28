import * as React from 'react';
import { StyleSheet } from 'react-native';

const CS_TYPE_KEY = (typeof Symbol === 'function') ?
    Symbol('component-sheet.react-element') :
    'component-sheet.react-element';

const REACT_TYPE_SYMBOL = React.createElement('div')['$$typeof'];

let _ignorePropTypes = false;

const styled = (element) => {
    let styles = StyleSheet.create({
        style: element.props.style,
    });
    let style = styles.style;

    let styledComponent = React.forwardRef(function(props, ref) {
        return React.createElement(
            element.type,
            Object.assign(
                {
                    ref: ref,
                },
                element.props,
                props,
                {
                    style: StyleSheet.compose(style, props.style),
                }
            )
        );
    });

    styledComponent[CS_TYPE_KEY] = true;

    return styledComponent;
};

const create = (sheetDecl) => {
    _ignorePropTypes = true;
    const sheetObject = (typeof sheetDecl === 'function') ?
        sheetDecl() :
        sheetDecl;

    let sheet = {};
    for (let compName in sheetObject) {
        sheet[compName] = styled(sheetObject[compName]);
    }

    _ignorePropTypes = false;
    return sheet;
};

const createElement = function(type, props, child) {
    if (_ignorePropTypes || type[CS_TYPE_KEY]) {

        let { ref, key, ...other } = props;
        if (arguments.length > 3) {
            other.children = Array.prototype.slice.call(
                arguments,
                2
            );
        } else if (arguments.length === 3) {
            other.children = child;
        }

        if (type[CS_TYPE_KEY]) {
            return Object.assign(
                {},
                type.render(other, ref),
                { key: key }
            );
        }

        // if (_ignorePropTypes):
        return {
            '$$typeof': REACT_TYPE_SYMBOL,
            type: type,
            key: key == null ? null : key,
            ref: ref == null ? null : ref,
            props: other,
            _owner: null,
        };
    }

    return React.createElement.apply(React, arguments);
};

const ComponentSheet = {
    styled: styled,
    create: create,
    createElement: createElement,
};

const ComponentSheet_createElement = createElement;

export { ComponentSheet, create, styled, createElement, ComponentSheet_createElement };
export default ComponentSheet;
