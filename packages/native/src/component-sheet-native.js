import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    CS_TYPE_KEY,
    REACT_TYPE_SYMBOL,
    EMPTY_OBJ,
    createCreateFrom,
    createElement,
    ComponentSheet_createElement,
} from '@component-sheet/core';

const compileStyle = (styleObj) => {
    let styles = StyleSheet.create({
        style: styleObj,
    });
    return styles.style;
};

const styled = (element) => {
    let style = element.props && element.props.style;
    if (
        typeof style === 'object' &&
        style !== null &&
        style.length === undefined
    ) {
        style = compileStyle(style);
    }

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
                    style: StyleSheet.compose(
                        style,
                        props.style
                    ),
                }
            )
        );
    });

    styledComponent[CS_TYPE_KEY] = true;

    return styledComponent;
};

const create = createCreateFrom(styled, compileStyle);

const ComponentSheet = {
    create: create,
    createElement: createElement,
};

export { ComponentSheet, create, createElement, ComponentSheet_createElement };
export default ComponentSheet;
