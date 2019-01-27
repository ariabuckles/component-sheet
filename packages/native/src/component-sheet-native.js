import * as React from 'react';
import { StyleSheet } from 'react-native';

const styled = (element) => {
    let styles = StyleSheet.create({
        style: element.props.style,
    });
    let style = styles.style;

    let styledComponent = React.forwardRef(function(props) {
        return <element.type
            {...element.props}
            {...props}
            style={StyleSheet.compose(style, props.style)}
        />;
    });
};

const create = (sheetObject) => {
    let sheet = {};
    for (let compName in sheetObject) {
        sheet[compName] = styled(sheetObject[compName]);
    }
    return sheet;
};

const ComponentSheet = {
    styled: styled,
    create: create,
};

export { ComponentSheet, create, styled };
export default ComponentSheet;
