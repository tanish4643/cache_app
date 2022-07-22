const {CustomError} = require('./../../common/error-handler');
const {generateString} = require('./../../common/utils');
const config =require('./../../config/config.json');
const db = require('./../../config/db');
const Cache = db.Cache;

/**
 * Service method to get cache data
 * Parameter named "key" passed in query fetches data for that particular key
 * All the keys are fetched from the cache, if no key is passed
 */
async function getCacheData(req) {
    const {key} = req.query;

    if(!key){
        return await Cache.find({}, "key");
    }

    const cache = await Cache.findOne({key});

    /** If cache does exists and has not expired then update accessCount and return value */
    if(cache && cache.expires >= new Date()){
        console.log("Cache Hit");

        Object.assign(cache, {
            accessCount: cache.accessCount + 1
        });
        await cache.save();

        return { value: cache.value };
    }

    console.log("Cache miss");
    const newCache = await createCache(key);

    return { value: newCache.value };
}

/**
 * Service method to check the limit of cache entries in DB
 * Reads limit value from config.json
 */
async function hasLimitReached(){
    const cacheCount = await Cache.countDocuments();

    return cacheCount === config.cacheLimit;
}

/**
 * => Service method to find the key for replacement, in case of cache limit reached
 * => Expired keys are preferred for replacement
 * => If there is no expired key, then keys are sorted according to their access Count & Last Access time
 * => The key which is least accessed and hasn't been accessed in recent time is then
 * selected for replacement
 */
async function findReplacement(){
    const cache = await Cache.find({}, null, { 
        sort: { 
            accessCount: "asc",
            lastAccess: "asc"
        }
    }).exec();;

    const date = new Date();
    const expired = cache.find(o => o.expires <= date);

    return expired || cache[0];
}

/**
 * Service method to create cache by checking limit and key required for replacement
 */
async function createCache(key){
    const limitCheck = await hasLimitReached();
    const value = generateString(key);

    if(limitCheck){
        const replacement = await findReplacement();
        Object.assign(
            replacement, { key, value, accessCount: 0 }
        );

        return await replacement.save();
    }

    const entry = new Cache({ key, value});    
    return await entry.save();
}

/**
 * Service method to update or create a cache entry based on key supplied 
 */
async function createUpdateCache(req) {
    const {key} = req.query;
    if(!key) throw CustomError("Please provide missing params: ['key']");
    const queryCache = await Cache.findOne({key});

    if(queryCache){
        Object.assign(queryCache, {  
            value: generateString(key),
            accessCount: queryCache.accessCount + 1
        });
        return await queryCache.save();
    }
    
    return createCache(key);
}

/**
 * Service method to remove all keys or a specific key from the DB
 * Based on "key" attribute passed in query
 */
async function removeCacheData(req) {
    const {key} = req.query;

    if(key){
        await Cache.remove({ key });
    }
    else await Cache.deleteMany({});

    return {message: "Data removed successfully"};
}

module.exports = {
    getCacheData,
    createUpdateCache,
    removeCacheData
};