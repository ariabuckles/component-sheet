const normalizeValue = (styleValue) => {
    if (typeof styleValue === 'string' && /^0\w*/.test(styleValue)) {
        return 0;
    }
    return styleValue;
};

const classOf = (obj) => {
    let type = typeof obj;
    if (type !== 'object') {
        return type;
    }

    if (obj === null) {
        return null;
    }

    let proto = Object.getPrototypeOf(obj);

    if (proto == null || proto === Object.prototype) {
        return Object;
    }
    if (proto.constructor) {
        return proto.constructor;
    }
    if (obj.constructor) {
        return obj.constructor;
    }
    return obj;
};

export { normalizeValue, classOf };
