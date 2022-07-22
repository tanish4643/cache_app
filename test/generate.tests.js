const chai = require('chai');

const { errorMsgs,errorTypes } = require('../common/constants');
const { EmailDerivationError } = require('../common/error-handler');
const service = require('./../source/service')

describe('Testing generate email service', () => {
	
    it('Should handle error for invalid arguments',() => {
        return service.generateDomain({})
        .catch((err) => {
            const expectedErr = errorMsgs[errorTypes.INVALID_ARGUMENTS];

            chai.expect(err.message).to.equal(expectedErr);
        })
    })

    it('Should handle error for invalid derivation', () => {
        return service.generateDomain({
            fullName: "Tanish Tanish",
            domain: "test.com"
        })
        .catch((err) => {
            const expectedErr = errorMsgs[errorTypes.INVALID_DERIVATION];
            
            chai.expect(err.message).to.equal(expectedErr);
        })
    })

    it('Should handle valid case for format type 1', () => {
        return service.generateDomain({
            fullName: "Tanish Tanish",
            domain: "babbel.com"
        })
        .then((res) => {            
            chai.expect(res.email).to.equal("ttanish@babbel.com");
        })
    })

    it('Should handle valid case for format type 2', () => {
        return service.generateDomain({
            fullName: "Tanish Tanish",
            domain: "google.com"
        })
        .then((res) => {            
            chai.expect(res.email).to.equal("tanishtanish@google.com");
        })
    })

    it('Should handle valid case for only first name type 1', () => {
        return service.generateDomain({
            fullName: "Tanish",
            domain: "babbel.com"
        })
        .then((res) => {            
            chai.expect(res.email).to.equal("t@babbel.com");
        })
    })

    it('Should handle valid case for only first name type 2', () => {
        return service.generateDomain({
            fullName: "Tanish",
            domain: "google.com"
        })
        .then((res) => {            
            chai.expect(res.email).to.equal("tanish@google.com");
        })
    })
})