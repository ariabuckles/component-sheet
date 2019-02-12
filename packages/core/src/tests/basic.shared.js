// @jsx ComponentSheet.createElement

import assert from 'assert';
import { render, cleanup, waitForElement } from 'react-testing-library';

const getComputedStyle = window.getComputedStyle;

let describeImpl = (ComponentSheet, View) => {
    describe('basic', () => {
        beforeEach(cleanup);

        it('should be able to position a view fullscreen', () => {
            const cs = ComponentSheet.create({
                FullScreenContainer: <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }} />,
            });

            let { container } = render(<cs.FullScreenContainer />);
            let div = container.firstChild;

            let style = getComputedStyle(div);
            assert.equal(style.position, 'absolute');
            assert.equal(style.top, '0px');
            assert.equal(style.left, '0px');
            assert.equal(style.right, '0px');
            assert.equal(style.bottom, '0px');
        });
    });
};

export default describeImpl;
