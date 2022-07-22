const config = require('./../config/config.json');

/**
 * Method to generate expiry time for cache
 */
const generateExpiry = () => {
    const date = new Date();
    date.setHours(date.getHours() + config.expiryHours);
    return date;
}

/*
  * Method to generate random string value for cache
*/
const generateString = (key) => {
    const str = Math.random().toString(36).slice(2);

    return `${key}-${str}`;
}

module.exports = {
    generateString,
    generateExpiry
}