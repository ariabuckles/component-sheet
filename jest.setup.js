// mock canvas.getContext('2d') for react-art from react-native-web

class CanvasDoesNotRunInJest {
    constructor(properties) {
        Object.assign(this, properties);
    }
}


const notImplementedGetContext = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function(name) {
    if (name === '2d' && /\/node_modules\/art\//.test(new Error().stack)) {
        return new CanvasDoesNotRunInJest({});
    } else {
        notImplementedGetContext.apply(this, arguments);
    }
};
