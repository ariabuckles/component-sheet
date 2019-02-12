import * as React from 'react';

const CS_TYPE_KEY =
    typeof Symbol === 'function'
        ? Symbol('component-sheet.react-element')
        : 'component-sheet.react-element';

const STRING_CLASSNAMES =
    typeof Symbol === 'function'
        ? Symbol('component-sheet.string-classnames')
        : '_component-sheet.string-classnames';

const RN_SYTLES =
    typeof Symbol === 'function'
        ? Symbol('component-sheet.react-native-styles')
        : '_component-sheet.react-native-styles';

const REACT_TYPE_SYMBOL = React.createElement('div')['$$typeof'];

const EMPTY_OBJ = {};

let _ignorePropTypes = false;

const squashStyleDescriptor = (styleDescriptor) => {
    const typeOfStyleDescriptor = typeof styleDescriptor;
    if (styleDescriptor == null) {
        return {};
    } else if (Array.isArray(styleDescriptor)) {
        let strings = '';
        return styleDescriptor.reduce(
            (result, subDescriptor) => {
                subDescriptor = squashStyleDescriptor(subDescriptor);
                let stringClassNames = result[STRING_CLASSNAMES];
                if (subDescriptor[STRING_CLASSNAMES]) {
                    stringClassNames.push(...subDescriptor[STRING_CLASSNAMES]);
                }
                let rnStyles = result[RN_SYTLES];
                if (subDescriptor[RN_SYTLES]) {
                    rnStyles.push(...subDescriptor[RN_SYTLES]);
                }
                // TODO(aria): Handle receiving an aphrodite style obj in here
                Object.assign(result, subDescriptor);
                result[STRING_CLASSNAMES] = stringClassNames;
                result[RN_SYTLES] = rnStyles;
                return result;
            },
            {
                [STRING_CLASSNAMES]: [],
                [RN_SYTLES]: [],
            }
        );
    } else if (typeOfStyleDescriptor === 'object') {
        return styleDescriptor;
    } else if (typeOfStyleDescriptor === 'string') {
        return {
            [STRING_CLASSNAMES]: [styleDescriptor],
        };
    } else if (typeOfStyleDescriptor === 'number') {
        return {
            [RN_SYTLES]: [styleDescriptor],
        };
    } else {
        throw new Error(
            'ComponentSheet: Unsupported style: ' +
                typeOfStyleDescriptor +
                ': ' +
                String(styleDescriptor)
        );
    }
};

const createCreateFrom = (styled) => (sheetDecl) => {
    _ignorePropTypes = true;
    const sheetObject =
        typeof sheetDecl === 'function' ? sheetDecl(compileStyle) : sheetDecl;

    let sheet = {};
    for (let compName in sheetObject) {
        sheet[compName] = styled(sheetObject[compName]);
    }

    _ignorePropTypes = false;
    return sheet;
};

const createElement = function(type, props, child) {
    if (_ignorePropTypes || type[CS_TYPE_KEY]) {
        let { ref, key, ...other } = props || EMPTY_OBJ;
        if (arguments.length > 3) {
            other.children = Array.prototype.slice.call(arguments, 2);
        } else if (arguments.length === 3) {
            other.children = child;
        }

        if (type[CS_TYPE_KEY]) {
            return Object.assign({}, type.render(other, ref), { key: key });
        }

        // if (_ignorePropTypes):
        return {
            $$typeof: REACT_TYPE_SYMBOL,
            type: type,
            key: key == null ? null : key,
            ref: ref == null ? null : ref,
            props: other,
            _owner: null,
        };
    }

    return React.createElement.apply(React, arguments);
};

const ComponentSheet_createElement = createElement;

export {
    CS_TYPE_KEY,
    STRING_CLASSNAMES,
    RN_SYTLES,
    REACT_TYPE_SYMBOL,
    EMPTY_OBJ,
    squashStyleDescriptor,
    createCreateFrom,
    createElement,
    ComponentSheet_createElement,
};
