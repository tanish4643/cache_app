const config = require('./../config/config.json');

const generateExpiry = () => {
    const date = new Date();
    date.setHours(date.getHours() + config.expiryHours);
    return date;
}

const generateString = (key) => {
    const str = Math.random().toString(36).slice(2);

    return `${key}-${str}`;
}

module.exports = {
    generateString,
    generateExpiry
}