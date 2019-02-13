// @jsx ComponentSheet.createElement

import assert from 'assert';
import { render as RTLrender, cleanup, waitForElement } from 'react-testing-library';

import { normalizeValue, classOf } from './util.shared';

const getComputedStyle = window.getComputedStyle;

let describeImpl = (ComponentSheet, View, options = {}) => {
    const suiteName = options.suiteName || '';
    const styleKey = options.styleKey || 'style';
    const afterRender = options.afterRender || (() => null);

    const render = (elem) => {
        let result = RTLrender(elem);
        afterRender();
        return result;
    };


    describe((suiteName + ' style').trim(), () => {
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

            let div = container.firstChild;
            let style = getComputedStyle(div);

            assert.equal(style.position, 'absolute');
            assert.equal(normalizeValue(style.top), 0);
            assert.equal(normalizeValue(style.left), 0);
            assert.equal(normalizeValue(style.right), 0);
            assert.equal(normalizeValue(style.bottom), 0);
        });


        it('should be able to set border-radius', () => {
            const S = ComponentSheet.create({
                YesButton: <View {...{[styleKey]: {
                    borderRadius: 10,
                }}} />,
            });

            let { container } = render(<S.YesButton />);

            let div = container.firstChild;
            let style = getComputedStyle(div);

            assert.equal(style['border-top-left-radius'] || style['border-radius'], '10px');
            assert.equal(style['border-top-right-radius'] || style['border-radius'], '10px');
            assert.equal(style['border-bottom-left-radius'] || style['border-radius'], '10px');
            assert.equal(style['border-bottom-right-radius'] || style['border-radius'], '10px');
        });


        it('should be able to add multiple styles', () => {
            const S = ComponentSheet.create({
                YesButton: <View {...{[styleKey]: [
                    {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                    {
                        backgroundColor: 'rgb(0, 128, 255)',
                    },
                ]}} />,
            });

            let { container } = render(<S.YesButton />);

            let div = container.firstChild;
            let style = getComputedStyle(div);

            assert.equal(style['border-top-left-radius'], '10px');
            assert.equal(style['border-top-right-radius'], '10px');
            assert.equal(style['background-color'], 'rgb(0, 128, 255)');
        });
    });


    describe((suiteName + ' props').trim(), () => {
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
