const express = require('express');
const router = express.Router();

const cacheController = require('./cache.controller');

router.get('/cache', cacheController.getCacheData);
router.get('/cache/keys', cacheController.getCacheData);
router.post('/cache', cacheController.createUpdateCache);
router.put('/cache', cacheController.createUpdateCache);
router.delete('/cache', cacheController.removeCacheData);

module.exports = router;