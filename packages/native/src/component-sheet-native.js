import * as React from 'react';
import { StyleSheet } from 'react-native';

const styled = (element) => {
    const styles = StyleSheet.create({
        style: element.props.style,
    });
    const style = styles.style;

    let styledComponent = React.forwardRef(function(props) {
        return <element.type
            {...element.props}
            {...props}
            style={StyleSheet.compose(style, props.style)}
        />;
    });
};

const create = (sheetObject) => {
    const sheet = {};
    for (compName in sheetObject) {
        sheet[compName] = styled(sheetObject[compName]);
    }
};

const ComponentSheet = {
    styled: styled,
    create: create,
};

export { ComponentSheet, create, styled };
export default ComponentSheet;
