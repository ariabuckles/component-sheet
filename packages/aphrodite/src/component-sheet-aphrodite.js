import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {
    CS_TYPE_KEY,
    STRING_CLASSNAMES,
    RN_SYTLES,
    REACT_TYPE_SYMBOL,
    EMPTY_OBJ,
    squashStyleDescriptor,
    createCreateFrom,
    createElement,
    ComponentSheet_createElement,
} from '@component-sheet/core';

const compileStyle = (styleDescriptor) => {
    const {
        [STRING_CLASSNAMES]: stringClassNames,
        [RN_SYTLES]: rnStyles,
        ...styleObj
    } = squashStyleDescriptor(styleDescriptor);

    if (Object.keys(styleObj).length === 0) {
        return {
            compiled: null,
            className: stringClassNames && stringClassNames.join(' '),
            rnStyle: rnStyles,
        };
    }

    const styles = StyleSheet.create({
        style: styleObj,
    });
    return {
        compiled: styles.style,
        className: stringClassNames && stringClassNames.join(' '),
        rnStyle: rnStyles,
    };
};

const styled = (element) => {
    let { style, className, elementProps } = element.props || EMPTY_OBJ;

    let {
        compiled: compiledFromClassName,
        className: stringClassName,
    } = compileStyle(className);

    let shouldOutputToClassName =
        typeof element.type === 'string' ||
        (element.type.PropTypes && element.type.PropTypes.className) ||
        compiledFromClassName !== null ||
        !!stringClassName;

    let { compiled: compiledFromStyle } = compileStyle(style);

    let styledComponent = React.forwardRef(function(props, ref) {
        let newProps = Object.assign(
            {
                ref: ref,
            },
            elementProps,
            props
        );

        if (shouldOutputToClassName) {
            console.log(shouldOutputToClassName, ' making a classname!');
            newProps.className = [
                stringClassName,
                (compiledFromClassName || compiledFromStyle) &&
                    css(compiledFromClassName, compiledFromStyle),
                props.className,
            ]
                .filter((className) => !!className)
                .join(' ');
        } else if (compiledFromStyle) {
            console.log(shouldOutputToClassName, ' making a style obj!');
            newProps.style = [
                compiledFromClassName,
                compiledFromStyle,
                props.style,
            ];
        }

        return React.createElement(element.type, newProps);
    });

    styledComponent[CS_TYPE_KEY] = true;

    return styledComponent;
};

const create = createCreateFrom(styled);

const ComponentSheet = {
    create: create,
    createElement: createElement,
};

export { ComponentSheet, create, createElement, ComponentSheet_createElement };
export default ComponentSheet;
