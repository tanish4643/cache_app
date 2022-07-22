const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {generateExpiry} = require('./../../common/utils');

const schema = new Schema({
    key: { type: String, unique: true, required: true },
    value: { type: String, required: true },
    expires: { type: Date, default: generateExpiry },
    created: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cache', schema);