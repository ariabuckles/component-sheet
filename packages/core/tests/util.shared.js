const normalizeValue = (styleValue) => {
    if (typeof styleValue === 'string' && /^0\w*/.test(styleValue)) {
        return 0;
    }
    return styleValue;
};

export {
    normalizeValue
};
