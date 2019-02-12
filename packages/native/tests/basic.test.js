import ComponentSheet from '@component-sheet/native';

import { View } from 'react-native-web';

import describeImplBasic from '@component-sheet/core/tests/basic.shared.js';

describe('@component-sheet/native', () => {
    describeImplBasic(ComponentSheet, View);
});
