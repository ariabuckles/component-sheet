let { StyleSheetServer } = require('aphrodite');
let ComponentSheet = require('@component-sheet/aphrodite').default;
let createElement = ComponentSheet.createElement;

let cs = ComponentSheet.create({
    Fullscreen: createElement('div', {
        className: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
    }),
});

console.log(ComponentSheet);

console.log(cs.Fullscreen);

let reffed = null;
let ref = (node) => reffed = node;

let html = StyleSheetServer.renderStatic(() => {
    let rendered = cs.Fullscreen.render({
        children: 'hi',
    }, ref);

    console.log(rendered);
});

console.log();
console.log(html);
