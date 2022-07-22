const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {generateExpiry} = require('./../../common/utils');

const schema = new Schema({
    key: { type: String, unique: true, required: true },
    value: { type: String, required: true },
    accessCount: { type: Number, default: 0},
    lastAccess: { type: String, default: Date.now},
    expires: { type: Date, default: generateExpiry }
}, {
    timestamps: true
});

schema.set('toJSON', { virtuals: true });
schema.pre('save', function(next) {
    this.expires = generateExpiry();
    this.lastAccess = new Date();
    next();
});

module.exports = mongoose.model('Cache', schema);