const chai = require('chai');
const cacheService = require('./../source/services/cache.service');

describe('Testing generate email service', () => {
    const key = "name101";
    const sKey = "name102";
    const deleteMsg = "Data removed successfully";
    let value;

    it("Create cache entry for new key", async function(){
        const res = await cacheService.createUpdateCache({query: {key}});
        
        chai.expect(res.key).to.equal(key);
    });

    it("Update cache entry for old key", async function(){
        const res = await cacheService.createUpdateCache({query: {key}});
        value = res.value;

        chai.expect(res.key).to.equal(key);
    });

    it("Read cache entry for old key", async function(){
        const res = await cacheService.getCacheData({query: {key}});

        chai.expect(res.value).to.equal(value);
    });

    it("Read cache entry for new key", async function(){
        const res = await cacheService.getCacheData({query: {key: sKey}});

        chai.expect(res.value).to.not.be.null;
    });

    it("Delete cache entry for old key", async function(){
        const res = await cacheService.removeCacheData({query: {key}});
        
        chai.expect(res.message).to.equal(deleteMsg);
    });

    it("Delete cache entry for all the keys", async function(){
        const res = await cacheService.removeCacheData({query: {}});
        
        chai.expect(res.message).to.equal(deleteMsg);
    });
    
})