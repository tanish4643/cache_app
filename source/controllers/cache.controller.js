const cacheService = require('../services/cache.service');

function getCacheData(req, res, next) {
    cacheService.getCacheData(req)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function getAllKeys(req, res, next) {
    cacheService.getAllKeys(req)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function createUpdateCache(req, res, next) {
    cacheService.createUpdateCache(req)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function removeCacheData(req, res, next) {
    cacheService.removeCacheData(req)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

module.exports = {
    getCacheData,
    getAllKeys,
    createUpdateCache,
    removeCacheData
}