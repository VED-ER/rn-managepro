const debounce = (fn, timeout = 400) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(
            () => fn.apply(this, args),
            timeout
        );
    };
};

export default debounce