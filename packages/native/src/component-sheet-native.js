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
    const sheetObj = (typeof sheetDecl === 'function') ?
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
    if (type[CS_TYPE_KEY]) {
        return type.render(other, props.ref);
    }

    if (_ignorePropTypes) {
        const { ref, key, ...other } = props;
        return {
            '$$typeof': REACT_TYPE_SYMBOL,
            key: key == null ? null : key,
            ref: ref == null ? null : ref,
            props: other,
        };
    }

    return React.createElement.apply(React, arguments);
};

const ComponentSheet = {
    styled: styled,
    create: create,
    createElement: createElement,
};

export { ComponentSheet, create, styled, createElement };
export default ComponentSheet;
