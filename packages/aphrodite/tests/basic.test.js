import ComponentSheet from '@component-sheet/aphrodite';

import { View } from '@khanacademy/wonder-blocks-core';

import describeImplBasic from '@component-sheet/core/tests/basic.shared.js';

import { flushToStyleTag } from 'aphrodite';

describe('@component-sheet/aphrodite', () => {
    describeImplBasic(ComponentSheet, View, {
        styleKey: 'style',
        afterRender: flushToStyleTag,
    });
});
