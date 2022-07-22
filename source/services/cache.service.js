const utils = require('./../../common/utils');
const {CustomError} = require('./../../common/error-handler');
const {generateString} = require('./../../common/utils');
const config =require('./../../config/config.json');
const db = require('./../../config/db');
const Cache = db.Cache;

async function getCacheData(req) {
    return {which: "get", data: req.query};
}

async function getAllKeys(req) {
    return {which: "get all keys"};
}

async function createUpdateCache(req) {
    return {which : "post"};
}

async function removeCacheData(req) {
    return {which: "delete", data: req.query};
}

module.exports = {
    getCacheData,
    getAllKeys,
    createUpdateCache,
    removeCacheData
};