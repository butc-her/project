const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UsersubscribeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default:Date
    }
});

module.exports = mongoose.model('Usersubscribe', UsersubscribeSchema);