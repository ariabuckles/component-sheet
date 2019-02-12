// @jsx ComponentSheet.createElement

import assert from 'assert';
import { render, cleanup, waitForElement } from 'react-testing-library';

import { normalizeValue } from './util.shared';

const getComputedStyle = window.getComputedStyle;

let describeImpl = (ComponentSheet, View, options = {}) => {
    const styleKey = options.styleKey || 'style';
    const afterRender = options.afterRender || (() => null);

    describe('basic', () => {
        beforeEach(cleanup);

        it('should be able to position a view fullscreen', () => {
            const cs = ComponentSheet.create({
                FullScreenContainer: <View {...{[styleKey]: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}} />,
            });

            let { container } = render(<cs.FullScreenContainer />);
            afterRender();

            let div = container.firstChild;
            let style = getComputedStyle(div);
            assert.equal(style.position, 'absolute');
            assert.equal(normalizeValue(style.top), 0);
            assert.equal(normalizeValue(style.left), 0);
            assert.equal(normalizeValue(style.right), 0);
            assert.equal(normalizeValue(style.bottom), 0);
        });
    });
};

export default describeImpl;
