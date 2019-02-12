// @jsx ComponentSheet.createElement

import assert from 'assert';
import { render, cleanup, waitForElement } from 'react-testing-library';

import { normalizeValue, classOf } from './util.shared';

const getComputedStyle = window.getComputedStyle;

console.log('hi');

let describeImpl = (ComponentSheet, View, options = {}) => {
    const suiteName = options.suiteName || '';
    const styleKey = options.styleKey || 'style';
    const afterRender = options.afterRender || (() => null);

    describe(('style ' + suiteName).trim(), () => {
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

    describe(('props ' + suiteName).trim(), () => {
        beforeEach(cleanup);

        it('should be able to specify children prop', () => {
            const S = ComponentSheet.create({
                ErrorNotifier: <View>
                    <span>An error occurred</span>
                </View>,
            });

            let { container, getByText } = render(<S.ErrorNotifier />);

            let div = container.firstChild;
            let span = div.firstChild;

            assert.equal(classOf(div), HTMLDivElement);
            assert.equal(classOf(span), HTMLSpanElement);
            assert.equal(span.textContent, 'An error occurred');
        });
    });
};

export default describeImpl;
