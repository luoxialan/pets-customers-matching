const format = (data, code = 1, message = 'success') => {
    return {
        code,
        message,
        data
    };
};

module.exports = format;
