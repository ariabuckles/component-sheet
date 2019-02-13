import * as React from 'react';
import ComponentSheet from '@component-sheet/aphrodite';
import { View } from '@khanacademy/wonder-blocks-core';
import describeImplBasic from '@component-sheet/core/tests/basic.shared';
import { flushToStyleTag } from 'aphrodite';

class DivWithTestId extends React.Component {
    render() {
        return (
            <div
                className={this.props.className}
                data-testid={this.props.testID}
            >
                {this.props.children}
            </div>
        );
    }
}

describe('@component-sheet/aphrodite', () => {
    describeImplBasic(ComponentSheet, View, {
        suiteName: 'style prop',
        styleKey: 'style',
        afterRender: flushToStyleTag,
    });

    describeImplBasic(ComponentSheet, 'div', {
        suiteName: 'div className',
        styleKey: 'className',
        afterRender: flushToStyleTag,
    });

    describeImplBasic(ComponentSheet, DivWithTestId, {
        suiteName: 'className prop',
        styleKey: 'className',
        afterRender: flushToStyleTag,
    });
});
