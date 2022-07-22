const cacheService = require('../services/cache.service');
const response = {
    status: true
};

function getCacheData(req, res, next) {
    cacheService.getCacheData(req)
        .then((data) => res.json({data, ...response}))
        .catch(err => next(err));
}

function createUpdateCache(req, res, next) {
    cacheService.createUpdateCache(req)
        .then((data) => res.json({data, ...response}))
        .catch(err => next(err));
}

function removeCacheData(req, res, next) {
    cacheService.removeCacheData(req)
        .then((data) => res.json({data, ...response}))
        .catch(err => next(err));
}

module.exports = {
    getCacheData,
    createUpdateCache,
    removeCacheData
}